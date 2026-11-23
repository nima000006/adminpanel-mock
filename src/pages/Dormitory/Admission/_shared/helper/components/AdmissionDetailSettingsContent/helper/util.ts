import { AdmissionRenewalSourceItem } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export const getViewFinancialModalAlertMessage = (
  record: AdmissionRenewalSourceItem,
  currentProgramTitle: string
) =>
  `در زیر رفتار مالی شما بابت فاصله “${record.timeInterval}” با کاربران ساکن برنامه پذیرش “${record.sourceProgramTitle}” که به این برنامه “${currentProgramTitle}” تمدید می‌کنند مشخص شده است.`;
