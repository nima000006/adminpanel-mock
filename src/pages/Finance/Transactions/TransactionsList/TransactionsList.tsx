import { useEffect } from "react";

import { Tabs } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import BuyersStep from "./helper/components/BuyersStep/BuyersStep";
import RefundStep from "./helper/components/RefundStep/RefundStep";

const TransactionsList = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";
  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },
      { title: "تراکنش‌ها" },
    ],
  });

  const tabsItems = [
    {
      label: "خریداران",
      children: <BuyersStep />,
      key: "1",
    },
    {
      label: "عودت وجه",
      children: <RefundStep />,
      key: "2",
    },
  ];
  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({ tab: "1" }); // set 1 for default tab
    }
  }, []);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard>
      <Tabs
        items={tabsItems}
        type="card"
        className="body-regular"
        activeKey={activeKey}
        destroyOnHidden
        onChange={(key) => setSearchParams({ tab: key })}
      />
    </CustomCard>
  );
};

export default TransactionsList;
