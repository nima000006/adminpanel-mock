export type NumberRendererProps = {
  reportTypeId?: number;
  reportTypeTitle?: string;
  section?: number | null;
  sectionTitle?: string | null;
  title: string | null;
  key?: string;
  reportTitle?: string;
  reportId?: number;
  data: {
    amount: number;
  }[];
};
