import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";

import { UnconfirmedReservationRoomAllocationModalContentProps } from "./@types/@unconfirmedReservationRoomAllocationModalContent";
import "./_unconfirmedReservationRoomAllocationModalContent.scss";

const UnconfirmedReservationRoomAllocationModalContent = ({
  form,
}: UnconfirmedReservationRoomAllocationModalContentProps) => {
  return (
    <Form
      className="unconfirmed-reservation-room-allocation-modal-content-container"
      form={form}
    >
      <p className="text">آیا از تخصیص این تخت از این اتاق به کاربر اطمینان دارید؟</p>
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

export default UnconfirmedReservationRoomAllocationModalContent;
