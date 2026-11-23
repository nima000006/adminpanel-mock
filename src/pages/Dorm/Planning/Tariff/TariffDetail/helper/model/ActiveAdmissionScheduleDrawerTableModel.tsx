import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";

const ActiveAdmissionScheduleDrawerTableModel = [
  {
    title: "عنوان زمان‌بندی",
    dataIndex: "scheduleTitle",
    key: "scheduleTitle",
    width: 100,
  },
  {
    title: "تاریخ شروع",
    dataIndex: "startDate",
    key: "startDate",
    width: 100,
    render: (value: string) => {
      return <SingleVerticalItem label="" value={value} isDate />;
    },
  },
  {
    title: "ساعت شروع",
    dataIndex: "startTime",
    key: "startTime",
    width: 100,
    render: (value: string) => {
      return <SingleVerticalItem label="" value={value} isTime />;
    },
  },
  {
    title: "تاریخ پایان",
    dataIndex: "endDate",
    key: "endDate",
    width: 100,
    render: (value: string) => {
      return <SingleVerticalItem label="" value={value} isDate />;
    },
  },
  {
    title: "ساعت پایان",
    dataIndex: "endTime",
    key: "endTime",
    width: 100,
    render: (value: string) => {
      return <SingleVerticalItem label="" value={value} isTime />;
    },
  },
];

export default ActiveAdmissionScheduleDrawerTableModel;
