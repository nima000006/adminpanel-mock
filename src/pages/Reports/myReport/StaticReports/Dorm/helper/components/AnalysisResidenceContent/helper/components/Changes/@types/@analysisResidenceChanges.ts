import { MyReportMainServiceDetailResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

export type AnalysisResidenceChangesProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  triggerItems: Record<string, string | string[]>;
  serviceDetailData: MyReportMainServiceDetailResponse | undefined;
  isFormValid: boolean;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};
