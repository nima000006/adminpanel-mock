import { useEffect, useState } from "react";

import { Link } from "react-router";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyGetAllForeignDetailQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import {
  FOREIGN_NATIONAL_REJECTED,
  FOREIGN_NATIONAL_WAITING_REVIEW,
} from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { AllForeignDetailResponse } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/@types/@allForeignNationalsRegistrationDetailTypes";
import AllForeignNationalsRegistrationDetailInfo from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailInfo/AllForeignNationalsRegistrationDetailInfo";
import AllForeignNationalsRegistrationDetailRejected from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailRejected/AllForeignNationalsRegistrationDetailRejected";
import AllForeignNationalsRegistrationDetailWaitingReview from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailWaitingReview/AllForeignNationalsRegistrationDetailWaitingReview";

const AllForeignNationalsRegistrationDetail = () => {
  const {
    params: { status, id },
  } = useQueryParams();

  const [data, setData] = useState<AllForeignDetailResponse | null>(null);

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست‌ها",
      },
      {
        title: (
          <Link
            to={MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE}
          >
            ثبت نام اتباع
          </Link>
        ),
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getDetailData, { isFetching: isDetailDataLoading }] =
    useLazyGetAllForeignDetailQuery();

  //* ================================ Effects  ================================
  useEffect(() => {
    if (id) {
      getDetailData(id)
        .unwrap()
        .then((value) => {
          setData(value);
        });
    }
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isDetailDataLoading}>
      <AllForeignNationalsRegistrationDetailInfo data={data} />
      {status === FOREIGN_NATIONAL_WAITING_REVIEW && (
        <AllForeignNationalsRegistrationDetailWaitingReview data={data} />
      )}
      {status === FOREIGN_NATIONAL_REJECTED && (
        <AllForeignNationalsRegistrationDetailRejected data={data} />
      )}
    </Div>
  );
};
export default AllForeignNationalsRegistrationDetail;
