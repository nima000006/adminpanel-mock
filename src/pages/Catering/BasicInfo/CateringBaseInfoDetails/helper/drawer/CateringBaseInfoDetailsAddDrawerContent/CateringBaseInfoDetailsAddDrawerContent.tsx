import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useCreateBasicInfoFoodMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { useFoodUploadFileMutation } from "@infra/states/redux/Apis/food/general/GeneralFoodApis";
import {
  BASIC_INFO_DUPLICATE_NAME_RULE,
  MAX_LENGTH_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  hasCateringProductCategoryId,
  isCateringBaseInfoImageEnabled,
} from "@pages/Catering/BasicInfo/_shared/cateringBaseInfoCategory";

import {
  CateringBaseInfoDetailsAddDrawerContentProps,
  CateringBaseInfoDetailsAddDrawerFormData,
  CateringBaseInfoDetailsAddOnUploadFileChangeParams,
  CateringBaseInfoDetailsAddUploadFile,
  createBasicInfoFoodRequest,
} from "./@types/@cateringBaseInfoDetailsAddDrawerContent";

import "../../../../_shared/_cateringBaseInfoUploader.scss";

const REGISTER_CATERING_SUCCESS_MSG = "غذا با موفقیت ثبت شد.";
const DEFAULT_CATERING_IMAGE_FIELD = "defaultFoodImage";

const CateringBaseInfoDetailsAddDrawerContent = ({
  closeDrawerHandler,
  getData,
  productCategoryTitle,
  existingTitles,
}: CateringBaseInfoDetailsAddDrawerContentProps) => {
  const [form] = Form.useForm<CateringBaseInfoDetailsAddDrawerFormData>();
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [imageName, setImageName] = useState("");

  const { params: url } = useQueryParams();
  const isImageEnabled = isCateringBaseInfoImageEnabled(url?.productCategoryId);

  //? ================================ API ================================
  const [uploadFile, { isLoading: isUploadFileLoading }] = useFoodUploadFileMutation();

  const [createBasicInfoFood, { isLoading: isCreateBasicInfoFoodLoading }] =
    useCreateBasicInfoFoodMutation();

  //* ================================ Util Functions ================================
  // CustomUploader crop confirm passes a raw File; UploadFile payloads use originFileObj.
  const resolveUploadFilePayload = (file: CateringBaseInfoDetailsAddUploadFile) => {
    if (file instanceof Blob) {
      return file;
    }

    return getUploadFilePayload(file);
  };

  const clearDefaultCateringImageError = (imageValue: string) => {
    form.setFields([
      {
        name: DEFAULT_CATERING_IMAGE_FIELD,
        value: imageValue,
        errors: [],
      },
    ]);
  };

  const onUploadFileChange = ({
    image,
    setImage,
    imageListSetter,
  }: CateringBaseInfoDetailsAddOnUploadFileChangeParams) => {
    const fileToUpload = resolveUploadFilePayload(image.file);
    if (!fileToUpload) {
      imageListSetter?.([]);
      setImage("");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const isFileFormatCorrect = isImageFormatValid({
      fileFormat: fileToUpload.type ?? "",
    });
    if (!isFileFormatCorrect) {
      imageListSetter?.([]);
      setImage("");
      return toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
    }

    const isUploadable = isImageSizeValid({ fileSize: fileToUpload.size ?? 0 });
    if (!isUploadable) {
      imageListSetter?.([]);
      setImage("");
      return toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
    }
    uploadFile(formData);
  };

  const onCreateBasicInfoFoodSuccess = () => {
    toast.success(REGISTER_CATERING_SUCCESS_MSG, {
      toastId: REGISTER_CATERING_SUCCESS_MSG,
    });
    closeDrawerHandler();
    getData();
  };

  const onSubmitHandler = () => {
    form.validateFields().then((values: CateringBaseInfoDetailsAddDrawerFormData) => {
      if (!hasCateringProductCategoryId(url?.productCategoryId)) return;

      const request: createBasicInfoFoodRequest = {
        title: values.foodTitle,
        productCategoryId: +url.productCategoryId,
        active: true,
        ...(values.description && { description: values.description }),
        ...(isImageEnabled && imageName && { mainImage: imageName }),
      };

      createBasicInfoFood(request).unwrap().then(onCreateBasicInfoFoodSuccess);
    });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDrawerHeader
        title={`افزودن ${productCategoryTitle}`}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex items-center gap-3">
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              onClick={onSubmitHandler}
              loading={isCreateBasicInfoFoodLoading}
            >
              تایید و ثبت
            </CustomButton>
          </div>
        }
      />

      {isImageEnabled && (
        <Row className="catering-base-info-uploader-row">
          <Col>
            <CustomUploader
              fileList={imageList}
              setFileList={setImageList}
              isReadOnly={false}
              label={`تصویر پیشفرض ${productCategoryTitle}`}
              hasVerticalLabel={true}
              classNameOuterDiv="catering-base-info-uploader catering-base-info-uploader--dashed"
              uploaderText={
                <div className="catering-base-info-upload-text">
                  <AiOutlinePlus size={20} />
                  <span>بارگذاری</span>
                </div>
              }
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              isDisabled={imageList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name={DEFAULT_CATERING_IMAGE_FIELD}
              imageSetter={(value) => {
                const nextImageName =
                  typeof value === "function" ? value(imageName) : value;
                setImageName(nextImageName);
                if (nextImageName) {
                  clearDefaultCateringImageError(nextImageName);
                }
              }}
              onChange={(e: UploadChangeParam<CateringBaseInfoDetailsAddUploadFile>) =>
                onUploadFileChange({
                  image: e,
                  setImage: setImageName,
                  imageListSetter: setImageList,
                })
              }
              rules={[REQUIRED_RULE]}
            />
          </Col>
        </Row>
      )}

      <div className="flex flex-col gap-4">
        <CustomInput
          label={`عنوان ${productCategoryTitle}`}
          name="foodTitle"
          placeholder={`عنوان ${productCategoryTitle} را وارد نمایید.`}
          rules={[
            REQUIRED_RULE,
            MAX_LENGTH_RULE(256),
            BASIC_INFO_DUPLICATE_NAME_RULE(
              existingTitles,
              "قبلاً در اطلاعات پایه ثبت شده است"
            ),
          ]}
        />
        <CustomTextArea
          label="توضیحات"
          name="description"
          placeholder={`توضیحات مورد نیاز در خصوص ${productCategoryTitle} را وارد نمایید.`}
          rows={3}
          rules={[MAX_LENGTH_RULE(1000)]}
        />
      </div>
    </Form>
  );
};

export default CateringBaseInfoDetailsAddDrawerContent;
