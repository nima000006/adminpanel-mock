import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetMyRequestContractStatusAnalyticsMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { REQUEST_CONTRACT_STATUS } from "@pages/Catering/contracts/_shared/utils";
import RequestMyContractsListAccepted from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListAccepted/RequestMyContractsListAccepted";
import RequestMyContractsListAll from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListAll/RequestMyContractsListAll";
import RequestMyContractsListRejected from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListRejected/RequestMyContractsListRejected";
import RequestMyContractsListWaited from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/RequestMyContractsListWaited";

function RequestMyContractsList() {
  useTitle({ text: "درخواست‌های قرارداد من" });
  const { params: url, setSearchParams } = useQueryParams();

  //* ================================ Api Calls ================================
  const [
    getMyRequestContractStatusAnalytics,
    {
      data: getMyRequestContractStatusAnalyticsData,
      isLoading: isGetMyRequestContractStatusAnalyticsLoading,
    },
  ] = useGetMyRequestContractStatusAnalyticsMutation();

  const waitedCount =
    (getMyRequestContractStatusAnalyticsData?.requestedNewCounts ?? 0) +
    (getMyRequestContractStatusAnalyticsData?.requestedExtendCounts ?? 0) +
    (getMyRequestContractStatusAnalyticsData?.requestedCopyCounts ?? 0) +
    (getMyRequestContractStatusAnalyticsData?.submittedNewCounts ?? 0) +
    (getMyRequestContractStatusAnalyticsData?.submittedExtendCounts ?? 0) +
    (getMyRequestContractStatusAnalyticsData?.submittedCopyCounts ?? 0);

  const acceptedCount =
    (getMyRequestContractStatusAnalyticsData?.acceptedNewCounts ?? 0) +
    (getMyRequestContractStatusAnalyticsData?.acceptedExtendCounts ?? 0) +
    (getMyRequestContractStatusAnalyticsData?.acceptedCopyCounts ?? 0);

  const rejectedCount = getMyRequestContractStatusAnalyticsData?.rejectedCounts ?? 0;

  const allCount = waitedCount + acceptedCount + rejectedCount;

  const getBadgeTitle = (count: number) =>
    isGetMyRequestContractStatusAnalyticsLoading ? "(...)" : `(${count})`;

  //* ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ ...url, status: REQUEST_CONTRACT_STATUS.waited });
    }
  }, [url?.status]);

  useEffect(() => {
    getMyRequestContractStatusAnalytics({});
  }, []);

  //* ================================ Util Functions ================================

  const changeCardHandler = (status: string) => {
    if (url?.status === status) return;
    setSearchParams({ status: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ *//
  return (
    <>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
        <DemandCard
          title="در انتظار بررسی"
          active={url?.status === REQUEST_CONTRACT_STATUS.waited}
          clickHandler={() => changeCardHandler(REQUEST_CONTRACT_STATUS.waited)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBadgeTitle(waitedCount)}
        />
        <DemandCard
          title="تایید شده"
          active={url?.status === REQUEST_CONTRACT_STATUS.accepted}
          clickHandler={() => changeCardHandler(REQUEST_CONTRACT_STATUS.accepted)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBadgeTitle(acceptedCount)}
        />
        <DemandCard
          title="رد شده"
          active={url?.status === REQUEST_CONTRACT_STATUS.rejected}
          clickHandler={() => changeCardHandler(REQUEST_CONTRACT_STATUS.rejected)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBadgeTitle(rejectedCount)}
        />
        <DemandCard
          title="همه"
          active={url?.status === REQUEST_CONTRACT_STATUS.all}
          clickHandler={() => changeCardHandler(REQUEST_CONTRACT_STATUS.all)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBadgeTitle(allCount)}
        />
      </div>
      {url?.status === REQUEST_CONTRACT_STATUS.waited && <RequestMyContractsListWaited />}
      {url?.status === REQUEST_CONTRACT_STATUS.accepted && (
        <RequestMyContractsListAccepted />
      )}
      {url?.status === REQUEST_CONTRACT_STATUS.rejected && (
        <RequestMyContractsListRejected />
      )}
      {url?.status === REQUEST_CONTRACT_STATUS.all && <RequestMyContractsListAll />}
    </>
  );
}

export default RequestMyContractsList;
