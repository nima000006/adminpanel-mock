import { useEffect, useState } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetTicketingSuperAgentCountOfTicketsQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";

import { GetTicketingSuperAgentCountOfTicketsResponse } from "./@types/@superAgentListTypes";
import SuperAgentAllList from "./helper/components/SuperAgentAllList/SuperAgentAllList";
import SuperAgentAssignedToList from "./helper/components/SuperAgentAssignedToList/SuperAgentAssignedToList";
import SuperAgentAssignedToMeList from "./helper/components/SuperAgentAssignedToMeList/SuperAgentAssignedToMeList";
import SuperAgentClosedList from "./helper/components/SuperAgentClosedList/SuperAgentClosedList";
import SuperAgentNotAssignedList from "./helper/components/SuperAgentNotAssignedList/SuperAgentNotAssignedList";
import { SUPER_AGENT_TICKET_STATUS } from "./helper/utils";

const SuperAgentList = () => {
  useTitle({ text: "همه تیکت های کاربران" });

  const { params: url, setSearchParams } = useQueryParams();

  const [bannerStates, setBannerStates] =
    useState<GetTicketingSuperAgentCountOfTicketsResponse>();

  //? ================================ API ================================
  const [getAdminBanner, { isFetching: isGetAdminBannerLoading }] =
    useLazyGetTicketingSuperAgentCountOfTicketsQuery();

  // fetch banner stats
  useEffect(() => {
    getBannerHandler();
  }, []);

  //* ================================ Effects  ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ ...url, status: SUPER_AGENT_TICKET_STATUS.notAssigned });
    }
  }, [url?.status]);

  //* ================================ Util Functions ================================
  const getBannerHandler = () => {
    getAdminBanner()
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
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 xl:grid-cols-5">
        <DemandCard
          title="تخصیص نیافته‌ها"
          active={url?.status == SUPER_AGENT_TICKET_STATUS.notAssigned}
          clickHandler={() => changeCardHandler(SUPER_AGENT_TICKET_STATUS.notAssigned)}
          className={`w-full ${
            url?.status === SUPER_AGENT_TICKET_STATUS.notAssigned
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetAdminBannerLoading ? "..." : String(bannerStates?.unAssigned ?? 0)
          }
        />
        <DemandCard
          title="تخصیص یافته ها"
          active={url?.status == SUPER_AGENT_TICKET_STATUS.assignedToOthers}
          clickHandler={() =>
            changeCardHandler(SUPER_AGENT_TICKET_STATUS.assignedToOthers)
          }
          className={`w-full ${
            url?.status === SUPER_AGENT_TICKET_STATUS.assignedToOthers
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetAdminBannerLoading ? "..." : String(bannerStates?.assigned ?? 0)
          }
        />
        <DemandCard
          title="تخصیص یافته به من"
          active={url?.status == SUPER_AGENT_TICKET_STATUS.assignedToMe}
          clickHandler={() => changeCardHandler(SUPER_AGENT_TICKET_STATUS.assignedToMe)}
          className={`w-full ${
            url?.status === SUPER_AGENT_TICKET_STATUS.assignedToMe
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetAdminBannerLoading ? "..." : String(bannerStates?.assignedToMe ?? 0)
          }
        />
        <DemandCard
          title="بسته شده‌ها"
          active={url?.status == SUPER_AGENT_TICKET_STATUS.closed}
          clickHandler={() => changeCardHandler(SUPER_AGENT_TICKET_STATUS.closed)}
          className={`w-full ${
            url?.status === SUPER_AGENT_TICKET_STATUS.closed
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={isGetAdminBannerLoading ? "..." : String(bannerStates?.closed ?? 0)}
        />
        <DemandCard
          title="همه تیکت‌ها"
          active={url?.status == SUPER_AGENT_TICKET_STATUS.allTickets}
          clickHandler={() => changeCardHandler(SUPER_AGENT_TICKET_STATUS.allTickets)}
          className={`w-full ${
            url?.status === SUPER_AGENT_TICKET_STATUS.allTickets
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={isGetAdminBannerLoading ? "..." : String(bannerStates?.total ?? 0)}
        />
      </div>
      {url?.status === SUPER_AGENT_TICKET_STATUS.notAssigned ? (
        <SuperAgentNotAssignedList getBannerHandler={getBannerHandler} />
      ) : url?.status === SUPER_AGENT_TICKET_STATUS.assignedToOthers ? (
        <SuperAgentAssignedToList />
      ) : url?.status === SUPER_AGENT_TICKET_STATUS.assignedToMe ? (
        <SuperAgentAssignedToMeList />
      ) : url?.status === SUPER_AGENT_TICKET_STATUS.closed ? (
        <SuperAgentClosedList />
      ) : url?.status === SUPER_AGENT_TICKET_STATUS.allTickets ? (
        <SuperAgentAllList getBannerHandler={getBannerHandler} />
      ) : null}
    </>
  );
};

export default SuperAgentList;
