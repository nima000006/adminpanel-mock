import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ModifySubsetsRulesModalContentProps } from "./@types/@modifySubsetsRulesModalContent";

const ModifySubsetsRulesAndRegulationModalContent = ({
  form,
}: ModifySubsetsRulesModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ subsetRulesTitle: value.trimStart() });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomTextArea
        label="متن قوانین و مقررات"
        name="subsetRulesTitle"
        placeholder="متن توضیحات خود را اینجا وارد نمایید"
        onChange={handleInputChange}
        rules={[REQUIRED_RULE]}
        maxLength={100}
        showCount
      />
    </Form>
  );
};
export default ModifySubsetsRulesAndRegulationModalContent;
