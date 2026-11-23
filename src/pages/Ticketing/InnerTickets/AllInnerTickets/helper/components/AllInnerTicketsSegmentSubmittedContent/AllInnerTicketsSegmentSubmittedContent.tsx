import { useCallback, useEffect, useState } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyInnerTicketSendingCountOfticketsQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";

import { InnerTicketSendingCountOfticketsResponse } from "./@types/@innerTicketsSegmentSubmittedContent";
import { INNER_TICKETS_TABS_TYPE } from "../../utils/innerTicketsUtils";
import AllInnerTicketSubmittedAllList from "./helper/components/AllInnerTicketSubmittedAllList/AllInnerTicketSubmittedAllList";
import AllInnerTicketSubmittedAnsweredList from "./helper/components/AllInnerTicketSubmittedAnsweredList/AllInnerTicketSubmittedAnsweredList";
import AllInnerTicketSubmittedClosed from "./helper/components/AllInnerTicketSubmittedClosed/AllInnerTicketSubmittedClosed";
import AllInnerTicketSubmittedNotAssignedList from "./helper/components/AllInnerTicketSubmittedNotAssignedList/AllInnerTicketSubmittedNotAssignedList";
import AllInnerTicketSubmittedWaitingList from "./helper/components/AllInnerTicketSubmittedWaitingList/AllInnerTicketSubmittedWaitingList";

const AllInnerTicketsSegmentSubmittedContent = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [countData, setCountData] = useState<InnerTicketSendingCountOfticketsResponse>();

  //? ================================  Api Calls ================================

  const [
    getTicketSendingCountOftickets,
    { isFetching: isGetTicketSendingCountOfticketsLoading },
  ] = useLazyInnerTicketSendingCountOfticketsQuery();

  //? ================================ Effects  ================================

  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ ...url, status: INNER_TICKETS_TABS_TYPE.notAssigned });
    }
  }, [url, setSearchParams]);

  const refreshTicketCounts = useCallback(() => {
    return getTicketSendingCountOftickets()
      .unwrap()
      .then((res) => {
        setCountData(res);
      });
  }, [getTicketSendingCountOftickets]);

  useEffect(() => {
    refreshTicketCounts();
  }, [refreshTicketCounts]);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    if (status !== url?.status) {
      setSearchParams({ type: url?.type, status: status });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-5">
        <DemandCard
          title="تخصیص نیافته‌ها"
          active={url?.status === INNER_TICKETS_TABS_TYPE.notAssigned}
          clickHandler={() => changeCardHandler(INNER_TICKETS_TABS_TYPE.notAssigned)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetTicketSendingCountOfticketsLoading
              ? "..."
              : countData?.unassignedCount?.toString()
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.notAssigned
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
        <DemandCard
          title="در انتظار پاسخ‌ها"
          active={url?.status === INNER_TICKETS_TABS_TYPE.waiting}
          clickHandler={() => changeCardHandler(INNER_TICKETS_TABS_TYPE.waiting)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetTicketSendingCountOfticketsLoading
              ? "..."
              : countData?.waitingForReplyCount?.toString()
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.waiting
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />

        <DemandCard
          title="پاسخ داده شده‌ها"
          active={url?.status === INNER_TICKETS_TABS_TYPE.answered}
          clickHandler={() => changeCardHandler(INNER_TICKETS_TABS_TYPE.answered)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetTicketSendingCountOfticketsLoading
              ? "..."
              : countData?.repliedCount?.toString()
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.answered
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />

        <DemandCard
          title="بسته شده‌ها"
          active={url?.status === INNER_TICKETS_TABS_TYPE.closed}
          clickHandler={() => changeCardHandler(INNER_TICKETS_TABS_TYPE.closed)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetTicketSendingCountOfticketsLoading
              ? "..."
              : countData?.closedCount?.toString()
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.closed
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
        <DemandCard
          title="همه تیکت‌ها"
          active={url?.status === INNER_TICKETS_TABS_TYPE.allTickets}
          clickHandler={() => changeCardHandler(INNER_TICKETS_TABS_TYPE.allTickets)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetTicketSendingCountOfticketsLoading
              ? "..."
              : countData?.totalCount?.toString()
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.allTickets
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
      </div>
      {url?.status === INNER_TICKETS_TABS_TYPE.notAssigned ? (
        <AllInnerTicketSubmittedNotAssignedList refreshCount={refreshTicketCounts} />
      ) : url?.status === INNER_TICKETS_TABS_TYPE.waiting ? (
        <AllInnerTicketSubmittedWaitingList refreshCount={refreshTicketCounts} />
      ) : url?.status === INNER_TICKETS_TABS_TYPE.answered ? (
        <AllInnerTicketSubmittedAnsweredList refreshCount={refreshTicketCounts} />
      ) : url?.status === INNER_TICKETS_TABS_TYPE.closed ? (
        <AllInnerTicketSubmittedClosed refreshCount={refreshTicketCounts} />
      ) : url?.status === INNER_TICKETS_TABS_TYPE.allTickets ? (
        <AllInnerTicketSubmittedAllList refreshCount={refreshTicketCounts} />
      ) : null}
    </div>
  );
};
export default AllInnerTicketsSegmentSubmittedContent;
