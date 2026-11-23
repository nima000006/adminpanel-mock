import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormCreateModalContentProps } from "./@types/@dormCreateAndModify";
import "./_dormCreateModalContent.scss";

const DormCreateModalContent = ({ form }: DormCreateModalContentProps) => {
  return (
    <Form className="dorm-create-modal-content-container" form={form}>
      <p className="text">
        درخواست شما مبنی بر ایجاد اقامتگاه به مسئول مربوطه ارجاع داده خواهد شد. لطفاً علت
        درخواست خود را ذکر کنید.
      </p>
      <CustomTextArea
        label="توضیحات"
        name="modalDesc"
        placeholder="توضیحات"
        rules={[REQUIRED_RULE]}
        maxLength={100}
        showCount
      />
    </Form>
  );
};
export default DormCreateModalContent;
