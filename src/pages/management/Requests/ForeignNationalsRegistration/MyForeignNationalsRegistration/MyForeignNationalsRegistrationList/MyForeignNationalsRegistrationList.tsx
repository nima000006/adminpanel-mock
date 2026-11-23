import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FOREIGN_NATIONAL_TABS } from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import MyForeignNationalsRegistrationConfirmedListTab from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationList/helper/components/MyForeignNationalsRegistrationConfirmedListTab/MyForeignNationalsRegistrationConfirmedListTab";
import MyForeignNationalsRegistrationRejectedListTab from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationList/helper/components/MyForeignNationalsRegistrationRejectedListTab/MyForeignNationalsRegistrationRejectedListTab";
import MyForeignNationalsRegistrationReviewListTab from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationList/helper/components/MyForeignNationalsRegistrationReviewListTab/MyForeignNationalsRegistrationReviewListTab";

const MyForeignNationalsRegistrationList = () => {
  const { params, setSearchParams } = useQueryParams<{ status: string }>();

  useTitle({ text: "درخواست‌ها / ثبت نام اتباع" });

  //* ================================ Effects  ================================
  useEffect(() => {
    if (!params?.status) {
      setSearchParams({ ...params, status: FOREIGN_NATIONAL_TABS.waitingReview });
    }
  }, []);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <div className="mb-10 grid grid-cols-1 gap-2 md:grid-cols-3">
        <DemandCard
          title="در انتظار بررسی"
          active={params?.status == FOREIGN_NATIONAL_TABS.waitingReview}
          clickHandler={() => changeCardHandler(FOREIGN_NATIONAL_TABS.waitingReview)}
          className={`w-full ${
            params?.status === FOREIGN_NATIONAL_TABS.waitingReview
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={"10"}
          // badgeTitle={isGetListLoading ? "..." : String(bannerStates?.inProgress ?? 0)}
        />
        <DemandCard
          title="تایید شده"
          active={params?.status == FOREIGN_NATIONAL_TABS.confirmed}
          clickHandler={() => changeCardHandler(FOREIGN_NATIONAL_TABS.confirmed)}
          className={`w-full ${
            params?.status === FOREIGN_NATIONAL_TABS.confirmed
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={"10"}
        />
        <DemandCard
          title="رد شده"
          active={params?.status == FOREIGN_NATIONAL_TABS.rejected}
          clickHandler={() => changeCardHandler(FOREIGN_NATIONAL_TABS.rejected)}
          className={`w-full ${
            params?.status === FOREIGN_NATIONAL_TABS.rejected
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={"10"}
        />
      </div>
      {params?.status === FOREIGN_NATIONAL_TABS.waitingReview ? (
        <MyForeignNationalsRegistrationReviewListTab />
      ) : params?.status === FOREIGN_NATIONAL_TABS.confirmed ? (
        <MyForeignNationalsRegistrationConfirmedListTab />
      ) : params?.status === FOREIGN_NATIONAL_TABS.rejected ? (
        <MyForeignNationalsRegistrationRejectedListTab />
      ) : null}
    </div>
  );
};
export default MyForeignNationalsRegistrationList;
