import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { RoomAllocationRelocationRejectModalContentProps } from "./@types/@roomAllocationRelocationRejectModalContent";
import "./_roomAllocationRelocationRejectModalContent.scss";

const RoomAllocationRelocationRejectModalContent = ({
  form,
}: RoomAllocationRelocationRejectModalContentProps) => {
  return (
    <Form
      className="room-allocation-relocation-reject-modal-content-container"
      form={form}
    >
      <p className="text">آیا از رد این درخواست جابجایی اطمینان دارید؟</p>
      <CustomTextArea
        label="توضیحات"
        name="description"
        rules={[REQUIRED_RULE]}
        showCount
        maxLength={100}
      />
    </Form>
  );
};

export default RoomAllocationRelocationRejectModalContent;
