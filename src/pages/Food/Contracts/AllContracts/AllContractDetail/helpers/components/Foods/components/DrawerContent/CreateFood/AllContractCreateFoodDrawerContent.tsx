import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { useCreateNewFoodMutation } from "@infra/states/redux/Apis/food/foods/foodApis";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  CUSTOM_INPUT_NUMBER_MAX_RULE,
  CUSTOM_INPUT_NUMBER_MIN_RULE,
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import {
  AllContractCreateFoodContentUploadFile,
  AllContractCreateFoodDrawerContentProps,
  CreateNewFoodResponse,
  FormDataType,
} from "./@types/@allContractCreateFoodDrawerContent";

const CREATE_NEW_FOOD_SUCCESS_MSG = "غذای جدید با موفقیت ثبت شد.";

const AllContractCreateFoodDrawerContent = ({
  closeDrawerHandler,
  getData,
}: AllContractCreateFoodDrawerContentProps) => {
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
  } = useQueryParams();

  const [form] = Form.useForm<FormDataType>();

  //? ================================  Api Calls ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [createNewFood, { isLoading: isCreateNewFoodLoading }] =
    useCreateNewFoodMutation();

  //* ================================ Util Functions ================================
  const createNewFoodOnSuccess = async (value: CreateNewFoodResponse) => {
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
    form.validateFields().then((value: FormDataType) => {
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

  // Upload file success
  const onUploadFileSuccess = ({
    setImage,
    response,
  }: AllContractCreateFoodContentUploadFile) => {
    if (response?.status === 200) {
      setImage(response?.data);
    }
  };

  // Upload file change
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
          <div className="all-contracts-detail-food-tab-drawer-action-btns-container">
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
      <Row gutter={[16, 16]} className="uploader-container">
        {/* ---------------------------------- MAIN IMAGE ---------------------------------- */}
        <Col>
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
        <Col>
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
        <Col>
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
        <Col>
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
      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInput
            type="text"
            label="عنوان"
            name="foodName"
            placeholder="عنوان"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(50)]}
          />
        </Col>

        <SingleVerticalWithCol
          xl={8}
          lg={8}
          md={12}
          sm={24}
          label="قرارداد"
          value={title}
        />

        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInputNumber
            type="text"
            label="قیمت دانشجویی (ریال)"
            name="studentPrice"
            placeholder="قیمت دانشجویی (ریال)"
            isPrice={true}
            dependencies={["maxPrice", "minPrice"]}
            rules={[
              REQUIRED_RULE,
              ({ getFieldValue }) => ({
                validator: CUSTOM_INPUT_NUMBER_MAX_RULE(getFieldValue, "studentPrice", 9),
              }),
              ({ getFieldValue }) => ({
                validator: CUSTOM_INPUT_NUMBER_MIN_RULE(getFieldValue, "studentPrice", 4),
              }),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (+getFieldValue("minPrice") > +value) {
                    return Promise.reject(
                      new Error(" عدد وارد شده باید بیشتر از قیمت حداقل باشد.")
                    );
                  }
                  if (+getFieldValue("maxPrice") < +value) {
                    return Promise.reject(
                      new Error(" عدد وارد شده باید کمتر از قیمت حداکثر باشد.")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInputNumber
            type="text"
            label="قیمت حداقل (ریال)"
            name="minPrice"
            placeholder="قیمت حداقل (ریال)"
            isPrice={true}
            dependencies={["maxPrice", "studentPrice"]}
            rules={[
              REQUIRED_RULE,
              ({ getFieldValue }) => ({
                validator: CUSTOM_INPUT_NUMBER_MAX_RULE(getFieldValue, "minPrice", 9),
              }),
              ({ getFieldValue }) => ({
                validator: CUSTOM_INPUT_NUMBER_MIN_RULE(getFieldValue, "minPrice", 4),
              }),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (+getFieldValue("studentPrice") < +value) {
                    return Promise.reject(
                      new Error(" عدد وارد شده باید کمتر از قیمت دانشجویی باشد.")
                    );
                  }
                  if (+getFieldValue("maxPrice") < +value) {
                    return Promise.reject(
                      new Error(" عدد وارد شده باید کمتر از قیمت حداکثر باشد.")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <CustomInputNumber
            type="text"
            label="قیمت حداکثر (ریال)"
            name="maxPrice"
            placeholder="قیمت حداکثر (ریال)"
            isPrice={true}
            dependencies={["studentPrice", "minPrice"]}
            rules={[
              REQUIRED_RULE,
              ({ getFieldValue }) => ({
                validator: CUSTOM_INPUT_NUMBER_MAX_RULE(getFieldValue, "maxPrice", 9),
              }),
              ({ getFieldValue }) => ({
                validator: CUSTOM_INPUT_NUMBER_MIN_RULE(getFieldValue, "maxPrice", 4),
              }),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (+getFieldValue("minPrice") > +value) {
                    return Promise.reject(
                      new Error(" عدد وارد شده باید بیشتر از قیمت حداقل باشد.")
                    );
                  }
                  if (+getFieldValue("studentPrice") > +value) {
                    return Promise.reject(
                      new Error(" عدد وارد شده باید بیشتر از قیمت دانشجویی باشد.")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          />
        </Col>
        <Col span={24}>
          <CustomTextArea
            label="توضیحات"
            name="description"
            placeholder="توضیحات"
            rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
            showCount
            maxLength={500}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AllContractCreateFoodDrawerContent;
