import { Tabs } from "antd";

import TimingInfo from "./helper/components/TimingInfo/TimingInfo";
import TimingInfoChangeRecords from "./helper/components/TimingInfoChangeRecords/TimingInfoChangeRecords";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_timingInfoTabs.scss";

const tabsItems = [
  {
    label: "اطلاعات مدت زمانی",
    children: <TimingInfo />,
    key: "1",
  },
  {
    label: "سوابق تغییر",
    children: <TimingInfoChangeRecords />,
    key: "2",
    disabled: true,
  },
];

const TimingInfoTabs = () => {
  useTitle({ text: "اطلاعات مدت زمانی" });

  //* ================================ Util Functions ================================
  const onTabChange = () => {};
  const onTabEdit = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      type="card"
      onChange={onTabChange}
      onEdit={onTabEdit}
      items={tabsItems}
      className="committee-timing-info-tabs-page-container"
    />
  );
};
export default TimingInfoTabs;
