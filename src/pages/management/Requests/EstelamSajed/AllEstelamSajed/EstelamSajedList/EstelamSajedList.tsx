import { useEffect, useState } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetEstelamSajedBannerQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import { EstelamSajedBannerResponse } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/@types/@estelamSajedDetailTypes";
import EstelamSajedConfirmedListTab from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/helper/components/EstelamSajedConfirmedList/EstelamSajedConfirmedListTab";
import EstelamSajedRejectedListTab from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/helper/components/EstelamSajedRejectedList/EstelamSajedRejectedListTab";
import EstelamSajedWaitingReviewListTab from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/helper/components/EstelamSajedWaitingReviewList/EstelamSajedWaitingReviewListTab";
import { ESTELAM_SAJED_TABS } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/helper/utils";

import "./_estelamSajedList.scss";

const EstelamSajedList = () => {
  const { params, setSearchParams } = useQueryParams<{ status: string }>();
  const [bannerStates, setBannerStates] = useState<EstelamSajedBannerResponse>();

  useTitle({ text: "درخواست‌ها / استعلام ساجد" });

  //? ================================  Api Calls ================================
  // list
  const [getList, { isFetching: isGetListLoading }] = useLazyGetEstelamSajedBannerQuery();

  //* ================================ Effects  ================================
  useEffect(() => {
    getList()
      .unwrap()
      .then((res) => {
        setBannerStates(res);
      });

    if (!params?.status) {
      setSearchParams({ ...params, status: ESTELAM_SAJED_TABS.waitingReview });
    }
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
        <EstelamSajedWaitingReviewListTab />
      ) : params?.status === ESTELAM_SAJED_TABS.confirmed ? (
        <EstelamSajedConfirmedListTab />
      ) : params?.status === ESTELAM_SAJED_TABS.rejected ? (
        <EstelamSajedRejectedListTab />
      ) : null}
    </>
  );
};

export default EstelamSajedList;
