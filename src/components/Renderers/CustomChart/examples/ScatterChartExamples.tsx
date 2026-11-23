import { CustomChart } from "../";

/**
 * Basic Scatter Chart
 */
export const BasicScatterChart = () => (
  <CustomChart
    type="scatter"
    data={{
      series: [
        {
          data: [
            { x: 1, y: 2, id: 1 },
            { x: 2, y: 5.5, id: 2 },
            { x: 3, y: 2, id: 3 },
            { x: 5, y: 8.5, id: 4 },
            { x: 8, y: 1.5, id: 5 },
            { x: 10, y: 5, id: 6 },
          ],
          label: "Data Points",
        },
      ],
    }}
    config={{ height: 300 }}
  />
);

/**
 * Multi-Series Scatter Chart
 */
export const MultiSeriesScatterChart = () => (
  <CustomChart
    type="scatter"
    data={{
      series: [
        {
          data: [
            { x: 1, y: 2, id: 1 },
            { x: 2, y: 4, id: 2 },
            { x: 3, y: 6, id: 3 },
            { x: 4, y: 8, id: 4 },
          ],
          label: "Group A",
        },
        {
          data: [
            { x: 1, y: 5, id: 5 },
            { x: 2, y: 3, id: 6 },
            { x: 3, y: 7, id: 7 },
            { x: 4, y: 4, id: 8 },
          ],
          label: "Group B",
        },
      ],
    }}
    config={{
      height: 300,
      colors: ["#1976d2", "#f44336"],
    }}
  />
);

/**
 * Scatter Chart with Custom Axis
 */
export const ScatterChartWithAxis = () => (
  <CustomChart
    type="scatter"
    data={{
      series: [
        {
          data: [
            { x: 100, y: 200, id: 1 },
            { x: 120, y: 100, id: 2 },
            { x: 170, y: 300, id: 3 },
            { x: 140, y: 250, id: 4 },
            { x: 150, y: 400, id: 5 },
            { x: 110, y: 280, id: 6 },
          ],
          label: "Sales vs Profit",
        },
      ],
      xAxis: [{ label: "Sales ($K)" }],
      yAxis: [{ label: "Profit ($K)" }],
    }}
    config={{
      height: 300,
      grid: { horizontal: true, vertical: true },
    }}
  />
);

export default {
  BasicScatterChart,
  MultiSeriesScatterChart,
  ScatterChartWithAxis,
};
