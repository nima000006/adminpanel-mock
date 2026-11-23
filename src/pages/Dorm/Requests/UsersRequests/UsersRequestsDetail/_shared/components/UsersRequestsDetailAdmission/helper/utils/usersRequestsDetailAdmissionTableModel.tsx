import { JSX } from "react";

import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";

export const scheduleTitle = {
  title: "عنوان زمان‌بندی",
  dataIndex: "scheduleTitle",
  key: "scheduleTitle",
  width: 100,
  render: (_: unknown, record: { scheduleTitle: JSX.Element }) => {
    return record.scheduleTitle;
  },
};
export const startDate = {
  dataIndex: "startDate",
  key: "startDate",
  width: 100,
  render: (value: string) => {
    return <SingleVerticalItem label="" value={value} isDate />;
  },
};
export const startTime = {
  title: "ساعت شروع",
  dataIndex: "startTime",
  key: "startTime",
  width: 100,
  render: (value: string) => {
    return <SingleVerticalItem label="" value={value} isTime />;
  },
};
export const endDate = {
  title: "تاریخ پایان",
  dataIndex: "endDate",
  key: "endDate",
  width: 100,
  render: (value: string) => {
    return <SingleVerticalItem label="" value={value} isDate />;
  },
};
export const endTime = {
  title: "ساعت پایان",
  dataIndex: "endTime",
  key: "endTime",
  width: 100,
  render: (value: string) => {
    return <SingleVerticalItem label="" value={value} isTime />;
  },
};
