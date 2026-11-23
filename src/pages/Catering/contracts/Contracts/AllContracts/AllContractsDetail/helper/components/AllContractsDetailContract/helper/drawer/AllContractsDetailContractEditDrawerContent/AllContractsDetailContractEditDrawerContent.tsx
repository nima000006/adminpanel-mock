import { useEffect, useState } from "react";

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
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
} from "@infra/helpers/utils";
import { useUpdateAllContractMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { useCateringUploadFileMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  MAX_LENGTH_RULE,
  MIN_LENGTH_RULE,
  NUMBER_RULE,
  PERCENTAGE_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import {
  AllContractsDetailContractEditDrawerContentFormType,
  AllContractsDetailContractEditDrawerContentProps,
  ContractDocumentImageField,
  UpdateAllContractRequest,
} from "./@types/@allContractsDetailContractEditDrawerContent";

import "./_allContractsDetailContractEditDrawerContent.scss";

const UPDATE_CONTRACT_SUCCESS_MSG = "قرارداد با موفقیت ویرایش شد.";
const REQUIRED_IMAGE_MSG = "لطفا تصویر را انتخاب فرمائید";
const PERCENTAGE_SUM_ERROR_MSG = "مجموع سهم‌ها باید ۱۰۰ باشد.";
const IMAGE_VALID_FORMATS = ["image/png", "image/jpeg", "image/jpg"];
const FULL_PERCENTAGE = 100;

const isEmptyPercentageValue = (value: unknown) =>
  value === undefined || value === null || value === "";

const validatePercentageSum = (getFieldValue: (name: string) => unknown) => async () => {
  const rawVendorPercentage = getFieldValue("vendorPercentage");
  const rawProviderPercentage = getFieldValue("providerPercentage");
  const rawRestaurantPercentage = getFieldValue("restaurantPercentage");

  if (
    isEmptyPercentageValue(rawVendorPercentage) ||
    isEmptyPercentageValue(rawProviderPercentage) ||
    isEmptyPercentageValue(rawRestaurantPercentage)
  ) {
    return;
  }

  const vendorPercentage = Number(rawVendorPercentage);
  const providerPercentage = Number(rawProviderPercentage);
  const restaurantPercentage = Number(rawRestaurantPercentage);

  if (
    Number.isNaN(vendorPercentage) ||
    Number.isNaN(providerPercentage) ||
    Number.isNaN(restaurantPercentage)
  ) {
    return;
  }

  if (vendorPercentage + providerPercentage + restaurantPercentage !== FULL_PERCENTAGE) {
    return Promise.reject(new Error(PERCENTAGE_SUM_ERROR_MSG));
  }
};

const imageUploaderText = (
  <div className="all-contracts-detail-contract-edit-upload-text">
    <AiOutlinePlus size={20} />
    <span>بارگذاری تصویر</span>
  </div>
);

const toFormDateIso = (value: Dayjs) =>
  value.utcOffset(0, true).startOf("day").toISOString();

const buildExistingFileList = (file?: string): UploadFile[] => {
  if (!file) {
    return [];
  }

  return [
    {
      uid: file,
      name: file,
      status: "done",
      url: file,
    },
  ];
};

const AllContractsDetailContractEditDrawerContent = ({
  contractDetail,
  onCloseDrawer,
  onSuccess,
}: AllContractsDetailContractEditDrawerContentProps) => {
  const [form] = Form.useForm<AllContractsDetailContractEditDrawerContentFormType>();

  const [firstImageList, setFirstImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);
  const [firstImageName, setFirstImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");
  const [thirdImageName, setThirdImageName] = useState("");
  const [fourthImageName, setFourthImageName] = useState("");

  //? ================================  Api Calls ================================
  const [updateAllContract, { isLoading: isUpdateAllContractLoading }] =
    useUpdateAllContractMutation();
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useCateringUploadFileMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    const startDate = contractDetail.startedDate
      ? dayjs(contractDetail.startedDate)
      : null;
    const endDate = contractDetail.endDate ? dayjs(contractDetail.endDate) : null;
    const initialDateRange =
      startDate?.isValid() && endDate?.isValid()
        ? ([toFormDateIso(startDate), toFormDateIso(endDate)] as [string, string])
        : undefined;

    form.setFieldsValue({
      contractTitle: contractDetail.title,
      vendorTitle: contractDetail.vendorTitle,
      selfTitle: contractDetail.restaurantTitle,
      contractNo: contractDetail.contractUUID,
      contractDateRange: initialDateRange,
      vendorPercentage: contractDetail.vendorPercentage?.toString(),
      providerPercentage: contractDetail.providerPercentage?.toString(),
      restaurantPercentage: contractDetail.restaurantPercentage?.toString(),
      contractDescription: contractDetail.description,
    });

    setFirstImageName(contractDetail.file1Title?.trim() || "");
    setSecondImageName(contractDetail.file2Title?.trim() || "");
    setThirdImageName(contractDetail.file3Title?.trim() || "");
    setFourthImageName(contractDetail.file4Title?.trim() || "");
    setFirstImageList(buildExistingFileList(contractDetail.file1));
    setSecondImageList(buildExistingFileList(contractDetail.file2));
    setThirdImageList(buildExistingFileList(contractDetail.file3));
    setFourthImageList(buildExistingFileList(contractDetail.file4));
  }, [contractDetail, form]);

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

  const isServerUploadedFileName = (fileName: string) =>
    Boolean(fileName) && !fileName.startsWith("data:");

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

  const onUpdateAllContractSuccess = () => {
    toast.success(UPDATE_CONTRACT_SUCCESS_MSG, {
      toastId: UPDATE_CONTRACT_SUCCESS_MSG,
    });
    onSuccess();
    onCloseDrawer();
  };

  const onSubmitHandler = () => {
    form
      .validateFields()
      .then((values: AllContractsDetailContractEditDrawerContentFormType) => {
        if (
          !isServerUploadedFileName(firstImageName) ||
          !isServerUploadedFileName(secondImageName)
        ) {
          showRequiredImageErrors();
          return;
        }

        const contractDateRange = values.contractDateRange;
        const startDateValue = contractDateRange?.[0]
          ? moment(contractDateRange[0])
          : null;
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

        const vendorPercentage = Number(values.vendorPercentage);
        const providerPercentage = Number(values.providerPercentage);
        const restaurantPercentage = Number(values.restaurantPercentage);

        if (
          Number.isNaN(vendorPercentage) ||
          Number.isNaN(providerPercentage) ||
          Number.isNaN(restaurantPercentage) ||
          vendorPercentage + providerPercentage + restaurantPercentage !== FULL_PERCENTAGE
        ) {
          form.setFields([
            {
              name: "vendorPercentage",
              errors: [PERCENTAGE_SUM_ERROR_MSG],
            },
            {
              name: "providerPercentage",
              errors: [PERCENTAGE_SUM_ERROR_MSG],
            },
            {
              name: "restaurantPercentage",
              errors: [PERCENTAGE_SUM_ERROR_MSG],
            },
          ]);
          return;
        }

        const startedDate = `${startDateValue.format("YYYY-MM-DD")}T00:00:00`;
        const endDate = `${endDateValue.format("YYYY-MM-DD")}T23:59:59`;

        const request: UpdateAllContractRequest = {
          id: contractDetail.id,
          title: values.contractTitle,
          description: values.contractDescription,
          restaurantId: contractDetail.restaurantId,
          vendorId: contractDetail.vendorId,
          startedDate,
          endDate,
          contractUUID: values.contractNo,
          file1: firstImageName,
          file2: secondImageName,
          file3: isServerUploadedFileName(thirdImageName) ? thirdImageName : null,
          file4: isServerUploadedFileName(fourthImageName) ? fourthImageName : null,
          vendorPercentage,
          providerPercentage,
          restaurantPercentage,
        };

        updateAllContract(request).unwrap().then(onUpdateAllContractSuccess);
      })
      .catch(() => {
        showRequiredImageErrors();
      });
  };

  const isBusy = isUpdateAllContractLoading || isUploadFileLoading;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="all-contracts-detail-contract-edit-drawer-content">
      <CustomDrawerHeader
        title="ویرایش قرارداد"
        closeDrawerHandler={onCloseDrawer}
        leftSideContent={
          <div className="flex items-center gap-2">
            <CustomButton htmlType="button" onClick={onCloseDrawer} disabled={isBusy}>
              انصراف
            </CustomButton>
            <CustomButton
              htmlType="button"
              type="primary"
              onClick={onSubmitHandler}
              loading={isUpdateAllContractLoading}
              disabled={isUploadFileLoading}
            >
              ثبت
            </CustomButton>
          </div>
        }
      />

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
            <CustomInput type="text" label="تأمین کننده" name="vendorTitle" disabled />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInput type="text" label="سلف" name="selfTitle" disabled />
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
          <Col xs={24} sm={12}>
            <CustomInput
              type="text"
              label="سهم تأمین کننده"
              name="vendorPercentage"
              placeholder="وارد نمایید"
              suffix="%"
              dependencies={["providerPercentage", "restaurantPercentage"]}
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                PERCENTAGE_RULE,
                ({ getFieldValue }) => ({
                  validator: validatePercentageSum(getFieldValue),
                }),
              ]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInput
              type="text"
              label="سهم دانشجویار"
              name="providerPercentage"
              placeholder="وارد نمایید"
              suffix="%"
              dependencies={["vendorPercentage", "restaurantPercentage"]}
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                PERCENTAGE_RULE,
                ({ getFieldValue }) => ({
                  validator: validatePercentageSum(getFieldValue),
                }),
              ]}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CustomInput
              type="text"
              label="سهم دانشگاه"
              name="restaurantPercentage"
              placeholder="وارد نمایید"
              suffix="%"
              dependencies={["vendorPercentage", "providerPercentage"]}
              rules={[
                REQUIRED_RULE,
                NUMBER_RULE,
                PERCENTAGE_RULE,
                ({ getFieldValue }) => ({
                  validator: validatePercentageSum(getFieldValue),
                }),
              ]}
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

        <div className="all-contracts-detail-contract-edit-documents">
          <p className="all-contracts-detail-contract-edit-documents__label">
            اسناد مربوطه
          </p>
          <div className="all-contracts-detail-contract-edit-documents__uploaders">
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
              classNameOuterDiv="all-contracts-detail-contract-edit-uploader"
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
                onUploadFileChange(e, setFirstImageName, "firstImage", setFirstImageList)
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
              classNameOuterDiv="all-contracts-detail-contract-edit-uploader"
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
              classNameOuterDiv="all-contracts-detail-contract-edit-uploader"
              onChange={(e: UploadChangeParam<UploadFile>) =>
                onUploadFileChange(e, setThirdImageName, "thirdImage", setThirdImageList)
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
              classNameOuterDiv="all-contracts-detail-contract-edit-uploader"
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
    </Form>
  );
};

export default AllContractsDetailContractEditDrawerContent;
