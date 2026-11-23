import { Form } from "antd";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";

import { PendingListConfirmBedAllocationModalContentProps } from "./@types/@pendingListConfirmBedAllocationModalContent";
import "./_pendingListConfirmBedAllocationModalContent.scss";

const PendingListConfirmBedAllocationModalContent = ({
  form,
}: PendingListConfirmBedAllocationModalContentProps) => {
  return (
    <Form
      className="pending-list-confirmation-bed-allocation-modal-content-container"
      form={form}
    >
      <CustomRadioGroup
        name="paymentMethod"
        label="لطفاً نوع پرداخت را مشخص کنید."
        options={[
          {
            label: "نقدی",
            value: "1",
          },
          {
            label: "اقساطی",
            value: "2",
          },
        ]}
      />
      <p className="text">آیا از تخصیص این تخت از این اتاق به کاربر اطمینان دارید؟</p>
      <CustomTextArea label="توضیحات" name="description" showCount maxLength={100} />
    </Form>
  );
};

export default PendingListConfirmBedAllocationModalContent;
