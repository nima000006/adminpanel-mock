export type BarChartRendererProps = {
  data: {
    min: number;
    max: number;
    group_id: string;
    group_title: string;
    status: string;
    status_id: number;
    cycle_counts: number;
    p1_amount: number;
    p1_average: number;
    p1_title: string;
  }[];
  title?: string;
};
