import type { ChartConfig } from "./types";

/** Font family used for all chart text */
export const CHART_FONT_FAMILY = "DanaFaNum, sans-serif";

/**
 * Builds the final props object for the chart component
 */
export function buildChartProps(data: Record<string, any>, config: ChartConfig) {
  const props: Record<string, any> = {
    ...data,
    height: config.height,
    ...(config.width && { width: config.width }),
    ...(config.margin && { margin: config.margin }),
    ...(config.skipAnimation && { skipAnimation: true }),
    ...(config.colors && { colors: config.colors }),
    ...(config.grid && { grid: config.grid }),
    ...(config.axisHighlight && { axisHighlight: config.axisHighlight }),
  };

  // Tooltip configuration
  if (config.tooltip) {
    props.slotProps = {
      ...props.slotProps,
      tooltip: { trigger: config.tooltip.trigger },
    };
  }

  // Legend configuration
  if (config.legend) {
    if (config.legend.hidden) {
      props.slotProps = {
        ...props.slotProps,
        legend: { hidden: true },
      };
    } else {
      props.slotProps = {
        ...props.slotProps,
        legend: {
          direction: config.legend.direction,
          position: config.legend.position,
        },
      };
    }
  }

  return props;
}

/** Default chart configuration */
export const DEFAULT_CONFIG: ChartConfig = {
  height: 300,
};
