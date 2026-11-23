import { Tabs } from "antd";

import GeneralPunishmentInfo from "./helper/components/GeneralPunishmentInfo/GeneralPunishmentInfo";
import PunishmentChangeRecords from "./helper/components/PunishmentChangeRecords/PunishmentChangeRecords";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_generalPunishmentTabs.scss";

const GeneralPunishmentTabs = () => {
  useTitle({ text: "اطلاعات جزئیات اتهام / تخلف" });
  const tabsItems = [
    {
      label: "اطلاعات تنبیه کلی",
      children: (
        <div>
          <GeneralPunishmentInfo />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <PunishmentChangeRecords />
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
        className="general-punishment-tabs-container"
      />
    </CustomCard>
  );
};
export default GeneralPunishmentTabs;
