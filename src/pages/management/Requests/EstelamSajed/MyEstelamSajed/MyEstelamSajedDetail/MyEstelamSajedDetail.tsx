import { useEffect, useState } from "react";

import { Link } from "react-router";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_MY_ESTELAM_SAJED_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyGetMySajedDetailQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import {
  ESTELAM_SAJED_REJECTED,
  ESTELAM_SAJED_WAITING_REVIEW,
} from "@pages/management/Requests/EstelamSajed/_shared/utils/estelamSajedUtils";
import { MyEstelamSajedDetailResponse } from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/@types/@myEstelamSajedDetailTypes";
import MyEstelamSajedDetailInfo from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/helper/components/MyEstelamSajedDetailInfo/MyEstelamSajedDetailInfo";
import MyEstelamSajedDetailRejected from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/helper/components/MyEstelamSajedDetailRejected/MyEstelamSajedDetailRejected";
import MyEstelamSajedDetailWaitingReview from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/helper/components/MyEstelamSajedDetailWaitingReview/MyEstelamSajedDetailWaitingReview";

import "./_myEstelamSajedDetail.scss";

const MyEstelamSajedDetail = () => {
  const {
    params: { status, id },
  } = useQueryParams();

  const [data, setData] = useState<MyEstelamSajedDetailResponse | null>(null);

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست‌ها",
      },
      {
        title: (
          <Link to={MANAGEMENT_REQUESTS_MY_ESTELAM_SAJED_LIST_PAGE_ROUTE}>
            استعلام ساجد من
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
    useLazyGetMySajedDetailQuery();

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
    <Div
      loading={isDetailDataLoading}
      className="my-management-requests-estelam-sajed-detail-container"
    >
      <MyEstelamSajedDetailInfo data={data} />
      {+status === ESTELAM_SAJED_WAITING_REVIEW && <MyEstelamSajedDetailWaitingReview />}
      {+status === ESTELAM_SAJED_REJECTED && <MyEstelamSajedDetailRejected data={data} />}
    </Div>
  );
};

export default MyEstelamSajedDetail;
