import React from "react";

import type { ChartLoaderProps } from "./types";

/**
 * Loading spinner component for charts
 */
const ChartLoader: React.FC<ChartLoaderProps> = ({ height }) => (
  <div
    className="custom-chart-loader"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height,
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
      borderRadius: 8,
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        border: "3px solid #e0e0e0",
        borderTopColor: "#1976d2",
        borderRadius: "50%",
        animation: "chart-spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes chart-spin { to { transform: rotate(360deg); }}`}</style>
  </div>
);

export default ChartLoader;
