import { CustomChart } from "../";

/**
 * Basic Bar Chart Example
 */
export const BasicBarChart = () => (
  <CustomChart
    type="bar"
    data={{
      series: [{ data: [4, 3, 5, 2, 6] }],
      xAxis: [{ data: ["Mon", "Tue", "Wed", "Thu", "Fri"], scaleType: "band" }],
    }}
    config={{ height: 300 }}
  />
);

/**
 * Horizontal Bar Chart
 */
export const HorizontalBarChart = () => (
  <CustomChart
    type="bar"
    data={{
      series: [{ data: [35, 44, 24, 56] }],
      yAxis: [{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }],
      layout: "horizontal",
    }}
    config={{ height: 300 }}
  />
);

/**
 * Grouped Bar Chart (Multiple Series)
 */
export const GroupedBarChart = () => (
  <CustomChart
    type="bar"
    data={{
      series: [
        { data: [35, 44, 24, 56], label: "2023" },
        { data: [51, 36, 38, 42], label: "2024" },
      ],
      xAxis: [{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }],
    }}
    config={{
      height: 300,
      colors: ["#2196f3", "#4caf50"],
    }}
  />
);

/**
 * Stacked Bar Chart
 */
export const StackedBarChart = () => (
  <CustomChart
    type="bar"
    data={{
      series: [
        { data: [35, 44, 24, 56], label: "Product A", stack: "total" },
        { data: [51, 36, 38, 42], label: "Product B", stack: "total" },
        { data: [15, 26, 18, 22], label: "Product C", stack: "total" },
      ],
      xAxis: [{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }],
    }}
    config={{ height: 300 }}
  />
);

/**
 * Bar Chart with Grid
 */
export const BarChartWithGrid = () => (
  <CustomChart
    type="bar"
    data={{
      series: [{ data: [4, 3, 5, 2, 6] }],
      xAxis: [{ data: ["A", "B", "C", "D", "E"], scaleType: "band" }],
    }}
    config={{
      height: 300,
      grid: { horizontal: true },
    }}
  />
);

export default {
  BasicBarChart,
  HorizontalBarChart,
  GroupedBarChart,
  StackedBarChart,
  BarChartWithGrid,
};
