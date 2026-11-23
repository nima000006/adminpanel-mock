import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";
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
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { makeSearchParams, selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useLazyGetDormGenderTypesQuery,
  useLazyGetDormQualityTypesQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useLazyGetDormCityListQuery,
  useLazyGetDormProvinceListQuery,
  useLazyGetPlacesAroundDormitoryQuery,
  useLazyGetResidenceTypeQuery,
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
  GENERAL_INPUTS_ERROR,
  GENERAL_REQUEST_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  GetPlacesAroundDormitoryResponse,
  PlacesAroundDormitoryType,
  ResidenceUpdateResidenceResponse,
} from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

import { ResidenceReturnedDetailProps } from "./@types/@residenceReturnedDetail";
import CreateResidenceModalContent from "../../modals/CreateResidenceModalContent/CreateResidenceModalContent";
import ResidenceReturnedDetailTableModel from "../../models/ResidenceReturnedDetailTableModel/ResidenceReturnedDetailTableModel";
import "./_residenceReturnedDetail.scss";

const ResidenceReturnedDetail = ({
  lat,
  lng,
  setLng,
  setLat,
  form,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
  residenceData,
  getData,
}: ResidenceReturnedDetailProps) => {
  const [activeCity, setActiveCity] = useState(true);
  const [placeData, setPlaceData] = useState<PlacesAroundDormitoryType[]>([]);
  const [registerModalOpen, setIsRegisterModalOpen] = useState({ isOpen: false, id: -1 });
  const {
    params: { id },
  } = useQueryParams();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [updateResidence, { isLoading: isUpdateResidenceLoading }] =
    useResidenceUpdateResidenceMutation();

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

  const [
    getAllUniversity,
    {
      data: universityData,
      isLoading: isUniversityDataLoading,
      isSuccess: isUniversitySuccess,
    },
  ] = useLazyGetAllBranchesQuery();

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

  //? ================================ Effects ================================
  useEffect(() => {
    getProvince({ firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    getPlacesAroundDormitory({
      //we should set 0 and 2000 as a default and  if showInActiveData: false dont pass recordStatus_EQ
      firstResult: 0,
      maxResults: 2000,
      showInActiveData: false,
    })
      .unwrap()
      .then(getPlacesAroundDormitorySuccess);
  }, []);

  useEffect(() => {
    // residence detail
    if (id) {
      getData();

      form.setFieldsValue({
        residenceName: residenceData?.title,
        residenceType: selectDefaultValueGenerator({
          id: residenceData?.AssociationAccommodationType?.id,
          title: residenceData?.AssociationAccommodationType?.title,
        }),
        quality: selectDefaultValueGenerator({
          id: residenceData?.AssociationQuality?.id,
          title: residenceData?.AssociationQuality?.title,
        }),
        capacity: residenceData?.nominalCapacity,
        branch: selectDefaultValueGenerator({
          id: residenceData?.AssociationBranch?.id,
          title: residenceData?.AssociationBranch?.title,
        }),
        gender: selectDefaultValueGenerator({
          id: residenceData?.AssociationGender?.id,
          title: residenceData?.AssociationGender?.title,
        }),
        area: residenceData?.sizeOfDormitory,
        greenSpaceArea: residenceData?.sizeOfGreenSpace,
        province: selectDefaultValueGenerator({
          id: residenceData?.AssociationRegion?.AssociationRegionType?.id,
          title: residenceData?.AssociationRegion?.AssociationRegionType?.title,
        }),
        city: selectDefaultValueGenerator({
          id: residenceData?.AssociationRegion?.id,
          title: residenceData?.AssociationRegion?.title,
        }),
        postalCode: residenceData?.zipCode,
        phone: residenceData?.phoneNumber,
        address: residenceData?.address,
        description: residenceData?.description,
      });
    }
  }, [id]);

  //* ================================ Util Functions ================================

  //نوع اقامتگاه
  const getResidenceTypeHandler = () => {
    if (!isResidenceTypeSuccess) {
      getResidenceType({ firstResult: 0, maxResults: 2000, showInActiveData: false }); //we should set 0 and 2000 as a default and  if showInActiveData: false dont pass recordStatus_EQ
    }
  };

  //درجه کیفی
  const getQualityHandler = () => {
    if (!isQualitySuccess) {
      getQualityTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  //جنسیت
  const getGenderHandler = () => {
    if (!isGenderSuccess) {
      getGenderTypes({
        maxResults: 2000,
        firstResult: 0,
        recordStatus_EQ: "1",
      });
    }
  };

  //واحد
  const getBranchHandler = () => {
    if (!isUniversitySuccess) {
      getAllUniversity();
    }
  };

  //استان
  const onProvinceChangeHandler = (provinceId: string) => {
    getCityList({ parentId_IN: +provinceId, firstResult: 0, maxResults: 2000 }); //we should set 0 and 2000 to get data
    setActiveCity(false);
    form.setFieldsValue({
      city: undefined,
    });
  };

  const getPlacesAroundDormitorySuccess = (value: GetPlacesAroundDormitoryResponse) => {
    if (value?.status === 200) {
      setPlaceData(value?.data);
    }
  };

  // modal handler
  const updateResidenceHandler = () => {
    form
      .validateFields()
      .then(() => {
        setIsRegisterModalOpen({ isOpen: true, id: -1 });
      })
      .catch((err) => {
        if (err?.errorFields?.length > 0) {
          form.scrollToField(err.errorFields[0].name);
        }
        toast.error(GENERAL_INPUTS_ERROR, {
          toastId: GENERAL_INPUTS_ERROR,
        });
      });
  };
  const closeConfirmationModalHandler = () => {
    setIsRegisterModalOpen({ isOpen: false, id: -1 });
  };

  // update
  const submitConfirmationModalHandler = () => {
    const places = selectedRowKeys?.map((item) => ({
      description: form.getFieldsValue(true)?.[`description${item}`],
      placesId: item,
    }));

    form.submit();
    form.validateFields().then((value) => {
      if (residenceData?.id) {
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
            id: residenceData?.id,
            descriptionRequest: form?.getFieldValue("desc"),
          },
        })
          .unwrap()
          .then(updateResidenceSuccess);
      }
    });
  };

  const updateResidenceSuccess = async (value: ResidenceUpdateResidenceResponse) => {
    if (value?.status === 200) {
      closeConfirmationModalHandler();
      toast.success(GENERAL_REQUEST_SUCCESS, { toastId: GENERAL_REQUEST_SUCCESS });
      form.resetFields();
      navigate({
        pathname: DORM_LIST_PAGE_ROUTE,
        search: makeSearchParams({
          id,
          tab: "2",
        }),
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <ConfirmationModalWithContent
        title="ایجاد اقامتگاه"
        isModalOpen={registerModalOpen?.isOpen}
        isConfirmButtonLoading={isUpdateResidenceLoading}
        confirmBtnText="ثبت درخواست"
        backBtnText="انصراف"
        closeModalHandler={closeConfirmationModalHandler}
        onConfirmClickHandler={submitConfirmationModalHandler}
        content={<CreateResidenceModalContent form={form} />}
      />

      <Div loading={loading} className="residence-returned-details-container">
        <CustomDivider text="اقامتگاه" />
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInput
                type="text"
                label="نام اقامتگاه"
                name="residenceName"
                placeholder="نام اقامتگاه"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
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
            <Col lg={6} md={12} sm={24} xs={24}>
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
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInput
                type="text"
                label="ظرفیت اسمی (نفر)"
                name="capacity"
                placeholder="ظرفیت اسمی (نفر)"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomSelect
                name="branch"
                label="واحد"
                placeholder="انتخاب کنید"
                options={universityData ? universityData : []}
                loading={isUniversityDataLoading}
                form={form}
                onClick={getBranchHandler}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
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
            <Col lg={6} md={12} sm={24} xs={24}>
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
            <Col lg={6} md={12} sm={24} xs={24}>
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
            <Col lg={6} md={12} sm={24} xs={24}>
              <CustomInput
                name="postalCode"
                label="کد پستی"
                placeholder="کد پستی"
                rules={[REQUIRED_RULE, POSTAL_CODE_RULE]}
              />
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
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
              columns={ResidenceReturnedDetailTableModel()}
              loading={isPlacesAroundDormitoryLoading}
              rowSelection={{
                selectedRowKeys,
                onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
              }}
              rowKey="id"
              pagination={paginationConfig}
              {...TABLE_PROPS(placeData?.length)}
            />
          </div>
          <Row>
            <Col span={24}>
              <CustomTextArea
                label="توضیحات اقامتگاه"
                name="description"
                placeholder="توضیحات"
                maxLength={100}
                showCount
              />
            </Col>
          </Row>
        </Form>
        <div className="btn-container">
          <CustomButton type="primary" onClick={updateResidenceHandler}>
            ثبت تغییرات
          </CustomButton>
        </div>
      </Div>
    </>
  );
};
export default ResidenceReturnedDetail;
