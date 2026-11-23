import {
  BarChartProps,
  LineChartProps,
  PieChartProps,
  ScatterChartProps,
  SparkLineChartProps,
  GaugeProps,
} from "@mui/x-charts";

// ============================================================================
// CHART TYPES
// ============================================================================

/** Supported chart types */
export type ChartType = "bar" | "line" | "pie" | "scatter" | "sparkline" | "gauge";

/** Chart props mapped by type */
export type ChartPropsMap = {
  bar: BarChartProps;
  line: LineChartProps;
  pie: PieChartProps;
  scatter: ScatterChartProps;
  sparkline: SparkLineChartProps;
  gauge: GaugeProps;
};

// ============================================================================
// CONFIG TYPES
// ============================================================================

/** Tooltip configuration */
export interface TooltipConfig {
  trigger?: "axis" | "item" | "none";
}

/** Legend configuration */
export interface LegendConfig {
  hidden?: boolean;
  direction?: "row" | "column";
  position?: {
    vertical?: "top" | "middle" | "bottom";
    horizontal?: "left" | "middle" | "right";
  };
}

/** Axis highlight configuration */
export interface HighlightConfig {
  x?: "none" | "line" | "band";
  y?: "none" | "line";
}

/** Margin configuration */
export interface MarginConfig {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/** Grid configuration */
export interface GridConfig {
  horizontal?: boolean;
  vertical?: boolean;
}

/** Common configuration for all chart types */
export interface ChartConfig {
  /** Chart height in pixels (required) */
  height: number;
  /** Chart width in pixels (auto if not set) */
  width?: number;
  /** Chart margins */
  margin?: MarginConfig;
  /** Skip animations for better performance */
  skipAnimation?: boolean;
  /** Tooltip settings */
  tooltip?: TooltipConfig;
  /** Legend settings */
  legend?: LegendConfig;
  /** Axis highlight on hover */
  axisHighlight?: HighlightConfig;
  /** Show loading state */
  loading?: boolean;
  /** Show grid lines */
  grid?: GridConfig;
  /** Color palette */
  colors?: string[];
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/** Main CustomChart component props */
export interface CustomChartProps<T extends ChartType> {
  /** Type of chart to render */
  type: T;
  /** Chart-specific props from MUI X Charts */
  data: Omit<ChartPropsMap[T], "width" | "height">;
  /** Common chart configuration */
  config?: ChartConfig;
  /** Custom className */
  className?: string;
}

/** Chart loader props */
export interface ChartLoaderProps {
  height: number;
}
