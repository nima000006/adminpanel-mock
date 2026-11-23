import { CustomChart } from "../";

/**
 * Basic Sparkline
 */
export const BasicSparkline = () => (
  <CustomChart
    type="sparkline"
    data={{
      data: [1, 4, 2, 5, 7, 2, 4, 6],
      plotType: "line",
    }}
    config={{ height: 100, width: 200 }}
  />
);

/**
 * Bar Sparkline
 */
export const BarSparkline = () => (
  <CustomChart
    type="sparkline"
    data={{
      data: [1, 4, 2, 5, 7, 2, 4, 6],
      plotType: "bar",
    }}
    config={{
      height: 100,
      width: 200,
      colors: ["#4caf50"],
    }}
  />
);

/**
 * Sparkline with Area
 */
export const AreaSparkline = () => (
  <CustomChart
    type="sparkline"
    data={{
      data: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
      area: true,
      plotType: "line",
    }}
    config={{
      height: 100,
      width: 250,
      colors: ["#2196f3"],
    }}
  />
);

/**
 * Multiple Sparklines in a row (Dashboard style)
 */
export const SparklineDashboard = () => (
  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
    <div>
      <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Revenue</div>
      <CustomChart
        type="sparkline"
        data={{ data: [10, 12, 8, 15, 18, 14, 20], plotType: "line", area: true }}
        config={{ height: 60, width: 120, colors: ["#4caf50"] }}
      />
    </div>
    <div>
      <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Users</div>
      <CustomChart
        type="sparkline"
        data={{ data: [50, 45, 60, 55, 70, 65, 80], plotType: "line" }}
        config={{ height: 60, width: 120, colors: ["#2196f3"] }}
      />
    </div>
    <div>
      <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Orders</div>
      <CustomChart
        type="sparkline"
        data={{ data: [3, 5, 4, 6, 8, 7, 9], plotType: "bar" }}
        config={{ height: 60, width: 120, colors: ["#ff9800"] }}
      />
    </div>
  </div>
);

export default {
  BasicSparkline,
  BarSparkline,
  AreaSparkline,
  SparklineDashboard,
};
