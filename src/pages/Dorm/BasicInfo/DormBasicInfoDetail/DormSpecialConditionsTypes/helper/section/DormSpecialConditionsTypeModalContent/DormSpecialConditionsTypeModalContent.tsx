import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { MAX_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormSpecialConditionsTypeModalContentProps } from "./@types/@dormSpecialConditionsTypeModalContent";

const DormSpecialConditionsTypeModalContent = ({
  form,
}: DormSpecialConditionsTypeModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ specialConditionsTitle: value.trimStart() });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomInput
        type="text"
        label="عنوان شرایط خاص"
        name="specialConditionsTitle"
        placeholder="عنوان شرایط خاص را اینجا وارد نمایید"
        onChange={handleInputChange}
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(32)]}
      />
    </Form>
  );
};
export default DormSpecialConditionsTypeModalContent;
