import { MyReportMainServiceDetailResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

export type IncomeAnalysisLineChartProps = {
  createBodyParams: () => Record<number, string | number> | null | undefined;
  isFormValid: boolean;
  serviceDetailData: MyReportMainServiceDetailResponse | undefined;
  triggerItems: Record<string, string>;
  validateData: (data: unknown, reportTypeTitle: string) => boolean | null;
};
