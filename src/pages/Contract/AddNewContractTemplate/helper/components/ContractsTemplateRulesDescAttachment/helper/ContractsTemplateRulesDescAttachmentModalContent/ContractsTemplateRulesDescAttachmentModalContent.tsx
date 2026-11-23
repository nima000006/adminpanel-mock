import { Form } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ContractsTemplateRulesDescAttachmentModalContentProps } from "../../@types/@ContractsTemplateRulesDescAttachmentModalContentProps";

import "./_contractsTemplateRulesDescAttachmentModalContent.scss";

const ContractsTemplateRulesDescAttachmentModalContent = ({
  form,
  onFinish,
  fileList,
  setFileList,
}: ContractsTemplateRulesDescAttachmentModalContentProps) => {
  const hasFile = fileList.length > 0;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className={`contracts-template-rules-desc-attachment-modal-content ${
        hasFile ? "has-file" : "no-file"
      }`}
    >
      <CustomInput
        label="عنوان فایل"
        name="title"
        placeholder="عنوان فایل را وارد نمایید."
        rules={[REQUIRED_RULE]}
      />
      <CustomUploader
        label="بارگذاری فایل"
        name="file"
        rules={[REQUIRED_RULE]}
        fileList={fileList}
        setFileList={setFileList}
        multiple={false}
        maxCount={1}
        isDisabled={fileList.length >= 1}
        uploaderText={
          <div className="contracts-template-upload-text-container">
            <div className="contracts-template-upload-logo">
              <AiOutlinePlus />
            </div>
            <div className="contracts-template-upload-text">بارگذاری</div>
          </div>
        }
        hasUploaderIcon={false}
        isReadOnly={false}
      />
    </Form>
  );
};

export default ContractsTemplateRulesDescAttachmentModalContent;
