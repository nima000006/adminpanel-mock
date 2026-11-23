import { Tabs } from "antd";

import AccusationAndViolationsDetailsInfoContent from "./helper/components/AccusationAndViolationsDetailsInfoContent/AccusationAndViolationsDetailsInfoContent";
import DetailsChangeRecords from "./helper/components/DetailsChangeRecords/DetailsChangeRecords";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_accusationAndViolationsDetailsInfo.scss";

const AccusationAndViolationsDetailsInfo = () => {
  useTitle({ text: "اطلاعات جزئیات اتهام / تخلف" });
  const tabsItems = [
    {
      label: "اطلاعات جزئیات تخلف / اتهام",
      children: (
        <div>
          <AccusationAndViolationsDetailsInfoContent />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <DetailsChangeRecords />
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
    <CustomCard className="committee-accusation-violations-details-info-container">
      <Tabs
        type="card"
        onChange={onTabChange}
        // activeKey={"1"}
        onEdit={onTabEdit}
        items={tabsItems}
        className="accusation-violations-details-info-tabs-container"
      />
    </CustomCard>
  );
};
export default AccusationAndViolationsDetailsInfo;
