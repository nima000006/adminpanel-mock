import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";

import { UnconfirmedReservationThisRoomAllocationModalContentProps } from "./@types/@unconfirmedReservationThisRoomAllocationModalContent";
import "./_unconfirmedReservationThisRoomAllocationModalContent.scss";

const UnconfirmedReservationThisRoomAllocationModalContent = ({
  form,
}: UnconfirmedReservationThisRoomAllocationModalContentProps) => {
  return (
    <Form
      className="unconfirmed-reservation-this-room-allocation-modal-content-container"
      form={form}
    >
      <p className="text">آیا از تخصیص این تخت به کاربر انتخاب شده اطمینان دارید؟</p>
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

export default UnconfirmedReservationThisRoomAllocationModalContent;
