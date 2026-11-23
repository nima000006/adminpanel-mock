import { MenuProps } from "antd";

import { useMyReportExportMutation } from "@infra/states/redux/Apis/report/myReport";

export enum ReportTypes {
  TABLE = 1,
  NUMBER = 2,
  LINE_CHART = 3,
  PIE_CHART = 4,
  REC_CHART = 5,
}

export const getSeriesData = (dataArray: any[]) => {
  if (!dataArray?.length) return [];
  const firstItem = dataArray[0];
  return Object.entries(firstItem)
    .filter(([key, value]) => key.match(/^p\d+$/) && typeof value === "number")
    .map(([key]) => ({
      key,
      label: (firstItem[`${key}_title`] as string) || key,
    }));
};

export const useExportMenu = (
  reportId: number | string | undefined,
  title: string | undefined
): MenuProps => {
  const [exportReport] = useMyReportExportMutation();

  const handleExportClick = async () => {
    try {
      const blob = await exportReport(Number(reportId)).unwrap();
      const buffer = await blob.arrayBuffer();
      const csvText =
        "\uFEFF" + new TextDecoder("utf-8").decode(buffer as AllowSharedBufferSource);

      const csvBlob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title || "report"}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return {
    items: [{ label: "خروجی Excel", key: "excel" }],
    onClick: () => handleExportClick(),
  };
};
