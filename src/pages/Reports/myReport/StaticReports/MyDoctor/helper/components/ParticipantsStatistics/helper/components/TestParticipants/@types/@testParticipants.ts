import { MyReportMainServiceDetailResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

export type TestParticipantsProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  triggerItems: Record<string, string>;
  isFormValid: boolean;
  serviceDetailData?: MyReportMainServiceDetailResponse;
};
