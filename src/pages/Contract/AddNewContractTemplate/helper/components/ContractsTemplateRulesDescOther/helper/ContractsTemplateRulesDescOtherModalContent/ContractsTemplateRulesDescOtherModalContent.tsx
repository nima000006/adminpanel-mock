import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { PERSIAN_TEXT_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ContractsTemplateRulesDescOtherModalContentProps } from "./@types/@ContractsTemplateRulesDescAttachmentModalContentProps";

const ContractsTemplateRulesDescOtherModalContent = ({
  form,
  onFinish,
}: ContractsTemplateRulesDescOtherModalContentProps) => {
  return (
    <Form form={form} onFinish={onFinish}>
      <CustomInput
        label="عنوان بند"
        name="title"
        placeholder="عنوان بند را وارد نمایید."
        rules={[REQUIRED_RULE, PERSIAN_TEXT_RULE]}
      />
      <CustomTextArea
        label="توضیح بند "
        name="text"
        placeholder="متن بند را وارد کنید."
        rules={[REQUIRED_RULE]}
      />
    </Form>
  );
};

export default ContractsTemplateRulesDescOtherModalContent;
