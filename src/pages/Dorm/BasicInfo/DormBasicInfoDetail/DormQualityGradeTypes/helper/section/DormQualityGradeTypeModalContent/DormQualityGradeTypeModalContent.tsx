import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { MAX_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormQualityGradeTypeModalContentProps } from "./@types/@dormQualityGradeTypeModalContent";

const DormQualityGradeTypeModalContent = ({
  form,
}: DormQualityGradeTypeModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ qualityTitle: value.trimStart() });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomInput
        type="text"
        label="عنوان درجه کیفی"
        name="qualityTitle"
        placeholder="عنوان درجه کیفی را اینجا وارد نمایید"
        onChange={handleInputChange}
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(32)]}
      />
    </Form>
  );
};
export default DormQualityGradeTypeModalContent;
