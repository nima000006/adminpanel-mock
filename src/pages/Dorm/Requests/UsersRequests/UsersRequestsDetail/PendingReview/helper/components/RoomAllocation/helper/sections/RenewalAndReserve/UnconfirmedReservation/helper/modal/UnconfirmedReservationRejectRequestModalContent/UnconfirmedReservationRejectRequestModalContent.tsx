import { Form } from "antd";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { UnconfirmedReservationRejectRequestModalContentProps } from "./@types/@unconfirmedReservationRejectRequestModalContent";
import "./_unconfirmedReservationRejectRequestModalContent.scss";

const UnconfirmedReservationRejectRequestModalContent = ({
  form,
}: UnconfirmedReservationRejectRequestModalContentProps) => {
  return (
    <Form
      className="unconfirmed-reservation-reject-request-modal-content-container"
      form={form}
    >
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

export default UnconfirmedReservationRejectRequestModalContent;
