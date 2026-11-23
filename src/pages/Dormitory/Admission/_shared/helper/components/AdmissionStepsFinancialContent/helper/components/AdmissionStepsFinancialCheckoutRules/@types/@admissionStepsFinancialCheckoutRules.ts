import { FormInstance } from "antd";

import { AdmissionStepsFinancialFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/@types/@admissionStepsFinancialContent";

export type AdmissionStepsFinancialCheckoutRulesProps = {
  form: FormInstance<AdmissionStepsFinancialFormType>;
  defaultHasEarlyCheckoutRules: boolean;
  defaultHasLateCheckoutPenalty: boolean;
};
