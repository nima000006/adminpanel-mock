import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useLazyGetAllContractsListQuery } from "@infra/states/redux/Apis/food/contract/contractApi";
import { useCreateAllFoodMutation } from "@infra/states/redux/Apis/food/foods/foodApis";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { GetAllContractsListResponse } from "@pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import { REGISTER_FOOD_SUCCESS_MSG } from "@pages/Food/Foods/_Shared/utils/FoodsUtils";

import {
  AllFoodOnUploadFileSuccess,
  CreateAllFoodResponse,
  ValueType,
  formType,
} from "./@types/@allFoodsListDrawerContent";
import AllFoodsListDrawerContentInfo from "./helpers/AllFoodsListDrawerContentInfo/AllFoodsListDrawerContentInfo";
import "./_allFoodsListDrawerContent.scss";

const AllFoodsListDrawerContent = ({ open, onCloseDrawerHandler, getData }: formType) => {
  const [allContractsListData, setAllContractsListData] = useState<
    GetAllContractsListResponse | undefined
  >(undefined);

  const [isActive, setIsActive] = useState(false);
  const [form] = Form.useForm<ValueType>();

  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

  const [mainImageName, setMainImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  // get contract list for custom select
  const [getAllContractsList, { isFetching: isAllContractsListLoading }] =
    useLazyGetAllContractsListQuery();

  // send data
  const [sendDrawerData, { isLoading: sendDataLoading }] = useCreateAllFoodMutation();

  //? ================================ Effects ================================
  // request get contract(custom select)
  useEffect(() => {
    getAllContractsList({ pageNo: 0, pageSize: 10000 })
      .unwrap()
      .then(onGetAllContractsListSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const onGetAllContractsListSuccess = async (res: GetAllContractsListResponse) => {
    if (res?.status === 200) {
      setAllContractsListData(res);
    } else {
      return toast.error((res?.data || res?.msg) as any, {
        toastId: (res?.data || res?.msg) as any,
      });
    }
  };

  // submit form
  const onSubmitHandler = () => {
    form?.submit();
    form.validateFields().then((value: ValueType) => {
      sendDrawerData({
        title: value?.title,
        contractId: value?.contract?.code,
        studentalPrice: +value?.studentPrice,
        minPrice: +value?.minPrice,
        maxPrice: +value?.maxPrice,
        description: value?.desc,
        active: isActive,
        mainImage: mainImageName ? mainImageName : null,
        secondImage: secondImageName ? secondImageName : null,
        thirdImage: thirdImageName ? thirdImageName : null,
        fourthImage: fourthImageName ? fourthImageName : null,
      })
        .unwrap()
        .then(onSendDrawerDataSuccess);
    });
  };

  const onSendDrawerDataSuccess = async (value: CreateAllFoodResponse) => {
    if (value?.status === 200) {
      onCloseDrawerHandler();
      toast.success(REGISTER_FOOD_SUCCESS_MSG, {
        toastId: REGISTER_FOOD_SUCCESS_MSG,
      });
      getData();
    }
  };

  // onUploadFileSuccess
  const onUploadFileSuccess = ({ setImage, response }: AllFoodOnUploadFileSuccess) => {
    if (response?.status === 200) {
      setImage(response?.data);
    }
  };

  // onUploadFileChange
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
        setImage("");
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  if (!open) return;

  return (
    <Form className="food-all-foods-list-drawer-content-container" form={form}>
      <CustomDrawerHeader
        title="تعریف غذای جدید"
        closeDrawerHandler={onCloseDrawerHandler}
        leftSideContent={
          <div className="drawer-header-btn">
            <CustomSwitch
              defaultChecked={isActive}
              checkedChildren="فعال"
              unCheckedChildren="غیر فعال"
              valuePropName="activeMode"
              onChange={() => setIsActive((prev) => !prev)}
            />
            <CustomButton className="drawer-action-btn" onClick={onCloseDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              onClick={onSubmitHandler}
              loading={sendDataLoading}
              className="drawer-action-btn"
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <Div className="attach-row">
        {/* ---------------------------------- MAIN IMAGE ---------------------------------- */}
        <CustomUploader
          fileList={mainImageList}
          setFileList={setMainImageList}
          isReadOnly={false}
          uploaderText={
            <div className="all-food-list-upload-text-container">
              <div className="upload-text-main">تصویر اصلی</div>
              <div className="upload-logo-main">
                <AiOutlinePlus />
              </div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          isDataLoading={isUploadFileLoading}
          isDisabled={mainImageList?.length >= 1}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 1 مگابایت",
            size: 1,
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name="mainImage"
          imageSetter={setMainImageName}
          onChange={(e: any) => onUploadFileChange(e, setMainImageName, setMainImageList)}
          rules={[
            () => ({
              validator() {
                if (mainImageName?.length < 1) {
                  return Promise.reject(new Error("لطفا عکس اصلی غذا را انتخاب فرمائید"));
                }

                return Promise.resolve();
              },
            }),
          ]}
        />

        {/* ---------------------------------- SECOND IMAGE ---------------------------------- */}
        <CustomUploader
          fileList={secondImageList}
          setFileList={setSecondImageList}
          isReadOnly={false}
          uploaderText={
            <div className="all-food-list-upload-text-container">
              <div className="upload-text-second">تصویر دوم</div>
              <div className="upload-logo-second">
                <AiOutlinePlus />
              </div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          isDataLoading={isUploadFileLoading}
          isDisabled={secondImageList?.length >= 1}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 1 مگابایت",
            size: 1,
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name="secondImage"
          imageSetter={setSecondImageName}
          onChange={(e: any) =>
            onUploadFileChange(e, setSecondImageName, setSecondImageList)
          }
        />

        {/* ---------------------------------- THIRD IMAGE ---------------------------------- */}
        <CustomUploader
          fileList={thirdImageList}
          setFileList={setThirdImageList}
          isReadOnly={false}
          uploaderText={
            <div className="all-food-list-upload-text-container">
              <div className="upload-text-second">تصویر سوم</div>
              <div className="upload-logo-second">
                <AiOutlinePlus />
              </div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          isDataLoading={isUploadFileLoading}
          isDisabled={thirdImageList?.length >= 1}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 1 مگابایت",
            size: 1,
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name="thirdImage"
          imageSetter={setThirdImageName}
          onChange={(e: any) =>
            onUploadFileChange(e, setThirdImageName, setThirdImageList)
          }
        />

        {/* ---------------------------------- FOURTH IMAGE ---------------------------------- */}
        <CustomUploader
          fileList={fourthImageList}
          setFileList={setFourthImageList}
          isReadOnly={false}
          uploaderText={
            <div className="all-food-list-upload-text-container">
              <div className="upload-text-second">تصویر چهارم</div>
              <div className="upload-logo-second">
                <AiOutlinePlus />
              </div>
            </div>
          }
          hasUploaderIcon={false}
          maxCount={1}
          isDataLoading={isUploadFileLoading}
          isDisabled={fourthImageList?.length >= 1}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 1 مگابایت",
            size: 1,
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name="fourthImage"
          imageSetter={setFourthImageName}
          onChange={(e: any) =>
            onUploadFileChange(e, setFourthImageName, setFourthImageList)
          }
        />
      </Div>
      <AllFoodsListDrawerContentInfo
        allContractsListData={allContractsListData}
        isAllContractsListLoading={isAllContractsListLoading}
        form={form}
      />
    </Form>
  );
};
export default AllFoodsListDrawerContent;
