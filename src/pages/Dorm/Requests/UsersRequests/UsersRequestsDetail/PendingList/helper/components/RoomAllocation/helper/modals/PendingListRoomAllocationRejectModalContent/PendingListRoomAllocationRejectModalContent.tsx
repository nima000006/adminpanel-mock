import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { MIN_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { PendingListRoomAllocationRejectModalContentProps } from "./@types/@pendingListRoomAllocationRejectModalContent";
import "./_pendingListRoomAllocationRejectModalContent.scss";

const PendingListRoomAllocationRejectModalContent = ({
  form,
}: PendingListRoomAllocationRejectModalContentProps) => {
  return (
    <Form
      className="pending-list-room-allocation-reject-modal-content-container"
      form={form}
    >
      <p className="text">آیا از رد این درخواست اطمینان دارید؟</p>
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

export default PendingListRoomAllocationRejectModalContent;
