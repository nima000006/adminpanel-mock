import { useCallback, useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import dayjs, { Dayjs } from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useCreateNewMyContractMutation } from "@infra/states/redux/Apis/food/contract/contractApi";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import { useLazyGetMyRestaurantsQuery } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { useLazyGetMyVendorListQuery } from "@infra/states/redux/Apis/food/vendor/vendorApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  GetMyRestaurantsResponse,
  MyRestaurantType,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";
import {
  GetVendorMyResponse,
  VendorMyType,
} from "@pages/Food/Vendors/MyVendors/MyVendorsList/@types/@myVendorsList";

import {
  CreateNewMyContractResponse,
  FormDataDrawer,
  MyContractListDrawerContentProps,
  onUploadFileSuccess,
} from "./@types/@myContractListDrawerContent";
import MyContractListDrawerContentInfo from "./components/MyContractListDrawerContentInfo/MyContractListDrawerContentInfo";
import "./_myContractListDrawerContent.scss";

const CREATE_NEW_CONTRACT_SUCCESS_MSG = "قرارداد جدید با موفقیت ثبت شد.";

const MyContractListDrawerContent = ({
  closeDrawerHandler,
  getListData,
}: MyContractListDrawerContentProps) => {
  const [restaurantData, setRestaurantData] = useState<MyRestaurantType[] | []>([]);
  const [vendorData, setVendorData] = useState<VendorMyType[] | []>([]);

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

  const [getMyRestaurants, { isFetching: isMyRestaurantDataLoading }] =
    useLazyGetMyRestaurantsQuery();

  const [getMyVendorList, { isFetching: isMyVendorListListLoading }] =
    useLazyGetMyVendorListQuery();

  const [createNewContract, { isLoading: isCreateNewContractLoading }] =
    useCreateNewMyContractMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getMyRestaurants().unwrap().then(geMyRestaurantsOnSuccess);
    getMyVendorList().unwrap().then(getMyVendorOnSuccess);
    form.setFieldsValue({
      activeMode: true,
    });
  }, []);

  //* ================================ Util Functions ================================
  const geMyRestaurantsOnSuccess = useCallback(
    async (value: GetMyRestaurantsResponse) => {
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

  const getMyVendorOnSuccess = useCallback(async (value: GetVendorMyResponse) => {
    if (value?.status === 200) {
      setVendorData(value?.data);
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  }, []);

  const onCreateNewContractSuccess = async (value: CreateNewMyContractResponse) => {
    if (value?.status === 200) {
      toast.success(CREATE_NEW_CONTRACT_SUCCESS_MSG, {
        toastId: CREATE_NEW_CONTRACT_SUCCESS_MSG,
      });
      closeDrawerHandler();
      getListData();
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
        file1: firstFileName ? firstFileName : null,
        file2: secondFileName ? secondFileName : null,
        file3: thirdFileName ? thirdFileName : null,
        file4: fourthFileName ? fourthFileName : null,
        providerPercentage: +value?.providerPercentage,
        restaurantId: value?.self?.code,
        restaurantPercentage: +value?.restaurantPercentage,
        startedDate: value?.contractStart,
        title: value?.contractTitle,
        vendorId: value?.vendor?.code,
        vendorPercentage: +value?.vendorPercentage,
      })
        .unwrap()
        .then(onCreateNewContractSuccess);
    });
  };

  const onUploadFileSuccess = ({ setImage, response }: onUploadFileSuccess) => {
    if (response?.status === 200) {
      setImage(response?.data);
    }
  };

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
    <Form form={form} className="food-contracts-list-drawer-container">
      <CustomDrawerHeader
        title="تعریف قرارداد جدید"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="my-contracts-list-page-drawer-action-btns-container">
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
              loading={isCreateNewContractLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <MyContractListDrawerContentInfo
          isMyVendorListListLoading={isMyVendorListListLoading}
          isMyRestaurantDataLoading={isMyRestaurantDataLoading}
          form={form}
          vendorData={vendorData}
          restaurantData={restaurantData}
          contractStartDate={contractStartDate}
          setContractStartDate={setContractStartDate}
        />
        <Row className="my-contract-list-image-uploader-container" gutter={[16, 10]}>
          <Col lg={6} md={6} sm={6} xs={12}>
            <CustomUploader
              fileList={firstFileList}
              setFileList={setFirstFileList}
              isReadOnly={false}
              uploaderText={
                <div className="my-contract-list-upload-text-container">
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
                <div className="my-contract-list-upload-text-container">
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
                <div className="my-contract-list-upload-text-container">
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
                <div className="my-contract-list-upload-text-container">
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

export default MyContractListDrawerContent;
