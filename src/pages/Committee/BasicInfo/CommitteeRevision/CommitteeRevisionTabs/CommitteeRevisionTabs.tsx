import { Tabs } from "antd";

import CommitteeRevisionChangeRecords from "./helper/components/CommitteeRevisionChangeRecords/CommitteeRevisionChangeRecords";
import CommitteeRevisionInfo from "./helper/components/CommitteeRevisionInfo/CommitteeRevisionInfo";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_committeeRevisionTabs.scss";

const CommitteeRevisionTabs = () => {
  useTitle({ text: "کمیته تجدید نظر" });
  const tabsItems = [
    {
      label: "اطلاعات",
      children: (
        <div>
          <CommitteeRevisionInfo />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <CommitteeRevisionChangeRecords />
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
        className="committee-revision-tabs-container"
      />
    </CustomCard>
  );
};
export default CommitteeRevisionTabs;
