import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormGenderTypesQuery,
  useLazyGetDormQualityTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useGetResidenceDetailInfoMutation,
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
  useLazyGetPlacesAroundDormitoryQuery,
  useLazyGetResidenceTypeQuery,
  useResidenceCreateResidenceMutation,
  useResidenceInactiveResidenceMutation,
  useResidenceUpdateResidenceMutation,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import {
  HOME_PHONE_RULE,
  NUMBER_MAX_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  GENERAL_ERROR_MESSAGE,
  GENERAL_INPUTS_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { fetchDataIfNeeded } from "@pages/_shared/utils";
import { formScroller } from "@pages/_shared/utils/formErrorHandler";

import {
  GetPlacesAroundDormitoryResponse,
  PlacesAroundDormitoryType,
  ResidenceCreateResidenceResponse,
  ResidenceInactiveFormType,
  ResidenceModifyFormType,
  ResidenceUpdateResidenceResponse,
} from "./@types/@dormCreateAndModify";
import DormCreateModalContent from "./helpers/modal/DormCreateModalContent/DormCreateModalContent";
import { ResidenceInactiveResidenceResponse } from "./helpers/modal/DormInactiveModalContent/@types/@dormInactiveModalContent";
import DormInactiveModalContent from "./helpers/modal/DormInactiveModalContent/DormInactiveModalContent";
import ResidencePlacesAroundDormitoryTableModel from "./helpers/models/ResidencePlacesAroundDormitory/ResidencePlacesAroundDormitoryTableModel";
import { GetResidenceDetailInfoResponse } from "../DormsMainDetail/DormsDetail/_shared/component/DividerExtraContent/helper/drawers/ResidenceDetailDrawerContent/@types/@residenceDetailDrawerContent";
import { dormRecordsStatus } from "../DormsMainDetail/DormsDetail/_shared/utils/DormMainDetailUtils";

import "./_dormCreateAndModify.scss";

const CREATE_RESIDENCE_SUCCESS_MSG =
  "درخواست شما با موفقیت ثبت شد و پس از بررسی ادمین، نتیجه به شما اطلاع داده خواهد شد.";
const UPDATE_RESIDENCE_SUCCESS_MSG = "تغییرات با موفقیت اعمال شد.";

const returnedStatus = 4;

const DormCreateAndModify = () => {
  const [activeCity, setActiveCity] = useState(true);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [placeData, setPlaceData] = useState<PlacesAroundDormitoryType[]>([]);
  const [isCreateConfirmModalOpen, setIsCreateConfirmModalOpen] = useState(false);
  const [isUpdateConfirmModalOpen, setIsUpdateConfirmModalOpen] = useState(false);
  const [isInactiveModalOpen, setInactiveModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { params: url } = useQueryParams();

  const navigate = useNavigate();

  const [form] = Form.useForm<ResidenceModifyFormType>();
  const [inactiveForm] = Form.useForm<ResidenceInactiveFormType>();

  useTitle({
    breadcrumbItems: [
      { title: <Link to={DORM_LIST_PAGE_ROUTE}>اقامتگاه‌ها</Link> },
      ...(url?.title
        ? [
            {
              title: url?.title,
            },
          ]
        : []),
      { title: url?.id ? "ویرایش اقامتگاه" : "ایجاد اقامتگاه" },
    ],
  });

  //? ================================  Api Calls ================================
  const [
    getResidenceType,
    {
      data: residenceTypeData,
      isFetching: isResidenceTypeLoading,
      isSuccess: isResidenceTypeSuccess,
    },
  ] = useLazyGetResidenceTypeQuery();

  const [
    getQualityTypes,
    { data: qualityData, isFetching: isQualityDataLoading, isSuccess: isQualitySuccess },
  ] = useLazyGetDormQualityTypesQuery();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [
    getGenderTypes,
    { data: genderData, isFetching: isGenderDataLoading, isSuccess: isGenderSuccess },
  ] = useLazyGetDormGenderTypesQuery();

  const [getProvince, { data: getProvinceListData, isFetching: getProvinceListLoading }] =
    useLazyGetDormProvinceListQuery();

  const [getCityList, { data: getCityListData, isFetching: getCityListLoading }] =
    useLazyGetDormCityListQuery();

  const [getPlacesAroundDormitory, { isFetching: isPlacesAroundDormitoryLoading }] =
    useLazyGetPlacesAroundDormitoryQuery();

  const [createResidence, { isLoading: isCreateResidenceLoading }] =
    useResidenceCreateResidenceMutation();

  const [getResidenceData, { data: residenceData, isLoading: isResidenceDataLoading }] =
    useGetResidenceDetailInfoMutation();

  const [updateResidence, { isLoading: isUpdateResidenceLoading }] =
    useResidenceUpdateResidenceMutation();

  const [inactiveResidence, { isLoading: isInactiveResidenceLoading }] =
    useResidenceInactiveResidenceMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity();
    getProvince({ firstResult: 0, maxResults: 2000 });
    getPlacesAroundDormitory({
      //we should set 0 and 2000 as a default and  if showInActiveData: false dont pass recordStatus_EQ
      firstResult: 0,
      maxResults: 2000,
      showInActiveData: false,
    })
      .unwrap()
      .then(getPlacesAroundDormitorySuccess);

    if (url?.id) {
      getResidenceData({
        body: {
          _data_: {
            id: url?.id,
          },
        },
        params: {
          relation: "5f44b082bfb44d06a41bede67df07750", // we should set this for getting data
        },
      })
        .unwrap()
        .then(getResidenceDataSuccess);
    }
  }, [url?.id]);

  //* ================================ Util Functions ================================
  const getResidenceDataSuccess = async (value: GetResidenceDetailInfoResponse) => {
    if (value?.status === 200) {
      const placesDesc = value?.data?.AssociationPlacesAndDormitories?.map((item) => ({
        [`description${item?.AssociationCategoryPlaces?.id}`]: item?.description,
      }));

      form.setFieldsValue({
        residenceName: value?.data?.title,
        residenceType: selectDefaultValueGenerator(
          value?.data?.AssociationAccommodationType
        ),
        quality: selectDefaultValueGenerator(value?.data?.AssociationQuality),
        capacity: value?.data?.nominalCapacity,
        branch: selectDefaultValueGenerator(value?.data?.AssociationBranch),
        gender: selectDefaultValueGenerator(value?.data?.AssociationGender),
        area: value?.data?.sizeOfDormitory,
        greenSpaceArea: value?.data?.sizeOfGreenSpace,
        province: selectDefaultValueGenerator(
          value?.data?.AssociationRegion?.AssociationRegionType
        ),
        city: selectDefaultValueGenerator(value?.data?.AssociationRegion),
        postalCode: value?.data?.zipCode,
        phone: value?.data?.phoneNumber,
        address: value?.data?.address,
        description: value?.data?.description,
        status: selectDefaultValueGenerator(value?.data?.AssociationRecordStatus),
        ...placesDesc?.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
      });

      const provinceCode = value?.data?.AssociationRegion?.AssociationRegionType?.id;
      if (provinceCode) {
        await getCityList({
          parentId_IN: provinceCode,
          firstResult: 0,
          maxResults: 2000,
        }); //we should set 0 and 2000 to get data
        setActiveCity(false);
      }

      setSelectedRowKeys(
        value?.data?.AssociationPlacesAndDormitories?.map(
          (item) => item?.AssociationCategoryPlaces?.id
        )
      );

      setActiveCity(false);
      setLat(value?.data?.latitude);
      setLng(value?.data?.longitude);
    }
  };

  //نوع اقامتگاه
  const getResidenceTypeHandler = () =>
    fetchDataIfNeeded(
      !isResidenceTypeSuccess,
      () =>
        getResidenceType({ firstResult: 0, maxResults: 2000, showInActiveData: false }) //we should set 0 and 2000 as a default and  if showInActiveData: false dont pass recordStatus_EQ
    );

  // درجه کیفی
  const getQualityHandler = () => {
    if (!isQualitySuccess) {
      getQualityTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  // جنسیت
  const getGenderHandler = () => {
    if (!isGenderSuccess) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  const onProvinceChangeHandler = (provinceId: string) => {
    getCityList({ parentId_IN: +provinceId, firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    setActiveCity(false);
    form.setFieldsValue({ city: undefined });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const getPlacesAroundDormitorySuccess = (value: GetPlacesAroundDormitoryResponse) => {
    if (value?.status === 200) {
      setPlaceData(value?.data);
    }
  };

  const cancelBtnHandler = () => {
    navigate({
      pathname: DORM_LIST_PAGE_ROUTE,
    });
  };

  //create
  const openCreateModalHandler = () => {
    form
      .validateFields()
      .then(() => {
        setIsCreateConfirmModalOpen(true);
      })
      .catch((err) => {
        formScroller(form, err);

        toast.error(GENERAL_INPUTS_ERROR, {
          toastId: GENERAL_INPUTS_ERROR,
        });
      });
  };

  const closeCreateModalModalHandler = () => {
    setIsCreateConfirmModalOpen(false);
  };

  // update
  const openUpdateModalHandler = () => {
    form
      .validateFields()
      .then(() => {
        setIsUpdateConfirmModalOpen(true);
      })
      .catch((err) => {
        formScroller(form, err);

        toast.error(GENERAL_INPUTS_ERROR, {
          toastId: GENERAL_INPUTS_ERROR,
        });
      });
  };

  const closeUpdateModalModalHandler = () => {
    setIsUpdateConfirmModalOpen(false);
  };

  // inactive
  const openInactiveModalHandler = () => {
    setInactiveModalOpen(true);
  };

  const closeInactiveModalModalHandler = () => {
    setInactiveModalOpen(false);
  };

  const createResidenceHandler = () => {
    const places = selectedRowKeys?.map((item) => ({
      description: form.getFieldsValue(true)?.[`description${item}`],
      placesId: item,
    }));

    form.submit();
    form.validateFields().then((value) => {
      createResidence({
        form: "CreateDormitory",
        data: {
          title: value?.residenceName,
          branchId: value?.branch?.code,
          phoneNumber: value?.phone,
          description: value?.description,
          accommodationTypeId: value?.residenceType?.code,
          genderId: value?.gender?.code,
          sizeOfDormitory: value?.area,
          sizeOfGreenSpace: value?.greenSpaceArea,
          address: value?.address,
          qualityId: value?.quality?.code,
          regionId: value?.city?.code,
          latitude: lat?.toString(),
          longitude: lng?.toString(),
          nominalCapacity: value?.capacity,
          zipCode: value?.postalCode,
          AssociationPlacesAndDormitories: places,
          descriptionRequest: value?.modalDesc,
        },
      })
        .unwrap()
        .then(createResidenceSuccess)
        .catch(() => {
          closeCreateModalModalHandler();
          toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
        });
    });
  };

  const createResidenceSuccess = (value: ResidenceCreateResidenceResponse) => {
    if (value?.status === 204) {
      closeCreateModalModalHandler();

      form.resetFields();

      toast.success(CREATE_RESIDENCE_SUCCESS_MSG, {
        toastId: CREATE_RESIDENCE_SUCCESS_MSG,
      });

      navigate({
        pathname: DORM_LIST_PAGE_ROUTE,
      });
    }
  };

  const updateResidenceHandler = () => {
    const places = selectedRowKeys?.map((item) => ({
      description: form.getFieldsValue(true)?.[`description${item}`],
      placesId: item,
    }));

    form.submit();

    if (+url?.status === returnedStatus) {
      // وضیتهای عودت داده شده از رست ایجاد همراه با id  استفاده میکنیم.
      form.validateFields().then((value) => {
        createResidence({
          form: "CreateDormitory",
          data: {
            title: value?.residenceName,
            branchId: value?.branch?.code,
            phoneNumber: value?.phone,
            description: value?.description,
            accommodationTypeId: value?.residenceType?.code,
            genderId: value?.gender?.code,
            sizeOfDormitory: value?.area,
            sizeOfGreenSpace: value?.greenSpaceArea,
            address: value?.address,
            qualityId: value?.quality?.code,
            regionId: value?.city?.code,
            latitude: lat?.toString(),
            longitude: lng?.toString(),
            nominalCapacity: value?.capacity,
            zipCode: value?.postalCode,
            AssociationPlacesAndDormitories: places,
            descriptionRequest: value?.modalDesc,
            id: url?.id,
          },
        })
          .unwrap()
          .then(createResidenceSuccess)
          .catch(() => {
            closeCreateModalModalHandler();
            toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
          });
      });
    } else {
      form.validateFields().then((value) => {
        if (url?.id) {
          updateResidence({
            form: "ViewDetailsOfHostel",
            id: "96b76ab15cf64391b7bb70d5141773af",
            data: {
              title: value?.residenceName,
              branchId: value?.branch?.code,
              phoneNumber: value?.phone,
              description: value?.description,
              accommodationTypeId: value?.residenceType?.code,
              genderId: value?.gender?.code,
              sizeOfDormitory: value?.area,
              sizeOfGreenSpace: value?.greenSpaceArea,
              address: value?.address,
              qualityId: value?.quality?.code,
              regionId: value?.city?.code,
              latitude: lat,
              longitude: lng,
              nominalCapacity: value?.capacity,
              zipCode: value?.postalCode,
              AssociationPlacesAndDormitories: places,
              recordStatus: value?.status?.code,
              id: +url?.id,
            },
          })
            .unwrap()
            .then(updateResidenceSuccess)
            .catch(() => {
              closeCreateModalModalHandler();
              toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
            });
        }
      });
    }
  };

  const updateResidenceSuccess = async (value: ResidenceUpdateResidenceResponse) => {
    if (value?.status === 200) {
      closeUpdateModalModalHandler();

      toast.success(UPDATE_RESIDENCE_SUCCESS_MSG, {
        toastId: UPDATE_RESIDENCE_SUCCESS_MSG,
      });

      form.resetFields();

      navigate({
        pathname: DORM_LIST_PAGE_ROUTE,
      });
    }
  };

  const statusChangerHandler = (e: any) => {
    if (+e === dormRecordsStatus[2]?.id) {
      openInactiveModalHandler();
    }
  };

  const inactiveResidenceHandler = () => {
    inactiveForm.submit();
    inactiveForm.validateFields().then((value) => {
      inactiveResidence({
        form: "DisableDormitory",
        data: {
          id: url?.id,
          descriptionRequest: value?.inactiveDesc,
        },
      })
        .unwrap()
        .then(inactiveResidenceSuccess);
    });
  };

  const inactiveResidenceSuccess = async (value: ResidenceInactiveResidenceResponse) => {
    if (value?.status === 204) {
      closeInactiveModalModalHandler();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* CREATE CONFIRM MODAL */}
      {isCreateConfirmModalOpen && (
        <ConfirmationModalWithContent
          title="ایجاد اقامتگاه"
          isModalOpen={isCreateConfirmModalOpen}
          closeModalHandler={closeCreateModalModalHandler}
          onConfirmClickHandler={createResidenceHandler}
          isConfirmButtonLoading={isCreateResidenceLoading}
          confirmBtnText="ثبت درخواست"
          backBtnText="انصراف"
          content={<DormCreateModalContent form={form} />}
        />
      )}

      {/*  UPDATE CONFIRM MODAL */}
      {isUpdateConfirmModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت تغییرات"
          isModalOpen={isUpdateConfirmModalOpen}
          closeModalHandler={closeUpdateModalModalHandler}
          onConfirmClickHandler={updateResidenceHandler}
          isConfirmButtonLoading={isUpdateResidenceLoading}
          confirmBtnText="بله ثبت کن"
          backBtnText="انصراف"
          content={
            <p className="residence-update-confirm-modal-container">
              آیا از ثبت تغییرات اطمینان دارید؟
            </p>
          }
        />
      )}

      {/* INACTIVE STATUS MODAL  */}
      {isInactiveModalOpen && (
        <ConfirmationModalWithContent
          title="درخواست غیر فعال کردن خوابگاه"
          isModalOpen={isInactiveModalOpen}
          closeModalHandler={closeInactiveModalModalHandler}
          onConfirmClickHandler={inactiveResidenceHandler}
          isConfirmButtonLoading={isInactiveResidenceLoading}
          isDangerous
          confirmBtnText="ثبت درخواست"
          backBtnText="انصراف"
          content={<DormInactiveModalContent form={inactiveForm} />}
        />
      )}

      <Div
        className="dorm-create-modify-container"
        loading={url?.id ? isResidenceDataLoading : false}
      >
        <Form form={form} className="form-container">
          <CustomDivider
            text="اقامتگاه"
            extraContent={
              url?.id && residenceData?.data?.AssociationRecordStatus ? (
                <CustomSelect
                  name="status"
                  options={dormRecordsStatus}
                  form={form}
                  placeholder="انتخاب کنید"
                  className="select-divider"
                  onChange={statusChangerHandler}
                />
              ) : null
            }
            extraContentClassName="status-container"
          />
          <div>
            <Row gutter={[16, 16]}>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomInput
                  name="residenceName"
                  label="نام اقامتگاه"
                  placeholder="نام اقامتگاه"
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomSelect
                  name="residenceType"
                  label="نوع اقامتگاه"
                  form={form}
                  options={residenceTypeData?.data ? residenceTypeData?.data : []}
                  onClick={getResidenceTypeHandler}
                  loading={isResidenceTypeLoading}
                  placeholder="انتخاب کنید"
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomSelect
                  name="quality"
                  label="درجه کیفی"
                  placeholder="انتخاب کنید"
                  form={form}
                  options={qualityData ? qualityData?.data : []}
                  loading={isQualityDataLoading}
                  onClick={getQualityHandler}
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomInputNumber
                  name="capacity"
                  label="ظرفیت اسمی (نفر)"
                  placeholder="ظرفیت اسمی (نفر)"
                  rules={[REQUIRED_RULE, NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(4)]}
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomSelect
                  name="branch"
                  label="واحد"
                  placeholder="انتخاب کنید"
                  options={universityData ? universityData : []}
                  loading={isUniversityDataLoading}
                  form={form}
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              {!url?.id ? (
                <Col lg={6} md={8} sm={12} xs={24}>
                  <CustomSelect
                    name="gender"
                    label="جنسیت"
                    placeholder="انتخاب کنید"
                    form={form}
                    options={genderData?.data ? genderData?.data : []}
                    loading={isGenderDataLoading}
                    onClick={getGenderHandler}
                    rules={[REQUIRED_RULE]}
                  />
                </Col>
              ) : (
                <SingleVerticalWithCol
                  label="جنسیت"
                  value={residenceData?.data?.AssociationGender?.title}
                />
              )}

              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomInputNumber
                  name="area"
                  label="مساحت کل خوابگاه (متر مربع)"
                  placeholder="مساحت کل خوابگاه"
                  rules={[REQUIRED_RULE, NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomInputNumber
                  name="greenSpaceArea"
                  label="مساحت فضای سبز (متر مربع)"
                  placeholder="مساحت فضای سبز"
                  rules={[NUMBER_RULE, NUMBER_MAX_LENGTH_RULE(5)]}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomSelect
                  name="province"
                  label="استان"
                  options={getProvinceListData?.data ? getProvinceListData?.data : []}
                  placeholder="انتخاب کنید"
                  form={form}
                  isLoading={getProvinceListLoading}
                  onChange={(provinceId) => onProvinceChangeHandler(provinceId as string)}
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomSelect
                  name="city"
                  label="شهر"
                  options={getCityListData?.data ? getCityListData?.data : []}
                  placeholder="انتخاب کنید"
                  form={form}
                  isLoading={getCityListLoading}
                  rules={[REQUIRED_RULE]}
                  disabled={activeCity}
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomInput
                  name="postalCode"
                  label="کد پستی"
                  placeholder="کد پستی"
                  rules={[REQUIRED_RULE, POSTAL_CODE_RULE]}
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomInput
                  name="phone"
                  label="شماره تلفن"
                  placeholder="شماره تلفن"
                  rules={[REQUIRED_RULE, HOME_PHONE_RULE]}
                />
              </Col>
              <Col span={24}>
                <CustomInput
                  name="address"
                  label="آدرس"
                  placeholder="آدرس"
                  rules={[REQUIRED_RULE]}
                />
              </Col>
            </Row>
            <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
            <div>
              <CustomDivider text="اماکن اطراف خوابگاه" />
              <CustomTable
                dataSource={placeData}
                columns={ResidencePlacesAroundDormitoryTableModel()}
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                rowKey="id"
                loading={isPlacesAroundDormitoryLoading}
                pagination={paginationConfig}
                {...TABLE_PROPS(placeData?.length)}
              />
            </div>
            <Col span={24}>
              <CustomTextArea
                label="توضیحات اقامتگاه"
                name="description"
                placeholder="توضیحات"
                maxLength={100}
                showCount
              />
            </Col>
          </div>
        </Form>
        <div className="btn-container">
          <CustomButton onClick={cancelBtnHandler}>انصراف</CustomButton>
          <CustomButton
            htmlType="submit"
            type="primary"
            onClick={url?.id ? openUpdateModalHandler : openCreateModalHandler}
          >
            {url?.id ? "ثبت تغییرات" : "ثبت"}
          </CustomButton>
        </div>
      </Div>
    </>
  );
};

export default DormCreateAndModify;
