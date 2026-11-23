import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomInputNumber,
  CustomTextArea,
} from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
} from "@infra/helpers/utils";
import { useUpdateAllRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useCateringUploadFileMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  UpdateAllRequestContractProductRequest,
  UpdateAllRequestContractProductResponse,
} from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/@types/@requestsContractsListWaitedCreatedDrawerContentFoods";

import {
  EditFoodPriceDrawerContentFormTypes,
  EditFoodPriceDrawerContentProps,
  EditFoodPriceDrawerImageFieldName,
  EditFoodPriceDrawerOnUploadFileSuccess,
  EditFoodPriceDrawerUploadFile,
} from "./@types/@editFoodPriceDrawerContent";

import "./_editFoodPriceDrawerContent.scss";

const UPDATE_ALL_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG = "قیمت غذا با موفقیت ویرایش شد.";
const REQUIRED_IMAGE_MSG = "لطفا تصویر را بارگذاری کنید";

const uploaderText = (
  <div className="requests-contracts-edit-price-upload-text">
    <AiOutlinePlus size={20} />
    <span>بارگذاری تصویر</span>
  </div>
);

function EditFoodPriceDrawerContent({
  product,
  onClose,
  onSuccess,
}: EditFoodPriceDrawerContentProps) {
  const [form] = Form.useForm<EditFoodPriceDrawerContentFormTypes>();

  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

  const [mainImageName, setMainImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  //? ================================ Api Calls ================================
  const [
    updateAllRequestContractProduct,
    { isLoading: isUpdateAllRequestContractProductLoading },
  ] = useUpdateAllRequestContractProductMutation();

  const [uploadFile, { isLoading: isUploadLoading }] = useCateringUploadFileMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    form.setFieldsValue({
      studentalPrice: product.studentalPrice,
      maxPrice: product.maxPrice,
      description: product.description,
    });

    if (product.mainImage) {
      setMainImageList([
        {
          uid: product.mainImage,
          name: product.mainImage,
          status: "done",
          url: product.mainImage,
        },
      ]);
    } else {
      setMainImageList([]);
    }
    if (product.secondImage) {
      setSecondImageList([
        {
          uid: product.secondImage,
          name: product.secondImage,
          status: "done",
          url: product.secondImage,
        },
      ]);
    } else {
      setSecondImageList([]);
    }
    if (product.thirdImage) {
      setThirdImageList([
        {
          uid: product.thirdImage,
          name: product.thirdImage,
          status: "done",
          url: product.thirdImage,
        },
      ]);
    } else {
      setThirdImageList([]);
    }
    if (product.fourthImage) {
      setFourthImageList([
        {
          uid: product.fourthImage,
          name: product.fourthImage,
          status: "done",
          url: product.fourthImage,
        },
      ]);
    } else {
      setFourthImageList([]);
    }

    setMainImageName(product.mainImageTitle || "");
    setSecondImageName(product.secondImageTitle || "");
    setThirdImageName(product.thirdImageTitle || "");
    setFourthImageName(product.fourthImageTitle || "");
  }, [form, product]);

  //* ================================ Util Functions ================================
  const resolveUploadFilePayload = (file: EditFoodPriceDrawerUploadFile) => {
    if (file instanceof Blob) {
      return file;
    }

    return getUploadFilePayload(file);
  };

  const clearImageFieldError = (
    fieldName: EditFoodPriceDrawerImageFieldName,
    imageValue: string
  ) => {
    form.setFields([
      {
        name: fieldName,
        value: imageValue,
        errors: [],
      },
    ]);
  };

  const onUploadFileSuccess = ({
    setImage,
    response,
    fieldName,
  }: EditFoodPriceDrawerOnUploadFileSuccess) => {
    if (!response) return;
    setImage(response);
    clearImageFieldError(fieldName, response);
  };

  const onUploadFileChange = (
    image: UploadChangeParam<EditFoodPriceDrawerUploadFile>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    fieldName: EditFoodPriceDrawerImageFieldName,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile[]>>
  ) => {
    const fileToUpload = resolveUploadFilePayload(image.file);
    if (!fileToUpload) {
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

    uploadFile(formData)
      .unwrap()
      .then((response) => onUploadFileSuccess({ response, setImage, fieldName }))
      .catch(() => {
        imageListSetter?.([]);
        setImage("");
      });
  };

  const onDeleteMainImage = () => {
    setMainImageList([]);
    setMainImageName("");
  };

  const onDeleteSecondImage = () => {
    setSecondImageList([]);
    setSecondImageName("");
  };

  const onDeleteThirdImage = () => {
    setThirdImageList([]);
    setThirdImageName("");
  };

  const onDeleteFourthImage = () => {
    setFourthImageList([]);
    setFourthImageName("");
  };

  const onUpdateSuccess = (_res: UpdateAllRequestContractProductResponse) => {
    toast.success(UPDATE_ALL_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG, {
      toastId: UPDATE_ALL_REQUEST_CONTRACT_PRODUCT_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
  };

  const submitHandler = (values: EditFoodPriceDrawerContentFormTypes) => {
    const request: UpdateAllRequestContractProductRequest = {
      id: product.id,
      contractId: product.contractId,
      title: product.title,
      description: values.description,
      studentalPrice: Number(values.studentalPrice),
      maxPrice: Number(values.maxPrice),
      mainImage: mainImageName || null,
      secondImage: secondImageName || null,
      thirdImage: thirdImageName || null,
      fourthImage: fourthImageName || null,
    };

    updateAllRequestContractProduct(request).unwrap().then(onUpdateSuccess);
  };

  const isFormBusy = isUpdateAllRequestContractProductLoading || isUploadLoading;

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} onFinish={submitHandler}>
      <CustomDrawerHeader
        title="ویرایش غذا"
        closeDrawerHandler={onClose}
        leftSideContent={
          <>
            <CustomButton htmlType="button" onClick={onClose} disabled={isFormBusy}>
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isUpdateAllRequestContractProductLoading}
              disabled={isUploadLoading}
            >
              ثبت
            </CustomButton>
          </>
        }
      />

      <div className="flex flex-col gap-10">
        <Row gutter={[16, 16]} className="requests-contracts-edit-price-uploader-row">
          <Col>
            <CustomUploader
              fileList={mainImageList}
              setFileList={setMainImageList}
              isReadOnly={false}
              onDeleteFile={onDeleteMainImage}
              classNameOuterDiv="requests-contracts-edit-price-uploader"
              uploaderText={uploaderText}
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadLoading}
              isDisabled={mainImageList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="mainImage"
              imageSetter={setMainImageName}
              rules={[
                () => ({
                  validator() {
                    if (mainImageName?.length < 1) {
                      return Promise.reject(new Error(REQUIRED_IMAGE_MSG));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              onChange={(e: UploadChangeParam<EditFoodPriceDrawerUploadFile>) =>
                onUploadFileChange(e, setMainImageName, "mainImage", setMainImageList)
              }
            />
          </Col>
          <Col>
            <CustomUploader
              fileList={secondImageList}
              setFileList={setSecondImageList}
              isReadOnly={false}
              onDeleteFile={onDeleteSecondImage}
              classNameOuterDiv="requests-contracts-edit-price-uploader"
              uploaderText={uploaderText}
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadLoading}
              isDisabled={secondImageList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="secondImage"
              imageSetter={setSecondImageName}
              onChange={(e: UploadChangeParam<EditFoodPriceDrawerUploadFile>) =>
                onUploadFileChange(
                  e,
                  setSecondImageName,
                  "secondImage",
                  setSecondImageList
                )
              }
            />
          </Col>
          <Col>
            <CustomUploader
              fileList={thirdImageList}
              setFileList={setThirdImageList}
              isReadOnly={false}
              onDeleteFile={onDeleteThirdImage}
              classNameOuterDiv="requests-contracts-edit-price-uploader"
              uploaderText={uploaderText}
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadLoading}
              isDisabled={thirdImageList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="thirdImage"
              imageSetter={setThirdImageName}
              onChange={(e: UploadChangeParam<EditFoodPriceDrawerUploadFile>) =>
                onUploadFileChange(e, setThirdImageName, "thirdImage", setThirdImageList)
              }
            />
          </Col>
          <Col>
            <CustomUploader
              fileList={fourthImageList}
              setFileList={setFourthImageList}
              isReadOnly={false}
              onDeleteFile={onDeleteFourthImage}
              classNameOuterDiv="requests-contracts-edit-price-uploader"
              uploaderText={uploaderText}
              hasUploaderIcon={false}
              maxCount={1}
              isDataLoading={isUploadLoading}
              isDisabled={fourthImageList?.length >= 1}
              UploadSizeLimitConfig={{
                isActive: true,
                text: "حداکثر 1 مگابایت",
                size: 1,
              }}
              validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
              name="fourthImage"
              imageSetter={setFourthImageName}
              onChange={(e: UploadChangeParam<EditFoodPriceDrawerUploadFile>) =>
                onUploadFileChange(
                  e,
                  setFourthImageName,
                  "fourthImage",
                  setFourthImageList
                )
              }
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="غذا" value={product.baseProductTitle} span={12} />
          <SingleVerticalWithCol
            label="عنوان نمایشی در پنل مدیریت تغذیه"
            value={product.title}
            span={12}
          />
          <SingleVerticalWithCol
            label="عنوان نمایشی به کاربر"
            value={product.userTitle}
            span={12}
          />
          <SingleVerticalWithCol
            label="قرارداد"
            value={product.contractTitle}
            span={12}
          />
          <Col xs={24} sm={12}>
            <CustomInputNumber
              type="text"
              label="قیمت دانشجویی"
              name="studentalPrice"
              placeholder="قیمت دانشجویی"
              isPrice
              suffix="ریال"
              initialValue={product.studentalPrice}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInputNumber
              type="text"
              label="حداکثر قیمت"
              name="maxPrice"
              placeholder="حداکثر قیمت"
              isPrice
              suffix="ریال"
              initialValue={product.maxPrice}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات نمایشی به کاربر"
              name="description"
              rules={[REQUIRED_RULE]}
              showCount
              maxLength={500}
            />
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default EditFoodPriceDrawerContent;
