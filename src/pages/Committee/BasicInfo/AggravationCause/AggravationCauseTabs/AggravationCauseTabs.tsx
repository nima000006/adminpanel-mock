import { Tabs } from "antd";

import AggravationCauseChangeRecords from "./helper/components/AggravationCauseChangeRecords/AggravationCauseChangeRecords";
import AggravationCauseInfo from "./helper/components/AggravationCauseInfo/AggravationCauseInfo";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_aggravationCauseTabs.scss";

const AggravationCauseTabs = () => {
  useTitle({ text: "اطلاعات عامل تشدید" });
  const tabsItems = [
    {
      label: "اطلاعات عامل تشدید",
      children: (
        <div>
          <AggravationCauseInfo />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <AggravationCauseChangeRecords />
        </div>
      ),
      key: "2",
      disabled: true,
    },
  ];

  //* ================================ Util Functions ================================
  const onTabChange = () => {};
  const onTabEdit = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard>
      <Tabs
        type="card"
        onChange={onTabChange}
        // activeKey={"1"}
        onEdit={onTabEdit}
        items={tabsItems}
        className="committee-aggravation-cause-tabs-container"
      />
    </CustomCard>
  );
};
export default AggravationCauseTabs;
