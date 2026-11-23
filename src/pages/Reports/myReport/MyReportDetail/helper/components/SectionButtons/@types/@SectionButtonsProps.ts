import { ReportDetailResponse } from "@pages/Reports/myReport/@types/@myReportTypes";

export type SectionButtonsProps = {
  lastSection: number;
  activeSection: number;
  detailData?: ReportDetailResponse | undefined;
  sectionsDisabled: boolean;
  onSectionClick: (sectionNumber: number) => void;
};
