import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";

export const titleColumn = {
  title: "عنوان زمان‌بندی",
  dataIndex: "title",
  key: "title",
  width: 100,
};

export const startDateColumn = {
  title: "تاریخ شروع",
  dataIndex: "startDate",
  key: "startDate",
  width: 100,
  render: (value: string) => <SingleVerticalItem label="" value={value} isDate={true} />,
};

export const startTimeColumn = {
  title: "ساعت شروع",
  dataIndex: "startTime",
  key: "startTime",
  width: 100,
  render: (value: string) => <SingleVerticalItem label="" value={value} isTime={true} />,
};

export const endDateColumn = {
  title: "تاریخ پایان",
  dataIndex: "endDate",
  key: "endDate",
  width: 100,
  render: (value: string) => <SingleVerticalItem label=" " value={value} isDate={true} />,
};

export const endTimeColumn = {
  title: "ساعت پایان",
  dataIndex: "endTime",
  key: "endTime",
  width: 100,
  render: (value: string) => <SingleVerticalItem label="" value={value} isTime={true} />,
};
