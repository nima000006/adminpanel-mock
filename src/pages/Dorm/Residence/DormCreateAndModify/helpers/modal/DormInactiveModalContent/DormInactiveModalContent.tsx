import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { DormInactiveModalContentProps } from "./@types/@dormInactiveModalContent";
import "./_dormInactiveModalContent.scss";

const DormInactiveModalContent = ({ form }: DormInactiveModalContentProps) => {
  return (
    <Form className="residence-inactive-modal-container" form={form}>
      <p className="text">
        درخواست شما مبنی بر غیر فعال کردن این خوابگاه به مسئول مربوطه ارجاع داده خواهد شد.
        لطفاً علت درخواست خود را ذکر کنید.
      </p>
      <CustomTextArea
        label="توضیحات"
        name="inactiveDesc"
        placeholder="توضیحات"
        rules={[REQUIRED_RULE]}
        maxLength={100}
        showCount
      />
    </Form>
  );
};

export default DormInactiveModalContent;
