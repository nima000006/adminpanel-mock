import moment from "jalali-moment";
export const FactorsModel = () => {
  return [
    {
      title: "نوع پرداخت",
      dataIndex: "paymentType",
      key: "paymentType",
      width: 100,
    },
    {
      title: "مبلغ",
      dataIndex: "price",
      key: "price",
      width: 100,
    },
    {
      title: "تاریخ سررسید",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 100,
      render: (startDate: string) => {
        return moment(startDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "تاریخ پرداخت",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 100,
      render: (endDate: string) => {
        return moment(endDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "خوابگاه",
      dataIndex: "dormitory",
      key: "dormitory",
      width: 120,
      searchable: true,
    },
  ];
};
