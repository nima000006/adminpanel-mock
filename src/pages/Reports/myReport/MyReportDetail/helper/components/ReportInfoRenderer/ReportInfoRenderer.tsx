import CustomCard from "@components/CustomCard/CustomCard";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import { ReportDetailDto } from "@pages/Reports/myReport/@types/@myReportTypes";

import BarChartRenderer from "./helper/components/BarChartRenderer/BarChartRenderer";
import LineChartRenderer from "./helper/components/LineChartRenderer/LineChartRenderer";
import NumberRenderer from "./helper/components/NumberRenderer/NumberRenderer";
import PieChartRenderer from "./helper/components/PieChartRenderer/PieChartRenderer";
import TableRenderer from "./helper/components/TableRenderer/TableRenderer";
import { ReportTypes } from "./helper/utils";

const ReportInfoRenderer = (
  props: ReportDetailDto & { filterParams?: Record<string | number, string> }
) => {
  const { reportTypeId, data, title, reportId, reportTitle, filterParams } = props;

  // Data validation check
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <CustomEmpty />;
  }

  // Helper function to check if data has required properties
  const hasProperty = (item: any, prop: string): boolean => {
    return item && typeof item === "object" && prop in item;
  };

  const dataArray = Array.isArray(data) ? data : [data];

  // Validation helpers for each chart type
  const isValidTableData = () => dataArray.length > 0;

  const isValidNumberData = () => dataArray.length > 0;

  const isValidLineChartData = () => dataArray.every((item) => hasProperty(item, "date"));

  const isValidPieChartData = () =>
    dataArray.every((item) => hasProperty(item, "amount"));

  const isValidBarChartData = () =>
    dataArray.every(
      (item) => hasProperty(item, "p1_title") && hasProperty(item, "p1_amount")
    );

  const renderUnsupported = () => (
    <CustomCard>
      <div className="report-info-not-found">نوع گزارش پشتیبانی نمی‌شود</div>
    </CustomCard>
  );

  switch (reportTypeId) {
    case ReportTypes.TABLE:
      return isValidTableData() ? (
        <TableRenderer
          data={dataArray}
          title={title ?? null}
          reportTitle={reportTitle}
          reportId={reportId}
          reportTypeId={reportTypeId}
          filterParams={filterParams}
        />
      ) : (
        renderUnsupported()
      );

    case ReportTypes.NUMBER:
      return isValidNumberData() ? (
        <NumberRenderer
          data={dataArray}
          title={title ?? null}
          reportTitle={reportTitle ?? ""}
        />
      ) : (
        renderUnsupported()
      );

    case ReportTypes.LINE_CHART:
      return isValidLineChartData() ? (
        <LineChartRenderer data={dataArray} title={title ?? undefined} />
      ) : (
        renderUnsupported()
      );

    case ReportTypes.PIE_CHART:
      return isValidPieChartData() ? (
        <PieChartRenderer data={dataArray} title={title ?? undefined} />
      ) : (
        renderUnsupported()
      );

    case ReportTypes.REC_CHART:
      return isValidBarChartData() ? (
        <BarChartRenderer data={dataArray} title={title ?? undefined} />
      ) : (
        renderUnsupported()
      );

    default:
      return renderUnsupported();
  }
};

export default ReportInfoRenderer;
