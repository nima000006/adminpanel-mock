import { CustomChart } from "../";

/**
 * Basic Line Chart
 */
export const BasicLineChart = () => (
  <CustomChart
    type="line"
    data={{
      series: [{ data: [2, 5.5, 2, 8.5, 1.5, 5] }],
      xAxis: [{ data: [1, 2, 3, 4, 5, 6] }],
    }}
    config={{ height: 300 }}
  />
);

/**
 * Line Chart with Multiple Series
 */
export const MultiSeriesLineChart = () => (
  <CustomChart
    type="line"
    data={{
      series: [
        { data: [2, 5.5, 2, 8.5, 1.5, 5], label: "Series A" },
        { data: [3, 4, 6, 2, 7, 3], label: "Series B" },
      ],
      xAxis: [{ data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] }],
    }}
    config={{
      height: 300,
      colors: ["#1976d2", "#ff9800"],
    }}
  />
);

/**
 * Line Chart with Area Fill
 */
export const AreaLineChart = () => (
  <CustomChart
    type="line"
    data={{
      series: [{ data: [2, 5.5, 2, 8.5, 1.5, 5], area: true }],
      xAxis: [{ data: [1, 2, 3, 4, 5, 6] }],
    }}
    config={{
      height: 300,
      colors: ["#4caf50"],
    }}
  />
);

/**
 * Line Chart with Grid and Custom Margins
 */
export const LineChartWithGrid = () => (
  <CustomChart
    type="line"
    data={{
      series: [{ data: [10, 25, 15, 30, 20, 35], label: "Revenue" }],
      xAxis: [{ data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] }],
    }}
    config={{
      height: 300,
      grid: { horizontal: true, vertical: true },
      margin: { left: 50, right: 20, top: 20, bottom: 30 },
    }}
  />
);

/**
 * Line Chart with Axis Highlight
 */
export const LineChartWithHighlight = () => (
  <CustomChart
    type="line"
    data={{
      series: [{ data: [2, 5.5, 2, 8.5, 1.5, 5], label: "Temperature" }],
      xAxis: [{ data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }],
    }}
    config={{
      height: 300,
      axisHighlight: { x: "line", y: "line" },
      tooltip: { trigger: "axis" },
    }}
  />
);

export default {
  BasicLineChart,
  MultiSeriesLineChart,
  AreaLineChart,
  LineChartWithGrid,
  LineChartWithHighlight,
};
