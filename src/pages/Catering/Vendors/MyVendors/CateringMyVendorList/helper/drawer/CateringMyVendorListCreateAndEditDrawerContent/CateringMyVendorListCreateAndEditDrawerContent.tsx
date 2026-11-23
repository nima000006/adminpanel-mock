import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetBasicInfoProvinceAndCityQuery } from "@infra/states/redux/Apis/basicInformation/basicInformationApis";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useCreateMyVendorMutation,
  useGetMyVendorViewQuery,
  useUpdateMyVendorMutation,
} from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import {
  IBAN_WITHOUT_IR_RULE,
  LEGAL_CODE_RULE,
  NATIONAL_CODE_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { GENERAL_SUBMIT_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CreateMyVendorRequest,
  GetMyVendorViewResponse,
  UpdateMyVendorRequest,
} from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

import {
  CateringMyVendorListCreateAndEditDrawerContentFormType,
  CateringMyVendorListCreateAndEditDrawerContentProps,
} from "./@types/@cateringMyVendorListCreateAndEditDrawerContent";

const IRAN_COUNTRY_CODE = 103; // Iran country code for province list
const DEFAULT_LAT = 35.699739; // default map latitude (Tehran)
const DEFAULT_LNG = 51.338097; // default map longitude (Tehran)
const ACTIVE_VENDOR_STATUS_TYPE = "0"; // active vendor status
const UPDATE_VENDOR_SUCCESS_MSG = "تأمین کننده با موفقیت ویرایش شد.";

const CateringMyVendorListCreateAndEditDrawerContent = ({
  onCloseDrawer,
  onSuccess,
  mode = "create",
  vendorId,
}: CateringMyVendorListCreateAndEditDrawerContentProps) => {
  const isEditMode = mode === "edit";

  const [isProvinceSelected, setIsProvinceSelected] = useState(false);
  const [provinceList, setProvinceList] = useState<IdTitle[]>([]);
  const [cityList, setCityList] = useState<IdTitle[]>([]);
  const [rerenderTrigger, setRerenderTrigger] = useState(0);
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);
  const [modifiedDate, setModifiedDate] = useState<string | undefined>();
  const [parentVendorId, setParentVendorId] = useState<number | undefined>();
  const [statusType, setStatusType] = useState(ACTIVE_VENDOR_STATUS_TYPE);
  const [logoName, setLogoName] = useState<string | undefined>();
  const [coverName, setCoverName] = useState<string | undefined>();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [form] = Form.useForm<CateringMyVendorListCreateAndEditDrawerContentFormType>();

  //? ================================  Api Calls ================================
  const { data: vendorViewData, isFetching: isGetMyVendorViewLoading } =
    useGetMyVendorViewQuery(
      { id: Number(vendorId) },
      { skip: !isEditMode || !vendorId, refetchOnMountOrArgChange: true }
    );

  const [createMyVendor, { isLoading: isCreateMyVendorLoading }] =
    useCreateMyVendorMutation();

  const [updateMyVendor, { isLoading: isUpdateMyVendorLoading }] =
    useUpdateMyVendorMutation();

  const [
    getAllBranches,
    {
      data: branchesData,
      isLoading: isBranchesDataLoading,
      isSuccess: isBranchesSuccess,
    },
  ] = useLazyGetBranchByBusinessQuery();

  const [
    getProvinceData,
    { isFetching: isProvinceListLoading, isSuccess: isProvinceSuccess },
  ] = useLazyGetBasicInfoProvinceAndCityQuery();

  const [getCityData, { isFetching: isCityListLoading }] =
    useLazyGetBasicInfoProvinceAndCityQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    setRerenderTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isEditMode && vendorViewData) {
      populateFormFromDetail(vendorViewData);
    }
  }, [isEditMode, vendorViewData]);

  //* ================================ Util Functions ================================
  const getBranchesHandler = () => {
    if (!isBranchesSuccess) {
      getAllBranches({ businessIds: [4] }); //cto told
    }
  };

  const getProvinceHandler = () => {
    if (isProvinceSuccess) return;

    getProvinceData(IRAN_COUNTRY_CODE)
      .unwrap()
      .then((value) => {
        setProvinceList(
          value?.map((item) => ({
            id: item?.id,
            title: item?.name,
          })) ?? []
        );
      });
  };

  const getCityListHandler = (provinceId: number) => {
    getCityData(provinceId)
      .unwrap()
      .then((value) => {
        setCityList(
          value?.map((item) => ({
            id: item?.id,
            title: item?.name,
          })) ?? []
        );
      });
  };

  const onProvinceChangeHandler = (event: unknown) => {
    const provinceId = Number(event);
    if (provinceId) {
      getCityListHandler(provinceId);
    }
    setIsProvinceSelected(true);
    form.setFieldValue("city", undefined);
  };

  const populateFormFromDetail = (data: GetMyVendorViewResponse) => {
    setLat(data?.latitude ?? DEFAULT_LAT);
    setLng(data?.longitude ?? DEFAULT_LNG);
    setModifiedDate(data?.modifiedDate);
    setParentVendorId(data?.parentVendor?.id);
    setStatusType(
      data?.statusType?.id != null
        ? String(data.statusType.id)
        : ACTIVE_VENDOR_STATUS_TYPE
    );
    setLogoName(data?.logoName);
    setCoverName(data?.coverName);

    getBranchesHandler();
    getProvinceHandler();

    if (data?.provinceId) {
      setIsProvinceSelected(true);
      getCityListHandler(data.provinceId);
    }

    form.setFieldsValue({
      title: data?.title,
      nationalNom: data?.nationalNom,
      economicNom: data?.economicNom,
      iban: data?.iban,
      managerFirstName: data?.managerFirstName,
      managerLastName: data?.managerLastName,
      managerUserName: data?.managerUserName,
      managerMobile: data?.managerMobile,
      branches: selectDefaultValueGenerator(
        data?.branches?.map((item) => ({
          id: item?.branchCode,
          title: item?.branchName,
        }))
      ),
      description: data?.description,
      province: selectDefaultValueGenerator({
        id: data?.provinceId,
        title: data?.provinceTitle,
      }),
      city: selectDefaultValueGenerator({
        id: data?.cityId,
        title: data?.cityTitle,
      }),
      postalCode: data?.postalCode,
      phone1: data?.phone1,
      phone2: data?.phone2,
      address: data?.address,
    });

    setRerenderTrigger((prev) => prev + 1);
  };

  const onCreateMyVendorSuccess = () => {
    toast.success(GENERAL_SUBMIT_SUCCESS, {
      toastId: GENERAL_SUBMIT_SUCCESS,
    });
    form.resetFields();
    onCloseDrawer();
    onSuccess();
  };

  const onUpdateMyVendorSuccess = () => {
    toast.success(UPDATE_VENDOR_SUCCESS_MSG, {
      toastId: UPDATE_VENDOR_SUCCESS_MSG,
    });
    setIsUpdateModalOpen(false);
    onCloseDrawer();
    onSuccess();
  };

  const openUpdateModalHandler = () => {
    form.validateFields().then(() => {
      setIsUpdateModalOpen(true);
    });
  };

  const closeUpdateModalHandler = () => {
    setIsUpdateModalOpen(false);
  };

  const onSubmitHandler = () => {
    form
      .validateFields()
      .then((value: CateringMyVendorListCreateAndEditDrawerContentFormType) => {
        const sharedRequest = {
          title: value.title,
          nationalNom: value.nationalNom,
          economicNom: value.economicNom,
          iban: value.iban,
          branches: value.branches?.map((item) => item.code) ?? [],
          managerFirstName: value.managerFirstName,
          managerLastName: value.managerLastName,
          managerUserName: value.managerUserName,
          managerMobile: value.managerMobile,
          description: value.description,
          phone1: value.phone1,
          phone2: value.phone2,
          address: value.address,
          postalCode: value.postalCode,
          cityId: value.city.code,
          latitude: lat,
          longitude: lng,
          statusType: isEditMode ? statusType : ACTIVE_VENDOR_STATUS_TYPE,
          ...(logoName && { logoName }),
          ...(coverName && { coverName }),
        };

        if (isEditMode) {
          if (!vendorId) return;

          const request: UpdateMyVendorRequest = {
            ...sharedRequest,
            id: vendorId,
            parentVendorId,
            modifiedDate,
          };

          updateMyVendor(request)
            .unwrap()
            .then(onUpdateMyVendorSuccess)
            .catch(() => {
              setIsUpdateModalOpen(false);
            });
          return;
        }

        const request: CreateMyVendorRequest = sharedRequest;
        createMyVendor(request).unwrap().then(onCreateMyVendorSuccess);
      });
  };

  const isSubmitLoading = isCreateMyVendorLoading || isUpdateMyVendorLoading;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isUpdateModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت تغییرات"
          isModalOpen={isUpdateModalOpen}
          confirmBtnText="ثبت تغییرات"
          backBtnText="انصراف"
          closeModalHandler={closeUpdateModalHandler}
          onConfirmClickHandler={onSubmitHandler}
          isConfirmButtonLoading={isUpdateMyVendorLoading}
          content={<p>آیا از ثبت تغییرات اطمینان دارید؟</p>}
        />
      )}
      <Form className="[&_.custom-select-container]:m-0" form={form}>
        <CustomDrawerHeader
          title={isEditMode ? "ویرایش تأمین کننده" : "تعریف تأمین کننده جدید"}
          closeDrawerHandler={onCloseDrawer}
          leftSideContent={
            <div className="flex items-center gap-2">
              <CustomButton onClick={onCloseDrawer}>انصراف</CustomButton>
              <CustomButton
                type="primary"
                onClick={isEditMode ? openUpdateModalHandler : onSubmitHandler}
                loading={!isEditMode && isSubmitLoading}
              >
                {isEditMode ? "ویرایش" : "ثبت"}
              </CustomButton>
            </div>
          }
        />
        <Div loading={isEditMode && isGetMyVendorViewLoading}>
          <Row gutter={[16, 16]}>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="عنوان"
                name="title"
                placeholder="عنوان"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="شماره ملی حقوقی"
                name="nationalNom"
                placeholder="شماره ملی حقوقی"
                extra="۱۱ رقمی"
                rules={[REQUIRED_RULE, LEGAL_CODE_RULE]}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="کد اقتصادی"
                name="economicNom"
                placeholder="کد اقتصادی"
                extra="۱۲ رقمی"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="شماره شبا"
                name="iban"
                placeholder="شماره شبا بدون IR"
                extra="۲۴ رقمی"
                rules={[REQUIRED_RULE, IBAN_WITHOUT_IR_RULE]}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="نام رابط"
                name="managerFirstName"
                placeholder="نام رابط"
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="نام خانوادگی رابط"
                name="managerLastName"
                placeholder="نام خانوادگی رابط"
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="کد ملی رابط"
                name="managerUserName"
                placeholder="کد ملی رابط"
                extra="۱۰ رقمی"
                rules={[NATIONAL_CODE_RULE]}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="شماره تلفن رابط"
                name="managerMobile"
                placeholder="شماره تلفن رابط"
                extra="مثال: ۰۲۱۱۲۳۴۵۶۷۸۹"
              />
            </Col>
            <Col span={24}>
              <CustomSelect
                label="شعبه / واحد"
                name="branches"
                placeholder="انتخاب کنید"
                options={branchesData ?? []}
                isLoading={isBranchesDataLoading}
                form={form}
                rules={[REQUIRED_RULE]}
                mode="multiple"
                onClick={getBranchesHandler}
                notFoundContent={!isBranchesSuccess ? selectNotFoundContent : undefined}
              />
            </Col>
            <Col span={24}>
              <CustomTextArea
                label="توضیحات تأمین کننده"
                name="description"
                placeholder="توضیحات تأمین کننده"
                showCount
              />
            </Col>
          </Row>
          <div className="mt-3">
            <CustomDivider text="اطلاعات تماس" />
          </div>
          <Row gutter={[16, 16]}>
            <Col lg={8} sm={12} xs={24}>
              <CustomSelect
                name="province"
                label="استان"
                options={provinceList}
                placeholder="انتخاب کنید"
                form={form}
                isLoading={isProvinceListLoading}
                onClick={getProvinceHandler}
                onChange={onProvinceChangeHandler}
                rules={[REQUIRED_RULE]}
                notFoundContent={!isProvinceSuccess ? selectNotFoundContent : undefined}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomSelect
                name="city"
                label="شهر"
                options={cityList}
                placeholder="انتخاب کنید"
                form={form}
                isLoading={isCityListLoading}
                rules={[REQUIRED_RULE]}
                disabled={!isProvinceSelected}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="کد پستی"
                name="postalCode"
                placeholder="کد پستی"
                extra="۱۰ رقمی"
                rules={[REQUIRED_RULE, POSTAL_CODE_RULE]}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="شماره تلفن ۱"
                name="phone1"
                placeholder="شماره تلفن"
                extra="مثال: ۰۲۱۱۲۳۴۵۶۷۸۹"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="شماره تلفن ۲"
                name="phone2"
                placeholder="شماره تلفن"
                extra="مثال: ۰۲۱۱۲۳۴۵۶۷۸۹"
              />
            </Col>
            <Col span={24}>
              <CustomInput
                type="text"
                label="آدرس"
                name="address"
                placeholder="آدرس"
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>
          <div className="mt-6 mb-2 text-right">موقعیت را روی نقشه مشخص کنید.</div>
          <CustomMap
            className="mt-2"
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            triggerRerender={rerenderTrigger}
          />
        </Div>
      </Form>
    </>
  );
};

export default CateringMyVendorListCreateAndEditDrawerContent;
