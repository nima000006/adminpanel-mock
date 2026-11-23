import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { MAX_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormRulesAndRegulationTypeModalContentProps } from "./@types/@dormRulesAndRegulationTypeModalContent";

const DormRulesAndRegulationTypeModalContent = ({
  form,
}: DormRulesAndRegulationTypeModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ rulesAndRegulationTitle: value.trimStart() });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomInput
        type="text"
        label="عنوان نوع قوانین و مقررات"
        name="rulesAndRegulationTitle"
        placeholder="عنوان نوع قوانین و مقررات را اینجا وارد نمایید"
        onChange={handleInputChange}
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(32)]}
      />
    </Form>
  );
};
export default DormRulesAndRegulationTypeModalContent;
