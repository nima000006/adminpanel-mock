import { AdmissionRenewalFinancialSettingType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type ViewFinancialFormType = {
  financialSettingType: AdmissionRenewalFinancialSettingType;
  warehousingFee?: number | null;
  extraStayDailyPercent?: number | null;
};
