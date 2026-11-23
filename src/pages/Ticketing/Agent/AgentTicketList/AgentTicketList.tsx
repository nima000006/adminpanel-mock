import { useEffect, useState } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetTicketingAgentCountOfticketsQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";

import { GetTicketingAgentCountOfticketsResponse } from "./@types/@agentTicketList";
import AgentTicketAllList from "./helper/components/AgentTicketAllList/AgentTicketAllList";
import AgentTicketAssignedToList from "./helper/components/AgentTicketAssignedToList/AgentTicketAssignedToList";
import AgentTicketClosedList from "./helper/components/AgentTicketClosedList/AgentTicketClosedList";
import AgentTicketNotAssignedList from "./helper/components/AgentTicketNotAssignedList/AgentTicketNotAssignedList";
import { CUSTOMER_TICKET_STATUS } from "./helper/utils";

const AgentTicketList = () => {
  useTitle({ text: "تیکت‌های کاربران من" });
  const { params: url, setSearchParams } = useQueryParams();

  const [bannerStates, setBannerStates] =
    useState<GetTicketingAgentCountOfticketsResponse>();

  //? ================================ API ================================
  const [getManagerBannerStatsDto, { isFetching: isGetManagerBannerStatsDtoLoading }] =
    useLazyGetTicketingAgentCountOfticketsQuery();

  //? ================================ Effects  ================================

  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ ...url, status: CUSTOMER_TICKET_STATUS.assignedToMe });
    }
  }, [url?.status]);

  // fetch banner stats
  useEffect(() => {
    getBannerHandler();
  }, []);
  //* ================================ Util Functions ================================
  const getBannerHandler = () => {
    getManagerBannerStatsDto()
      .unwrap()
      .then((res) => {
        setBannerStates(res);
      });
  };

  const changeCardHandler = (status: string) => {
    if (status !== url?.status) {
      setSearchParams({ status: status });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        <DemandCard
          title="تخصیص یافته به من"
          active={url?.status == CUSTOMER_TICKET_STATUS.assignedToMe}
          clickHandler={() => changeCardHandler(CUSTOMER_TICKET_STATUS.assignedToMe)}
          className={`w-full ${
            url?.status === CUSTOMER_TICKET_STATUS.assignedToMe
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetManagerBannerStatsDtoLoading
              ? "..."
              : String(bannerStates?.assignedToMe ?? 0)
          }
        />
        <DemandCard
          title="تخصیص نیافته‌ها"
          active={url?.status == CUSTOMER_TICKET_STATUS.notAssigned}
          clickHandler={() => changeCardHandler(CUSTOMER_TICKET_STATUS.notAssigned)}
          className={`w-full ${
            url?.status === CUSTOMER_TICKET_STATUS.notAssigned
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetManagerBannerStatsDtoLoading
              ? "..."
              : String(bannerStates?.unAssigned ?? 0)
          }
        />
        <DemandCard
          title="بسته شده‌ها"
          active={url?.status == CUSTOMER_TICKET_STATUS.closed}
          clickHandler={() => changeCardHandler(CUSTOMER_TICKET_STATUS.closed)}
          className={`w-full ${
            url?.status === CUSTOMER_TICKET_STATUS.closed
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetManagerBannerStatsDtoLoading ? "..." : String(bannerStates?.closed ?? 0)
          }
        />
        <DemandCard
          title="همه تیکت‌ها"
          active={url?.status == CUSTOMER_TICKET_STATUS.allTickets}
          clickHandler={() => changeCardHandler(CUSTOMER_TICKET_STATUS.allTickets)}
          className={`w-full ${
            url?.status === CUSTOMER_TICKET_STATUS.allTickets
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetManagerBannerStatsDtoLoading ? "..." : String(bannerStates?.total ?? 0)
          }
        />
      </div>
      {url?.status === CUSTOMER_TICKET_STATUS.assignedToMe ? (
        <AgentTicketAssignedToList />
      ) : url?.status === CUSTOMER_TICKET_STATUS.notAssigned ? (
        <AgentTicketNotAssignedList getBannerHandler={getBannerHandler} />
      ) : url?.status === CUSTOMER_TICKET_STATUS.closed ? (
        <AgentTicketClosedList />
      ) : url?.status === CUSTOMER_TICKET_STATUS.allTickets ? (
        <AgentTicketAllList getBannerHandler={getBannerHandler} />
      ) : null}
    </>
  );
};

export default AgentTicketList;
