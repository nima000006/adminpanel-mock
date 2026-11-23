import { useEffect } from "react";

import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import { TRANSACTION_WALLET_TYPE_STATUS } from "../../_shared/utils";
import AllTransactionListBranchTab from "./helper/components/AllTransactionListBranchTab/AllTransactionListBranchTab";
import AllTransactionListUsersTab from "./helper/components/AllTransactionListUsersTab/AllTransactionListUsersTab";
import AllTransactionListWalletTab from "./helper/components/AllTransactionListWalletTab/AllTransactionListWalletTab";

import "./_allTransactionsList.scss";

const AllTransactionsList = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: "تراکنش‌ها",
      },
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({ tab: TRANSACTION_WALLET_TYPE_STATUS.personal });
    }
  }, [params?.tab, setSearchParams]);

  //* ================================ Util Functions ================================
  const tabItems = [
    {
      label: "کاربران",
      children: <AllTransactionListUsersTab />,
      key: TRANSACTION_WALLET_TYPE_STATUS.personal,
    },
    {
      label: "کسب و کار و شعب",
      children: <AllTransactionListBranchTab />,
      key: TRANSACTION_WALLET_TYPE_STATUS.legal,
    },
    {
      label: "کیف پول واسط",
      children: <AllTransactionListWalletTab />,
      key: TRANSACTION_WALLET_TYPE_STATUS.wallet,
    },
  ];

  return (
    <Tabs
      items={tabItems}
      className="all-transaction-list-tabs-container"
      type="line"
      onChange={(e) => setSearchParams({ tab: e })}
      destroyOnHidden
      activeKey={activeKey}
    />
  );
};

export default AllTransactionsList;
