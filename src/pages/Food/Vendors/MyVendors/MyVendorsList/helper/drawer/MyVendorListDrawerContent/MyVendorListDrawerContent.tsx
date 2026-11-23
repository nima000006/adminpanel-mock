import { useEffect, useState } from "react";

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
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useFoodUploadFileMutation,
  useGetProvinceQuery,
  useLazyGetCityQuery,
} from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useCreateMyVendorMutation } from "@infra/states/redux/Apis/food/vendor/vendorApi";
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
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  CityType,
  GetCityResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";
import { CreateMyVendorResponse } from "@pages/Food/Vendors/MyVendors/MyVendorsList/@types/@myVendorsList";

import {
  FormItemsTypes,
  MyVendorListDrawerContentProps,
  onUploadFileSuccess,
} from "./@types/@myVendorListDrawerContent";
import "./_myVendorListDrawerContent.scss";

const MyVendorListDrawerContent = ({
  onOpenDrawe,
  onCloseDrawer,
  getData,
}: MyVendorListDrawerContentProps) => {
  const [isActiveSwitch, setIsActiveSwitch] = useState(true);
  const [cityList, setCityList] = useState<CityType[]>([]);
  const [activeCity, setActiveCity] = useState(true);
  const [logoList, setLogoList] = useState<UploadFile[]>([]);
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);
  const [rerenderTrigger, setRerenderTrigger] = useState<number>(0);
  const [lat, setLat] = useState<number>(35.699739);
  const [lng, setLng] = useState<number>(51.338097);
  const [form] = Form.useForm<FormItemsTypes>();

  const [logoName, setLogoName] = useState("");
  const [coverName, setCoverName] = useState("");

  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  //? ================================  Api Calls ================================
  // get province list from api
  const { data: getProvinceListData, isFetching: getProvinceListLoading } =
    useGetProvinceQuery();

  const [getCityList, { isFetching: getCityListLoading }] = useLazyGetCityQuery();

  // send drawer data
  const [createMyVendor, { isLoading: createMyVendorLoading }] =
    useCreateMyVendorMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    setRerenderTrigger((prev) => prev + 1);
  }, [onCloseDrawer]);

  //* ================================ Util Functions ================================
  if (!onOpenDrawe) return;

  const getCityListSuccess = async (value: GetCityResponse) => {
    if (value?.status === 200) {
      setCityList(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  //
  const onProvinceChangeHandler = (event: unknown) => {
    getCityList({ stateId: event as string })
      .unwrap()
      .then(getCityListSuccess);
    setActiveCity(false);
    form.setFieldsValue({ city: undefined });
  };

  // register form
  const onSubmitHandler = () => {
    form.submit();
    form.validateFields().then((value: FormItemsTypes) => {
      createMyVendor({
        title: value?.title,
        nationalNom: value?.legalCode,
        economicNom: value?.economicNom,
        iban: value?.iban,
        managerFirstName: value?.interfaceName,
        managerLastName: value?.interfaceLastName,
        managerUserName: value?.nationalCode,
        managerMobile: value?.phoneNumber,
        description: value?.desc,
        phone1: value?.phonOne,
        phone2: value?.phoneTwo,
        address: value?.address,
        postalCode: value?.postalCode,
        provinceId: value?.city?.code,
        latitude: lat,
        longitude: lng,
        active: isActiveSwitch,
        coverName: coverName ? coverName : null,
        logoName: logoName ? logoName : null,
      })
        .unwrap()
        .then(onCreateMyVendorSuccess);
    });
  };

  const onCreateMyVendorSuccess = async (value: CreateMyVendorResponse) => {
    if (value?.status === 200) {
      getData();
      onCloseDrawer();
      form.resetFields();
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  // onUploadFileSuccess
  const onUploadFileSuccess = ({ imageSetter, response }: onUploadFileSuccess) => {
    if (response?.status === 200) {
      imageSetter(response?.data);
    }
  };

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
    <Form className="food-my-vendor-list-drawer-content-container" form={form}>
      <CustomDrawerHeader
        title="تعریف تامین کننده جدید"
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomSwitch
              defaultChecked={isActiveSwitch}
              checkedChildren="فعال"
              unCheckedChildren="غیر فعال"
              valuePropName="activeMode"
              onChange={() => setIsActiveSwitch((prev) => !prev)}
            />
            <CustomButton className="drawer-action-btn" onClick={onCloseDrawer}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={onSubmitHandler}
              loading={createMyVendorLoading}
              className="drawer-action-btn"
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <Div className="attach-row">
        <CustomUploader
          fileList={logoList}
          setFileList={setLogoList}
          isReadOnly={false}
          uploaderText={
            <div className="my-vendor-upload-text-container">
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
            <div className="my-vendor-upload-text-container">
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
          onChange={(e: any) => onUploadFileChange(e, setCoverName, setBannerFileList)}
        />
      </Div>
      <Row gutter={[16, 16]}>
        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="عنوان"
            name="title"
            placeholder="عنوان"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره ملی حقوقی"
            name="legalCode"
            placeholder="شماره ملی حقوقی"
            rules={[REQUIRED_RULE, NUMBER_RULE, LEGAL_CODE_RULE]}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کد اقتصادی"
            name="economicNom"
            placeholder="کد اقتصادی"
            rules={[REQUIRED_RULE, NUMBER_RULE, LENGTH_RULE(12)]}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره شبا"
            name="iban"
            placeholder="شماره شبا بدون IR"
            rules={[REQUIRED_RULE, NUMBER_RULE, LENGTH_RULE(24)]}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="نام رابط"
            name="interfaceName"
            placeholder="نام رابط"
            rules={[MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="نام خانوادگی رابط"
            name="interfaceLastName"
            placeholder="نام خانوادگی رابط"
            rules={[MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کد ملی رابط"
            name="nationalCode"
            placeholder="کد ملی رابط"
            rules={[NUMBER_RULE, LENGTH_RULE(10)]}
          />
        </Col>

        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره تلفن رابط"
            name="phoneNumber"
            placeholder="شماره تلفن رابط"
            rules={[NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات تامین کننده"
            name="desc"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
            showCount
            placeholder="توضیحات تامین کننده"
            maxLength={500}
          />
        </Col>
      </Row>
      <div className="info-contact-divider">
        <CustomDivider text="اطلاعات تماس" />
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={8} sm={12} xs={24}>
          <CustomSelect
            name="province"
            label="استان"
            options={getProvinceListData?.data ? getProvinceListData?.data : []}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={getProvinceListLoading}
            onChange={onProvinceChangeHandler}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <CustomSelect
            name="city"
            label="شهر"
            options={cityList}
            placeholder="انتخاب کنید"
            form={form}
            isLoading={getCityListLoading}
            rules={[REQUIRED_RULE]}
            disabled={activeCity}
          />
        </Col>

        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="کدپستی"
            name="postalCode"
            placeholder="10 رقمی"
            rules={[REQUIRED_RULE, NUMBER_RULE, POSTAL_CODE_RULE]}
          />
        </Col>

        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره تلفن 1"
            name="phonOne"
            placeholder="02112345678"
            rules={[REQUIRED_RULE, NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
          />
        </Col>

        <Col lg={8} sm={12} xs={24}>
          <CustomInput
            type="text"
            label="شماره تلفن 2"
            name="phoneTwo"
            placeholder="02112345678"
            rules={[NUMBER_RULE, MIN_LENGTH_RULE(4), MAX_LENGTH_RULE(16)]}
          />
        </Col>
        <Col span={24}>
          <CustomInput
            type="text"
            label="آدرس"
            name="address"
            placeholder="آدرس"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
            showCount
            maxLength={500}
          />
        </Col>
      </Row>
      <CustomMap
        className="map"
        lat={lat}
        lng={lng}
        setLat={setLat}
        setLng={setLng}
        triggerRerender={rerenderTrigger}
      />
    </Form>
  );
};
export default MyVendorListDrawerContent;
