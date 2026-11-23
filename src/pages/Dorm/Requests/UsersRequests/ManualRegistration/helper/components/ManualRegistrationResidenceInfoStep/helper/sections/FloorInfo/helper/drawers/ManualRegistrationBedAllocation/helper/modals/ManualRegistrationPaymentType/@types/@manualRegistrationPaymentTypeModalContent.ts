import { FormInstance } from "antd";

export type ManualRegistrationPaymentTypeModalContentProps = {
  form: FormInstance<{ paymentMethod: number }>;
  isPaidByStudent: boolean;
  setIsPaidByStudent: React.Dispatch<React.SetStateAction<boolean>>;
};
