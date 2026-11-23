import { Tabs } from "antd";

import CentralCommitteeChangeRecords from "./helper/components/CentralCommitteeChangeRecords/CentralCommitteeChangeRecords";
import CentralCommitteeInfo from "./helper/components/CentralCommitteeInfo/CentralCommitteeInfo";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_centralCommitteeTabs.scss";

const CommitteeRevisionTabs = () => {
  useTitle({ text: "کمیته مرکزی" });

  const tabsItems = [
    {
      label: "اطلاعات",
      children: (
        <div>
          <CentralCommitteeInfo />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <CentralCommitteeChangeRecords />
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
        className="central-committee-tabs-container"
      />
    </CustomCard>
  );
};
export default CommitteeRevisionTabs;
