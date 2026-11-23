import { useEffect } from "react";

import { Form } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import { CustomUploader } from "@components/CustomInputs";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { TEST_RESULT_VALID_FILE_FORMATS } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/_shared/utils";
import { GeneticsParticipantsDetailReviewStatusTestResultDetailModalProps } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailModal/@types/@geneticsParticipantsDetailReviewStatusTestResultDetailModal";

import "./_geneticsParticipantsDetailReviewStatusTestResultDetailModal.scss";

const GeneticsParticipantsDetailReviewStatusTestResultDetailModal = ({
  form,
  fileList,
  setFileList,
}: GeneticsParticipantsDetailReviewStatusTestResultDetailModalProps) => {
  const hasFile = fileList.length > 0;

  //? ================================ Effects ================================
  useEffect(() => {
    form.setFieldValue("file", hasFile ? fileList[0]?.name : undefined);
  }, [fileList, form, hasFile]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲*/
  return (
    <Form
      form={form}
      className={`generic-participant-attachment-modal-content ${
        hasFile ? "has-file" : "no-file"
      }`}
    >
      {/* todo[nima] remove when figma will be updated */}
      {/* <CustomInput
        label="عنوان فایل"
        name="title"
        placeholder="عنوان فایل را وارد نمایید."
        rules={[REQUIRED_RULE]}
        help="این عنوان به‌همراه نتیجه تست به کاربر نمایش داده می‌شود."
      /> */}

      <CustomUploader
        label="بارگذاری فایل"
        name="file"
        rules={[REQUIRED_RULE]}
        fileList={fileList}
        setFileList={setFileList}
        multiple={false}
        maxCount={1}
        isDisabled={fileList.length >= 1}
        validFileFormat={[...TEST_RESULT_VALID_FILE_FORMATS]}
        uploaderText={
          <div className="generic-participant-template-upload-text-container">
            <div className="generic-participant-template-upload-logo">
              <AiOutlinePlus />
            </div>
            <div className="generic-participant-template-upload-text">بارگذاری</div>
          </div>
        }
        hasUploaderIcon={false}
        isReadOnly={false}
      />
    </Form>
  );
};

export default GeneticsParticipantsDetailReviewStatusTestResultDetailModal;
