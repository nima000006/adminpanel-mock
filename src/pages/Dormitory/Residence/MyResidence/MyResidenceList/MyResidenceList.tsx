import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyResidenceListBannerQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { RESIDENCE_TABS_TYPE } from "@pages/Dormitory/Residence/_shared/util";
import MyResidenceActiveList from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceActiveList/MyResidenceActiveList";
import MyResidenceCancelledList from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceCancelledList/MyResidenceCancelledList";
import MyResidenceRejectedList from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceRejectedList/MyResidenceRejectedList";
import MyResidenceReturnedList from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceReturnedList/MyResidenceReturnedList";
import MyResidenceWaitingList from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceWaitingList/MyResidenceWaitingList";

const MyResidenceList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "اقامتگاه‌ها",
      },
      { title: "اقامتگاه‌های من" },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  // banner
  const [
    getMyResidenceListBanner,
    { data: myResidenceListBannerData, isFetching: isGetMyResidenceListBannerLoading },
  ] = useLazyGetMyResidenceListBannerQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getMyResidenceListBanner();

    if (!url?.status) {
      setSearchParams({ status: RESIDENCE_TABS_TYPE.active });
    }
  }, []);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  const getBannerCount = (...statusNames: string[]) => {
    if (isGetMyResidenceListBannerLoading) return "...";

    const count =
      myResidenceListBannerData
        ?.filter((item) => statusNames.includes(item?.status?.name))
        ?.reduce((sum, item) => sum + (item?.count ?? 0), 0) ?? 0;

    return String(count);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
      </div>
      {url?.status === RESIDENCE_TABS_TYPE.active ? (
        <MyResidenceActiveList />
      ) : url?.status === RESIDENCE_TABS_TYPE.returned ? (
        <MyResidenceReturnedList />
      ) : url?.status === RESIDENCE_TABS_TYPE.waiting ? (
        <MyResidenceWaitingList />
      ) : url?.status === RESIDENCE_TABS_TYPE.rejected ? (
        <MyResidenceRejectedList />
      ) : url?.status === RESIDENCE_TABS_TYPE.cancelled ? (
        <MyResidenceCancelledList />
      ) : null}
    </div>
  );
};

export default MyResidenceList;
