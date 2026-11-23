import { dataPlaceHolder } from "@infra/helpers/utils";

export const roomTypeColumn = {
  title: "انواع اتاق ها",
  dataIndex: "roomTypeeTitle",
  key: "roomTypeeTitle",
  width: 150,
};

export const priceColumn = {
  title: "قیمت (ریال - تخت روز)",
  dataIndex: "price",
  key: "price",
  width: 150,
  render: (value?: string) => <>{dataPlaceHolder({ data: value, isPrice: true })}</>,
};
