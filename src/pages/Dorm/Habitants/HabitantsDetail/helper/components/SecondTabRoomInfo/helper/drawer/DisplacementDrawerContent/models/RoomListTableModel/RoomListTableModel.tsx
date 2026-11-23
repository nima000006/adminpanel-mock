import { dataPlaceHolder } from "@infra/helpers/utils";

const RoomListTableModel = () => {
  return [
    {
      title: "نام اتاق",
      dataIndex: "title",
      key: "title",
      width: 130,
    },
    {
      title: "تخت‌های فعال",
      dataIndex: "activebed",
      key: "activebed",
      width: 130,
    },
    {
      title: "ظرفیت قابل رزرو",
      dataIndex: "freebed",
      key: "freebed",
      width: 130,
    },
    {
      title: "مبلغ (تومان)",
      dataIndex: "price",
      key: "price",
      width: 130,
      render: (value: number) => {
        return (
          <>{dataPlaceHolder({ data: value.toString(), isPrice: true, isRial: true })}</>
        );
      },
    },
  ];
};

export default RoomListTableModel;
