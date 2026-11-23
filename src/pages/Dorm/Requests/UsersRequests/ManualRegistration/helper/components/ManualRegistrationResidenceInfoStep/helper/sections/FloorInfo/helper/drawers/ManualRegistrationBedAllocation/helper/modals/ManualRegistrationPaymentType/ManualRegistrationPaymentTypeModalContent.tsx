import { Form } from "antd";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";

import { ManualRegistrationPaymentTypeModalContentProps } from "./@types/@manualRegistrationPaymentTypeModalContent";
import "./_manualRegistrationPaymentTypeModalContent.scss";

const PAID_BY_STUDENT = 1;
const PAID_BY_AdMIN = 2;

const paymentTypeOptions = [
  {
    value: PAID_BY_STUDENT,
    label: "پرداخت توسط کاربر",
  },
  {
    value: PAID_BY_AdMIN,
    label: "پرداخت توسط شما در پنل",
  },
];

const ManualRegistrationPaymentTypeModalContent = ({
  form,
  isPaidByStudent,
  setIsPaidByStudent,
}: ManualRegistrationPaymentTypeModalContentProps) => {
  return (
    <div className="manual-registration-payment-type-modal-content-container">
      <CustomDivider text="پرداخت کننده" />
      <Form form={form}>
        <CustomRadioGroup
          name="paymentMethod"
          label=""
          options={paymentTypeOptions}
          defaultValue={PAID_BY_STUDENT}
          onChange={(e) => {
            if (e?.target?.value === PAID_BY_STUDENT) {
              setIsPaidByStudent(true);
            } else {
              setIsPaidByStudent(false);
            }
          }}
        />
      </Form>
      <div className="alert-container">
        {isPaidByStudent && (
          <CustomAlert
            message="توجه!"
            description='با کلیک بر روی "تایید و ارسال فاکتور در اپلیکیشن"، مشخصات خوابگاه انتخابی شما به همراه فاکتور پرداخت آن برای متقاضی خوابگاه در اپلیکیشن دانشجویار نمایش داده خواهد شد.'
            type="warning"
            showIcon
          />
        )}
        <CustomAlert
          description={
            <div>
              <span>قابل پرداخت</span>
              <span>{20000} تومان</span>
            </div>
          }
          type="warning"
        />
      </div>
    </div>
  );
};

export default ManualRegistrationPaymentTypeModalContent;
