import { MyReportMainServiceDetailResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

export type ParticipantsStatisticsProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  serviceDetailData: MyReportMainServiceDetailResponse | undefined;
  triggerItems: Record<string, string>;
  isFormValid: boolean;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};
