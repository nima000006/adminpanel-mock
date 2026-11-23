import { useState } from "react";

import { Tabs } from "antd";

import BillingListTab from "./helper/components/BillingList/BillingListTab";
import BuyerReportTab from "./helper/components/BuyerReport/BuyerReportTab";
import ServersReportTab from "./helper/components/ServersReport/ServersReportTab";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_billingMain.scss";

const BillingMain = () => {
  const [activeKey, setActiveKey] = useState("1");

  useTitle({ text: "جدول صورتحساب ها" });

  const tabsItems = [
    {
      label: "فهرست صورتحساب ها",
      children: <BillingListTab />,
      key: "1",
    },
    {
      label: "گزارش خدمت دهندگان",
      children: <ServersReportTab setActiveKey={setActiveKey} />,
      key: "2",
    },
    {
      label: "گزارش خریدار",
      children: <BuyerReportTab setActiveKey={setActiveKey} />,
      key: "3",
    },
  ];

  const onTabChange = (e: string) => {
    setActiveKey(e);
  };

  return (
    <div className="billing-main-page-container">
      <Tabs
        type="card"
        onChange={onTabChange}
        activeKey={activeKey}
        items={tabsItems}
        className="billing-main-tabs-container"
        dir="rtl"
      />
    </div>
  );
};

export default BillingMain;
