import { useEffect, useRef, useState } from "react";

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
import Div from "@components/Renderers/Div/Div";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
  selectDefaultValueGenerator,
} from "@infra/helpers/utils";
import { useGetBasicInfoFoodsListMutation } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { useUpdateAllRequestContractProductMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import {
  useCreateAllFoodMutation,
  useViewAllFoodQuery,
} from "@infra/states/redux/Apis/catering/foods/foodsApis";
import {
  useCateringUploadFileMutation,
  useGetDetailAllSelfsContractsMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
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
import { REQUEST_CONTRACT_STATUS_FILTER } from "@pages/Catering/contracts/_shared/@requestContractStatus";
import { UpdateAllRequestContractProductRequest } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/@types/@requestsContractsListWaitedCreatedDrawerContentFoods";
import {
  CreateAllFoodRequest,
  ViewAllFoodResponse,
} from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/@types/@cateringAllFoodList";
import {
  CateringAllFoodListCreateDrawerContentFormType,
  CateringAllFoodListCreateDrawerContentProps,
  CateringAllFoodListCreateDrawerImageFieldName,
  CateringAllFoodListCreateDrawerImageSlotProps,
  CateringAllFoodListCreateDrawerOnUploadFileSuccess,
  CateringAllFoodListCreateDrawerUploadFile,
} from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/helper/drawer/CateringAllFoodListCreateDrawer/helper/components/CateringAllFoodListCreateDrawerContent/@types/@cateringAllFoodListCreateDrawerContent";
import { CateringAllFoodListDefaultImageOption } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/helper/modals/CateringAllFoodListDefaultImagesModal/@types/@cateringAllFoodListDefaultImagesModal";
import CateringAllFoodListDefaultImagesModal from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/helper/modals/CateringAllFoodListDefaultImagesModal/CateringAllFoodListDefaultImagesModal";
import CateringAllFoodListImageUploadSourceModal from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/helper/modals/CateringAllFoodListImageUploadSourceModal/CateringAllFoodListImageUploadSourceModal";
import { GetDetailAllSelfsContractsResponse } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";

import "./_cateringAllFoodListCreateDrawerContent.scss";

const CREATE_ALL_FOOD_SUCCESS_MSG = "غذا با موفقیت ایجاد شد.";
const UPDATE_ALL_FOOD_SUCCESS_MSG = "غذا با موفقیت ویرایش شد.";
const REQUIRED_MAIN_IMAGE_MSG = "لطفا عکس اصلی غذا را انتخاب فرمائید";
const FOOD_NOT_SELECTED_FOR_DEFAULT_IMAGE_MSG =
  "انتخاب عکس امکان پذیر نیست، هنوز غذای مورد نظر خود را انتخاب نکرده اید.";
const MAX_PRICE_EXTRA = "جهت استفاده در برنامه غذایی‌های روز فروش و آزاد.";
const DESCRIPTION_PLACEHOLDER =
  "توضیحات لازم در خصوص غذا را وارد نمایید. مانند: 100 گرم برنج ایرانی، 50 گرم خیارشور، 100 گرم گوشت مخلوط گوسفندی و گوساله.";

const mainUploaderText = (
  <div className="catering-all-food-list-create-upload-text">
    <AiOutlinePlus size={20} />
    <span className="whitespace-normal">
      بارگذاری تصویر غذا
      <br />
      (اصلی)
    </span>
  </div>
);

const uploaderText = (
  <div className="catering-all-food-list-create-upload-text">
    <AiOutlinePlus size={20} />
    <span>بارگذاری تصویر</span>
  </div>
);

const CateringAllFoodListCreateDrawerContent = ({
  onCloseDrawer,
  onSuccess,
  mode = "create",
  foodId,
}: CateringAllFoodListCreateDrawerContentProps) => {
  const isEditMode = mode === "edit";
  const [form] = Form.useForm<CateringAllFoodListCreateDrawerContentFormType>();
  const selectedProductBase = Form.useWatch("productBase", form);
  const isProductBaseSelected = Boolean(selectedProductBase?.code);

  const [baseProductOptions, setBaseProductOptions] = useState<IdTitle[]>([]);
  const [contractOptions, setContractOptions] = useState<IdTitle[]>([]);

  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

  const [mainImageName, setMainImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  const [isImageSourceModalOpen, setIsImageSourceModalOpen] = useState(false);
  const [isDefaultImagesModalOpen, setIsDefaultImagesModalOpen] = useState(false);
  const [activeImageField, setActiveImageField] =
    useState<CateringAllFoodListCreateDrawerImageFieldName | null>(null);
  const systemFileInputRef = useRef<InputRef>(null);

  //? ================================ Api Calls ================================
  const { data: foodViewData, isFetching: isViewAllFoodLoading } = useViewAllFoodQuery(
    { id: Number(foodId) },
    { skip: !isEditMode || !foodId, refetchOnMountOrArgChange: true }
  );

  const [createAllFood, { isLoading: isCreateAllFoodLoading }] =
    useCreateAllFoodMutation();
  const [
    updateAllRequestContractProduct,
    { isLoading: isUpdateAllRequestContractProductLoading },
  ] = useUpdateAllRequestContractProductMutation();
  const [uploadFile, { isLoading: isUploadLoading }] = useCateringUploadFileMutation();

  const [
    getBasicInfoFoodsList,
    {
      isLoading: isGetBasicInfoFoodsListLoading,
      isSuccess: isGetBasicInfoFoodsListSuccess,
    },
  ] = useGetBasicInfoFoodsListMutation();

  const [
    getDetailAllSelfsContracts,
    {
      isLoading: isGetDetailAllSelfsContractsLoading,
      isSuccess: isGetDetailAllSelfsContractsSuccess,
    },
  ] = useGetDetailAllSelfsContractsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isEditMode && foodViewData) {
      populateFormFromDetail(foodViewData);
    }
  }, [isEditMode, foodViewData]);

  //* ================================ Util Functions ================================
  const populateFormFromDetail = (data: ViewAllFoodResponse) => {
    if (data.baseProductId) {
      setBaseProductOptions([
        {
          id: data.baseProductId,
          title: data.baseProductTitle,
        },
      ]);
    }

    if (data.contractId) {
      setContractOptions([
        {
          id: data.contractId,
          title: data.contractTitle,
        },
      ]);
    }

    if (data.mainImage) {
      setMainImageList([
        {
          uid: data.mainImage,
          name: data.mainImage,
          status: "done",
          url: data.mainImage,
        },
      ]);
    } else {
      setMainImageList([]);
    }
    if (data.secondImage) {
      setSecondImageList([
        {
          uid: data.secondImage,
          name: data.secondImage,
          status: "done",
          url: data.secondImage,
        },
      ]);
    } else {
      setSecondImageList([]);
    }
    if (data.thirdImage) {
      setThirdImageList([
        {
          uid: data.thirdImage,
          name: data.thirdImage,
          status: "done",
          url: data.thirdImage,
        },
      ]);
    } else {
      setThirdImageList([]);
    }
    if (data.fourthImage) {
      setFourthImageList([
        {
          uid: data.fourthImage,
          name: data.fourthImage,
          status: "done",
          url: data.fourthImage,
        },
      ]);
    } else {
      setFourthImageList([]);
    }

    setMainImageName(data.mainImageTitle || "");
    setSecondImageName(data.secondImageTitle || "");
    setThirdImageName(data.thirdImageTitle || "");
    setFourthImageName(data.fourthImageTitle || "");

    form.setFieldsValue({
      title: data.title,
      userTitle: data.userTitle,
      description: data.description,
      studentalPrice: data.studentalPrice,
      maxPrice: data.maxPrice,
      productBase: selectDefaultValueGenerator({
        id: data.baseProductId,
        title: data.baseProductTitle,
      }),
      contract: selectDefaultValueGenerator({
        id: data.contractId,
        title: data.contractTitle,
      }),
      mainImage: data.mainImageTitle || "",
      secondImage: data.secondImageTitle || "",
      thirdImage: data.thirdImageTitle || "",
      fourthImage: data.fourthImageTitle || "",
    });
  };

  const onGetBasicInfoFoodsListSuccess = (res: getBasicInfoFoodsListResponse) => {
    setBaseProductOptions(
      res?.content?.map((item) => ({
        id: item.id,
        title: item.title,
      })) ?? []
    );
  };

  const onGetDetailAllSelfsContractsSuccess = (
    res: GetDetailAllSelfsContractsResponse
  ) => {
    setContractOptions(
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
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
        productCategoryId: CATERING_PRODUCT_CATEGORIES.MAIN_FOOD,
      },
    })
      .unwrap()
      .then(onGetBasicInfoFoodsListSuccess);
  };

  const getContractsHandler = () => {
    if (isGetDetailAllSelfsContractsSuccess) {
      return;
    }

    getDetailAllSelfsContracts({
      params: {
        pageNumber: 0,
        pageSize: 100,
      },
      body: {
        contractStatus: [...REQUEST_CONTRACT_STATUS_FILTER.accepted],
      },
    })
      .unwrap()
      .then(onGetDetailAllSelfsContractsSuccess);
  };

  const resolveUploadFilePayload = (file: CateringAllFoodListCreateDrawerUploadFile) => {
    if (file instanceof Blob) {
      return file;
    }

    return getUploadFilePayload(file);
  };

  const clearImageFieldError = (
    fieldName: CateringAllFoodListCreateDrawerImageFieldName,
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
    setImage,
    response,
    fieldName,
  }: CateringAllFoodListCreateDrawerOnUploadFileSuccess) => {
    if (!response) return;
    const uploadedFileName =
      typeof response === "string" ? response.trim() : String(response);
    if (!uploadedFileName) return;
    setImage(uploadedFileName);
    clearImageFieldError(fieldName, uploadedFileName);
  };

  const onUploadFileChange = (
    image: UploadChangeParam<CateringAllFoodListCreateDrawerUploadFile>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    fieldName: CateringAllFoodListCreateDrawerImageFieldName,
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
      .then((response) => applyUploadedImageName({ response, setImage, fieldName }))
      .catch(() => {
        imageListSetter?.([]);
        setImage("");
      });
  };

  const onDeleteMainImage = () => {
    setMainImageList([]);
    setMainImageName("");
    form.setFields([{ name: "mainImage", value: undefined }]);
  };

  const onDeleteSecondImage = () => {
    setSecondImageList([]);
    setSecondImageName("");
    form.setFields([{ name: "secondImage", value: undefined }]);
  };

  const onDeleteThirdImage = () => {
    setThirdImageList([]);
    setThirdImageName("");
    form.setFields([{ name: "thirdImage", value: undefined }]);
  };

  const onDeleteFourthImage = () => {
    setFourthImageList([]);
    setFourthImageName("");
    form.setFields([{ name: "fourthImage", value: undefined }]);
  };

  const getImageFieldControllers = (
    fieldName: CateringAllFoodListCreateDrawerImageFieldName
  ) => {
    switch (fieldName) {
      case "mainImage":
        return {
          setImageList: setMainImageList,
          setImageName: setMainImageName,
        };
      case "secondImage":
        return {
          setImageList: setSecondImageList,
          setImageName: setSecondImageName,
        };
      case "thirdImage":
        return {
          setImageList: setThirdImageList,
          setImageName: setThirdImageName,
        };
      case "fourthImage":
        return {
          setImageList: setFourthImageList,
          setImageName: setFourthImageName,
        };
    }
  };

  const openImageSourceModal = (
    fieldName: CateringAllFoodListCreateDrawerImageFieldName
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

    const { setImageList, setImageName } = getImageFieldControllers(activeImageField);
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
          file: file as unknown as CateringAllFoodListCreateDrawerUploadFile,
          fileList: [],
        } as UploadChangeParam<CateringAllFoodListCreateDrawerUploadFile>,
        setImageName,
        activeImageField,
        setImageList
      );
    };

    reader.readAsDataURL(file);
  };

  const onConfirmDefaultImage = (image: CateringAllFoodListDefaultImageOption) => {
    if (!activeImageField) return;

    const { setImageList, setImageName } = getImageFieldControllers(activeImageField);
    setImageList([
      {
        uid: image.imageUrl,
        name: image.imageUrl,
        status: "done",
        url: image.imageUrl,
      },
    ]);
    setImageName(image.imageName);
    clearImageFieldError(activeImageField, image.imageName);
    closeDefaultImagesModal();
    setActiveImageField(null);
  };

  const onCreateAllFoodSuccess = () => {
    toast.success(CREATE_ALL_FOOD_SUCCESS_MSG, {
      toastId: CREATE_ALL_FOOD_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
    onCloseDrawer();
  };

  const onUpdateAllFoodSuccess = () => {
    toast.success(UPDATE_ALL_FOOD_SUCCESS_MSG, {
      toastId: UPDATE_ALL_FOOD_SUCCESS_MSG,
    });
    form.resetFields();
    onSuccess();
    onCloseDrawer();
  };

  const submitHandler = (values: CateringAllFoodListCreateDrawerContentFormType) => {
    if (!mainImageName) {
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

    if (isEditMode) {
      if (!foodId) return;

      const request: UpdateAllRequestContractProductRequest = {
        id: foodId,
        contractId: values.contract.code,
        title: values.title,
        userTitle: values.userTitle,
        productBaseId: values.productBase.code,
        description: values.description,
        studentalPrice: Number(values.studentalPrice),
        maxPrice: Number(values.maxPrice),
        mainImage: mainImageName,
        secondImage: secondImageName || null,
        thirdImage: thirdImageName || null,
        fourthImage: fourthImageName || null,
      };

      updateAllRequestContractProduct(request).unwrap().then(onUpdateAllFoodSuccess);
      return;
    }

    const request: CreateAllFoodRequest = {
      title: values.title,
      userTitle: values.userTitle,
      description: values.description,
      mainImage: mainImageName,
      secondImage: secondImageName || null,
      thirdImage: thirdImageName || null,
      fourthImage: fourthImageName || null,
      studentalPrice: Number(values.studentalPrice),
      maxPrice: Number(values.maxPrice),
      contractId: values.contract.code,
      statusType: CATERING_STATUS_TYPES.ACTIVE_SHOW,
      productBaseId: values.productBase.code,
    };

    createAllFood(request).unwrap().then(onCreateAllFoodSuccess);
  };

  const isSubmitLoading =
    isCreateAllFoodLoading || isUpdateAllRequestContractProductLoading;
  const isFormBusy = isSubmitLoading || isUploadLoading;

  const renderImageSlot = ({
    fieldName,
    fileList,
    setFileList,
    setImageName,
    onDeleteFile,
    uploaderTextNode,
    rules,
  }: CateringAllFoodListCreateDrawerImageSlotProps) => {
    if (fileList.length > 0) {
      return (
        <CustomUploader
          fileList={fileList}
          setFileList={setFileList}
          isReadOnly={false}
          onDeleteFile={onDeleteFile}
          classNameOuterDiv="catering-all-food-list-create-uploader"
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
          onChange={(e: UploadChangeParam<CateringAllFoodListCreateDrawerUploadFile>) =>
            onUploadFileChange(e, setImageName, fieldName, setFileList)
          }
        />
      );
    }

    return (
      <CustomButton
        htmlType="button"
        className="catering-all-food-list-create-empty-uploader"
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
        title={isEditMode ? "ویرایش غذا" : "ایجاد غذا"}
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          <div className="flex items-center gap-2">
            <CustomButton htmlType="button" onClick={onCloseDrawer} disabled={isFormBusy}>
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isSubmitLoading}
              disabled={isUploadLoading}
            >
              {isEditMode ? "ویرایش" : "ثبت"}
            </CustomButton>
          </div>
        }
      />

      <Div loading={isEditMode && isViewAllFoodLoading}>
        <div className="flex flex-col gap-10">
          <div className="flex w-full flex-col items-start gap-1">
            <div className="flex items-center justify-start gap-1">
              <span className="text-dustred-5 text-xs">*</span>
              <span className="text-neutral-12 text-sm">عکس غذا (حداقل 1 عکس)</span>
            </div>
            <div className="catering-all-food-list-create-uploader-row flex w-full flex-row flex-wrap items-start gap-4">
              {renderImageSlot({
                fieldName: "mainImage",
                fileList: mainImageList,
                setFileList: setMainImageList,
                setImageName: setMainImageName,
                onDeleteFile: onDeleteMainImage,
                uploaderTextNode: mainUploaderText,
                rules: [
                  () => ({
                    validator() {
                      if (!mainImageName?.trim()) {
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
                setImageName: setSecondImageName,
                onDeleteFile: onDeleteSecondImage,
                uploaderTextNode: uploaderText,
              })}
              {renderImageSlot({
                fieldName: "thirdImage",
                fileList: thirdImageList,
                setFileList: setThirdImageList,
                setImageName: setThirdImageName,
                onDeleteFile: onDeleteThirdImage,
                uploaderTextNode: uploaderText,
              })}
              {renderImageSlot({
                fieldName: "fourthImage",
                fileList: fourthImageList,
                setFileList: setFourthImageList,
                setImageName: setFourthImageName,
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
              <CustomSelect
                label="قرارداد"
                name="contract"
                placeholder="انتخاب کنید"
                options={contractOptions}
                isLoading={isGetDetailAllSelfsContractsLoading}
                form={form}
                rules={[REQUIRED_RULE]}
                onClick={getContractsHandler}
                notFoundContent={
                  !isGetDetailAllSelfsContractsSuccess ? selectNotFoundContent : undefined
                }
              />
            </Col>
            <Col xs={24} sm={12}>
              <CustomInputNumber
                key={
                  isEditMode
                    ? `studental-${foodId}-${foodViewData?.studentalPrice ?? "loading"}`
                    : "studental-create"
                }
                type="text"
                label="قیمت دانشجویی"
                name="studentalPrice"
                placeholder="قیمت دانشجویی را وارد نمایید"
                isPrice
                suffix="ریال"
                initialValue={isEditMode ? foodViewData?.studentalPrice : undefined}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col xs={24} sm={12}>
              <CustomInputNumber
                key={
                  isEditMode
                    ? `max-${foodId}-${foodViewData?.maxPrice ?? "loading"}`
                    : "max-create"
                }
                type="text"
                label="حداکثر قیمت"
                name="maxPrice"
                placeholder="حداکثر قیمت را وارد نمایید"
                isPrice
                suffix="ریال"
                initialValue={isEditMode ? foodViewData?.maxPrice : undefined}
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
      </Div>

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

      <CateringAllFoodListImageUploadSourceModal
        open={isImageSourceModalOpen}
        onCancel={closeImageSourceModal}
        onSelectFromSystem={onSelectImageFromSystem}
        onSelectFromPanelDefaults={onSelectImageFromPanelDefaults}
      />

      <CateringAllFoodListDefaultImagesModal
        open={isDefaultImagesModalOpen}
        productBaseId={selectedProductBase?.code}
        onCancel={closeDefaultImagesModal}
        onConfirm={onConfirmDefaultImage}
      />
    </Form>
  );
};

export default CateringAllFoodListCreateDrawerContent;
