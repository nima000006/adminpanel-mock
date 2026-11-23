import { useEffect, useState } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyEstelamSajedBannerQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import { MyEstelamSajedBannerResponse } from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/@types/@myEstelamSajedDetailTypes";
import MyEstelamSajedConfirmedListTab from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedList/helper/components/MyEstelamSajedConfirmedList/MyEstelamSajedConfirmedListTab";
import MyEstelamSajedRejectedListTab from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedList/helper/components/MyEstelamSajedRejectedList/MyEstelamSajedRejectedListTab";
import MyEstelamSajedWaitingReviewListTab from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedList/helper/components/MyEstelamSajedWaitingReviewList/MyEstelamSajedWaitingReviewListTab";
import { ESTELAM_SAJED_TABS } from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedList/helper/utils";
import "./_myEstelamSajedList.scss";

const MyEstelamSajedList = () => {
  const { params, setSearchParams } = useQueryParams<{ status: string }>();
  const [bannerStates, setBannerStates] = useState<MyEstelamSajedBannerResponse>();

  useTitle({ text: "درخواست‌ها / استعلام ساجد من" });

  //? ================================  Api Calls ================================
  // list
  const [getList, { isFetching: isGetListLoading }] =
    useLazyGetMyEstelamSajedBannerQuery();

  //* ================================ Effects  ================================
  useEffect(() => {
    if (!params?.status) {
      setSearchParams({ ...params, status: ESTELAM_SAJED_TABS.waitingReview });
    }
  }, [params?.status]);

  useEffect(() => {
    // if()
    getList()
      .unwrap()
      .then((res) => {
        setBannerStates(res);
      });
  }, []);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div className="mb-10 grid grid-cols-1 gap-2 md:grid-cols-3">
        <DemandCard
          title="در انتظار بررسی"
          active={params?.status == ESTELAM_SAJED_TABS.waitingReview}
          clickHandler={() => changeCardHandler(ESTELAM_SAJED_TABS.waitingReview)}
          className={`w-full ${
            params?.status === ESTELAM_SAJED_TABS.waitingReview
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={isGetListLoading ? "..." : String(bannerStates?.inProgress ?? 0)}
        />
        <DemandCard
          title="تایید شده"
          active={params?.status == ESTELAM_SAJED_TABS.confirmed}
          clickHandler={() => changeCardHandler(ESTELAM_SAJED_TABS.confirmed)}
          className={`w-full ${
            params?.status === ESTELAM_SAJED_TABS.confirmed
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={isGetListLoading ? "..." : String(bannerStates?.accepted ?? 0)}
        />
        <DemandCard
          title="رد شده"
          active={params?.status == ESTELAM_SAJED_TABS.rejected}
          clickHandler={() => changeCardHandler(ESTELAM_SAJED_TABS.rejected)}
          className={`w-full ${
            params?.status === ESTELAM_SAJED_TABS.rejected
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={isGetListLoading ? "..." : String(bannerStates?.rejected ?? 0)}
        />
      </div>
      {params?.status === ESTELAM_SAJED_TABS.waitingReview ? (
        <MyEstelamSajedWaitingReviewListTab />
      ) : params?.status === ESTELAM_SAJED_TABS.confirmed ? (
        <MyEstelamSajedConfirmedListTab />
      ) : params?.status === ESTELAM_SAJED_TABS.rejected ? (
        <MyEstelamSajedRejectedListTab />
      ) : null}
    </>
  );
};

export default MyEstelamSajedList;
