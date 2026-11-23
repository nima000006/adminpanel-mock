import { dataPlaceHolder } from "@infra/helpers/utils";

export const WorkSpacesAdmissionTariffDrawerTableModel = [
  {
    title: "انواع اتاق ها",
    dataIndex: "roomTypeeTitle",
    key: "roomTypeeTitle",
    width: 150,
  },
  {
    title: "قیمت (ریال - تخت روز)",
    dataIndex: "price",
    key: "price",
    width: 150,
    render: (value: string) => {
      return dataPlaceHolder({ data: value, isPrice: true });
    },
  },
];
