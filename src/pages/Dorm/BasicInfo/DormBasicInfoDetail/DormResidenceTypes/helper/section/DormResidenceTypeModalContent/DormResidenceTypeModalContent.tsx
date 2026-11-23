import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { MAX_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormResidenceTypeModalContentProps } from "./@types/@dormResidenceTypeModalContent";
import "./_dormResidenceTypeModalContent.scss";

const DormResidenceTypeModalContent = ({ form }: DormResidenceTypeModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ residenceTitle: value.trimStart() });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="dorm-residence-modal-content-container">
      <CustomInput
        type="text"
        label="عنوان نوع اقامتگاه"
        name="residenceTitle"
        placeholder="عنوان نوع اقامتگاه را اینجا وارد نمایید"
        onChange={handleInputChange}
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(32)]}
      />
    </Form>
  );
};
export default DormResidenceTypeModalContent;
