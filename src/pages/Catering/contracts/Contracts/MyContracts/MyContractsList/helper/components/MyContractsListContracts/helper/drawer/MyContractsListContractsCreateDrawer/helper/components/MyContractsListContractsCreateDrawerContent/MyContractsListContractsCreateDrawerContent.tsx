import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import moment from "jalali-moment";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomInput,
  CustomRangePicker,
  CustomSelect,
  CustomTextArea,
} from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
} from "@infra/helpers/utils";
import {
  useCreateMyContractMutation,
  useSubmitMyContractMutation,
} from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import {
  useCateringUploadFileMutation,
  useGetCateringMySelfsListMutation,
} from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { useGetMyVendorListMutation } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import MyContractsListContractsAddFoodMenuButton from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsAddFoodMenuButton/MyContractsListContractsAddFoodMenuButton";
import MyContractsListContractsCreateDrawerFoods from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/_shared/components/MyContractsListContractsCreateDrawerFoods/MyContractsListContractsCreateDrawerFoods";
import {
  CreateMyContractRequest,
  CreateMyContractResponse,
  MyContractsListContractsCreateDrawerContentFormType,
  MyContractsListContractsCreateDrawerContentProps,
  MyContractsListContractsCreateDrawerStep,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCreateDrawer/helper/components/MyContractsListContractsCreateDrawerContent/@types/@myContractsListContractsCreateDrawerContent";
import { GetCateringMySelfsListResponse } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import { GetMyVendorListResponse } from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

import "./_myContractsListContractsCreateDrawerContent.scss";

const CREATE_NEW_CONTRACT_SUCCESS_MSG = "قرارداد با موفقیت ایجاد شد.";
const SUBMIT_CONTRACT_SUCCESS_MSG = "درخواست قرارداد با موفقیت ثبت شد.";
const REQUIRED_IMAGE_MSG = "لطفا تصویر را انتخاب فرمائید";
const IMAGE_VALID_FORMATS = ["image/png", "image/jpeg", "image/jpg"];
const LIST_PAGE_NUMBER = 0; // First page of select options.
const LIST_PAGE_SIZE = 100; // Max options loaded for vendor/self selects.
const CONTRACT_DETAILS_STEP = 0; // Contract info form step.
const CONTRACT_FOODS_STEP = 1; // Contract foods list step.
const STEP_1_FIELD_NAMES = [
  "contractTitle",
  "vendor",
  "self",
  "contractNo",
  "contractDateRange",
  "contractDescription",
] as const;

const imageUploaderText = (
  <div className="my-contracts-list-contracts-create-upload-text">
    <AiOutlinePlus size={20} />
    <span>بارگذاری تصویر</span>
  </div>
);

const MyContractsListContractsCreateDrawerContent = ({
  onCloseDrawer,
  onSuccess,
  foodsRefreshKey,
  onOpenAddFood,
  onOpenAddSideDish,
  onOpenEditFood,
  onContractCreated,
  resumeContractId = null,
}: MyContractsListContractsCreateDrawerContentProps) => {
  const [form] = Form.useForm<MyContractsListContractsCreateDrawerContentFormType>();
  const [currentStep, setCurrentStep] =
    useState<MyContractsListContractsCreateDrawerStep>(
      resumeContractId != null ? CONTRACT_FOODS_STEP : CONTRACT_DETAILS_STEP
    );
  const [createdContractId, setCreatedContractId] = useState<number | null>(
    resumeContractId ?? null
  );

  const [vendorOptions, setVendorOptions] = useState<IdTitle[]>([]);
  const [selfOptions, setSelfOptions] = useState<IdTitle[]>([]);
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);
  const [firstImageName, setFirstImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  //? ================================  Api Calls ================================
  const [createMyContract, { isLoading: isCreateMyContractLoading }] =
    useCreateMyContractMutation();
  const [submitMyContract, { isLoading: isSubmitMyContractLoading }] =
    useSubmitMyContractMutation();
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useCateringUploadFileMutation();
  const [getVendors, { isLoading: isVendorsDataLoading, isSuccess: isVendorsSuccess }] =
    useGetMyVendorListMutation();
  const [
    getCateringSelfsList,
    { isLoading: isSelfDataLoading, isSuccess: isSelfsSuccess },
  ] = useGetCateringMySelfsListMutation();

  //* ================================ Effects ================================
  useEffect(() => {
    if (resumeContractId == null) {
      return;
    }

    setCreatedContractId(resumeContractId);
    onContractCreated(resumeContractId);
    setCurrentStep(CONTRACT_FOODS_STEP);
  }, [resumeContractId, onContractCreated]);

  //* ================================ Util Functions ================================
  const onGetVendorsSuccess = (value: GetMyVendorListResponse) => {
    setVendorOptions(
      value?.content?.map((item) => ({ id: item?.id, title: item?.title })) ?? []
    );
  };

  const onGetSelfsSuccess = (value: GetCateringMySelfsListResponse) => {
    setSelfOptions(
      value?.content?.map((item) => ({ id: item?.id, title: item?.title })) ?? []
    );
  };

  const getVendorsHandler = () => {
    if (isVendorsSuccess) return;

    getVendors({
      params: {
        pageNumber: LIST_PAGE_NUMBER,
        pageSize: LIST_PAGE_SIZE,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
      },
    })
      .unwrap()
      .then(onGetVendorsSuccess);
  };

  const getSelfsHandler = () => {
    if (isSelfsSuccess) return;

    getCateringSelfsList({
      params: {
        pageNumber: LIST_PAGE_NUMBER,
        pageSize: LIST_PAGE_SIZE,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        statusType: CATERING_STATUS_TYPES_MAIN_LIST,
      },
    })
      .unwrap()
      .then(onGetSelfsSuccess);
  };

  const resolveUploadFilePayload = (file: UploadFile | File | Blob) => {
    if (!(file instanceof Blob) && "originFileObj" in file && file.originFileObj) {
      return file.originFileObj as File | Blob;
    }

    if (file instanceof Blob) {
      return file;
    }

    return getUploadFilePayload(file);
  };

  type ContractDocumentImageField =
    "firstImage" | "secondImage" | "thirdImage" | "fourthImage";

  const clearImageFieldError = (fieldName: ContractDocumentImageField) => {
    form.setFields([
      {
        name: fieldName,
        errors: [],
      },
    ]);
  };

  const onUploadFileChange = (
    image: UploadChangeParam<UploadFile | File | Blob>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    fieldName: ContractDocumentImageField,
    imageListSetter?: React.Dispatch<React.SetStateAction<UploadFile[]>>
  ) => {
    const fileToUpload = resolveUploadFilePayload(image.file);
    if (!fileToUpload) {
      imageListSetter?.([]);
      setImage("");
      return;
    }

    const isFileFormatCorrect = isImageFormatValid({
      fileFormat: fileToUpload.type ?? "",
      allowedTypes: IMAGE_VALID_FORMATS,
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

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const onUploadFileSuccess = (response: string) => {
      const uploadedFileName = response?.trim()?.replace(/^"|"$/g, "");
      if (uploadedFileName && !uploadedFileName.startsWith("data:")) {
        setImage(uploadedFileName);
        clearImageFieldError(fieldName);
      } else {
        imageListSetter?.([]);
        setImage("");
      }
    };

    uploadFile(formData)
      .unwrap()
      .then(onUploadFileSuccess)
      .catch(() => {
        imageListSetter?.([]);
        setImage("");
      });
  };

  const onCreateMyContractSuccess = (value: CreateMyContractResponse) => {
    toast.success(CREATE_NEW_CONTRACT_SUCCESS_MSG, {
      toastId: CREATE_NEW_CONTRACT_SUCCESS_MSG,
    });
    setCreatedContractId(value);
    onContractCreated(value);
    setCurrentStep(CONTRACT_FOODS_STEP);
  };

  const onSubmitMyContractSuccess = () => {
    toast.success(SUBMIT_CONTRACT_SUCCESS_MSG, {
      toastId: SUBMIT_CONTRACT_SUCCESS_MSG,
    });
    onSuccess();
    onCloseDrawer();
  };

  const submitMyContractHandler = () => {
    if (createdContractId == null) {
      return;
    }

    submitMyContract({ id: createdContractId }).unwrap().then(onSubmitMyContractSuccess);
  };

  const isServerUploadedFileName = (fileName: string) =>
    Boolean(fileName) && !fileName.startsWith("data:");

  const getUploadedDocumentNames = () => ({
    firstImage: isServerUploadedFileName(firstImageName) ? firstImageName : "",
    secondImage: isServerUploadedFileName(secondImageName) ? secondImageName : "",
    thirdImage: isServerUploadedFileName(thirdImageName) ? thirdImageName : null,
    fourthImage: isServerUploadedFileName(fourthImageName) ? fourthImageName : null,
  });

  const showRequiredImageErrors = () => {
    form.setFields([
      {
        name: "firstImage",
        errors: isServerUploadedFileName(firstImageName) ? [] : [REQUIRED_IMAGE_MSG],
      },
      {
        name: "secondImage",
        errors: isServerUploadedFileName(secondImageName) ? [] : [REQUIRED_IMAGE_MSG],
      },
    ]);
  };

  const goToFoodsStepHandler = (
    values: MyContractsListContractsCreateDrawerContentFormType
  ) => {
    const { firstImage, secondImage, thirdImage, fourthImage } =
      getUploadedDocumentNames();
    if (!firstImage || !secondImage) {
      showRequiredImageErrors();
      return;
    }

    const contractDateRange = values.contractDateRange;
    const startDateValue = contractDateRange?.[0] ? moment(contractDateRange[0]) : null;
    const endDateValue = contractDateRange?.[1] ? moment(contractDateRange[1]) : null;

    if (!startDateValue?.isValid() || !endDateValue?.isValid()) {
      form.setFields([
        {
          name: "contractDateRange",
          errors: ["اطلاعات ضروری می باشد."],
        },
      ]);
      return;
    }

    const startedDate = `${startDateValue.format("YYYY-MM-DD")}T00:00:00`;
    const endDate = `${endDateValue.format("YYYY-MM-DD")}T23:59:59`;

    if (
      !values.contractTitle ||
      !values.contractNo ||
      !values.contractDescription ||
      values.self?.code == null ||
      values.vendor?.code == null
    ) {
      form.validateFields([...STEP_1_FIELD_NAMES]);
      return;
    }

    form.setFieldsValue(values);

    const request: CreateMyContractRequest = {
      title: values.contractTitle,
      description: values.contractDescription,
      restaurantId: values.self.code,
      vendorId: values.vendor.code,
      startedDate,
      endDate,
      contractUUID: values.contractNo,
      file1: firstImage,
      file2: secondImage,
      file3: thirdImage || null,
      file4: fourthImage || null,
    };

    createMyContract(request).unwrap().then(onCreateMyContractSuccess);
  };

  const primaryActionHandler = () => {
    if (currentStep === CONTRACT_DETAILS_STEP) {
      form
        .validateFields([...STEP_1_FIELD_NAMES])
        .then(goToFoodsStepHandler)
        .catch(() => {
          showRequiredImageErrors();
        });
      return;
    }

    submitMyContractHandler();
  };

  const openAddFoodHandler = () => {
    if (createdContractId == null) {
      return;
    }

    onOpenAddFood(createdContractId);
  };

  const openAddSideDishHandler = () => {
    if (createdContractId == null) {
      return;
    }

    onOpenAddSideDish(createdContractId);
  };

  const stepItems = [{ title: "ایجاد قرارداد" }, { title: "غذاهای قرارداد" }];

  const isPrimaryActionLoading = isCreateMyContractLoading || isSubmitMyContractLoading;
  const isBusy = isPrimaryActionLoading || isUploadFileLoading;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      className="my-contracts-list-contracts-create-drawer-content [&_.custom-select-container]:m-0"
    >
      <CustomDrawerHeader
        title="تعریف قرارداد جدید"
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          <div className="flex items-center gap-2">
            <CustomButton htmlType="button" onClick={onCloseDrawer} disabled={isBusy}>
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="button"
              type="primary"
              onClick={primaryActionHandler}
              loading={isPrimaryActionLoading}
              disabled={isUploadFileLoading}
            >
              ثبت درخواست
            </CustomButton>
          </div>
        }
      />

      <CustomSteps
        className="mb-8"
        current={currentStep}
        items={stepItems}
        isClickable={false}
      />

      {currentStep === CONTRACT_DETAILS_STEP && (
        <div className="flex flex-col gap-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <CustomInput
                type="text"
                label="عنوان قرارداد"
                name="contractTitle"
                placeholder="وارد نمایید"
                rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(100)]}
              />
            </Col>
            <Col xs={24} sm={12}>
              <CustomSelect
                label="تأمین کننده"
                name="vendor"
                placeholder="انتخاب کنید"
                options={vendorOptions}
                isLoading={isVendorsDataLoading}
                form={form}
                rules={[REQUIRED_RULE]}
                onClick={getVendorsHandler}
                notFoundContent={!isVendorsSuccess ? selectNotFoundContent : undefined}
              />
            </Col>
            <Col xs={24} sm={12}>
              <CustomSelect
                label="سلف"
                name="self"
                placeholder="انتخاب کنید"
                options={selfOptions}
                isLoading={isSelfDataLoading}
                form={form}
                rules={[REQUIRED_RULE]}
                onClick={getSelfsHandler}
                notFoundContent={!isSelfsSuccess ? selectNotFoundContent : undefined}
              />
            </Col>
            <Col xs={24} sm={12}>
              <CustomInput
                type="text"
                label="شماره قرارداد"
                name="contractNo"
                placeholder="وارد نمایید"
                rules={[REQUIRED_RULE, MAX_LENGTH_RULE(20)]}
              />
            </Col>
            <Col xs={24} sm={12}>
              <CustomRangePicker
                label="شروع و پایان قرارداد"
                name="contractDateRange"
                rules={[REQUIRED_RULE]}
                form={form}
              />
            </Col>
            <Col span={24}>
              <CustomTextArea
                label="توضیحات"
                name="contractDescription"
                placeholder="وارد نمایید"
                maxLength={500}
                showCount
                autoSize={{ minRows: 3, maxRows: 5 }}
                rules={[REQUIRED_RULE]}
              />
            </Col>
          </Row>

          <div className="my-contracts-list-contracts-create-documents">
            <div className="flex items-center gap-1">
              <span className="text-dustred-5 text-xs">*</span>
              <p className="my-contracts-list-contracts-create-documents__label">
                اسناد مربوطه (تصویر ۱ و ۲ الزامی است)
              </p>
            </div>
            <div className="my-contracts-list-contracts-create-documents__uploaders">
              <CustomUploader
                fileList={firstImageList}
                setFileList={setFirstImageList}
                isReadOnly={false}
                onDeleteFile={() => {
                  setFirstImageName("");
                  form.setFields([{ name: "firstImage", value: undefined }]);
                }}
                uploaderText={imageUploaderText}
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={firstImageList.length >= 1}
                accept="image/png,image/jpeg,image/jpg"
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                  sizeUnit: "MB",
                }}
                validFileFormat={IMAGE_VALID_FORMATS}
                name="firstImage"
                classNameOuterDiv="my-contracts-list-contracts-create-uploader"
                rules={[
                  () => ({
                    validator() {
                      if (!isServerUploadedFileName(firstImageName)) {
                        return Promise.reject(new Error(REQUIRED_IMAGE_MSG));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                onChange={(e: UploadChangeParam<UploadFile>) =>
                  onUploadFileChange(
                    e,
                    setFirstImageName,
                    "firstImage",
                    setFirstImageList
                  )
                }
              />
              <CustomUploader
                fileList={secondImageList}
                setFileList={setSecondImageList}
                isReadOnly={false}
                onDeleteFile={() => {
                  setSecondImageName("");
                  form.setFields([{ name: "secondImage", value: undefined }]);
                }}
                uploaderText={imageUploaderText}
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={secondImageList.length >= 1}
                accept="image/png,image/jpeg,image/jpg"
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                  sizeUnit: "MB",
                }}
                validFileFormat={IMAGE_VALID_FORMATS}
                name="secondImage"
                classNameOuterDiv="my-contracts-list-contracts-create-uploader"
                rules={[
                  () => ({
                    validator() {
                      if (!isServerUploadedFileName(secondImageName)) {
                        return Promise.reject(new Error(REQUIRED_IMAGE_MSG));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                onChange={(e: UploadChangeParam<UploadFile>) =>
                  onUploadFileChange(
                    e,
                    setSecondImageName,
                    "secondImage",
                    setSecondImageList
                  )
                }
              />
              <CustomUploader
                fileList={thirdImageList}
                setFileList={setThirdImageList}
                isReadOnly={false}
                onDeleteFile={() => {
                  setThirdImageName("");
                  form.setFields([{ name: "thirdImage", value: undefined }]);
                }}
                uploaderText={imageUploaderText}
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={thirdImageList.length >= 1}
                accept="image/png,image/jpeg,image/jpg"
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                  sizeUnit: "MB",
                }}
                validFileFormat={IMAGE_VALID_FORMATS}
                name="thirdImage"

                classNameOuterDiv="my-contracts-list-contracts-create-uploader"
                onChange={(e: UploadChangeParam<UploadFile>) =>
                  onUploadFileChange(
                    e,
                    setThirdImageName,
                    "thirdImage",
                    setThirdImageList
                  )
                }
              />
              <CustomUploader
                fileList={fourthImageList}
                setFileList={setFourthImageList}
                isReadOnly={false}
                onDeleteFile={() => {
                  setFourthImageName("");
                  form.setFields([{ name: "fourthImage", value: undefined }]);
                }}
                uploaderText={imageUploaderText}
                hasUploaderIcon={false}
                maxCount={1}
                isDataLoading={isUploadFileLoading}
                isDisabled={fourthImageList.length >= 1}
                accept="image/png,image/jpeg,image/jpg"
                UploadSizeLimitConfig={{
                  isActive: true,
                  text: "حداکثر 1 مگابایت",
                  size: 1,
                  sizeUnit: "MB",
                }}
                validFileFormat={IMAGE_VALID_FORMATS}
                name="fourthImage"

                classNameOuterDiv="my-contracts-list-contracts-create-uploader"
                onChange={(e: UploadChangeParam<UploadFile>) =>
                  onUploadFileChange(
                    e,
                    setFourthImageName,
                    "fourthImage",
                    setFourthImageList
                  )
                }
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === CONTRACT_FOODS_STEP && (
        <div className="flex flex-col gap-4">
          <div>
            <MyContractsListContractsAddFoodMenuButton
              onAddMainFood={openAddFoodHandler}
              onAddSideDish={openAddSideDishHandler}
            />
          </div>
          {createdContractId != null ? (
            <MyContractsListContractsCreateDrawerFoods
              contractId={createdContractId}
              refreshKey={foodsRefreshKey}
              onEditPrice={onOpenEditFood}
            />
          ) : (
            <CustomEmpty description="هنوز غذایی به قرارداد اضافه نکرده اید." />
          )}
        </div>
      )}
    </Form>
  );
};

export default MyContractsListContractsCreateDrawerContent;
