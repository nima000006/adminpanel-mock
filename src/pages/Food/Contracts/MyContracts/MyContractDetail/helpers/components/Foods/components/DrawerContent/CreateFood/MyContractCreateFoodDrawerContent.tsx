import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useCreateMyNewFoodMutation } from "@infra/states/redux/Apis/food/foods/foodApis";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import {
  CreateMyNewFoodResponse,
  FormDataDrawer,
  MyContractCreateFoodContentUploadFile,
  MyContractCreateFoodDrawerContentProps,
} from "./@types/@myContractCreateFoodDrawerContent";
import MyContractCreateFoodDrawerContentInfo from "./helpers/components/MyContractCreateFoodDrawerContentInfo";

import "./_myContractCreateFoodDrawerContent.scss";

const CREATE_NEW_FOOD_SUCCESS_MSG = "غذای جدید با موفقیت ثبت شد.";

const MyContractCreateFoodDrawerContent = ({
  closeDrawerHandler,
  getData,
}: MyContractCreateFoodDrawerContentProps) => {
  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

  const [mainImageName, setMainImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  const [isActive, setIsActive] = useState(true);
  const {
    params: { title, contractId },
  } = useQueryParams<{ title: string; contractId: string }>();

  const [form] = Form.useForm<FormDataDrawer>();

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [createNewFood, { isLoading: isCreateNewFoodLoading }] =
    useCreateMyNewFoodMutation();

  //* ================================ Util Functions ================================
  const createNewFoodOnSuccess = async (value: CreateMyNewFoodResponse) => {
    if (value?.status === 200) {
      closeDrawerHandler();
      toast.success(CREATE_NEW_FOOD_SUCCESS_MSG, {
        toastId: CREATE_NEW_FOOD_SUCCESS_MSG,
      });
      getData();
    }
  };

  const createNewFoodHandler = () => {
    form.submit();
    form.validateFields().then((value: FormDataDrawer) => {
      createNewFood({
        active: isActive,
        contractId: +contractId,
        description: value?.description,
        maxPrice: +value?.maxPrice,
        minPrice: +value?.minPrice,
        studentalPrice: +value?.studentPrice,
        title: value?.foodName,

        mainImage: mainImageName ? mainImageName : null,
        secondImage: secondImageName ? secondImageName : null,
        thirdImage: thirdImageName ? thirdImageName : null,
        fourthImage: fourthImageName ? fourthImageName : null,
      })
        .unwrap()
        .then(createNewFoodOnSuccess);
    });
  };
  const onUploadFileSuccess = ({
    setImage,
    response,
  }: MyContractCreateFoodContentUploadFile) => {
    if (response?.status === 200) {
      setImage(response?.data);
    }
  };

  // upload file change function
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
        title="تعریف غذای جدید"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="my-contracts-detail-food-tab-drawer-action-btns-container">
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
              onClick={createNewFoodHandler}
              className="drawer-action-btn"
              htmlType="submit"
              loading={isCreateNewFoodLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]} className="uploader-container1">
        {/* ---------------------------------- MAIN IMAGE ---------------------------------- */}
        <Col lg={6} md={6} sm={8} xs={12}>
          <CustomUploader
            fileList={mainImageList}
            setFileList={setMainImageList}
            isReadOnly={false}
            uploaderText={
              <div className="my-contract-create-list-upload-text-container">
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
            onChange={(e: any) =>
              onUploadFileChange(e, setMainImageName, setMainImageList)
            }
            rules={[
              () => ({
                validator() {
                  if (mainImageName?.length < 1) {
                    return Promise.reject(
                      new Error("لطفا عکس اصلی غذا را انتخاب فرمائید")
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          />
        </Col>

        {/* ---------------------------------- SECOND IMAGE ---------------------------------- */}
        <Col lg={6} md={6} sm={8} xs={12}>
          <CustomUploader
            fileList={secondImageList}
            setFileList={setSecondImageList}
            isReadOnly={false}
            uploaderText={
              <div className="my-contract-create-list-upload-text-container">
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
        </Col>

        {/* ---------------------------------- THIRD IMAGE ---------------------------------- */}
        <Col lg={6} md={6} sm={8} xs={12}>
          <CustomUploader
            fileList={thirdImageList}
            setFileList={setThirdImageList}
            isReadOnly={false}
            uploaderText={
              <div className="my-contract-create-list-upload-text-container">
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
        </Col>

        {/* ---------------------------------- FOURTH IMAGE ---------------------------------- */}
        <Col lg={6} md={6} sm={8} xs={12}>
          <CustomUploader
            fileList={fourthImageList}
            setFileList={setFourthImageList}
            isReadOnly={false}
            uploaderText={
              <div className="my-contract-create-list-upload-text-container">
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
        </Col>
      </Row>
      <MyContractCreateFoodDrawerContentInfo title={title} />
    </Form>
  );
};

export default MyContractCreateFoodDrawerContent;
