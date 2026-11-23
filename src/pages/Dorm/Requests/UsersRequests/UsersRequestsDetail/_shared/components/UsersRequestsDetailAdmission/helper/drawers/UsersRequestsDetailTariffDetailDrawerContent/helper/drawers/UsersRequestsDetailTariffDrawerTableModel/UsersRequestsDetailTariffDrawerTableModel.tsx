import { dataPlaceHolder } from "@infra/helpers/utils";
const UsersRequestsDetailTariffDrawerTableModel = () => {
  return [
    {
      title: "انواع اتاق ها",
      dataIndex: "roomTypeeTitle",
      key: "roomTypeeTitle",
      width: 150,
    },
    {
      title: "قیمت (بر اساس یک نیمسال)",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isPrice: true }) + " ریال";
      },
    },
  ];
};

export default UsersRequestsDetailTariffDrawerTableModel;
