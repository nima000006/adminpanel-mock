import { useEffect, useState } from "react";

import { FormInstance, Tabs } from "antd";

import useQueryParams from "@infra/hooks/useQueryParams";

import MyWalletDetailsBankAccountTab from "./helper/components/MyWalletDetailsBankAccountTab/MyWalletDetailsBankAccountTab";
import MyWalletDetailsWithdrawWalletTab from "./helper/components/MyWalletDetailsWithdrawWalletTab/MyWalletDetailsWithdrawWalletTab";
import { MyWalletDetailsMyWalletSearchFormType } from "../../../@types/@myWalletDetailsList";
import "./_myWalletDetailsRequestSegmented.scss";

const MyWalletDetailsRequestSegmented = ({
  walletUuid,
  walletSearchForm,
}: {
  walletUuid: string | undefined;
  walletSearchForm: FormInstance<MyWalletDetailsMyWalletSearchFormType>;
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
          <MyWalletDetailsWithdrawWalletTab
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
          <MyWalletDetailsBankAccountTab walletSearchForm={walletSearchForm} />
        ) : null,
    },
  ];

  return (
    <Tabs
      activeKey={activeKey || pendingKey || "1"}
      destroyOnHidden
      items={items}
      type="line"
      onChange={onTabChange}
      className="my-wallet-details-request-segmented-container"
    />
  );
};
export default MyWalletDetailsRequestSegmented;
