import { useMemo } from "react";

import { useTheme } from "@infra/context/ThemeContext";

import { CHART_COMPONENTS } from "./chartComponents";
import ChartLoader from "./ChartLoader";
import { buildChartProps, DEFAULT_CONFIG, CHART_FONT_FAMILY } from "./utils";

import type { ChartType, CustomChartProps } from "./types";

/**
 * CustomChart - A simple, feature-rich wrapper for MUI X Charts
 *
 * @example
 * // Bar Chart
 * <CustomChart
 *   type="bar"
 *   data={{
 *     series: [{ data: [4, 3, 5] }],
 *     xAxis: [{ data: ['A', 'B', 'C'], scaleType: 'band' }],
 *   }}
 *   config={{ height: 300 }}
 * />
 *
 * @example
 * // Pie Chart
 * <CustomChart
 *   type="pie"
 *   data={{
 *     series: [{ data: [{ value: 10, label: 'A' }, { value: 20, label: 'B' }] }],
 *   }}
 *   config={{ height: 300 }}
 * />
 *
 * @example
 * // Line Chart with grid and custom colors
 * <CustomChart
 *   type="line"
 *   data={{
 *     series: [{ data: [1, 2, 3, 4, 5] }],
 *     xAxis: [{ data: [1, 2, 3, 4, 5] }],
 *   }}
 *   config={{
 *     height: 300,
 *     grid: { horizontal: true },
 *     colors: ['#4caf50'],
 *   }}
 * />
 */
function CustomChart<T extends ChartType>({
  type,
  data,
  config = DEFAULT_CONFIG,
  className,
}: CustomChartProps<T>) {
  const ChartComponent = CHART_COMPONENTS[type] as React.ComponentType<any>;

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const LABEL_COLOR = isDark ? "#8c8c8c !important" : "black !important";
  const AXIOS_COLOR = isDark ? "#434343 !important" : "#f0f0f0 !important";

  const chartProps = useMemo(
    () => buildChartProps(data as Record<string, any>, config),
    [data, config]
  );

  if (config.loading) {
    return <ChartLoader height={config.height} />;
  }

  return (
    <div
      className={`custom-chart ${className || ""}`}
      style={{
        width: config.width || "100%",
        height: config.height,
        fontFamily: CHART_FONT_FAMILY,
      }}
    >
      <ChartComponent
        {...chartProps}
        sx={{
          fontFamily: CHART_FONT_FAMILY,
          "& .MuiChartsAxis-tickLabel": {
            fontFamily: `${CHART_FONT_FAMILY} !important`,
            fill: LABEL_COLOR,
            color: LABEL_COLOR,
          },
          "& .MuiChartsLegend-label": {
            fontFamily: `${CHART_FONT_FAMILY} !important`,
            fill: LABEL_COLOR,
            color: LABEL_COLOR,
          },
          "& .MuiChartsTooltip-root": {
            fontFamily: `${CHART_FONT_FAMILY} !important`,
            fill: LABEL_COLOR,
            color: LABEL_COLOR,
          },
          "& .MuiChartsAxisHighlight-root": {
            fontFamily: `${CHART_FONT_FAMILY} !important`,
            fill: LABEL_COLOR,
            color: LABEL_COLOR,
          },
          "& text": {
            fontFamily: `${CHART_FONT_FAMILY} !important`,
            fill: LABEL_COLOR,
            color: LABEL_COLOR,
          },

          // ✅ Axis line (X & Y)
          "& .MuiChartsAxis-line": {
            stroke: AXIOS_COLOR,
          },

          // ✅ Tick lines
          "& .MuiChartsAxis-tick": {
            stroke: AXIOS_COLOR,
          },

          // ✅ Grid lines
          "& .MuiChartsGrid-line": {
            stroke: AXIOS_COLOR,
          },

          ...chartProps.sx,
        }}
      />
    </div>
  );
}

export default CustomChart;
