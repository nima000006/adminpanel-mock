import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ReservationRejectRequestModalContentProps } from "./@types/@reservationRejectRequestModalContent";
import "./_reservationRejectRequestModalContent.scss";

const ReservationRejectRequestModalContent = ({
  form,
}: ReservationRejectRequestModalContentProps) => {
  return (
    <Form className="reservation-reject-request-modal-content-container" form={form}>
      <p className="text">آیا از رد این درخواست اطمینان دارید؟</p>
      <CustomTextArea
        label="توضیحات"
        name="description"
        placeholder="توضیحات"
        rules={[REQUIRED_RULE]}
        maxLength={100}
        showCount
      />
    </Form>
  );
};

export default ReservationRejectRequestModalContent;
