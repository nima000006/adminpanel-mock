// helper/utils/reportUtils.ts

import { ReportDetailDto } from "../../@types/@myReportTypes";
import { MyReportDetailsResponse } from "../../StaticReports/MyDoctor/@types/@myDoctorStaticReport";

export enum ReportTypes {
  TABLE = 1,
  NUMBER = 2,
  LINE_CHART = 3,
  PIE_CHART = 4,
  REC_CHART = 5,
}

export const mapMyReportDetailsResponseToDto = (
  item: MyReportDetailsResponse
): ReportDetailDto => {
  let normalizedData = item.data;

  if (Array.isArray(item.data)) {
    switch (item.reportTypeId) {
      case ReportTypes.TABLE:
      case ReportTypes.NUMBER:
        normalizedData = item.data || [];
        break;
    }
  }

  return {
    key: item.key,
    reportTypeId: item.reportTypeId,
    reportTypeTitle: item.reportTypeTitle,
    section: item.section ?? 0,
    title: item.title ?? "",
    reportTitle: item.reportTitle ?? "",
    reportId: item.reportId,
    data: normalizedData,
  };
};

export const getColPropsByType = (
  type: number,
  sectionItems: MyReportDetailsResponse[]
) => {
  const chartTypes = [
    ReportTypes.LINE_CHART,
    ReportTypes.PIE_CHART,
    ReportTypes.REC_CHART,
  ];

  switch (type) {
    case ReportTypes.TABLE:
      return { span: 24 }; // همیشه full width
    case ReportTypes.NUMBER:
      return { xs: 24, sm: 12, md: 6, className: "report-card-container" }; // کارت 4 تایی
    case ReportTypes.LINE_CHART:
    case ReportTypes.PIE_CHART:
    case ReportTypes.REC_CHART: {
      // اگر فقط یک Chart در سکشن هست full width، وگرنه نصف عرض
      const chartCount = sectionItems.filter((i) =>
        chartTypes.includes(i.reportTypeId)
      ).length;
      return chartCount === 1 ? { span: 24 } : { xs: 24, sm: 12 };
    }
    default:
      return { span: 24 };
  }
};

// Helper function to group chart items by their reportTitle (group)
export const groupChartsByTitle = (items: MyReportDetailsResponse[]) => {
  const chartTypeIds = [ReportTypes.LINE_CHART, ReportTypes.REC_CHART];
  const chartItems = items.filter((item) => chartTypeIds.includes(item.reportTypeId));

  // Group by reportTitle
  const grouped = chartItems.reduce(
    (acc, item) => {
      const title = item.reportTitle;
      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title].push(item);
      return acc;
    },
    {} as Record<string, MyReportDetailsResponse[]>
  );

  return grouped;
};

// Helper function to check if there are chart groups in items
export const hasChartGroups = (items: MyReportDetailsResponse[]) => {
  const chartTypeIds = [ReportTypes.LINE_CHART, ReportTypes.REC_CHART];
  return items.some((item) => chartTypeIds.includes(item.reportTypeId));
};

// Helper function to get all items that are NOT charts
export const getNonChartItems = (items: MyReportDetailsResponse[]) => {
  const chartTypeIds = [ReportTypes.LINE_CHART, ReportTypes.REC_CHART];
  return items.filter((item) => !chartTypeIds.includes(item.reportTypeId));
};
