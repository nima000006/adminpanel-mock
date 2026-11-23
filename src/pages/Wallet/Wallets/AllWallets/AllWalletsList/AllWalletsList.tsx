import { useEffect } from "react";

import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import AllWalletsListBusinessAndBranchesTab from "./helper/components/AllWalletsListBusinessAndBranchesTab/AllWalletsListBusinessAndBranchesTab";
import AllWalletsListUsersTab from "./helper/components/AllWalletsListUsersTab/AllWalletsListUsersTab";
import "./_allWalletsList.scss";

const AllWalletsList = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: "کیف پول‌ها",
      },
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({ tab: "1" }); // set 1 for default tab
    }
  }, [params?.tab]);

  const tabItems = [
    {
      label: "کاربران",
      children: <AllWalletsListUsersTab />,
      key: "1",
    },
    {
      label: "کسب و کار و شعب",
      children: <AllWalletsListBusinessAndBranchesTab />,
      key: "2",
    },
  ];

  return (
    <Tabs
      items={tabItems}
      className="all-wallets-list-tabs-container"
      type="line"
      onChange={(e) => setSearchParams({ tab: e })}
      activeKey={activeKey}
      destroyOnHidden
    />
  );
};

export default AllWalletsList;
