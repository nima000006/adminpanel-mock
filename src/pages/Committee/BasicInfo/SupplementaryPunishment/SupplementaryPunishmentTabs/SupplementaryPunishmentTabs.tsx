import { Tabs } from "antd";

import SupplementaryPunishmentChangeRecords from "./helper/components/SupplementaryPunishmentChangeRecords/SupplementaryPunishmentChangeRecords";
import SupplementaryPunishmentInfo from "./helper/components/SupplementaryPunishmentInfo/SupplementaryPunishmentInfo";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_supplementaryPunishmentTabs.scss";

const SupplementaryPunishmentTabs = () => {
  useTitle({ text: "اطلاعات تنبیه تکمیلی" });
  const tabsItems = [
    {
      label: "اطلاعات تنبیه تکمیلی",
      children: (
        <div>
          <SupplementaryPunishmentInfo />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <SupplementaryPunishmentChangeRecords />
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
        className="committee-supplementary-punishment-tabs-container"
      />
    </CustomCard>
  );
};
export default SupplementaryPunishmentTabs;
