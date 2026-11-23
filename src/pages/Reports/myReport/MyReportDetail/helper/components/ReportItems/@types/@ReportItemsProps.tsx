import { ReportDetailDto } from "@pages/Reports/myReport/@types/@myReportTypes";
import { MyReportDetailsResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

export type ReportItemsProps = {
  detailDataWithId?: MyReportDetailsResponse[];
  loadingReportIds: Set<number>;
  onReportIdChange: (reportTypeId: number, reportId: number) => void;
  sectionReportsByType: Record<number, ReportDetailDto[]>;
  selectedReportsByType: Record<number, number>;
  filterParams: Record<string | number, string>;
  detailDataParamsFilled: boolean;
};
