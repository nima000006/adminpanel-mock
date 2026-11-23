import { useMemo } from "react";

import CustomChart from "@components/Renderers/CustomChart/CustomChart";

import { getSeriesData } from "../../utils";
import { LineChartRendererProps } from "./@types/@LineChartRendererProps";

const LineChartRenderer = ({ data, title: _title }: LineChartRendererProps) => {
  return useMemo(() => {
    if (!Array.isArray(data) || !data.length) return null;
    const seriesKeys = getSeriesData(data);
    return (
      <CustomChart
        type="line"
        data={{
          series: seriesKeys.map((s) => ({
            data: data.map((item) => {
              const value = (item as Record<string, number | string | null | undefined>)[
                s.key
              ];
              return Number(value ?? 0);
            }),
            label: s.label,
            showMark: false,
          })),
          xAxis: [{ data: data.map((item) => item.date), scaleType: "point" as const }],
          yAxis: [
            {
              tickLabelStyle: {
                textAnchor: "end",
                direction: "ltr",
              },
            },
          ],
        }}
        config={{
          height: 400,
          grid: { horizontal: true },
          tooltip: { trigger: "axis" },
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
          },
        }}
      />
    );
  }, [data]);
};

export default LineChartRenderer;
