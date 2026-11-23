import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { MAX_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormFeedbackTypeModalContentProps } from "./@types/@dormFeedbackTypeModalContent";

const DormFeedbackTypeModalContent = ({ form }: DormFeedbackTypeModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ feedbackTitle: value.trimStart() });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomInput
        type="text"
        label="عنوان بازخورد"
        name="feedbackTitle"
        placeholder="عنوان بازخورد را اینجا وارد نمایید"
        onChange={handleInputChange}
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(32)]}
      />
    </Form>
  );
};
export default DormFeedbackTypeModalContent;
