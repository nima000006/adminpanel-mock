import { useCallback, useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { AiOutlinePercentage } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useCreateNewContractMutation } from "@infra/states/redux/Apis/food/contract/contractApi";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetAllRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetAllVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { validateTotalPercentage } from "@pages/Food/Contracts/_Shared/utils/ContractListUtils";
import {
  GetAllRestaurantsResponse,
  RestaurantType,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import {
  GetVendorAllResponse,
  VendorAllType,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/@types/@allVendorList";

import {
  AllContractListDrawerContentProps,
  CreateNewContractResponse,
  FormDataDrawer,
  onUploadFileSuccess,
} from "./@types/@allContractListDrawerContent";
import "./_allContractListDrawerContent.scss";

const CREATE_NEW_CONTRACT_SUCCESS_MSG = "قرارداد جدید با موفقیت ثبت شد.";

const AllContractListDrawerContent = ({
  closeDrawerHandler,
  getListData,
}: AllContractListDrawerContentProps) => {
  const [restaurantData, setRestaurantData] = useState<RestaurantType[] | []>([]);
  const [vendorData, setVendorData] = useState<VendorAllType[] | []>([]);

  const [isActive, setIsActive] = useState(true);
  const [contractStartDate, setContractStartDate] = useState<Dayjs | null>(
    dayjs().startOf("day")
  );
  const [firstFileList, setFirstFileList] = useState<UploadFile[]>([]);
  const [secondFileList, setSecondFileList] = useState<UploadFile[]>([]);
  const [thirdFileList, setThirdFileList] = useState<UploadFile[]>([]);
  const [fourthFileList, setFourthFileList] = useState<UploadFile[]>([]);
  const [firstFileName, setFirstFileName] = useState("");
  const [secondFileName, setSecondFileName] = useState("");
  const [thirdFileName, setThirdFileName] = useState("");
  const [fourthFileName, setFourthFileName] = useState("");
  const [form] = Form.useForm<FormDataDrawer>();
  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [getAllRestaurants, { isFetching: isAllRestaurantDataLoading }] =
    useLazyGetAllRestaurantsQuery();

  const [getAllVendorList, { isFetching: isAllVendorListListLoading }] =
    useLazyGetAllVendorListQuery();

  const [createNewContract, { isLoading: isCreateNewContractLoading }] =
    useCreateNewContractMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllRestaurants({ isDeleted: false }).unwrap().then(getAllRestaurantsOnSuccess);
    getAllVendorList({ isDeleted: false }).unwrap().then(getAllVendorOnSuccess);
    form.setFieldsValue({
      activeMode: true,
      vendorPercentage: "0",
    });
  }, []);

  //* ================================ Util Functions ================================
  const getAllRestaurantsOnSuccess = useCallback(
    async (value: GetAllRestaurantsResponse) => {
      if (value?.status === 200) {
        setRestaurantData(value?.data);
      } else {
        return toast.error((value?.data || value?.msg) as any, {
          toastId: (value?.data || value?.msg) as any,
        });
      }
    },
    []
  );

  const getAllVendorOnSuccess = useCallback(async (value: GetVendorAllResponse) => {
    if (value?.status === 200) {
      setVendorData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  }, []);

  const onCreateNewContractSuccess = async (value: CreateNewContractResponse) => {
    if (value?.status === 200) {
      toast.success(CREATE_NEW_CONTRACT_SUCCESS_MSG, {
        toastId: CREATE_NEW_CONTRACT_SUCCESS_MSG,
      });
      closeDrawerHandler();
      getListData();
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  const createNewContractHandler = () => {
    form.submit();
    form.validateFields().then((value: FormDataDrawer) => {
      createNewContract({
        active: isActive,
        contractUUID: value?.contractNo,
        description: value?.contractDescription,
        endDate: value?.contractEnd,
        providerPercentage: +value?.providerPercentage,
        restaurantId: value?.self?.code,
        restaurantPercentage: +value?.restaurantPercentage,
        startedDate: value?.contractStart,
        title: value?.contractTitle,
        vendorId: value?.vendor?.code,
        // vendorPercentage: +value?.vendorPercentage,
        vendorPercentage: 0,
        file1: firstFileName ? firstFileName : null,
        file2: secondFileName ? secondFileName : null,
        file3: thirdFileName ? thirdFileName : null,
        file4: fourthFileName ? fourthFileName : null,
      })
        .unwrap()
        .then(onCreateNewContractSuccess);
    });
  };

  const handleStartDateChange = (date: Dayjs | null, dateString: string) => {
    // حالت clear
    if (!date || !dateString) {
      setContractStartDate(null);
      form.setFieldsValue({ contractStart: undefined });
      return;
    }

    setContractStartDate(date);

    form.setFieldsValue({
      contractStart: moment
        .from(dateString, "fa", "YYYY-MM-DD")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    });
  };

  const onUploadFileSuccess = ({ setImage, response }: onUploadFileSuccess) => {
    if (response?.status === 200) {
      setImage(response?.data);
    }
  };

  // upload file
  const onUploadFileChange = (
    image: UploadChangeParam<UPLOAD_FILE_GENERAL>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
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
      .then((response) => onUploadFileSuccess({ response, setImage }))
      .catch(() => {
        imageListSetter?.([]);
        setImage?.("");
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDrawerHeader
        title="تعریف قرارداد جدید"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="all-contracts-list-page-drawer-action-btns-container">
            <CustomSwitch
              defaultChecked={isActive}
              checkedChildren="فعال"
              unCheckedChildren="غیرفعال"
              valuePropName="activeMode"
              onChange={() => setIsActive((prev) => !prev)}
            />
            <CustomButton onClick={closeDrawerHandler} className="drawer-action-btn">
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={createNewContractHandler}
              className="drawer-action-btn"
              htmlType="submit"
              loading={isCreateNewContractLoading || isUploadFileLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="عنوان قرارداد"
            name="contractTitle"
            placeholder="عنوان قرارداد"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(100)]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="تأمین کننده"
            name="vendor"
            placeholder="انتخاب کنید"
            options={vendorData}
            loading={isAllVendorListListLoading}
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomSelect
            label="سلف"
            name="self"
            placeholder="انتخاب کنید"
            options={restaurantData}
            loading={isAllRestaurantDataLoading}
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="شماره قرارداد"
            name="contractNo"
            placeholder="شماره قرارداد"
            rules={[REQUIRED_RULE, MAX_LENGTH_RULE(20)]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomDatePicker
            label="شروع قرارداد"
            placeholder="انتخاب کنید"
            name="contractStart"
            rules={[REQUIRED_RULE]}
            form={form}
            onChange={(date: unknown, dateString: string | string[] | null) =>
              handleStartDateChange(date as Dayjs, dateString as string)
            }
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomDatePicker
            label="پایان قرارداد"
            placeholder="انتخاب کنید"
            name="contractEnd"
            rules={[REQUIRED_RULE]}
            form={form}
            disabledDate={(current) => {
              if (contractStartDate) {
                return current && current < contractStartDate;
              }
            }}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="درصد تأمین کننده"
            name="vendorPercentage"
            placeholder="درصد تأمین کننده"
            prefix={<AiOutlinePercentage className="percentage" />}
            dependencies={["providerPercentage", "restaurantPercentage"]}
            // rules={[
            //   REQUIRED_RULE,
            //   NUMBER_RULE,
            //   ({ getFieldValue }) => ({
            //     validator: validateTotalPercentage(getFieldValue),
            //   }),
            // ]}
            disabled
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="درصد دانشجویار"
            name="providerPercentage"
            placeholder="درصد دانشجویار"
            prefix={<AiOutlinePercentage className="percentage" />}
            dependencies={["restaurantPercentage", "vendorPercentage"]}
            rules={[
              REQUIRED_RULE,
              NUMBER_RULE,
              ({ getFieldValue }) => ({
                validator: validateTotalPercentage(getFieldValue),
              }),
            ]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="درصد دانشگاه"
            name="restaurantPercentage"
            placeholder="درصد دانشگاه"
            prefix={<AiOutlinePercentage className="percentage" />}
            dependencies={["vendorPercentage", "providerPercentage"]}
            rules={[
              REQUIRED_RULE,
              NUMBER_RULE,
              ({ getFieldValue }) => ({
                validator: validateTotalPercentage(getFieldValue),
              }),
            ]}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات"
            name="contractDescription"
            placeholder="توضیحات"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
            maxLength={500}
            showCount
          />
        </Col>
        <Row className="all-contract-list-image-uploader-container" gutter={[16, 10]}>
          <Col lg={6} md={6} sm={6} xs={12}>
            <CustomUploader
              fileList={firstFileList}
              setFileList={setFirstFileList}
              isReadOnly={false}
              uploaderText={
                <div className="all-contract-list-upload-text-container">
                  <div className="upload-text-second">فایل اول</div>
                  <div className="upload-logo-second">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              isDisabled={firstFileList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="firstFile"
              imageSetter={setFirstFileName}
              onChange={(e: any) =>
                onUploadFileChange(e, setFirstFileName, setFirstFileList)
              }
            />
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <CustomUploader
              fileList={secondFileList}
              setFileList={setSecondFileList}
              isReadOnly={false}
              uploaderText={
                <div className="all-contract-list-upload-text-container">
                  <div className="upload-text-second">فایل دوم</div>
                  <div className="upload-logo-second">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              isDisabled={secondFileList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="secondFile"
              imageSetter={setSecondFileName}
              onChange={(e: any) =>
                onUploadFileChange(e, setSecondFileName, setSecondFileList)
              }
            />
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <CustomUploader
              fileList={thirdFileList}
              setFileList={setThirdFileList}
              isReadOnly={false}
              uploaderText={
                <div className="all-contract-list-upload-text-container">
                  <div className="upload-text-second">فایل سوم</div>
                  <div className="upload-logo-second">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              isDisabled={thirdFileList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="thirdFile"
              imageSetter={setThirdFileName}
              onChange={(e: any) =>
                onUploadFileChange(e, setThirdFileName, setThirdFileList)
              }
            />
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <CustomUploader
              fileList={fourthFileList}
              setFileList={setFourthFileList}
              isReadOnly={false}
              uploaderText={
                <div className="all-contract-list-upload-text-container">
                  <div className="upload-text-second">فایل چهارم</div>
                  <div className="upload-logo-second">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              isDisabled={fourthFileList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="secondImage"
              imageSetter={setFourthFileName}
              onChange={(e: any) =>
                onUploadFileChange(e, setFourthFileName, setFourthFileList)
              }
            />
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

export default AllContractListDrawerContent;
