import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export const title = {
  title: "نام اتاق",
  dataIndex: "title",
  key: "title",
  width: 100,
};
export const activebed = {
  title: "تخت‌های فعال",
  dataIndex: "activebed",
  key: "activebed",
  width: 100,
};
export const freebed = {
  title: "ظرفیت قابل رزرو",
  dataIndex: "freebed",
  key: "freebed",
  width: 150,
};
export const price = {
  title: "مبلغ قابل پرداخت (تومان)",
  dataIndex: "price",
  key: "price",
  width: 200,
  render: (value: string) => <>{dataPlaceHolder({ data: value, isPrice: true })} </>,
};
//todo[Atefeh]:uncomment when api got ready
// {
//   title: "واحد پول",
//   dataIndex: "currency",
//   key: "currency",
//   width: 100,
// },
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 200,
  className: "tables-sticky-column-left",
};
