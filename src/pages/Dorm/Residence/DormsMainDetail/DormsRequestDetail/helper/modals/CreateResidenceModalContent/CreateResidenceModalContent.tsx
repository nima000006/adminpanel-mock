import { Form, FormInstance } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_NO_SPACE_RULE } from "@infra/validation/validationSchema";

import { ResidenceFormFields } from "../../components/residenceReturnedDetail/@types/@residenceReturnedDetail";
import "./_createResidenceModalContent.scss";

const CreateResidenceModalContent = ({
  form,
}: {
  form: FormInstance<ResidenceFormFields>;
}) => {
  return (
    <Form form={form} className="residence-request-tab-modal-content-container">
      <p className="modal-content-text">
        درخواست شما مبنی بر ایجاد اقامتگاه به مسئول مربوطه ارجاع داده خواهد شد. لطفاً علت
        درخواست خود را ذکر کنید.
      </p>
      <CustomTextArea
        label="توضیحات"
        name="desc"
        placeholder="توضیحات"
        maxLength={100}
        showCount
        rules={[REQUIRED_NO_SPACE_RULE]}
      />
    </Form>
  );
};
export default CreateResidenceModalContent;
