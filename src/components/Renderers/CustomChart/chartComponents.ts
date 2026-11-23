import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  SparkLineChart,
  Gauge,
} from "@mui/x-charts";

import type { ChartType } from "./types";

/** Map of chart type to MUI X Charts component */
export const CHART_COMPONENTS: Record<ChartType, React.ComponentType<any>> = {
  bar: BarChart,
  line: LineChart,
  pie: PieChart,
  scatter: ScatterChart,
  sparkline: SparkLineChart,
  gauge: Gauge,
};
