export type LineChartRendererProps = {
  data: {
    date: string;
    p1: number;
    p2: number;
    p1_title: string;
    p2_title: string;
  }[];
  title?: string;
};
