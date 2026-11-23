import { Form, FormInstance } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { AdmissionModifyFormData } from "../../../AdmissionModify/@types/@admissionModify";
import "./_createAdmissionModalContent.scss";

const CreateAdmissionModalContent = ({
  form,
}: {
  form: FormInstance<AdmissionModifyFormData>;
}) => {
  return (
    <Form form={form} className="dorm-admission-create-modal-content">
      <p className="modal-content-text">
        درخواست شما مبنی بر ایجاد برنامه پذیرش به مسئول مربوطه ارجاع داده می‌شود. لطفاً
        علت درخواست خود را ذکر کنید.
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
export default CreateAdmissionModalContent;
