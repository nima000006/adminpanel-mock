import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAllRequestContractStatusAnalyticsMutation } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import { REQUEST_CONTRACT_STATUS } from "@pages/Catering/contracts/_shared/utils";
import RequestsContractsListAccepted from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListAccepted/RequestsContractsListAccepted";
import RequestsContractsListAll from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListAll/RequestsContractsListAll";
import RequestsContractsListRejected from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListRejected/RequestsContractsListRejected";
import RequestsContractsListWaited from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/RequestsContractsListWaited";

function RequestsContractsList() {
  useTitle({ text: "درخواست‌های قرارداد" });
  const { params: url, setSearchParams } = useQueryParams();

  //* ================================ Api Calls ================================
  const [
    getAllRequestContractStatusAnalytics,
    {
      data: getAllRequestContractStatusAnalyticsData,
      isLoading: isGetAllRequestContractStatusAnalyticsLoading,
    },
  ] = useGetAllRequestContractStatusAnalyticsMutation();

  const waitedCount =
    (getAllRequestContractStatusAnalyticsData?.requestedNewCounts ?? 0) +
    (getAllRequestContractStatusAnalyticsData?.requestedExtendCounts ?? 0) +
    (getAllRequestContractStatusAnalyticsData?.requestedCopyCounts ?? 0) +
    (getAllRequestContractStatusAnalyticsData?.submittedNewCounts ?? 0) +
    (getAllRequestContractStatusAnalyticsData?.submittedExtendCounts ?? 0) +
    (getAllRequestContractStatusAnalyticsData?.submittedCopyCounts ?? 0);

  const acceptedCount =
    (getAllRequestContractStatusAnalyticsData?.acceptedNewCounts ?? 0) +
    (getAllRequestContractStatusAnalyticsData?.acceptedExtendCounts ?? 0) +
    (getAllRequestContractStatusAnalyticsData?.acceptedCopyCounts ?? 0);

  const rejectedCount = getAllRequestContractStatusAnalyticsData?.rejectedCounts ?? 0;

  const allCount = waitedCount + acceptedCount + rejectedCount;

  const getBadgeTitle = (count: number) =>
    isGetAllRequestContractStatusAnalyticsLoading ? "(...)" : `(${count})`;

  //* ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ ...url, status: REQUEST_CONTRACT_STATUS.waited });
    }
  }, [url?.status]);

  useEffect(() => {
    getAllRequestContractStatusAnalytics({});
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
      {url?.status === REQUEST_CONTRACT_STATUS.waited && <RequestsContractsListWaited />}
      {url?.status === REQUEST_CONTRACT_STATUS.accepted && (
        <RequestsContractsListAccepted />
      )}
      {url?.status === REQUEST_CONTRACT_STATUS.rejected && (
        <RequestsContractsListRejected />
      )}
      {url?.status === REQUEST_CONTRACT_STATUS.all && <RequestsContractsListAll />}
    </>
  );
}

export default RequestsContractsList;
