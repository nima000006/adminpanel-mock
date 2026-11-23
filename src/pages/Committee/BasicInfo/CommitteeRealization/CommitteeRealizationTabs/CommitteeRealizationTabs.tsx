import { Tabs } from "antd";

import CommitteeRealizationChangeRecords from "./helper/components/CommitteeRealizationChangeRecords/CommitteeRealizationChangeRecords";
import CommitteeRealizationInfo from "./helper/components/CommitteeRealizationInfo/CommitteeRealizationInfo";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_committeeRealizationTabs.scss";

const CommitteeRealizationTabs = () => {
  useTitle({ text: "کمیته تفهیم" });

  const tabsItems = [
    {
      label: "اطلاعات",
      children: <CommitteeRealizationInfo />,
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: <CommitteeRealizationChangeRecords />,
      key: "2",
    },
  ];

  //* ================================ Util Functions ================================
  const onTabChange = () => {};
  const onTabEdit = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      type="card"
      onChange={onTabChange}
      // activeKey={"1"}
      onEdit={onTabEdit}
      items={tabsItems}
      className="committee-realization-tabs-page-container"
    />
  );
};
export default CommitteeRealizationTabs;
