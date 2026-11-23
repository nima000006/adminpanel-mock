import { useRef, useState } from "react";

import { Col, Form, InputRef, Row, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomInput,
  CustomInputNumber,
  CustomSelect,
  CustomTextArea,
} from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
} from "@infra/helpers/utils";
import { useGetBasicInfoFoodsListMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { useCreateAllFoodMutation } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import { useCateringUploadFileMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import {
  CATERING_PRODUCT_CATEGORIES,
  CATERING_STATUS_TYPES,
  CATERING_STATUS_TYPES_MAIN_LIST,
} from "@pages/Catering/_shared/utils";
import { getBasicInfoFoodsListResponse } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import {
  AllContractsListContractsCreateDrawerAddFoodFormType,
  AllContractsListContractsCreateDrawerAddFoodImageFieldName,
  AllContractsListContractsCreateDrawerAddFoodImageSlotProps,
  AllContractsListContractsCreateDrawerAddFoodOnUploadFileSuccess,
  AllContractsListContractsCreateDrawerAddFoodProps,
  AllContractsListContractsCreateDrawerAddFoodUploadFile,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerAddFood/@types/@allContractsListContractsCreateDrawerAddFood";
import { AllContractsListContractsDefaultImageOption } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/modals/AllContractsListContractsDefaultImagesModal/@types/@allContractsListContractsDefaultImagesModal";
import AllContractsListContractsDefaultImagesModal from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/modals/AllContractsListContractsDefaultImagesModal/AllContractsListContractsDefaultImagesModal";
import AllContractsListContractsImageUploadSourceModal from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/modals/AllContractsListContractsImageUploadSourceModal/AllContractsListContractsImageUploadSourceModal";
import { CreateAllFoodRequest } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/@types/@cateringAllFoodList";

const CREATE_FOOD_SUCCESS_MSG = "غذا با موفقیت به قرارداد اضافه شد.";
const REQUIRED_MAIN_IMAGE_MSG = "لطفا عکس اصلی غذا را انتخاب فرمائید";
const REQUIRED_CONTRACT_ID_MSG = "ابتدا قرارداد را ثبت کنید.";
const FOOD_NOT_SELECTED_FOR_DEFAULT_IMAGE_MSG =
  "انتخاب عکس امکان پذیر نیست، هنوز غذای مورد نظر خود را انتخاب نکرده اید.";
const MAX_PRICE_EXTRA = "جهت استفاده در برنامه غذایی‌های روز فروش و آزاد.";
const DESCRIPTION_PLACEHOLDER =
  "توضیحات لازم در خصوص غذا را وارد نمایید. مانند: 100 گرم برنج ایرانی، 50 گرم خیارشور، 100 گرم گوشت مخلوط گوسفندی و گوساله.";
const LIST_PAGE_NUMBER = 0; // First page of select options.
const LIST_PAGE_SIZE = 100; // Max options loaded for the food select.

const mainUploaderText = (
  <div className="all-contracts-list-contracts-create-add-food-upload-text">
    <AiOutlinePlus size={20} />
    <span className="whitespace-normal">
      بارگذاری تصویر غذا
      <br />
      (اصلی)
    </span>
  </div>
);

const uploaderText = (
  <div className="all-contracts-list-contracts-create-add-food-upload-text">
    <AiOutlinePlus size={20} />
    <span>بارگذاری تصویر</span>
  </div>
);

const AllContractsListContractsCreateDrawerAddFoodContent = ({
  contractId,
  onClose,
  onSuccess,
}: Omit<AllContractsListContractsCreateDrawerAddFoodProps, "open">) => {
  const [form] = Form.useForm<AllContractsListContractsCreateDrawerAddFoodFormType>();
  const selectedProductBase = Form.useWatch("productBase", form);
  const isProductBaseSelected = Boolean(selectedProductBase?.code);

  const [baseProductOptions, setBaseProductOptions] = useState<IdTitle[]>([]);
  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);
  const [mainImageUploadResponse, setMainImageUploadResponse] = useState("");
  const [secondImageUploadResponse, setSecondImageUploadResponse] = useState("");
  const [thirdImageUploadResponse, setThirdImageUploadResponse] = useState("");
  const [fourthImageUploadResponse, setFourthImageUploadResponse] = useState("");
  const [isImageSourceModalOpen, setIsImageSourceModalOpen] = useState(false);
  const [isDefaultImagesModalOpen, setIsDefaultImagesModalOpen] = useState(false);
  const [activeImageField, setActiveImageField] =
    useState<AllContractsListContractsCreateDrawerAddFoodImageFieldName | null>(null);
  const systemFileInputRef = useRef<InputRef>(null);

  //? ================================  Api Calls ================================
  const [createAllFood, { isLoading: isCreateAllFoodLoading }] =
    useCreateAllFoodMutation();
  const [uploadFile, { isLoading: isUploadLoading }] = useCateringUploadFileMutation();
  const [
    getBasicInfoFoodsList,
    {
      isLoading: isGetBasicInfoFoodsListLoading,
      isSuccess: isGetBasicInfoFoodsListSuccess,
    },
  ] = useGetBasicInfoFoodsListMutation();

  //* ================================ Util Functions ================================
  const onGetBasicInfoFoodsListSuccess = (res: getBasicInfoFoodsListResponse) => {
    setBaseProductOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const getBaseProductsHandler = () => {
    if (isGetBasicInfoFoodsListSuccess) {
      return;
    }

    getBasicInfoFoodsList({
      params: {
        pageNumber: LIST_PAGE_NUMBER,
        pageSize: LIST_PAGE_SIZE,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategoryId: CATERING_PRODUCT_CATEGORIES.MAIN_FOOD,
      },
    })
      .unwrap()
      .then(onGetBasicInfoFoodsListSuccess);
  };

  const resolveUploadFilePayload = (
    file: AllContractsListContractsCreateDrawerAddFoodUploadFile
  ) => {
    if (file instanceof Blob) {
      return file;
    }

    return getUploadFilePayload(file);
  };

  const clearImageFieldError = (
    fieldName: AllContractsListContractsCreateDrawerAddFoodImageFieldName,
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

  const applyUploadedImageName = ({
    setUploadResponse,
    response,
    fieldName,
  }: AllContractsListContractsCreateDrawerAddFoodOnUploadFileSuccess) => {
    if (!response) return;
    const uploadedFileName =
      typeof response === "string" ? response.trim() : String(response);
    if (!uploadedFileName) return;
    setUploadResponse(uploadedFileName);
    clearImageFieldError(fieldName, uploadedFileName);
  };

  const onUploadFileChange = (
    image: UploadChangeParam<AllContractsListContractsCreateDrawerAddFoodUploadFile>,
    setUploadResponse: React.Dispatch<React.SetStateAction<string>>,
    fieldName: AllContractsListContractsCreateDrawerAddFoodImageFieldName,
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
      setUploadResponse("");
      return toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
    }

    const isUploadable = isImageSizeValid({ fileSize: fileToUpload.size ?? 0 });
    if (!isUploadable) {
      imageListSetter?.([]);
      setUploadResponse("");
      return toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
    }

    uploadFile(formData)
      .unwrap()
      .then((response) =>
        applyUploadedImageName({ response, setUploadResponse, fieldName })
      )
      .catch(() => {
        imageListSetter?.([]);
        setUploadResponse("");
      });
  };

  const onDeleteMainImage = () => {
    setMainImageList([]);
    setMainImageUploadResponse("");
    form.setFields([{ name: "mainImage", value: undefined }]);
  };

  const onDeleteSecondImage = () => {
    setSecondImageList([]);
    setSecondImageUploadResponse("");
    form.setFields([{ name: "secondImage", value: undefined }]);
  };

  const onDeleteThirdImage = () => {
    setThirdImageList([]);
    setThirdImageUploadResponse("");
    form.setFields([{ name: "thirdImage", value: undefined }]);
  };

  const onDeleteFourthImage = () => {
    setFourthImageList([]);
    setFourthImageUploadResponse("");
    form.setFields([{ name: "fourthImage", value: undefined }]);
  };

  const getImageFieldControllers = (
    fieldName: AllContractsListContractsCreateDrawerAddFoodImageFieldName
  ) => {
    switch (fieldName) {
      case "mainImage":
        return {
          setImageList: setMainImageList,
          setUploadResponse: setMainImageUploadResponse,
        };
      case "secondImage":
        return {
          setImageList: setSecondImageList,
          setUploadResponse: setSecondImageUploadResponse,
        };
      case "thirdImage":
        return {
          setImageList: setThirdImageList,
          setUploadResponse: setThirdImageUploadResponse,
        };
      case "fourthImage":
        return {
          setImageList: setFourthImageList,
          setUploadResponse: setFourthImageUploadResponse,
        };
    }
  };

  const openImageSourceModal = (
    fieldName: AllContractsListContractsCreateDrawerAddFoodImageFieldName
  ) => {
    setActiveImageField(fieldName);
    setIsImageSourceModalOpen(true);
  };

  const closeImageSourceModal = () => {
    setIsImageSourceModalOpen(false);
  };

  const closeDefaultImagesModal = () => {
    setIsDefaultImagesModalOpen(false);
  };

  const onSelectImageFromSystem = () => {
    closeImageSourceModal();
    systemFileInputRef.current?.input?.click();
  };

  const onSelectImageFromPanelDefaults = () => {
    if (!selectedProductBase?.code) {
      toast.warn(FOOD_NOT_SELECTED_FOR_DEFAULT_IMAGE_MSG, {
        toastId: FOOD_NOT_SELECTED_FOR_DEFAULT_IMAGE_MSG,
      });
      return;
    }

    closeImageSourceModal();
    setIsDefaultImagesModalOpen(true);
  };

  const onSystemFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !activeImageField) {
      return;
    }

    const { setImageList, setUploadResponse } =
      getImageFieldControllers(activeImageField);
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = String(reader.result ?? "");
      if (!dataUrl) return;

      setImageList([
        {
          uid: dataUrl,
          name: dataUrl,
          status: "done",
          url: dataUrl,
          originFileObj: file as RcFile,
        },
      ]);

      onUploadFileChange(
        {
          file: file as unknown as AllContractsListContractsCreateDrawerAddFoodUploadFile,
          fileList: [],
        } as UploadChangeParam<AllContractsListContractsCreateDrawerAddFoodUploadFile>,
        setUploadResponse,
        activeImageField,
        setImageList
      );
    };

    reader.readAsDataURL(file);
  };

  const onConfirmDefaultImage = (image: AllContractsListContractsDefaultImageOption) => {
    if (!activeImageField) return;

    const { setImageList, setUploadResponse } =
      getImageFieldControllers(activeImageField);
    setImageList([
      {
        uid: image.imageUrl,
        name: image.imageUrl,
        status: "done",
        url: image.imageUrl,
      },
    ]);
    setUploadResponse(image.imageName);
    clearImageFieldError(activeImageField, image.imageName);
    closeDefaultImagesModal();
    setActiveImageField(null);
  };

  const onCreateFoodSuccess = () => {
    toast.success(CREATE_FOOD_SUCCESS_MSG, {
      toastId: CREATE_FOOD_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
    onClose();
  };

  const submitHandler = (
    values: AllContractsListContractsCreateDrawerAddFoodFormType
  ) => {
    if (contractId == null) {
      toast.error(REQUIRED_CONTRACT_ID_MSG, {
        toastId: REQUIRED_CONTRACT_ID_MSG,
      });
      return;
    }

    if (!mainImageUploadResponse) {
      toast.error(REQUIRED_MAIN_IMAGE_MSG, {
        toastId: REQUIRED_MAIN_IMAGE_MSG,
      });
      form.setFields([
        {
          name: "mainImage",
          errors: [REQUIRED_MAIN_IMAGE_MSG],
        },
      ]);
      return;
    }

    const request: CreateAllFoodRequest = {
      title: values.title,
      userTitle: values.userTitle,
      description: values.description,
      mainImage: mainImageUploadResponse,
      secondImage: secondImageUploadResponse || null,
      thirdImage: thirdImageUploadResponse || null,
      fourthImage: fourthImageUploadResponse || null,
      studentalPrice: Number(values.studentalPrice),
      maxPrice: Number(values.maxPrice),
      contractId,
      statusType: CATERING_STATUS_TYPES.ACTIVE_SHOW,
      productBaseId: values.productBase.code,
    };

    createAllFood(request).unwrap().then(onCreateFoodSuccess);
  };

  const isFormBusy = isCreateAllFoodLoading || isUploadLoading;

  const renderImageSlot = ({
    fieldName,
    fileList,
    setFileList,
    setUploadResponse,
    onDeleteFile,
    uploaderTextNode,
    rules,
  }: AllContractsListContractsCreateDrawerAddFoodImageSlotProps) => {
    if (fileList.length > 0) {
      return (
        <CustomUploader
          fileList={fileList}
          setFileList={setFileList}
          isReadOnly={false}
          onDeleteFile={onDeleteFile}
          classNameOuterDiv="all-contracts-list-contracts-create-add-food-uploader"
          uploaderText={uploaderTextNode}
          hasUploaderIcon={false}
          maxCount={1}
          isDataLoading={isUploadLoading}
          isDisabled={fileList.length >= 1}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 1 مگابایت",
            size: 1,
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name={fieldName}
          rules={rules}
          onChange={(
            e: UploadChangeParam<AllContractsListContractsCreateDrawerAddFoodUploadFile>
          ) => onUploadFileChange(e, setUploadResponse, fieldName, setFileList)}
        />
      );
    }

    return (
      <CustomButton
        htmlType="button"
        className="all-contracts-list-contracts-create-add-food-empty-uploader"
        onClick={() => openImageSourceModal(fieldName)}
        disabled={isFormBusy}
      >
        {uploaderTextNode}
      </CustomButton>
    );
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="[&_.custom-select-container]:m-0"
      form={form}
      onFinish={submitHandler}
    >
      <CustomDrawerHeader
        title="افزودن غذای جدید به قرارداد"
        closeDrawerHandler={onClose}
        leftSideContent={
          <div className="flex items-center gap-2">
            <CustomButton htmlType="button" onClick={onClose} disabled={isFormBusy}>
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isCreateAllFoodLoading}
              disabled={isUploadLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />

      <div className="flex flex-col gap-10">
        <div className="flex w-full flex-col items-start gap-1">
          <div className="flex items-center justify-start gap-1">
            <span className="text-dustred-5 text-xs">*</span>
            <span className="text-neutral-12 text-sm">عکس غذا (حداقل 1 عکس)</span>
          </div>
          <div className="all-contracts-list-contracts-create-add-food-uploader-row flex w-full flex-row flex-wrap items-start gap-4">
            {renderImageSlot({
              fieldName: "mainImage",
              fileList: mainImageList,
              setFileList: setMainImageList,
              setUploadResponse: setMainImageUploadResponse,
              onDeleteFile: onDeleteMainImage,
              uploaderTextNode: mainUploaderText,
              rules: [
                () => ({
                  validator() {
                    if (!mainImageUploadResponse?.trim()) {
                      return Promise.reject(new Error(REQUIRED_MAIN_IMAGE_MSG));
                    }

                    return Promise.resolve();
                  },
                }),
              ],
            })}
            {renderImageSlot({
              fieldName: "secondImage",
              fileList: secondImageList,
              setFileList: setSecondImageList,
              setUploadResponse: setSecondImageUploadResponse,
              onDeleteFile: onDeleteSecondImage,
              uploaderTextNode: uploaderText,
            })}
            {renderImageSlot({
              fieldName: "thirdImage",
              fileList: thirdImageList,
              setFileList: setThirdImageList,
              setUploadResponse: setThirdImageUploadResponse,
              onDeleteFile: onDeleteThirdImage,
              uploaderTextNode: uploaderText,
            })}
            {renderImageSlot({
              fieldName: "fourthImage",
              fileList: fourthImageList,
              setFileList: setFourthImageList,
              setUploadResponse: setFourthImageUploadResponse,
              onDeleteFile: onDeleteFourthImage,
              uploaderTextNode: uploaderText,
            })}
          </div>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <CustomSelect
              label="غذا"
              name="productBase"
              placeholder="انتخاب کنید"
              options={baseProductOptions}
              isLoading={isGetBasicInfoFoodsListLoading}
              form={form}
              rules={[REQUIRED_RULE]}
              onClick={getBaseProductsHandler}
              notFoundContent={
                !isGetBasicInfoFoodsListSuccess ? selectNotFoundContent : undefined
              }
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInput
              type="text"
              label="عنوان نمایشی به کاربر"
              name="userTitle"
              placeholder="عنوان نمایشی غذا به کاربر را وارد نمایید"
              disabled={!isProductBaseSelected}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInput
              type="text"
              label="عنوان نمایشی در پنل مدیریت تغذیه"
              name="title"
              placeholder="عنوان نمایشی غذا در پنل مدیریت را وارد نمایید"
              disabled={!isProductBaseSelected}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInputNumber
              type="text"
              label="قیمت دانشجویی"
              name="studentalPrice"
              placeholder="قیمت دانشجویی را وارد نمایید"
              isPrice
              suffix="ریال"
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInputNumber
              type="text"
              label="حداکثر قیمت"
              name="maxPrice"
              placeholder="حداکثر قیمت را وارد نمایید"
              isPrice
              suffix="ریال"
              extra={MAX_PRICE_EXTRA}
              rules={[REQUIRED_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات نمایشی به کاربر"
              name="description"
              placeholder={DESCRIPTION_PLACEHOLDER}
              rules={[REQUIRED_RULE]}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Col>
        </Row>
      </div>

      <CustomInput
        ref={systemFileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        hasVerticalLabel={false}
        noStyle
        style={{ display: "none" }}
        value=""
        getValueProps={() => ({ value: "" })}
        getValueFromEvent={() => undefined}
        onChange={onSystemFileInputChange}
      />

      <AllContractsListContractsImageUploadSourceModal
        open={isImageSourceModalOpen}
        onCancel={closeImageSourceModal}
        onSelectFromSystem={onSelectImageFromSystem}
        onSelectFromPanelDefaults={onSelectImageFromPanelDefaults}
      />

      <AllContractsListContractsDefaultImagesModal
        open={isDefaultImagesModalOpen}
        productBaseId={selectedProductBase?.code}
        onCancel={closeDefaultImagesModal}
        onConfirm={onConfirmDefaultImage}
      />
    </Form>
  );
};

export default AllContractsListContractsCreateDrawerAddFoodContent;
