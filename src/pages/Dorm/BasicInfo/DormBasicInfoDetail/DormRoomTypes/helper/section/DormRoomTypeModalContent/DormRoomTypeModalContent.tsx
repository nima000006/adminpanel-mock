import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { MAX_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormRoomTypeModalContentProps } from "./@types/@dormRoomTypeModalContent";

const DormRoomTypeModalContent = ({ form }: DormRoomTypeModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ roomTitle: value.trimStart() });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomInput
        type="text"
        label="عنوان نوع اتاق"
        name="roomTitle"
        placeholder="عنوان نوع اتاق را اینجا وارد نمایید"
        rules={[REQUIRED_RULE, MAX_LENGTH_RULE(32)]}
        onChange={handleInputChange}
      />
    </Form>
  );
};
export default DormRoomTypeModalContent;
