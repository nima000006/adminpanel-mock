import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";

const AdmissionDetailTimingInfoTableModel = [
  {
    title: "عنوان زمان‌بندی",
    dataIndex: "title",
    key: "title",
    width: 130,
  },

  {
    title: "تاریخ شروع",
    dataIndex: "startDate",
    key: "startDate",
    width: 130,
    render: (value: string) => {
      return <SingleVerticalItem value={value} isDate label="" />;
    },
  },
  {
    title: "ساعت شروع",
    dataIndex: "startTime",
    key: "startTime",
    width: 130,
    render: (value: string) => {
      return <SingleVerticalItem value={value} isTime label="" />;
    },
  },
  {
    title: "تاریخ پایان",
    dataIndex: "endDate",
    key: "endDate",
    width: 130,
    render: (value: string) => {
      return <SingleVerticalItem value={value} isDate label="" />;
    },
  },
  {
    title: "ساعت پایان",
    dataIndex: "endTime",
    key: "endTime",
    width: 130,
    render: (value: string) => {
      return <SingleVerticalItem value={value} isTime label="" />;
    },
  },
];
export default AdmissionDetailTimingInfoTableModel;
