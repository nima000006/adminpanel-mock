import { useEffect, useState } from "react";

import { Form, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import { isImageFormatValid, isImageSizeValid } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { UPLOAD_FILE_GENERAL } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  useBusinessUploadFileMutation,
  useCreateUploadFileInBusinessMutation,
  useLazyGetTopChartFilesQuery,
} from "@infra/states/redux/Apis/business/business/businessApi";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";
import { GetTopChartFilesResponse } from "@pages/Organization/_shared/@types/@organizationTypes";

import { UploadDocumentsStepProps } from "./@type/@uploadDocumentsStepType";
import {
  ALERT_TEXT_FOURTH,
  ALERT_TEXT_ONE,
  ALERT_TEXT_THIRD,
  ALERT_TEXT_TWO,
} from "../../../../utils/createBusinessUtils";
import { BusinessOnUploadFileSuccess } from "../DescAndDocumentsSection/@types/@descAndDocumentsSection";
import ConfirmationModalContent from "./helper/modal/ConfirmationModalContent/ConfirmationModalContent";
import "./_uploadDocumentsStep.scss";

const UploadDocumentsStep = ({ nextStep, prevStep }: UploadDocumentsStepProps) => {
  const [isConfirmModal, setIsConfirmModal] = useState({ isOpen: false, id: -1 });
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // unit
  const [unitMainImageName, setUnitMainImageName] = useState("");
  const [unitSecondImageName, setUnitSecondImageName] = useState("");
  const [unitMainImageList, setUnitMainImageList] = useState<UploadFile[]>([]);
  const [unitSecondImageList, setUnitSecondImageList] = useState<UploadFile[]>([]);

  // branch
  const [branchMainImageName, setBranchMainImageName] = useState("");
  const [branchSecondImageName, setBranchSecondImageName] = useState("");
  const [branchMainImageList, setBranchMainImageList] = useState<UploadFile[]>([]);
  const [branchSecondImageList, setBranchSecondImageList] = useState<UploadFile[]>([]);

  // position
  const [positionMainImageName, setPositionMainImageName] = useState("");
  const [positionSecondImageName, setPositionSecondImageName] = useState("");
  const [positionMainImageList, setPositionMainImageList] = useState<UploadFile[]>([]);
  const [positionSecondImageList, setPositionSecondImageList] = useState<UploadFile[]>(
    []
  );

  // top chart
  const [topChartMainImageName, setTopChartMainImageName] = useState("");
  const [topChartSecondImageName, setTopChartSecondImageName] = useState("");
  const [topChartMainImageList, setTopChartMainImageList] = useState<UploadFile[]>([]);
  const [topChartSecondImageList, setTopChartSecondImageList] = useState<UploadFile[]>(
    []
  );

  const {
    params: { businessTempId, id },
    setSearchParams,
  } = useQueryParams();
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  // get id upload file
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useBusinessUploadFileMutation();

  // send upload document
  const [
    sendCreateUploadDocumentData,
    { isLoading: sendCreateUploadDocumentDataLoading },
  ] = useCreateUploadFileInBusinessMutation();

  // get data for edit mode
  const [getEditModeData, { isFetching: isGetDataLoading }] =
    useLazyGetTopChartFilesQuery();

  useEffect(() => {
    if (id) {
      getEditModeData({ businessTempHistoryId: +businessTempId })
        .unwrap()
        .then(GetEditModeDataIsSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // onUploadFileSuccess
  const onUploadFileSuccess = ({ setImage, response }: BusinessOnUploadFileSuccess) => {
    setImage(response?.fileId?.toString());
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

  // handler
  const closeModalHandler = () => {
    setIsConfirmModal({ isOpen: false, id: -1 });
  };

  // sending upload document
  const modalConfirmationHandler = () => {
    form.submit();
    form.validateFields().then(() => {
      sendCreateUploadDocumentData({
        businessTempId: +businessTempId,
        unitMandatoryFileId: unitMainImageName ? +unitMainImageName : null,
        unitSecondaryFileId: unitSecondImageName ? +unitSecondImageName : null,
        branchMandatoryFileId: branchMainImageName ? +branchMainImageName : null,
        branchSecondaryFileId: branchSecondImageName ? +branchSecondImageName : null,
        positionMandatoryFileId: positionMainImageName ? +positionMainImageName : null,
        positionSecondaryFileId: positionSecondImageName
          ? +positionSecondImageName
          : null,
        topChartMandatoryFileId: topChartMainImageName ? +topChartMainImageName : null,
        topChartSecondaryFileId: topChartSecondImageName
          ? +topChartSecondImageName
          : null,
      })
        .unwrap()
        .then(sendCreateUploadDocumentDataIsSuccess);
    });
    nextStep(); // این خط هم بعدا باید حذف بشه
  };

  // success
  const sendCreateUploadDocumentDataIsSuccess = (value: number) => {
    setSearchParams({ businessTempId: value?.toString() });
    nextStep();
    setIsConfirmModal({ isOpen: false, id: -1 });
  };

  const GetEditModeDataIsSuccess = (data: GetTopChartFilesResponse) => {
    if (data?.unitMandatoryFileUrl) {
      setUnitMainImageList([
        {
          uid: "-1",
          name: "unit-mandatory",
          status: "done",
          url: data.unitMandatoryFileUrl,
        },
      ]);
      setUnitMainImageName(data.unitMandatoryFileUrl); // چون فقط url داریم
    }

    if (data?.unitSecondaryFileUrl) {
      setUnitSecondImageList([
        {
          uid: "-2",
          name: "unit-secondary",
          status: "done",
          url: data.unitSecondaryFileUrl,
        },
      ]);
      setUnitSecondImageName(data.unitSecondaryFileUrl);
    }

    if (data?.branchMandatoryFileUrl) {
      setBranchMainImageList([
        {
          uid: "-3",
          name: "branch-mandatory",
          status: "done",
          url: data.branchMandatoryFileUrl,
        },
      ]);
      setBranchMainImageName(data.branchMandatoryFileUrl);
    }

    if (data?.branchSecondaryFileUrl) {
      setBranchSecondImageList([
        {
          uid: "-4",
          name: "branch-secondary",
          status: "done",
          url: data.branchSecondaryFileUrl,
        },
      ]);
      setBranchSecondImageName(data.branchSecondaryFileUrl);
    }

    if (data?.positionMandatoryFileUrl) {
      setPositionMainImageList([
        {
          uid: "-5",
          name: "position-mandatory",
          status: "done",
          url: data.positionMandatoryFileUrl,
        },
      ]);
      setPositionMainImageName(data.positionMandatoryFileUrl);
    }

    if (data?.positionSecondaryFileUrl) {
      setPositionSecondImageList([
        {
          uid: "-6",
          name: "position-secondary",
          status: "done",
          url: data.positionSecondaryFileUrl,
        },
      ]);
      setPositionSecondImageName(data.positionSecondaryFileUrl);
    }

    if (data?.topChartMandatoryFileUrl) {
      setTopChartMainImageList([
        {
          uid: "-7",
          name: "topchart-mandatory",
          status: "done",
          url: data.topChartMandatoryFileUrl,
        },
      ]);
      setTopChartMainImageName(data.topChartMandatoryFileUrl);
    }

    if (data?.topChartSecondaryFileUrl) {
      setTopChartSecondImageList([
        {
          uid: "-8",
          name: "topchart-secondary",
          status: "done",
          url: data.topChartSecondaryFileUrl,
        },
      ]);
      setTopChartSecondImageName(data.topChartSecondaryFileUrl);
    }
  };

  const returnHandler = () => {
    prevStep();
  };

  const submitHandler = () => {
    setIsConfirmModal({ isOpen: true, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isConfirmModal?.isOpen && (
        <ConfirmationModalWithContent
          title=""
          isModalOpen={isConfirmModal?.isOpen}
          confirmBtnText="تایید"
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={modalConfirmationHandler}
          isConfirmButtonDisable={selectedValues.length === 0}
          content={<ConfirmationModalContent onSelectionChange={setSelectedValues} />}
          isConfirmButtonLoading={sendCreateUploadDocumentDataLoading}
          showIcon={false}
        />
      )}
      <div className="upload-document-step-container">
        <CustomAlert
          message="مدارک مورد نیاز جهت بارگذاری:"
          description={
            <>
              <p>{ALERT_TEXT_ONE}</p>
              <p>{ALERT_TEXT_TWO}</p>
              <p>{ALERT_TEXT_THIRD}</p>
              <p>{ALERT_TEXT_FOURTH}</p>
            </>
          }
          showIcon
          type="info"
          className="alert"
        />
        <Form form={form} layout="vertical">
          <Div className="uploader-wrapper" loading={isGetDataLoading}>
            {/* unit main img */}
            <CustomUploader
              fileList={unitMainImageList}
              setFileList={setUnitMainImageList}
              label={"بارگذاری عکس اول واحد سازمانی"}
              hasVerticalLabel={true}
              isReadOnly={false}
              className="attach-file"
              name="unitMainImage"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              imageSetter={setUnitMainImageName}
              isDisabled={unitMainImageList?.length >= 1}
              hasUploaderIcon={false}
              onChange={(e: any) =>
                onUploadFileChange(e, setUnitMainImageName, setUnitMainImageList)
              }
              uploaderText={
                <div className="all-self-upload-text-container">
                  <div className="upload-text">
                    با کلیک کردن فایل خود را بارگذاری کنید.
                  </div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
            />

            {/* unit second img */}
            <CustomUploader
              fileList={unitSecondImageList}
              setFileList={setUnitSecondImageList}
              label={"بارگذاری عکس دوم واحد سازمانی"}
              hasVerticalLabel={true}
              isReadOnly={false}
              className="attach-file"
              name="unitSecondImage"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              imageSetter={setUnitSecondImageName}
              isDisabled={unitSecondImageList?.length >= 1}
              hasUploaderIcon={false}
              onChange={(e: any) =>
                onUploadFileChange(e, setUnitSecondImageName, setUnitSecondImageList)
              }
              uploaderText={
                <div className="all-self-upload-text-container">
                  <div className="upload-text">
                    با کلیک کردن فایل خود را بارگذاری کنید.
                  </div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
            />

            {/* branch main img */}
            <CustomUploader
              fileList={branchMainImageList}
              setFileList={setBranchMainImageList}
              label={"بارگذاری عکس اول شعبه"}
              hasVerticalLabel={true}
              isReadOnly={false}
              className="attach-file"
              name="branchMainImage"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              imageSetter={setBranchMainImageName}
              isDisabled={branchMainImageList?.length >= 1}
              hasUploaderIcon={false}
              onChange={(e: any) =>
                onUploadFileChange(e, setBranchMainImageName, setBranchMainImageList)
              }
              uploaderText={
                <div className="all-self-upload-text-container">
                  <div className="upload-text">
                    با کلیک کردن فایل خود را بارگذاری کنید.
                  </div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
            />
            {/* branch second img */}
            <CustomUploader
              fileList={branchSecondImageList}
              setFileList={setBranchSecondImageList}
              label={"بارگذاری عکس دوم شعبه"}
              hasVerticalLabel={true}
              isReadOnly={false}
              className="attach-file"
              name="branchSecondImage"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              imageSetter={setBranchSecondImageName}
              isDisabled={branchSecondImageList?.length >= 1}
              hasUploaderIcon={false}
              onChange={(e: any) =>
                onUploadFileChange(e, setBranchSecondImageName, setBranchSecondImageList)
              }
              uploaderText={
                <div className="all-self-upload-text-container">
                  <div className="upload-text">
                    با کلیک کردن فایل خود را بارگذاری کنید.
                  </div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
            />
            {/* position main img */}
            <CustomUploader
              fileList={positionMainImageList}
              setFileList={setPositionMainImageList}
              label={"بارگذاری عکس اول سمت سازمانی"}
              hasVerticalLabel={true}
              isReadOnly={false}
              className="attach-file"
              name="positionMainImage"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              imageSetter={setPositionMainImageName}
              isDisabled={positionMainImageList?.length >= 1}
              hasUploaderIcon={false}
              onChange={(e: any) =>
                onUploadFileChange(e, setPositionMainImageName, setPositionMainImageList)
              }
              uploaderText={
                <div className="all-self-upload-text-container">
                  <div className="upload-text">
                    با کلیک کردن فایل خود را بارگذاری کنید.
                  </div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
            />
            {/* position second img */}
            <CustomUploader
              fileList={positionSecondImageList}
              setFileList={setPositionSecondImageList}
              label={"بارگذاری عکس دوم سمت سازمانی"}
              hasVerticalLabel={true}
              isReadOnly={false}
              className="attach-file"
              name="positionSecondImage"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              imageSetter={setPositionSecondImageName}
              isDisabled={positionSecondImageList?.length >= 1}
              hasUploaderIcon={false}
              onChange={(e: any) =>
                onUploadFileChange(
                  e,
                  setPositionSecondImageName,
                  setPositionSecondImageList
                )
              }
              uploaderText={
                <div className="all-self-upload-text-container">
                  <div className="upload-text">
                    با کلیک کردن فایل خود را بارگذاری کنید.
                  </div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
            />
            {/* top chart main img */}
            <CustomUploader
              fileList={topChartMainImageList}
              setFileList={setTopChartMainImageList}
              label={"بارگذاری عکس اول تاپ چارت"}
              hasVerticalLabel={true}
              isReadOnly={false}
              className="attach-file"
              name="topChartMainImage"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              imageSetter={setTopChartMainImageName}
              isDisabled={topChartMainImageList?.length >= 1}
              hasUploaderIcon={false}
              onChange={(e: any) =>
                onUploadFileChange(e, setTopChartMainImageName, setTopChartMainImageList)
              }
              uploaderText={
                <div className="all-self-upload-text-container">
                  <div className="upload-text">
                    با کلیک کردن فایل خود را بارگذاری کنید.
                  </div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
            />
            {/* top chart second img */}
            <CustomUploader
              fileList={topChartSecondImageList}
              setFileList={setTopChartSecondImageList}
              label={"بارگذاری عکس دوم تاپ چارت"}
              hasVerticalLabel={true}
              isReadOnly={false}
              className="attach-file"
              name="topChartSecondImage"
              maxCount={1}
              isDataLoading={isUploadFileLoading}
              imageSetter={setTopChartSecondImageName}
              isDisabled={topChartSecondImageList?.length >= 1}
              hasUploaderIcon={false}
              onChange={(e: any) =>
                onUploadFileChange(
                  e,
                  setTopChartSecondImageName,
                  setTopChartSecondImageList
                )
              }
              uploaderText={
                <div className="all-self-upload-text-container">
                  <div className="upload-text">
                    با کلیک کردن فایل خود را بارگذاری کنید.
                  </div>
                  <div className="upload-logo">
                    <AiOutlinePlus />
                  </div>
                </div>
              }
            />
          </Div>
        </Form>
      </div>

      <div className="business-upload-document-btn-wrapper">
        <CustomButton type="primary" ghost onClick={returnHandler}>
          برگشت
        </CustomButton>
        <CustomButton type="primary" onClick={submitHandler}>
          ثبت و ادامه
        </CustomButton>
      </div>
    </>
  );
};
export default UploadDocumentsStep;
