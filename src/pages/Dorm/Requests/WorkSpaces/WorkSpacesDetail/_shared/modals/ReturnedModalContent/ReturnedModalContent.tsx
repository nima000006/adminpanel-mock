import { Form, FormInstance } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import "../_modalContent.scss";

const ReturnedModalContent = ({
  form,
}: {
  form: FormInstance<{ description: string }>;
}) => {
  return (
    <Form form={form} className="work-spaces-modal-content-container">
      <p className="modal-content-text">آیا از عودت این درخواست اطمنیان دارید؟</p>
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
export default ReturnedModalContent;
