import { Tabs } from "antd";

import Div from "@components/Renderers/Div/Div";

import BusinessAdminTab from "./helper/components/BusinessAdminTab/BusinessAdminTab";
import BusinessInfoTab from "./helper/components/BusinessInfoTab/BusinessInfoTab";
import SeniorManagerTab from "./helper/components/SeniorManagerTab/SeniorManagerTab";
import "./_businessTab.scss";

const BusinessTab = () => {
  const tabsItems = [
    {
      label: "اطلاعات کسب و کار",
      children: <BusinessInfoTab />,
      key: "1",
    },
    {
      label: "مدیر ارشد",
      children: <SeniorManagerTab />,
      key: "2",
    },
    {
      label: "اطلاعات پایه کسب و کار",
      children: <BusinessAdminTab />,
      key: "3",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="modify-business-tab-container">
      <Tabs items={tabsItems} className="modify-business-tab-items" />
    </Div>
  );
};
export default BusinessTab;
