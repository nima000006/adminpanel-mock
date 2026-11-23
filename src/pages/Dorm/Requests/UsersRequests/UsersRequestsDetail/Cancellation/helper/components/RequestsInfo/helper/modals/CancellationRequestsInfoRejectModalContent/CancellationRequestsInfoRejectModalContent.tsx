import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { MIN_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { CancellationRequestsInfoRejectModalContentProps } from "./@types/@cancellationRequestsInfoRejectModalContent";
import "./_cancellationRequestsInfoRejectModalContent.scss";

const CancellationRequestsInfoRejectModalContent = ({
  form,
}: CancellationRequestsInfoRejectModalContentProps) => {
  return (
    <Form
      className="cancellation-requests-info-reject-modal-content-container"
      form={form}
    >
      <p className="text">آیا از رد این درخواست کنسلی اطمینان دارید؟</p>
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

export default CancellationRequestsInfoRejectModalContent;
