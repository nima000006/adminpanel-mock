import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { MIN_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { CancellationRequestsInfoConfirmModalContentProps } from "./@types/@cancellationRequestsInfoConfirmModalContent";
import "./_cancellationRequestsInfoConfirmModalContent.scss";

const CancellationRequestsInfoConfirmModalContent = ({
  form,
}: CancellationRequestsInfoConfirmModalContentProps) => {
  return (
    <Form
      className="cancellation-requests-info-confirm-modal-content-container"
      form={form}
    >
      <p className="text">
        آیا از تأیید کنسلی درخواست کاربر اطمینان دارید؟ اگر کاربر پرداختی انجام داده باشد،
        در آن صورت می‌بایست مبلغ باقیمانده به ایشان عودت داده شود.
      </p>
      <CustomTextArea
        label="توضیحات"
        name="description"
        rules={[REQUIRED_RULE, MIN_LENGTH_RULE(3)]}
        showCount
        maxLength={100}
      />
    </Form>
  );
};

export default CancellationRequestsInfoConfirmModalContent;
