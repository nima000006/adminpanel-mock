import React, { useMemo } from "react";

import { CustomChart } from "../";

/**
 * City Sales with Average Bar (Different Color)
 *
 * This example shows sales data for different cities with
 * the last bar being the average, highlighted in red/coral color.
 *
 * Uses colorMap with type: 'ordinal' on xAxis to color individual bars differently.
 */
export const CitySalesWithAverage = () => {
  // City data
  const cityData = useMemo(() => {
    const cities = [
      { name: "تهران", value: 85 },
      { name: "اصفهان", value: 72 },
      { name: "شیراز", value: 65 },
      { name: "مشهد", value: 78 },
      { name: "تبریز", value: 58 },
      { name: "کرج", value: 45 },
    ];

    // Calculate average
    const average = Math.round(
      cities.reduce((sum, city) => sum + city.value, 0) / cities.length
    );

    const labels = [...cities.map((c) => c.name), "میانگین"];

    return {
      labels,
      values: [...cities.map((c) => c.value), average],
      // Colors: blue for cities, coral/red for average
      colors: [
        ...cities.map(() => "#2196f3"), // Blue for cities
        "#e57373", // Coral red for average
      ],
    };
  }, []);

  return (
    <CustomChart
      type="bar"
      data={{
        series: [{ data: cityData.values }],
        xAxis: [
          {
            data: cityData.labels,
            scaleType: "band",
            // Use colorMap to assign colors per category
            colorMap: {
              type: "ordinal",
              values: cityData.labels,
              colors: cityData.colors,
            },
          },
        ],
        yAxis: [{ label: "فروش (میلیون تومان)" }],
      }}
      config={{
        height: 350,
        grid: { horizontal: true },
        tooltip: { trigger: "item" },
        legend: { hidden: true },
        margin: { bottom: 60, left: 70 },
      }}
    />
  );
};

/**
 * Monthly Performance with Average (English Version)
 */
export const MonthlyPerformanceWithAverage = () => {
  const data = useMemo(() => {
    const months = [
      { name: "Jan", value: 120 },
      { name: "Feb", value: 95 },
      { name: "Mar", value: 140 },
      { name: "Apr", value: 110 },
      { name: "May", value: 165 },
      { name: "Jun", value: 130 },
    ];

    const average = Math.round(
      months.reduce((sum, m) => sum + m.value, 0) / months.length
    );

    const labels = [...months.map((m) => m.name), "Avg"];

    return {
      labels,
      values: [...months.map((m) => m.value), average],
      // Create colors array - last one is different
      colors: labels.map((_, index) =>
        index === labels.length - 1 ? "#ef5350" : "#42a5f5"
      ),
    };
  }, []);

  return (
    <CustomChart
      type="bar"
      data={{
        series: [{ data: data.values }],
        xAxis: [
          {
            data: data.labels,
            scaleType: "band",
            colorMap: {
              type: "ordinal",
              values: data.labels,
              colors: data.colors,
            },
          },
        ],
        yAxis: [{ label: "Revenue ($K)" }],
      }}
      config={{
        height: 350,
        grid: { horizontal: true },
        tooltip: { trigger: "item" },
        legend: { hidden: true },
      }}
    />
  );
};

/**
 * Branch Performance Comparison with Average
 * Shows different branches with their sales and average at the end
 */
export const BranchPerformanceWithAverage = () => {
  const branchData = useMemo(() => {
    const branches = [
      { name: "شعبه مرکزی", sales: 450 },
      { name: "شعبه شمال", sales: 320 },
      { name: "شعبه جنوب", sales: 280 },
      { name: "شعبه غرب", sales: 390 },
      { name: "شعبه شرق", sales: 310 },
    ];

    const avgSales = Math.round(
      branches.reduce((sum, b) => sum + b.sales, 0) / branches.length
    );

    const labels = [...branches.map((b) => b.name), "میانگین کل"];

    return {
      labels,
      values: [...branches.map((b) => b.sales), avgSales],
      colors: labels.map((_, index) =>
        index === labels.length - 1 ? "#d32f2f" : "#1976d2"
      ),
    };
  }, []);

  return (
    <CustomChart
      type="bar"
      data={{
        series: [{ data: branchData.values, label: "فروش" }],
        xAxis: [
          {
            data: branchData.labels,
            scaleType: "band",
            tickLabelStyle: { angle: -45, textAnchor: "end" },
            colorMap: {
              type: "ordinal",
              values: branchData.labels,
              colors: branchData.colors,
            },
          },
        ],
      }}
      config={{
        height: 400,
        grid: { horizontal: true },
        margin: { bottom: 100 },
        legend: { hidden: true },
      }}
    />
  );
};

/**
 * Reusable component for bar chart with average
 * Uses colorMap on xAxis to color the average bar differently
 */
interface BarWithAverageProps {
  data: Array<{ label: string; value: number }>;
  averageLabel?: string;
  barColor?: string;
  averageColor?: string;
  height?: number;
  yAxisLabel?: string;
}

export const BarChartWithAverage: React.FC<BarWithAverageProps> = ({
  data,
  averageLabel = "Average",
  barColor = "#2196f3",
  averageColor = "#e53935",
  height = 350,
  yAxisLabel,
}) => {
  const chartData = useMemo(() => {
    const average = Math.round(
      data.reduce((sum, item) => sum + item.value, 0) / data.length
    );

    const labels = [...data.map((d) => d.label), averageLabel];
    const colors = labels.map((_, index) =>
      index === labels.length - 1 ? averageColor : barColor
    );

    return {
      labels,
      values: [...data.map((d) => d.value), average],
      colors,
    };
  }, [data, averageLabel, barColor, averageColor]);

  return (
    <CustomChart
      type="bar"
      data={{
        series: [{ data: chartData.values }],
        xAxis: [
          {
            data: chartData.labels,
            scaleType: "band",
            colorMap: {
              type: "ordinal",
              values: chartData.labels,
              colors: chartData.colors,
            },
          },
        ],
        ...(yAxisLabel && { yAxis: [{ label: yAxisLabel }] }),
      }}
      config={{
        height,
        grid: { horizontal: true },
        legend: { hidden: true },
        tooltip: { trigger: "item" },
      }}
    />
  );
};

/**
 * Example using the reusable BarChartWithAverage component
 */
export const ReusableBarWithAverageExample = () => (
  <BarChartWithAverage
    data={[
      { label: "New York", value: 245 },
      { label: "Los Angeles", value: 198 },
      { label: "Chicago", value: 167 },
      { label: "Houston", value: 142 },
      { label: "Phoenix", value: 125 },
    ]}
    averageLabel="Avg"
    barColor="#3f51b5"
    averageColor="#ff5722"
    yAxisLabel="Sales (Units)"
  />
);

export default {
  CitySalesWithAverage,
  MonthlyPerformanceWithAverage,
  BranchPerformanceWithAverage,
  BarChartWithAverage,
  ReusableBarWithAverageExample,
};
