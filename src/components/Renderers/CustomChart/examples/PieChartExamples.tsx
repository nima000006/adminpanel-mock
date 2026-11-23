import { CustomChart } from "../";

/**
 * Basic Pie Chart
 */
export const BasicPieChart = () => (
  <CustomChart
    type="pie"
    data={{
      series: [
        {
          data: [
            { id: 0, value: 10, label: "Series A" },
            { id: 1, value: 15, label: "Series B" },
            { id: 2, value: 20, label: "Series C" },
          ],
        },
      ],
    }}
    config={{ height: 300 }}
  />
);

/**
 * Pie Chart with Custom Colors
 */
export const PieChartCustomColors = () => (
  <CustomChart
    type="pie"
    data={{
      series: [
        {
          data: [
            { id: 0, value: 35, label: "Chrome" },
            { id: 1, value: 25, label: "Firefox" },
            { id: 2, value: 20, label: "Safari" },
            { id: 3, value: 15, label: "Edge" },
            { id: 4, value: 5, label: "Other" },
          ],
        },
      ],
    }}
    config={{
      height: 300,
      colors: ["#4285f4", "#ff7139", "#00d4aa", "#0078d4", "#gray"],
    }}
  />
);

/**
 * Donut Chart (Pie with inner radius)
 */
export const DonutChart = () => (
  <CustomChart
    type="pie"
    data={{
      series: [
        {
          data: [
            { id: 0, value: 40, label: "Rent" },
            { id: 1, value: 25, label: "Food" },
            { id: 2, value: 20, label: "Transport" },
            { id: 3, value: 15, label: "Other" },
          ],
          innerRadius: 50,
          outerRadius: 100,
          paddingAngle: 2,
          cornerRadius: 4,
        },
      ],
    }}
    config={{ height: 300 }}
  />
);

/**
 * Pie Chart with Legend Position
 */
export const PieChartWithLegend = () => (
  <CustomChart
    type="pie"
    data={{
      series: [
        {
          data: [
            { id: 0, value: 30, label: "Category A" },
            { id: 1, value: 45, label: "Category B" },
            { id: 2, value: 25, label: "Category C" },
          ],
        },
      ],
    }}
    config={{
      height: 300,
      legend: {
        direction: "column",
        position: { vertical: "middle", horizontal: "right" },
      },
    }}
  />
);

/**
 * Pie Chart without Legend
 */
export const PieChartNoLegend = () => (
  <CustomChart
    type="pie"
    data={{
      series: [
        {
          data: [
            { id: 0, value: 50, label: "Yes" },
            { id: 1, value: 30, label: "No" },
            { id: 2, value: 20, label: "Maybe" },
          ],
          arcLabel: (item) => `${item.value}%`,
        },
      ],
    }}
    config={{
      height: 300,
      legend: { hidden: true },
      colors: ["#4caf50", "#f44336", "#ff9800"],
    }}
  />
);

export default {
  BasicPieChart,
  PieChartCustomColors,
  DonutChart,
  PieChartWithLegend,
  PieChartNoLegend,
};
