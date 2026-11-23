import { CustomChart } from "../";

/**
 * Basic Gauge
 */
export const BasicGauge = () => (
  <CustomChart
    type="gauge"
    data={{
      value: 75,
    }}
    config={{ height: 200, width: 200 }}
  />
);

/**
 * Gauge with Value Range
 */
export const GaugeWithRange = () => (
  <CustomChart
    type="gauge"
    data={{
      value: 60,
      valueMin: 0,
      valueMax: 100,
    }}
    config={{ height: 200, width: 200 }}
  />
);

/**
 * Gauge with Custom Appearance
 */
export const CustomGauge = () => (
  <CustomChart
    type="gauge"
    data={{
      value: 85,
      valueMin: 0,
      valueMax: 100,
      startAngle: -90,
      endAngle: 90,
      innerRadius: "70%",
      outerRadius: "100%",
    }}
    config={{
      height: 200,
      width: 200,
      colors: ["#4caf50"],
    }}
  />
);

/**
 * Multiple Gauges Dashboard
 */
export const GaugeDashboard = () => (
  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
    <div style={{ textAlign: "center" }}>
      <CustomChart
        type="gauge"
        data={{ value: 45, valueMax: 100 }}
        config={{ height: 150, width: 150, colors: ["#f44336"] }}
      />
      <div style={{ fontSize: 12, color: "#666" }}>CPU Usage</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <CustomChart
        type="gauge"
        data={{ value: 72, valueMax: 100 }}
        config={{ height: 150, width: 150, colors: ["#ff9800"] }}
      />
      <div style={{ fontSize: 12, color: "#666" }}>Memory</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <CustomChart
        type="gauge"
        data={{ value: 28, valueMax: 100 }}
        config={{ height: 150, width: 150, colors: ["#4caf50"] }}
      />
      <div style={{ fontSize: 12, color: "#666" }}>Disk</div>
    </div>
  </div>
);

export default {
  BasicGauge,
  GaugeWithRange,
  CustomGauge,
  GaugeDashboard,
};
