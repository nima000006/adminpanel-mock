import { Tabs } from "antd";

import Div from "@components/Renderers/Div/Div";

import ChangeRecords from "./helper/components/ChangeRecords/ChangeRecords";
import RegulationsInfo from "./helper/components/RegulationsInfo/RegulationsInfo";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

import "./_rulesAndLawsTabs.scss";

const RulesAndLawsTabs = () => {
  const id = new URLSearchParams(location.search).get("id");
  useTitle({ text: `آیین نامه ${id}` });

  const tabsItems = [
    {
      label: "اطلاعات آیین نامه",
      children: (
        <div>
          <RegulationsInfo />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <ChangeRecords />
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
    <Div className="committee-regulations-container">
      <Tabs
        type="card"
        onChange={onTabChange}
        // activeKey={"1"}
        onEdit={onTabEdit}
        items={tabsItems}
        className="regulations-tabs-container"
      />
    </Div>
  );
};
export default RulesAndLawsTabs;
