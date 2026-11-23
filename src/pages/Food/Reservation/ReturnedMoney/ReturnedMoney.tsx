import { useState } from "react";

import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import FoodDocumentsReturnedMoney from "./helper/components/DocumentsReturnedMoney/DocumentsReturnedMoney";
import FoodPendingPayment from "./helper/components/PendingPayment/FoodPendingPayment";
import FoodPendingReturnedMoney from "./helper/components/PendingReturnedMoney/FoodPendingReturnedMoney";
import PersonsReturnedMoney from "./helper/components/PersonsReturnedMoney/PersonsReturnedMoney";

import "./_returnedMoney.scss";

const ReturnedMoney = () => {
  const [activeKey, setActiveKey] = useState("1");
  const { setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "سفارشات",
      },
      {
        title: "عودت وجه",
      },
    ],
  });

  const tabsItems = [
    {
      label: "در انتظار عودت وجه",
      children: <FoodPendingReturnedMoney setActiveKey={setActiveKey} />,
      key: "1",
    },
    {
      label: "در انتظار پرداخت",
      children: <FoodPendingPayment isActive={activeKey === "2"} />,
      key: "2",
    },
    {
      label: "اسناد عودت وجه شده",
      children: <FoodDocumentsReturnedMoney />,
      key: "3",
    },
    {
      label: "اشخاص عودت وجه شده",
      children: <PersonsReturnedMoney />,
      key: "4",
    },
  ];

  return (
    <Tabs
      items={tabsItems}
      type="card"
      activeKey={activeKey}
      onChange={(e) => {
        setSearchParams(() => ({}));
        setActiveKey(e);
      }}
      className="order-returned-money-page-container"
      destroyOnHidden
    />
  );
};

export default ReturnedMoney;
