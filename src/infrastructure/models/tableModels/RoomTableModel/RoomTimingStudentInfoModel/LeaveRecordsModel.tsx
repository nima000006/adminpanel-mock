import moment from "jalali-moment";
export const LeaveRecordsModel = () => {
  return [
    {
      title: "خوابگاه",
      dataIndex: "dormitory",
      key: "dormitory",
      width: 120,
      searchable: true,
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startDate",
      key: "startDate",
      width: 100,
      render: (startDate: string) => {
        return moment(startDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "تاریخ پایان",
      dataIndex: "endDate",
      key: "endDate",
      width: 100,
      render: (endDate: string) => {
        return moment(endDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "هماهنگی با",
      dataIndex: "Coordination",
      key: "Coordination",
      width: 100,
    },
  ];
};
