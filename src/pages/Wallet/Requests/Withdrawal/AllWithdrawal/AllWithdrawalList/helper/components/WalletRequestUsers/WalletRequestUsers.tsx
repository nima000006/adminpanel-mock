import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetWithdrawalStatsQuery } from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import WalletRequestSentToBank from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/helper/components/WalletRequestUsers/helper/components/WalletRequestSentToBank/WalletRequestSentToBank";

import WalletRequestUsersAll from "./helper/components/WalletRequestUsersAll/WalletRequestUsersAll";
import WalletRequestUsersConfirmed from "./helper/components/WalletRequestUsersConfirmed/WalletRequestUsersConfirmed";
import WalletRequestUsersRejected from "./helper/components/WalletRequestUsersRejected/WalletRequestUsersRejected";
import WalletRequestUsersWaiting from "./helper/components/WalletRequestUsersWaiting/WalletRequestUsersWaiting";

import "./_walletRequestUsers.scss";

const WalletRequestUsers = () => {
  const { params, setSearchParams } = useQueryParams();

  //? ================================ Api ================================
  const [getStats, { data: dataStats, isFetching: isLoadingStats }] =
    useLazyGetWithdrawalStatsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    handleGetStats();
  }, []);

  // ================================ Utils function ================================
  const handleGetStats = () => {
    getStats({
      walletType: "PERSONAL",
    });
  };

  const handleTabChange = (subTab: TabKey) => {
    setSearchParams({ tab: "1", subTab: subTab?.toString() });
  };

  // ================================ components  ================================
  //status of each tab
  const TABS = {
    1: {
      title: "در انتظار بررسی",
      key: "requested" as const,
      component: <WalletRequestUsersWaiting getStats={handleGetStats} />,
    },
    2: {
      title: "ارسال شده به بانک",
      key: "sendToBank" as const,
      component: <WalletRequestSentToBank getStats={handleGetStats} />,
    },
    3: {
      title: "تأیید شده",
      key: "accepted" as const,
      component: <WalletRequestUsersConfirmed />,
    },
    4: {
      title: "رد شده",
      key: "rejected" as const,
      component: <WalletRequestUsersRejected />,
    },
    5: {
      title: "همه درخواست‌ها",
      key: "total" as const,
      component: <WalletRequestUsersAll />,
    },
  } as const;

  type TabKey = keyof typeof TABS;
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Object.entries(TABS).map(([key, { title, key: statKey }]) => {
          const tabKey = Number(key) as TabKey;
          return (
            <DemandCard
              key={key}
              title={title}
              badgeColor="transparent"
              badgeTitle={
                isLoadingStats ? "..." : `(${(dataStats?.[statKey] ?? 0).toString()})`
              }
              badge={true}
              active={+params?.subTab === tabKey}
              clickHandler={() => handleTabChange(tabKey)}
            />
          );
        })}
      </div>
      <div>{TABS[(params?.subTab ? +params.subTab : "1") as TabKey].component}</div>
    </>
  );
};

export default WalletRequestUsers;
