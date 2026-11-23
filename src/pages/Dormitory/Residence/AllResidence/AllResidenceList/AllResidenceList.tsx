import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetResidenceListBannerQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { RESIDENCE_TABS_TYPE } from "@pages/Dormitory/Residence/_shared/util";
import AllResidenceActiveList from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceActiveList/AllResidenceActiveList";
import AllResidenceCancelledList from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceCancelledList/AllResidenceCancelledList";
import AllResidenceConfirmedList from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceConfirmedList/AllResidenceConfirmedList";
import AllResidenceRejectedList from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceRejectedList/AllResidenceRejectedList";
import AllResidenceReturnedList from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceReturnedList/AllResidenceReturnedList";
import AllResidenceWaitingList from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceWaitingList/AllResidenceWaitingList";

const AllResidenceList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "اقامتگاه‌ها",
      },
      { title: "همه اقامتگاه‌ها" },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getResidenceListBanner,
    { data: residenceListBannerData, isFetching: isGetResidenceListBannerLoading },
  ] = useLazyGetResidenceListBannerQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getResidenceListBanner();

    if (!url?.status) {
      setSearchParams({ status: RESIDENCE_TABS_TYPE.waiting });
    }
  }, []);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  const getBannerCount = (...statusNames: string[]) => {
    if (isGetResidenceListBannerLoading) return "...";

    const count =
      residenceListBannerData
        ?.filter((item) => statusNames.includes(item?.status?.name))
        ?.reduce((sum, item) => sum + (item?.count ?? 0), 0) ?? 0;

    return String(count);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <DemandCard
          title="در انتظار بررسی"
          active={url?.status === RESIDENCE_TABS_TYPE.waiting}
          clickHandler={() => changeCardHandler(RESIDENCE_TABS_TYPE.waiting)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBannerCount("PENDING_REVIEW")}
          className={`w-full ${
            url?.status === RESIDENCE_TABS_TYPE.waiting
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
        <DemandCard
          title="عودت شده"
          active={url?.status === RESIDENCE_TABS_TYPE.returned}
          clickHandler={() => changeCardHandler(RESIDENCE_TABS_TYPE.returned)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBannerCount("RETURNED")}
          className={`w-full ${
            url?.status === RESIDENCE_TABS_TYPE.returned
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
        <DemandCard
          title="تایید شده"
          active={url?.status === RESIDENCE_TABS_TYPE.confirmed}
          clickHandler={() => changeCardHandler(RESIDENCE_TABS_TYPE.confirmed)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBannerCount("ACTIVE")}
          className={`w-full ${
            url?.status === RESIDENCE_TABS_TYPE.confirmed
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
        <DemandCard
          title="رد شده"
          active={url?.status === RESIDENCE_TABS_TYPE.rejected}
          clickHandler={() => changeCardHandler(RESIDENCE_TABS_TYPE.rejected)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBannerCount("REJECTED")}
          className={`w-full ${
            url?.status === RESIDENCE_TABS_TYPE.rejected
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
        <DemandCard
          title="لغو شده"
          active={url?.status === RESIDENCE_TABS_TYPE.cancelled}
          clickHandler={() => changeCardHandler(RESIDENCE_TABS_TYPE.cancelled)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBannerCount("CANCELLED")}
          className={`w-full ${
            url?.status === RESIDENCE_TABS_TYPE.cancelled
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
        <DemandCard
          title="فعال"
          active={url?.status === RESIDENCE_TABS_TYPE.active}
          clickHandler={() => changeCardHandler(RESIDENCE_TABS_TYPE.active)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={getBannerCount("ACTIVE")}
          className={`w-full ${
            url?.status === RESIDENCE_TABS_TYPE.active
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
        />
      </div>
      {url?.status === RESIDENCE_TABS_TYPE.waiting ? (
        <AllResidenceWaitingList />
      ) : url?.status === RESIDENCE_TABS_TYPE.returned ? (
        <AllResidenceReturnedList />
      ) : url?.status === RESIDENCE_TABS_TYPE.confirmed ? (
        <AllResidenceConfirmedList />
      ) : url?.status === RESIDENCE_TABS_TYPE.rejected ? (
        <AllResidenceRejectedList />
      ) : url?.status === RESIDENCE_TABS_TYPE.cancelled ? (
        <AllResidenceCancelledList />
      ) : url?.status === RESIDENCE_TABS_TYPE.active ? (
        <AllResidenceActiveList />
      ) : null}
    </div>
  );
};

export default AllResidenceList;
