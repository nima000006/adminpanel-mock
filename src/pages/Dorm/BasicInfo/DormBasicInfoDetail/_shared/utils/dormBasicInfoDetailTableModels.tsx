import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export const title = {
  title: "عنوان",
  dataIndex: "title",
  key: "title",
  width: 250,
};
export const recordStatus = {
  title: "وضعیت",
  dataIndex: "recordStatus",
  key: "recordStatus",
  width: 70,
};
export const tableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 70,
  className: "tables-sticky-column-left",
};
