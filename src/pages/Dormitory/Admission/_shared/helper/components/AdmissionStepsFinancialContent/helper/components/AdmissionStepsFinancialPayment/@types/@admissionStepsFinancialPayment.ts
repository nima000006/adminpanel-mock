import { FormInstance } from "antd";

import { AdmissionStepsFinancialFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/@types/@admissionStepsFinancialContent";

export type AdmissionStepsFinancialPaymentProps = {
  form: FormInstance<AdmissionStepsFinancialFormType>;
  isDaily: boolean;
  defaultHasPaymentDeadline: boolean;
  onCalculateWithDate: (installmentIndex: number) => void;
};
