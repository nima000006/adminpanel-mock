import { useEffect, useState } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllInnerTicketsReceivedBannerStatsQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";

import { GetAllInnerTicketsReceivedBannerStatsResponse } from "./@types/@allInnerTicketsSegmentReceiptContent";
import { INNER_TICKETS_TABS_TYPE } from "../../utils/innerTicketsUtils";
import AllInnerTicketsAllList from "./helper/components/AllInnerTicketsAllList/AllInnerTicketsAllList";
import AllInnerTicketsAssignedToList from "./helper/components/AllInnerTicketsAssignedToList/AllInnerTicketsAssignedToList";
import AllInnerTicketsAssignedToMeList from "./helper/components/AllInnerTicketsAssignedToMeList/AllInnerTicketsAssignedToMeList";
import AllInnerTicketsClosedList from "./helper/components/AllInnerTicketsClosedList/AllInnerTicketsClosedList";
import AllInnerTicketsNotAssignedList from "./helper/components/AllInnerTicketsNotAssignedList/AllInnerTicketsNotAssignedList";

const AllInnerTicketsSegmentReceiptContent = () => {
  const [bannerStates, setBannerStates] =
    useState<GetAllInnerTicketsReceivedBannerStatsResponse>();

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================ API ================================
  const [getReceivedBannerStats, { isFetching: isGetReceivedBannerStatsLoading }] =
    useLazyGetAllInnerTicketsReceivedBannerStatsQuery();

  //* ================================ Effects  ================================

  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ ...url, status: INNER_TICKETS_TABS_TYPE.notAssigned });
    }
  }, [url?.status]);

  // fetch banner stats
  useEffect(() => {
    getBannerHandler();
  }, []);

  //* ================================ Util Functions ================================
  const getBannerHandler = () => {
    getReceivedBannerStats()
      .unwrap()
      .then((value) => setBannerStates(value));
  };

  const changeCardHandler = (status: string) => {
    if (status !== url?.status) {
      setSearchParams({ type: url?.type, status: status });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4">
        <DemandCard
          title="تخصیص نیافته‌ها"
          active={url?.status === INNER_TICKETS_TABS_TYPE.notAssigned}
          clickHandler={() => changeCardHandler(INNER_TICKETS_TABS_TYPE.notAssigned)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetReceivedBannerStatsLoading
              ? "..."
              : String(bannerStates?.unassignedCount ?? 0)
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.notAssigned
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
        {/* todo:[nima] uncomment when api get ready */}
        {/* <DemandCard
          title="تخصیص یافته‌ها"
          active={url?.status === INNER_TICKETS_TABS_TYPE.assigned}
          clickHandler={() => changeCardHandler(INNER_TICKETS_TABS_TYPE.assigned)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetReceivedBannerStatsLoading
              ? "..."
              : String(bannerStates?.assignedCount ?? 0)
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.assigned
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        /> */}

        <DemandCard
          title="تخصیص یافته‌ها به من"
          active={url?.status === INNER_TICKETS_TABS_TYPE.assignedToMe}
          clickHandler={() => changeCardHandler(INNER_TICKETS_TABS_TYPE.assignedToMe)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetReceivedBannerStatsLoading
              ? "..."
              : String(bannerStates?.assignedToMeCount ?? 0)
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.assignedToMe
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
            isGetReceivedBannerStatsLoading
              ? "..."
              : String(bannerStates?.closedCount ?? 0)
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
            isGetReceivedBannerStatsLoading
              ? "..."
              : String(bannerStates?.totalCount ?? 0)
          }
          className={`w-full ${
            url?.status === INNER_TICKETS_TABS_TYPE.allTickets
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
      </div>
      {url?.status === INNER_TICKETS_TABS_TYPE.notAssigned ? (
        <AllInnerTicketsNotAssignedList getBannerHandler={getBannerHandler} />
      ) : url?.status === INNER_TICKETS_TABS_TYPE.assigned ? (
        <AllInnerTicketsAssignedToList /> // contents of this are comment in ui because api not ready. when api get ready, this will be uncomment and above code will be comment in ui
      ) : url?.status === INNER_TICKETS_TABS_TYPE.assignedToMe ? (
        <AllInnerTicketsAssignedToMeList />
      ) : url?.status === INNER_TICKETS_TABS_TYPE.closed ? (
        <AllInnerTicketsClosedList />
      ) : url?.status === INNER_TICKETS_TABS_TYPE.allTickets ? (
        <AllInnerTicketsAllList getBannerHandler={getBannerHandler} />
      ) : null}
    </>
  );
};
export default AllInnerTicketsSegmentReceiptContent;
