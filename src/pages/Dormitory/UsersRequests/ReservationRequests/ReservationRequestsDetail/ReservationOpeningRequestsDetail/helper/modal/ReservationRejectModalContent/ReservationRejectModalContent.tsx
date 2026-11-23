import { Form } from "antd";

import { CustomSelect, CustomTextArea } from "@components/CustomInputs";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

const ReservationRejectModalContent = () => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="flex flex-col">
      <CustomSelect
        label="علت"
        name="reason"
        options={[]}
        // form={form}
        placeholder="انتخاب کنید"
        rules={[REQUIRED_RULE]}
      />
      <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
    </Form>
  );
};
export default ReservationRejectModalContent;
