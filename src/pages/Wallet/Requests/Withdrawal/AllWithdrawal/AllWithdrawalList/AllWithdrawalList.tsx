import { useEffect } from "react";

import { Tabs, TabsProps } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import WalletRequestBusinessBranches from "./helper/components/WalletRequestBusinessBranches/WalletRequestBusinessBranches";
import WalletRequestUsers from "./helper/components/WalletRequestUsers/WalletRequestUsers";
import "./_allWithdrawalList.scss";

const AllWithdrawalList = () => {
  const { params, setSearchParams } = useQueryParams();
  const currentTab = params.tab || "1";

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="wallet-request-breadcrumb-title">کیف پول</span>,
      },
      {
        title: <span className="wallet-request-breadcrumb-title">درخواست ها</span>,
      },
      {
        title: "درخواست‌های برداشت",
      },
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    if (!params.tab) {
      setSearchParams({ tab: "1", subTab: "1" });
    }
  }, [params?.tab, setSearchParams]);

  //? ================================ Components ================================
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "کاربران",
      children: <WalletRequestUsers />,
    },
    {
      key: "2",
      label: "کسب و کار و شعب",
      children: <WalletRequestBusinessBranches />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="wallet-request-tabs-container">
      <Tabs
        items={items}
        destroyOnHidden={true}
        onChange={(e) => {
          setSearchParams({ tab: e, subTab: "1" });
        }}
        activeKey={currentTab}
      />
    </div>
  );
};

export default AllWithdrawalList;
