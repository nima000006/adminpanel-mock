import React, { useState } from "react";

import { Form, Row, UploadFile } from "antd";
import { GrAttachment } from "react-icons/gr";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { getUploadFilePayload } from "@infra/helpers/utils";
import { attachmentDownloader } from "@infra/helpers/utils/fileUtils";
import {
  useMyDoctorGetHistoryIdQuery,
  useMyDoctorSurveyDetailFourthTabAddFileMutation,
  useMyDoctorSurveyDetailFourthTabFilesQuery,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import { useMyDoctorSurveyDetailFourthTabUploadFileMutation } from "@infra/states/redux/Apis/myDoctor/test/testApis";
import { NEUTRAL_07 } from "@infra/VARS/globalColors/globalColors";
import {
  GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContentFormType,
  GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContentProps,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent/@types/@geneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent";
import GeneticsParticipantsDetailReviewStatusTestResultDetailModal from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailModal/GeneticsParticipantsDetailReviewStatusTestResultDetailModal";

import "./_geneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent.scss";

const TEST_UPLOAD_FILE_WARN = "لطفاً ابتدا فایل را بارگذاری کنید.";
const TEST_HISTORY_ID_MISSING_WARN =
  "شناسه تاریخچه نتیجه تست در دسترس نیست. لطفاً دوباره تلاش کنید.";

const TEST_RESULT_MAX_FILE_COUNT = 10;

const getFileNameFromUrl = (fileUrl: string) =>
  decodeURIComponent(fileUrl.split("/").pop()?.split("?")[0] || "") || "file";

const GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent = ({
  closeDrawerHandler,
  requestTestId,
}: GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContentProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] =
    Form.useForm<GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContentFormType>();

  //? ================================  Api Calls ================================

  const {
    data: files,
    isLoading: isLoadingFiles,
    refetch: refetchFiles,
  } = useMyDoctorSurveyDetailFourthTabFilesQuery(
    {
      testRequestId: Number(requestTestId),
    },
    { skip: !requestTestId }
  );

  const {
    data: testRequestHistoryId,
    isLoading: isLoadingHistoryId,
    isFetching: isFetchingHistoryId,
  } = useMyDoctorGetHistoryIdQuery(
    { testRequestId: Number(requestTestId) },
    { skip: !requestTestId }
  );

  const [filesHandler, { isLoading: isUploadFileLoading }] =
    useMyDoctorSurveyDetailFourthTabUploadFileMutation();

  const [addFile, { isLoading: isAddFileLoading }] =
    useMyDoctorSurveyDetailFourthTabAddFileMutation();

  //* ================================ Util Functions ================================

  const openModalHandler = () => {
    setIsOpenModal(true);
  };

  const closeModalHandler = () => {
    setIsOpenModal(false);
    setFileList([]);
    form.resetFields();
  };

  // force save file to disk and open it
  const downloadAndOpenFileHandler = (fileUrl: string) => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");

    attachmentDownloader({
      url: fileUrl,
      name: getFileNameFromUrl(fileUrl),
      hasToken: !fileUrl.startsWith("http"),
    });
  };

  const confirmClickHandler = () => {
    form.validateFields().then(() => {
      const selectedFile = fileList[0];

      const fileToUpload = getUploadFilePayload(selectedFile);

      if (!selectedFile || !fileToUpload) {
        toast.warn(TEST_UPLOAD_FILE_WARN, {
          toastId: TEST_UPLOAD_FILE_WARN,
        });
        return;
      }

      if (!testRequestHistoryId) {
        toast.warn(TEST_HISTORY_ID_MISSING_WARN, {
          toastId: TEST_HISTORY_ID_MISSING_WARN,
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", fileToUpload, selectedFile.name);

      filesHandler({ file: formData })
        .unwrap()
        .then((fileUrl) =>
          addFile({
            fileUrls: [fileUrl],
            testRequestHistoryId,
          }).unwrap()
        )
        .then(() => {
          refetchFiles();
          closeModalHandler();
        });
    });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenModal && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenModal}
          closeModalHandler={closeModalHandler}
          title="آپلود فایل"
          confirmBtnText="تایید و ثبت"
          backBtnText="انصراف"
          backBtnDanger={true}
          onConfirmClickHandler={confirmClickHandler}
          onBackBtnHandler={closeModalHandler}
          showIcon={false}
          isFormSensitive
          isConfirmButtonLoading={isAddFileLoading || isUploadFileLoading}
          form={form}
          customClass="generic-participant-attachment-modal-content-container"
          content={
            <GeneticsParticipantsDetailReviewStatusTestResultDetailModal
              fileList={fileList}
              setFileList={setFileList}
              form={form}
            />
          }
        />
      )}
      <div className="generic-participant-detail-result-detail-drawer-container">
        <CustomDrawerHeader
          closeDrawerHandler={closeDrawerHandler}
          title="جزییات فایل نتیجه تست"
        />
        <div>
          <CustomAlert
            showIcon
            type="info"
            title="اگر نیاز به آپلود فایل جدید از نتیجه تست دارید از اینجا اقدام کنید"
            action={
              <CustomButton
                onClick={openModalHandler}
                type="primary"
                loading={isLoadingHistoryId || isFetchingHistoryId}
                disabled={
                  !testRequestHistoryId || fileList.length === TEST_RESULT_MAX_FILE_COUNT
                }
              >
                افزودن فایل
              </CustomButton>
            }
          />
        </div>
        <CustomDivider text="فایل های آپلود شده" />
        <Div loading={isLoadingFiles}>
          <Row gutter={[16, 16]}>
            {files?.length ? (
              files?.map((file, index) => (
                <React.Fragment key={`${file}-${index}`}>
                  <SingleVerticalWithCol
                    span={24}
                    label={`فایل غربالگری بخش ${index + 1}`}
                    value={`فایل غربالگری بخش ${index + 1}`}
                    prefix={<GrAttachment size={16} color={NEUTRAL_07} />}
                    suffix={
                      <CustomButton
                        type="link"
                        onClick={() => downloadAndOpenFileHandler(file)}
                      >
                        دانلود
                      </CustomButton>
                    }
                    className="text-primary-6! flex overflow-hidden!"
                  />

                  {/* todo[nima]: remove when figma willbe ready */}
                  {/* <Col lg={3} md={4} sm={4} xs={5} className="flex! items-center! gap-1!">
                    <CustomButton
                      danger
                      className="flex h-6! w-6! items-center justify-center rounded-sm! p-0!"
                      onClick={() => {}}
                    >
                      <PiTrashSimple />
                    </CustomButton>
                  </Col> */}
                </React.Fragment>
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <CustomEmpty description="فایلی برای نمایش وجود ندارد" />
              </div>
            )}
          </Row>
        </Div>
      </div>
    </>
  );
};

export default GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent;
