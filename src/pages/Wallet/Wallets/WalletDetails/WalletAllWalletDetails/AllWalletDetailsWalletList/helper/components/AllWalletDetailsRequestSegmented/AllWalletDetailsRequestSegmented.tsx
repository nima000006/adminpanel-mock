import { useEffect, useState } from "react";

import { FormInstance, Tabs } from "antd";

import useQueryParams from "@infra/hooks/useQueryParams";

import AllWalletDetailsBankAccountTab from "./helper/components/AllWalletDetailsBankAccountTab/AllWalletDetailsBankAccountTab";
import AllWalletDetailsWithdrawWalletTab from "./helper/components/AllWalletDetailsWithdrawWalletTab/AllWalletDetailsWithdrawWalletTab";
import { AllWalletDetailsMyWalletSearchFormType } from "../../../@types/@allWalletDetailsList";
import "./__allWalletDetailsRequestSegmented.scss";

const AllWalletDetailsRequestSegmented = ({
  walletUuid,
  walletSearchForm,
}: {
  walletUuid: string | undefined;
  walletSearchForm: FormInstance<AllWalletDetailsMyWalletSearchFormType>;
}) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [activeKey, setActiveKey] = useState("1");
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingKey) return;
    if ((!url?.page || url.page === "1") && (!url?.pageSize || url.pageSize === "8")) {
      setActiveKey(pendingKey);
      setPendingKey(null);
    }
  }, [pendingKey, url?.page, url?.pageSize]);

  const onTabChange = (key: string) => {
    if (key === activeKey || pendingKey) return;

    // Unmount current tab first so it does not refetch on pagination reset
    setActiveKey("");
    setPendingKey(key);
    setSearchParams({ page: "1", pageSize: "8" });
  };

  const items = [
    {
      key: "1",
      label: "برداشت از کیف پول",
      children:
        activeKey === "1" ? (
          <AllWalletDetailsWithdrawWalletTab
            walletUuid={walletUuid}
            walletSearchForm={walletSearchForm}
          />
        ) : null,
    },
    {
      key: "2",
      label: "حساب بانکی",
      children:
        activeKey === "2" ? (
          <AllWalletDetailsBankAccountTab walletSearchForm={walletSearchForm} />
        ) : null,
    },
  ];

  return (
    <Tabs
      activeKey={activeKey || pendingKey || "1"}
      destroyOnHidden
      onChange={onTabChange}
      items={items}
      type="line"
      className="all-wallet-request-segmented-container"
    />
  );
};
export default AllWalletDetailsRequestSegmented;
