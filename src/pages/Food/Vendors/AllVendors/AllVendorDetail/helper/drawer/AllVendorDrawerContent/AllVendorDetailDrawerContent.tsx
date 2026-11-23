import { useCallback, useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomMap from "@components/CustomInputs/CustomMap/CustomMap";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  isImageFormatValid,
  isImageSizeValid,
  selectDefaultValueGenerator,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import {
  useFoodUploadFileMutation,
  useGetProvinceQuery,
  useLazyGetCityQuery,
} from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useEditAllVendorMutation } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import {
  LEGAL_CODE_RULE,
  LENGTH_RULE,
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  GENERAL_UPDATE_SUCCESS_MSG,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  CityType,
  GetCityResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import {
  AllVendorOnUploadFileSuccess,
  EditAllVendorResponse,
  FormDataTypes,
  VendorDetailDrawerContentProps,
} from "./@types/@allVendorDrawerContent";
import "./_allVendorDetailDrawerContent.scss";

const AllVendorDetailDrawerContent = ({
  getDataHandle,
  isDrawerOpen,
  closeDrawerHandler,
  setIsDrawerOpen,
  detailFirstTabData,
}: VendorDetailDrawerContentProps) => {
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);
  const [logoList, setLogoList] = useState<UploadFile[]>([]);
  const [rerenderTrigger, setRerenderTrigger] = useState<number>(0);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(detailFirstTabData?.active);
  const [activeCity, setActiveCity] = useState(true);
  const [logoName, setLogoName] = useState("");
  const [coverName, setCoverName] = useState("");
  const [cityList, setCityList] = useState<CityType[]>([]);
  const [form] = Form.useForm<FormDataTypes>();

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const { data: getProvinceListData, isFetching: getProvinceListLoading } =
    useGetProvinceQuery();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  const [getCityList, { isFetching: getCityListLoading }] = useLazyGetCityQuery();

  // send data
  const [sendDrawerData, { isLoading: sendDataLoading }] = useEditAllVendorMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    setRerenderTrigger((prev) => prev + 1);
  }, [closeDrawerHandler]);

  useEffect(() => {
    if (detailFirstTabData) {
      setLat(detailFirstTabData?.latitude);
      setLng(detailFirstTabData?.longitude);
      form.setFieldsValue({
        vendorTitle: detailFirstTabData?.title,
        legalCode: detailFirstTabData?.nationalNom,
        economicCode: detailFirstTabData?.economicNom,
        number: detailFirstTabData?.iban,
        interfaceName: detailFirstTabData?.managerFirstName,
        interfaceLastName: detailFirstTabData?.managerLastName,
        nationalCode: detailFirstTabData?.managerUserName,
        phoneNumber: detailFirstTabData?.managerMobile,
        universityUnit: selectDefaultValueGenerator(
          detailFirstTabData?.branches?.map((item) => ({
            title: item?.branchName,
            id: item?.branchCode,
          }))
        ),
        desc: detailFirstTabData?.description,
        province: selectDefaultValueGenerator({
          title: detailFirstTabData?.stateName,
          id: detailFirstTabData?.stateId,
        }),
        city: selectDefaultValueGenerator({
          title: detailFirstTabData?.provinceName,
          id: detailFirstTabData?.provinceId,
        }),
        postalCode: detailFirstTabData?.postalCode,
        phonOne: detailFirstTabData?.phone1,
        phoneTwo: detailFirstTabData?.phone2,
        address: detailFirstTabData?.address,
        activeMode: detailFirstTabData?.active,
      });
      getCityList({ stateId: detailFirstTabData?.stateId?.toString() })
        .unwrap()
        .then(getCityListSuccess);
      setActiveCity(false);
      if (detailFirstTabData?.logoName) {
        setLogoList([
          {
            uid: detailFirstTabData?.logoName,
            name: detailFirstTabData?.logoName,
            status: "done",
            url: detailFirstTabData?.logoName,
          },
        ]);
      }
      if (detailFirstTabData?.coverName) {
        setBannerFileList([
          {
            uid: detailFirstTabData?.coverName,
            name: detailFirstTabData?.coverName,
            status: "done",
            url: detailFirstTabData?.coverName,
          },
        ]);
      }
      setLogoName(detailFirstTabData?.logoTitle ? detailFirstTabData?.logoTitle : "");
      setCoverName(detailFirstTabData?.coverTitle ? detailFirstTabData?.coverTitle : "");
      getAllUniversity();
    }
  }, [detailFirstTabData?.id]);

  //* ================================ Util Functions ================================
  const getCityListSuccess = async (value: GetCityResponse) => {
    if (value?.status === 200) {
      setCityList(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const onEditAllVendorSuccess = async (data: EditAllVendorResponse) => {
    if (data?.status === 200) {
      getDataHandle();
      setIsUpdateModalOpen(false);
      setIsDrawerOpen(false);
      form.resetFields();
      toast.success(GENERAL_UPDATE_SUCCESS_MSG, { toastId: GENERAL_UPDATE_SUCCESS_MSG });
    }
  };
  // fail
  const onEditAllVendorFail = () => {
    setIsUpdateModalOpen(false);
  };

  // register form
  const onSubmitHandler = () => {
    form.submit();
    form.validateFields().then((value: FormDataTypes) => {
      sendDrawerData({
        title: value?.vendorTitle,
        nationalNom: value?.legalCode,
        economicNom: value?.economicCode,
        iban: value?.number,
        branches: value?.universityUnit?.map((item) => item?.code),
        managerFirstName: value?.interfaceName,
        managerLastName: value?.interfaceLastName,
        managerUserName: +value?.nationalCode,
        managerMobile: value?.phoneNumber,
        description: value?.desc,
        provinceId: value?.city?.code,
        postalCode: value?.postalCode,
        phone1: value?.phonOne,
        phone2: value?.phoneTwo,
        address: value?.address,
        latitude: lat,
        longitude: lng,
        active: isActive ? true : false,
        id: +id,
        coverName: coverName ? coverName : null,
        logoName: logoName ? logoName : null,
      })
        .unwrap()
        .then(onEditAllVendorSuccess)
        .catch(onEditAllVendorFail);
    });
  };

  const onProvinceChangeHandler = (event: unknown) => {
    getCityList({ stateId: event as string })
      .unwrap()
      .then(getCityListSuccess);
    setActiveCity(false);
    form.setFieldsValue({ city: undefined });
  };

  // modal handler
  const openUpdateModalHandler = useCallback(() => {
    form.validateFields().then(() => setIsUpdateModalOpen(true));
  }, []);

  const closeUpdateModalHandler = useCallback(() => {
    setIsUpdateModalOpen(false);
  }, []);

  const openDeleteModalHandler = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModalHandler = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  // onUploadFileSuccess
  const onUploadFileSuccess = ({
    imageSetter,
    response,
  }: AllVendorOnUploadFileSuccess) => {
    if (response?.status === 200) {
      imageSetter(response?.data);
    }
  };

  // onUploadFileChange
  if (!isDrawerOpen) return;

  // onUploadFileChange
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    imageSetter: React.Dispatch<React.SetStateAction<string>>,
    imageSetterList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
  ) => {
    const formData = new FormData();
    formData.append("file", image?.file as any);

    const isFileFormatCorrect = isImageFormatValid({ fileFormat: image?.file?.type });
    if (!isFileFormatCorrect) {
      return toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
    }

    const isUploadable = isImageSizeValid({ fileSize: image?.file?.size });
    if (!isUploadable) {
      return toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
    }

    uploadFile(formData)
      .unwrap()
      .then((response) => onUploadFileSuccess({ response, imageSetter }))
      .catch(() => {
        imageSetterList([]);
        imageSetter("");
      });
  };

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
          isConfirmButtonLoading={sendDataLoading}
          content={
            <div className="all-vendors-detail-modal-container">
              <p className="desc">آیا از ثبت تغییرات اطمینان دارید؟</p>
            </div>
          }
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmationModalWithContent
          title="حذف"
          isModalOpen={isDeleteModalOpen}
          confirmBtnText="حذف"
          backBtnText="انصراف"
          closeModalHandler={closeDeleteModalHandler}
          onConfirmClickHandler={() => {}}
          isDangerous={true}
          content={
            <div className="all-vendors-detail-modal-container">
              <p className="desc">آیا از حذف این آیتم اطمینان دارید؟</p>
            </div>
          }
        />
      )}
      <Form className="vendor-detail-drawer-content-container" form={form}>
        <CustomDrawerHeader
          title="ویرایش تأمین کننده"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <>
              <CustomSwitch
                className="switch"
                defaultChecked={isActive}
                checkedChildren="فعال"
                unCheckedChildren="غیرفعال"
                valuePropName="activeMode"
                onChange={() => setIsActive((prev) => !prev)}
              />
              <CustomButton
                type="primary"
                danger
                onClick={openDeleteModalHandler}
                className="drawer-action-btn"
                disabled
              >
                حذف
              </CustomButton>
              <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
                انصراف
              </CustomButton>
              <CustomButton
                type="primary"
                onClick={openUpdateModalHandler}
                className="drawer-action-btn"
              >
                ثبت
              </CustomButton>
            </>
          }
        />
        <div className="vendor-detail-drawer-content-wrapper">
          <div className="vendor-information-container">
            <div className="uploader-container">
              <CustomUploader
                fileList={logoList}
                setFileList={setLogoList}
                isReadOnly={false}
                uploaderText={
                  <div className="all-vendor-drawer-upload-text-container">
                    <div className="upload-text">لوگو</div>
                    <div className="upload-logo">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={logoList?.length >= 1}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="logo"
                imageSetter={setLogoName}
                onChange={(e: any) => onUploadFileChange(e, setLogoName, setLogoList)}
              />
              <CustomUploader
                fileList={bannerFileList}
                setFileList={setBannerFileList}
                uploaderText={
                  <div className="all-vendor-drawer-upload-text-container">
                    <div className="upload-text">بنر</div>
                    <div className="upload-logo">
                      <AiOutlinePlus />
                    </div>
                  </div>
                }
                hasUploaderIcon={false}
                isReadOnly={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={bannerFileList?.length >= 1}
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                }}
                validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                name="cover"
                imageSetter={setCoverName}
                onChange={(e: any) =>
                  onUploadFileChange(e, setCoverName, setBannerFileList)
                }
              />
            </div>
            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="عنوان"
                  name="vendorTitle"
                  rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="شماره ملی حقوقی"
                  name="legalCode"
                  rules={[REQUIRED_RULE, NUMBER_RULE, LEGAL_CODE_RULE]}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="کد اقتصادی"
                  name="economicCode"
                  rules={[REQUIRED_RULE, NUMBER_RULE, LENGTH_RULE(12)]}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="شماره شبا"
                  name="number"
                  rules={[REQUIRED_RULE, NUMBER_RULE, LENGTH_RULE(24)]}
                />
              </Col>

              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="نام رابط"
                  name="interfaceName"
                  rules={[MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="نام خانوادگی رابط"
                  name="interfaceLastName"
                  rules={[MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="کد ملی رابط"
                  name="nationalCode"
                  rules={[NUMBER_RULE, LENGTH_RULE(10)]}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="شماره تلفن رابط"
                  name="phoneNumber"
                  rules={[NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
                />
              </Col>
              <Col span={24}>
                <CustomSelect
                  label="واحدهای دانشگاهی"
                  name="universityUnit"
                  placeholder="انتخاب کنید"
                  options={universityData ? universityData : []}
                  loading={isUniversityDataLoading}
                  form={form}
                  rules={[REQUIRED_RULE]}
                  mode="multiple"
                />
              </Col>
              <Col span={24}>
                <CustomTextArea
                  label="توضیحات تامین کننده"
                  name="desc"
                  rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
                  showCount
                  maxLength={500}
                />
              </Col>
            </Row>
          </div>
          <div className="contact-information-container">
            <CustomDivider text="اطلاعات تماس" />
            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomSelect
                  label="استان"
                  name="province"
                  options={getProvinceListData?.data ? getProvinceListData?.data : []}
                  form={form}
                  onChange={onProvinceChangeHandler}
                  rules={[REQUIRED_RULE]}
                  isLoading={getProvinceListLoading}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomSelect
                  label="شهر"
                  name="city"
                  options={cityList}
                  form={form}
                  rules={[REQUIRED_RULE]}
                  isLoading={getCityListLoading}
                  disabled={activeCity}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="کد پستی"
                  name="postalCode"
                  rules={[REQUIRED_RULE, NUMBER_RULE, POSTAL_CODE_RULE]}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="شماره تلفن 1"
                  name="phonOne"
                  rules={[
                    REQUIRED_RULE,
                    NUMBER_RULE,
                    MIN_LENGTH_RULE(4),
                    MAX_LENGTH_RULE(16),
                  ]}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="شماره تلفن 2"
                  name="phoneTwo"
                  rules={[NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
                />
              </Col>
              <Col span={24}>
                <CustomInput
                  type="text"
                  label="آدرس"
                  name="address"
                  rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(500)]}
                />
              </Col>
            </Row>
            <CustomMap
              lat={lat}
              lng={lng}
              setLat={setLat}
              setLng={setLng}
              triggerRerender={rerenderTrigger}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default AllVendorDetailDrawerContent;
