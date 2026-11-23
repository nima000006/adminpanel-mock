import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";

//! LAYOUT
export type DataType = {
  key: React.Key;
  title: string;
  score: string;
  operation: string;
};

export type ColumnTypes = CustomColumnType<DataType>[];
