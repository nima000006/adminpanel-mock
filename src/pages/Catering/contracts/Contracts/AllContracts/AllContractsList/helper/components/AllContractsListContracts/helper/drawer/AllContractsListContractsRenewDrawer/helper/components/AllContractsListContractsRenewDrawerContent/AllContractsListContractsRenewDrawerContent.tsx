import { useEffect, useMemo, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import dayjs, { Dayjs } from "dayjs";
import moment from "jalali-moment";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomInput,
  CustomRangePicker,
  CustomTextArea,
} from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
} from "@infra/helpers/utils";
import {
  useExtendAllContractMutation,
  useSubmitAllContractMutation,
} from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useCateringUploadFileMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  ExtendAllContractRequest,
  ExtendAllContractResponse,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/@types/@allContractsListContracts";
import AllContractsListContractsAddFoodMenuButton from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsAddFoodMenuButton/AllContractsListContractsAddFoodMenuButton";
import AllContractsListContractsCreateDrawerFoods from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/_shared/components/AllContractsListContractsCreateDrawerFoods/AllContractsListContractsCreateDrawerFoods";
import {
  AllContractsListContractsRenewDrawerContentFormType,
  AllContractsListContractsRenewDrawerContentProps,
  AllContractsListContractsRenewDrawerStep,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsRenewDrawer/helper/components/AllContractsListContractsRenewDrawerContent/@types/@allContractsListContractsRenewDrawerContent";

import "./_allContractsListContractsRenewDrawerContent.scss";

const EXTEND_CONTRACT_SUCCESS_MSG = "قرارداد با موفقیت تمدید شد.";
const SUBMIT_CONTRACT_SUCCESS_MSG = "درخواست قرارداد با موفقیت ثبت شد.";
const REQUIRED_IMAGE_MSG = "لطفا تصویر را انتخاب فرمائید";
const IMAGE_VALID_FORMATS = ["image/png", "image/jpeg", "image/jpg"];
const CONTRACT_DETAILS_STEP = 0; // Renew contract info form step.
const CONTRACT_FOODS_STEP = 1; // Contract foods list step.
const STEP_1_FIELD_NAMES = [
  "contractTitle",
  "contractNo",
  "contractDateRange",
  "contractDescription",
] as const;

const imageUploaderText = (
  <div className="all-contracts-list-contracts-renew-upload-text">
    <AiOutlinePlus size={20} />
    <span>بارگذاری تصویر</span>
  </div>
);

const toFormDateIso = (value: Dayjs) =>
  value.utcOffset(0, true).startOf("day").toISOString();

const AllContractsListContractsRenewDrawerContent = ({
  contractId,
  data,
  isLoading = false,
  onCloseDrawer,
  onSuccess,
  foodsRefreshKey,
  onOpenAddFood,
  onOpenAddSideDish,
  onOpenEditFood,
  onContractExtended,
  initialStep = CONTRACT_DETAILS_STEP,
}: AllContractsListContractsRenewDrawerContentProps) => {
  const [form] = Form.useForm<AllContractsListContractsRenewDrawerContentFormType>();
  const [currentStep, setCurrentStep] =
    useState<AllContractsListContractsRenewDrawerStep>(initialStep);
  const [extendedContractId, setExtendedContractId] = useState<number | null>(
    initialStep === CONTRACT_FOODS_STEP ? contractId : null
  );
  const isResumeFoodsStep = initialStep === CONTRACT_FOODS_STEP;
  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);
  const [firstImageName, setFirstImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  const minContractStartDate = useMemo(() => {
    if (!data?.endDate) {
      return null;
    }

    const previousEndDate = dayjs(data.endDate);
    if (!previousEndDate.isValid()) {
      return null;
    }

    return previousEndDate.add(1, "day").startOf("day");
  }, [data?.endDate]);

  //? ================================  Api Calls ================================
  const [extendAllContract, { isLoading: isExtendAllContractLoading }] =
    useExtendAllContractMutation();
  const [submitAllContract, { isLoading: isSubmitAllContractLoading }] =
    useSubmitAllContractMutation();
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useCateringUploadFileMutation();

  //* ================================ Effects ================================
  useEffect(() => {
    if (!data) {
      return;
    }

    // CustomRangePicker needs both sides valid; start = day after previous end, end = day after start.
    const initialDateRange =
      minContractStartDate != null
        ? ([
            toFormDateIso(minContractStartDate),
            toFormDateIso(minContractStartDate.add(1, "day")),
          ] as [string, string])
        : undefined;

    const firstFilePreview = data.file1?.trim() || "";
    const secondFilePreview = data.file2?.trim() || "";
    const thirdFilePreview = data.file3?.trim() || "";
    const fourthFilePreview = data.file4?.trim() || "";
    const firstFileTitle = data.file1Title?.trim() || "";
    const secondFileTitle = data.file2Title?.trim() || "";
    const thirdFileTitle = data.file3Title?.trim() || "";
    const fourthFileTitle = data.file4Title?.trim() || "";

    form.setFieldsValue({
      contractTitle: data.title ?? "",
      contractNo: data.contractUUID ?? "",
      contractDescription: data.description ?? "",
      contractDateRange: initialDateRange,
    });

    if (initialStep === CONTRACT_FOODS_STEP) {
      setCurrentStep(CONTRACT_FOODS_STEP);
      setExtendedContractId(contractId);
      onContractExtended(contractId);
    } else {
      setCurrentStep(CONTRACT_DETAILS_STEP);
      setExtendedContractId(null);
    }

    if (firstFilePreview) {
      setFirstImageList([
        {
          uid: firstFilePreview,
          name: firstFilePreview,
          status: "done",
          url: firstFilePreview,
        },
      ]);
    } else {
      setFirstImageList([]);
    }

    if (secondFilePreview) {
      setSecondImageList([
        {
          uid: secondFilePreview,
          name: secondFilePreview,
          status: "done",
          url: secondFilePreview,
        },
      ]);
    } else {
      setSecondImageList([]);
    }

    if (thirdFilePreview) {
      setThirdImageList([
        {
          uid: thirdFilePreview,
          name: thirdFilePreview,
          status: "done",
          url: thirdFilePreview,
        },
      ]);
    } else {
      setThirdImageList([]);
    }

    if (fourthFilePreview) {
      setFourthImageList([
        {
          uid: fourthFilePreview,
          name: fourthFilePreview,
          status: "done",
          url: fourthFilePreview,
        },
      ]);
    } else {
      setFourthImageList([]);
    }

    setFirstImageName(firstFileTitle);
    setSecondImageName(secondFileTitle);
    setThirdImageName(thirdFileTitle);
    setFourthImageName(fourthFileTitle);
    form.setFields([
      { name: "firstImage", errors: [] },
      { name: "secondImage", errors: [] },
      { name: "thirdImage", errors: [] },
      { name: "fourthImage", errors: [] },
    ]);
  }, [data, form, minContractStartDate, initialStep, contractId, onContractExtended]);

  //* ================================ Util Functions ================================

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

  const disabledContractDate = (currentDate: Dayjs) => {
    if (!minContractStartDate) {
      return false;
    }

    return currentDate.isBefore(minContractStartDate, "day");
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

  const onExtendAllContractSuccess = (value: ExtendAllContractResponse) => {
    toast.success(EXTEND_CONTRACT_SUCCESS_MSG, {
      toastId: EXTEND_CONTRACT_SUCCESS_MSG,
    });
    setExtendedContractId(value);
    onContractExtended(value);
    setCurrentStep(CONTRACT_FOODS_STEP);
  };

  const onSubmitAllContractSuccess = () => {
    toast.success(SUBMIT_CONTRACT_SUCCESS_MSG, {
      toastId: SUBMIT_CONTRACT_SUCCESS_MSG,
    });
    onSuccess();
    onCloseDrawer();
  };

  const submitAllContractHandler = () => {
    if (extendedContractId == null) {
      return;
    }

    submitAllContract({ id: extendedContractId })
      .unwrap()
      .then(onSubmitAllContractSuccess);
  };

  const extendContractHandler = (
    values: AllContractsListContractsRenewDrawerContentFormType
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

    const startedDate = `${startDateValue.format("YYYY-MM-DD")}T00:00:00`; // cto told
    const endDate = `${endDateValue.format("YYYY-MM-DD")}T23:59:59`; //cto told

    if (!values.contractTitle || !values.contractNo) {
      form.validateFields([...STEP_1_FIELD_NAMES]);
      return;
    }

    form.setFieldsValue(values);

    const request: ExtendAllContractRequest = {
      contractId: data?.id ?? contractId,
      title: values.contractTitle,
      description: values.contractDescription ?? "",
      contractUUID: values.contractNo,
      startedDate,
      endDate,
      file1: firstImage,
      file2: secondImage,
      file3: thirdImage || null,
      file4: fourthImage || null,
      productIds: [],
    };

    extendAllContract(request).unwrap().then(onExtendAllContractSuccess);
  };

  const primaryActionHandler = () => {
    if (currentStep === CONTRACT_DETAILS_STEP) {
      form
        .validateFields([...STEP_1_FIELD_NAMES])
        .then(extendContractHandler)
        .catch(() => {
          showRequiredImageErrors();
        });
      return;
    }

    submitAllContractHandler();
  };

  const openAddFoodHandler = () => {
    if (extendedContractId == null) {
      return;
    }

    onOpenAddFood(extendedContractId);
  };

  const openAddSideDishHandler = () => {
    if (extendedContractId == null) {
      return;
    }

    onOpenAddSideDish(extendedContractId);
  };

  const stepItems = [{ title: "تمدید قرارداد" }, { title: "غذاهای قرارداد" }];
  const isPrimaryActionLoading = isExtendAllContractLoading || isSubmitAllContractLoading;
  const isBusy = isPrimaryActionLoading || isUploadFileLoading;
  const primaryActionLabel =
    currentStep === CONTRACT_DETAILS_STEP ? "تایید و ادامه" : "ثبت درخواست";

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="all-contracts-list-contracts-renew-drawer-content">
      <CustomDrawerHeader
        title="تمدید قرارداد"
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          <div className="flex items-center gap-2">
            <CustomButton
              htmlType="button"
              onClick={onCloseDrawer}
              disabled={isBusy || isLoading}
            >
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="button"
              type="primary"
              onClick={primaryActionHandler}
              loading={isPrimaryActionLoading}
              disabled={
                isUploadFileLoading ||
                isLoading ||
                (!isResumeFoodsStep && !data) ||
                (isResumeFoodsStep && extendedContractId == null)
              }
            >
              {primaryActionLabel}
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

      <Div loading={!!isLoading}>
        {currentStep === CONTRACT_DETAILS_STEP && (
          <div className="flex flex-col gap-6">
            <CustomAlert
              className="all-contracts-list-contracts-renew-alert"
              type="info"
              showIcon
              title="راهنمای تمدید قرارداد!"
              description={
                <div className="flex flex-col gap-2">
                  <span>
                    با تمدید قرارداد، قرارداد قبلی غیرفعال می‌شود و غذاهای آن به قرارداد
                    جدید منتقل می‌شوند.
                  </span>
                  <span>
                    در ادامه می‌توانید درباره این غذاها تصمیم بگیرید، غذای جدید اضافه
                    کنید، یا آن‌ها را حذف و قیمت‌ها را ویرایش نمایید.
                  </span>
                </div>
              }
            />

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <CustomInput
                  type="text"
                  label="عنوان قرارداد"
                  name="contractTitle"
                  placeholder="عنوان قرارداد را وارد نمایید"
                  rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3), MAX_LENGTH_RULE(100)]}
                />
              </Col>
              <SingleVerticalWithCol
                label="تأمین کننده"
                value={data?.vendorTitle}
                span={12}
              />
              <SingleVerticalWithCol
                label="سلف"
                value={data?.restaurantTitle}
                span={12}
              />
              <Col xs={24} sm={12}>
                <CustomInput
                  type="text"
                  label="شماره قرارداد"
                  name="contractNo"
                  placeholder="شماره قرارداد را وارد نمایید"
                  rules={[REQUIRED_RULE, MAX_LENGTH_RULE(20)]}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CustomRangePicker
                  label="شروع و پایان قرارداد"
                  name="contractDateRange"
                  rules={[REQUIRED_RULE]}
                  form={form}
                  disabledDate={disabledContractDate}
                  placeholder={["از تاریخ", "تا تاریخ"]}
                />
              </Col>
              <Col span={24}>
                <CustomTextArea
                  label="توضیحات"
                  name="contractDescription"
                  placeholder="توضیحاتی در مورد قرارداد ندارم"
                  maxLength={500}
                  showCount
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Col>
            </Row>

            <div className="all-contracts-list-contracts-renew-documents">
              <div className="flex items-center gap-1">
                <span className="text-dustred-5 text-xs">*</span>
                <p className="all-contracts-list-contracts-renew-documents__label">
                  اسناد مربوطه (تصویر ۱ و ۲ الزامی است)
                </p>
              </div>
              <div className="all-contracts-list-contracts-renew-documents__uploaders">
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
                  classNameOuterDiv="all-contracts-list-contracts-renew-uploader"
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
                  classNameOuterDiv="all-contracts-list-contracts-renew-uploader"
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
                  classNameOuterDiv="all-contracts-list-contracts-renew-uploader"
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
                  classNameOuterDiv="all-contracts-list-contracts-renew-uploader"
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
              <AllContractsListContractsAddFoodMenuButton
                onAddMainFood={openAddFoodHandler}
                onAddSideDish={openAddSideDishHandler}
              />
            </div>
            {extendedContractId != null ? (
              <AllContractsListContractsCreateDrawerFoods
                contractId={extendedContractId}
                refreshKey={foodsRefreshKey}
                onEditPrice={onOpenEditFood}
              />
            ) : (
              <CustomEmpty description="هنوز غذایی به قرارداد اضافه نکرده اید." />
            )}
          </div>
        )}
      </Div>
    </Form>
  );
};

export default AllContractsListContractsRenewDrawerContent;
