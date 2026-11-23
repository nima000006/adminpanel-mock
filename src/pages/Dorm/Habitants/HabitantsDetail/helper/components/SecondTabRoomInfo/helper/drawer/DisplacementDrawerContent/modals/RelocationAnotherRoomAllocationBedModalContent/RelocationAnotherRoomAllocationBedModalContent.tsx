import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";

import { RelocationAnotherRoomAllocationBedModalContentProps } from "./@types/@relocationAnotherRoomAllocationBedModalContent";

const RelocationAnotherRoomAllocationBedModalContent = ({
  form,
}: RelocationAnotherRoomAllocationBedModalContentProps) => {
  return (
    <Form
      className="unconfirmed-reservation-another-room-allocation-modal-content-container"
      form={form}
    >
      <p className="text">
        با تخصیص یک تخت از یک اتاق دیگر، مبلغ نهایی فاکتور به‌روز رسانی می‌شود. آیا از
        تخصیص این تخت از این اتاق به کاربر اطمینان دارید؟
      </p>
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

export default RelocationAnotherRoomAllocationBedModalContent;
