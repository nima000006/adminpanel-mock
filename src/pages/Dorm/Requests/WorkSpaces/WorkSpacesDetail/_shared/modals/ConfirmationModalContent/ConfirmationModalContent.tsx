import { Form, FormInstance } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import "../_modalContent.scss";

const ConfirmationModalContent = ({
  form,
}: {
  form: FormInstance<{ description: string }>;
}) => {
  return (
    <Form form={form} className="work-spaces-modal-content-container">
      <p className="modal-content-text">آیا از تأیید این درخواست اطمینان دارید؟</p>
      <CustomTextArea
        label="توضیحات"
        name="description"
        placeholder="توضیحات"
        maxLength={100}
        showCount
      />
    </Form>
  );
};
export default ConfirmationModalContent;
