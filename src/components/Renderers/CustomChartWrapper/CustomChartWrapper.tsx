import { FC, useMemo } from "react";

import { ChartOptions, ChartData } from "chart.js";
import { Radar, Doughnut, Bar, Line, PolarArea, Pie } from "react-chartjs-2";

import { useTheme } from "@infra/context/ThemeContext";

type ChartType = "radar" | "doughnut" | "bar" | "line" | "polarArea" | "pie";

interface CustomChartWrapperProps {
  type: ChartType;
  data: ChartData<any, any>;
  options?: ChartOptions<any>;
  className?: string;
}

const chartMap = {
  radar: Radar,
  doughnut: Doughnut,
  bar: Bar,
  line: Line,
  polarArea: PolarArea,
  pie: Pie,
};

/** Chart.js canvas cannot resolve `var(--*)`; read computed theme tokens from `tailwind.css`. */
const resolveCssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const resolveChartThemeColors = (theme: "light" | "dark") => {
  // Keep `.dark` in sync before reading so tokens match the active theme on this render.
  document.documentElement.classList.toggle("dark", theme === "dark");

  return {
    labelColor: resolveCssVar("--app-text"),
    gridColor: resolveCssVar("--app-border"),
    tickBackdropColor: resolveCssVar("--app-bg-container"),
  };
};

const CustomChartWrapper: FC<CustomChartWrapperProps> = ({
  type,
  data,
  options,
  className,
}) => {
  const ChartComponent = chartMap[type];
  const { theme } = useTheme();

  const chartOptions = useMemo(() => {
    const { labelColor, gridColor, tickBackdropColor } = resolveChartThemeColors(theme);

    const defaultOptions: ChartOptions<any> = {
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 0,
          suggestedMax: 21,
          pointLabels: {
            color: labelColor,
            font: {
              family: "DanaFaNum",
              size: 9,
            },
          },
          ticks: {
            color: labelColor,
            backdropColor: tickBackdropColor,
            font: {
              family: "DanaFaNum",
            },
            stepSize: 3,
          },
          grid: {
            color: gridColor,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          bodyFont: {
            family: "DanaFaNum",
          },
          titleFont: {
            family: "DanaFaNum",
          },
        },
      },
    };

    return {
      ...defaultOptions,
      ...options,
      scales: {
        ...defaultOptions.scales,
        ...options?.scales,
        r: {
          ...defaultOptions.scales?.r,
          ...options?.scales?.r,
          pointLabels: {
            ...defaultOptions.scales?.r?.pointLabels,
            ...options?.scales?.r?.pointLabels,
            color: options?.scales?.r?.pointLabels?.color ?? labelColor,
          },
          ticks: {
            ...defaultOptions.scales?.r?.ticks,
            ...options?.scales?.r?.ticks,
            color: options?.scales?.r?.ticks?.color ?? labelColor,
            backdropColor: options?.scales?.r?.ticks?.backdropColor ?? tickBackdropColor,
          },
          grid: {
            ...defaultOptions.scales?.r?.grid,
            ...options?.scales?.r?.grid,
            color: options?.scales?.r?.grid?.color ?? gridColor,
          },
        },
      },
      plugins: {
        ...defaultOptions.plugins,
        ...options?.plugins,
        legend: {
          ...defaultOptions.plugins?.legend,
          ...options?.plugins?.legend,
        },
        tooltip: {
          ...defaultOptions.plugins?.tooltip,
          ...options?.plugins?.tooltip,
        },
      },
    };
  }, [theme, options]);

  return (
    <ChartComponent
      key={theme}
      data={{ ...data }}
      options={chartOptions}
      className={className}
    />
  );
};

export default CustomChartWrapper;
