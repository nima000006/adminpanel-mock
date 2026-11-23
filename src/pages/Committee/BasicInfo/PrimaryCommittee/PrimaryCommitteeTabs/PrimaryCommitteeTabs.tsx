import { Tabs } from "antd";

import PrimaryChangeRecords from "./helper/components/PrimaryChangeRecords/PrimaryChangeRecords";
import PrimaryCommitteeInfo from "./helper/components/PrimaryCommitteeInfo/PrimaryCommitteeInfo";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_primaryCommitteeTabs.scss";

const SupplementaryPunishmentTabs = () => {
  useTitle({ text: " کمیته بدوی" });
  const tabsItems = [
    {
      label: "اطلاعات",
      children: (
        <div>
          <PrimaryCommitteeInfo />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <PrimaryChangeRecords />
        </div>
      ),
      key: "2",
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
        className="primary-committee-tabs-container"
      />
    </CustomCard>
  );
};
export default SupplementaryPunishmentTabs;
