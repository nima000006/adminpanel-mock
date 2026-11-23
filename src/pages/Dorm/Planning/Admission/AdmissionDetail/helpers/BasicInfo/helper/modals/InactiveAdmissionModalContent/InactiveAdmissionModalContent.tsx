import { Form, FormInstance } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

const InactiveAdmissionModalContent = ({
  form,
}: {
  form: FormInstance<{ description: string }>;
}) => {
  return (
    <Form form={form} className="dorm-inactive-modal-content-container">
      <p className="modal-content-text">
        درخواست شما مبنی بر غیر فعال کردن برنامه پذیرش به مسئول مربوطه ارجاع داده می‌شود.
        لطفاً علت درخواست خود را ذکر کنید.
      </p>
      <CustomTextArea
        label="توضیحات"
        name="description"
        placeholder="توضیحات"
        rules={[REQUIRED_RULE]}
        maxLength={100}
        showCount
      />
    </Form>
  );
};
export default InactiveAdmissionModalContent;
