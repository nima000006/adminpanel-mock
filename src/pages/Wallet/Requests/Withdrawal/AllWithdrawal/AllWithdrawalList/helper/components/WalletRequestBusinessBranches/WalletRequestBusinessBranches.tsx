import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetWithdrawalStatsQuery } from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import WalletRequestBusinessSentToBank from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/helper/components/WalletRequestBusinessBranches/helper/components/WalletRequestBusinessSentToBank/WalletRequestBusinessSentToBank";

import WalletRequestBusinessUsersAll from "./helper/components/WalletRequestBusinessUsersAll/WalletRequestBusinessUsersAll";
import WalletRequestBusinessUsersConfirmed from "./helper/components/WalletRequestBusinessUsersConfirmed/WalletRequestBusinessUsersConfirmed";
import WalletRequestBusinessUsersRejected from "./helper/components/WalletRequestBusinessUsersRejected/WalletRequestBusinessUsersRejected";
import WalletRequestBusinessUsersWaiting from "./helper/components/WalletRequestBusinessUsersWaiting/WalletRequestBusinessUsersWaiting";

import "./_walletRequestBusinessUsers.scss";

const WalletRequestBusinessBranches = () => {
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
      walletType: "LEGAL",
    });
  };

  const handleTabChange = (subTab: TabKey) => {
    if (+params?.subTab === subTab) return;
    setSearchParams({ tab: "2", subTab: subTab?.toString() });
  };

  // ================================ Utils function ================================

  //status of each tab
  const TABS = {
    1: {
      title: "در انتظار بررسی",
      key: "requested" as const,
      component: <WalletRequestBusinessUsersWaiting getStats={handleGetStats} />,
    },
    2: {
      title: "ارسال شده به بانک",
      key: "sendToBank" as const,
      component: <WalletRequestBusinessSentToBank getStats={handleGetStats} />,
    },
    3: {
      title: "تأیید شده",
      key: "accepted" as const,
      component: <WalletRequestBusinessUsersConfirmed />,
    },
    4: {
      title: "رد شده",
      key: "rejected" as const,
      component: <WalletRequestBusinessUsersRejected />,
    },
    5: {
      title: "همه درخواست‌ها",
      key: "total" as const,
      component: <WalletRequestBusinessUsersAll />,
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

export default WalletRequestBusinessBranches;
