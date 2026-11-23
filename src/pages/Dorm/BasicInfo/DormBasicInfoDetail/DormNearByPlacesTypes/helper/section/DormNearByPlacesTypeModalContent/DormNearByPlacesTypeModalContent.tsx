import { Form } from "antd";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormNearByPlacesTypeModalContentProps } from "./@types/@dormNearByPlacesTypeModalContent";

const DormNearByPlacesTypeModalContent = ({
  form,
}: DormNearByPlacesTypeModalContentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setFieldsValue({ placeTitle: value.trimStart() });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomInput
        type="text"
        label="عنوان مکان"
        name="placeTitle"
        placeholder="عنوان نوع اماکن را اینجا وارد نمایید"
        onChange={handleInputChange}
        rules={[REQUIRED_RULE]}
      />
    </Form>
  );
};
export default DormNearByPlacesTypeModalContent;
