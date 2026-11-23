// Reusable option type
type Option = {
  id: number;
  title: string;
};

// For cards (e.g., numeric summaries)
export type CardInfo = {
  data: string | number;
  label: string;
  unit: string;
};

// For dropdown selects
export type SelectInfo = {
  label?: string;
  defaultOptions: Option[];
  options: Option[];
};

// For range pickers (e.g., date filters)
export type RangePickerInfo = {
  data: Date;
  label: string;
};

// For tables (e.g., report data)
export type TableInfo = {
  columns: Record<string, any>[];
  data: Record<string, any>[];
  title: string;
};

// Discriminated union for all report element types
export type ReportElement =
  | { key: string; type: "card"; info: CardInfo; id: number }
  | { key: string; type: "select"; info: SelectInfo; id: number }
  | { key: string; type: "rangePicker"; info: RangePickerInfo; id: number }
  | { key: string; type: "table"; info: TableInfo; id: number };

export type ReportInfoRendererProps = ReportElement;
