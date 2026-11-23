import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";

//! GENERAL
//! LAYOUT
export type DataType = {
  key: React.Key;
  title: string;
  description: string;
  operation: string;
};
export type ColumnTypes = CustomColumnType<DataType>[];
//! API
