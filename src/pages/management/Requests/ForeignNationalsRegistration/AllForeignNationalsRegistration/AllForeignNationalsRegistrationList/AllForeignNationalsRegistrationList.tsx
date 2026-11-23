import { useEffect, useState } from "react";

import dayjs from "dayjs";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import { jalaliToGregorianWithoutZ } from "@infra/helpers/DatePickerFix/utils/jalaliToGregorianWithoutZ";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetForeignBannerQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import {
  FOREIGN_NATIONAL_CONFIRMED,
  FOREIGN_NATIONAL_REJECTED,
  FOREIGN_NATIONAL_WAITING_REVIEW,
} from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { ForeignBannerResponse } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/@types/@allForeignNationalsRegistrationListTypes";
import AllForeignNationalsRegistrationConfirmedListTab from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/helper/components/AllForeignNationalsRegistrationConfirmedListTab/AllForeignNationalsRegistrationConfirmedListTab";
import AllForeignNationalsRegistrationRejectedListTab from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/helper/components/AllForeignNationalsRegistrationRejectedListTab/AllForeignNationalsRegistrationRejectedListTab";
import AllForeignNationalsRegistrationReviewListTab from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/helper/components/AllForeignNationalsRegistrationReviewListTab/AllForeignNationalsRegistrationReviewListTab";

const AllForeignNationalsRegistrationList = () => {
  const { params, setSearchParams } = useQueryParams<{
    status: string;
    dateDateStart?: string;
    dateDateEnd?: string;
  }>();
  const [bannerStates, setBannerStates] = useState<ForeignBannerResponse>();

  useTitle({ text: "درخواست‌ها / ثبت نام اتباع" });

  //? ================================  Api Calls ================================
  const [getBanner, { isFetching: isGetBannerLoading }] = useLazyGetForeignBannerQuery();

  //* ================================ Effects  ================================
  useEffect(() => {
    const offsetMinutes = dayjs().utcOffset();

    getBanner({
      ...(params?.dateDateStart && {
        fromDate: jalaliToGregorianWithoutZ(
          dayjs(params.dateDateStart).startOf("day").add(offsetMinutes, "minute")
        ),
      }),

      ...(params?.dateDateEnd && {
        toDate: (() => {
          const toDate = dayjs(params.dateDateEnd);
          const now = dayjs();
          const isToday = toDate.isSame(now, "day");

          const value = isToday
            ? now.add(offsetMinutes, "minute")
            : toDate.endOf("day").add(offsetMinutes, "minute");

          return jalaliToGregorianWithoutZ(value);
        })(),
      }),
    })
      .unwrap()
      .then((res: ForeignBannerResponse) => {
        setBannerStates(res);
      });

    if (!params?.status) {
      setSearchParams({ ...params, status: FOREIGN_NATIONAL_WAITING_REVIEW });
    }
  }, [params?.dateDateStart, params?.dateDateEnd]);

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
          active={params?.status == FOREIGN_NATIONAL_WAITING_REVIEW}
          clickHandler={() => changeCardHandler(FOREIGN_NATIONAL_WAITING_REVIEW)}
          className={`w-full ${
            params?.status === FOREIGN_NATIONAL_WAITING_REVIEW
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={
            isGetBannerLoading ? "..." : String(bannerStates?.pendingReview ?? 0)
          }
        />
        <DemandCard
          title="تایید شده"
          active={params?.status == FOREIGN_NATIONAL_CONFIRMED}
          clickHandler={() => changeCardHandler(FOREIGN_NATIONAL_CONFIRMED)}
          className={`w-full ${
            params?.status === FOREIGN_NATIONAL_CONFIRMED
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={isGetBannerLoading ? "..." : String(bannerStates?.accepted ?? 0)}
        />
        <DemandCard
          title="رد شده"
          active={params?.status == FOREIGN_NATIONAL_REJECTED}
          clickHandler={() => changeCardHandler(FOREIGN_NATIONAL_REJECTED)}
          className={`w-full ${
            params?.status === FOREIGN_NATIONAL_REJECTED
              ? "text-primary-6"
              : "text-neutral-7"
          }`}
          badgeColor="transparent"
          badge={false}
          badgeTitle={isGetBannerLoading ? "..." : String(bannerStates?.rejected ?? 0)}
        />
      </div>
      {params?.status === FOREIGN_NATIONAL_WAITING_REVIEW ? (
        <AllForeignNationalsRegistrationReviewListTab />
      ) : params?.status === FOREIGN_NATIONAL_CONFIRMED ? (
        <AllForeignNationalsRegistrationConfirmedListTab />
      ) : params?.status === FOREIGN_NATIONAL_REJECTED ? (
        <AllForeignNationalsRegistrationRejectedListTab />
      ) : null}
    </div>
  );
};
export default AllForeignNationalsRegistrationList;
