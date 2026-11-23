export type TableRendererProps = {
  data: { [key: string]: string | number }[];
  reportTypeId: number;
  reportTypeTitle?: "TABLE";
  section?: number | null;
  sectionTitle?: string | null;
  title: string | null;
  key?: string;
  reportTitle: string;
  reportId: number;
  filterParams?: Record<string | number, string>;
};
