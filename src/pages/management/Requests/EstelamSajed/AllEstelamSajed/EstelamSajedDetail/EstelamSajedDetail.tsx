import { useEffect, useState } from "react";

import { Link } from "react-router";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_ESTELAM_SAJED_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyGetSajedDetailQuery } from "@infra/states/redux/Apis/management/requests/requestApi";
import {
  ESTELAM_SAJED_REJECTED,
  ESTELAM_SAJED_WAITING_REVIEW,
} from "@pages/management/Requests/EstelamSajed/_shared/utils/estelamSajedUtils";
import { EstelamSajedDetailResponse } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/@types/@estelamSajedDetailTypes";

import EstelamSajedDetailInfo from "./helper/components/EstelamSajedDetailInfo/EstelamSajedDetailInfo";
import EstelamSajedDetailRejected from "./helper/components/EstelamSajedDetailRejected/EstelamSajedDetailRejected";
import EstelamSajedDetailWaitingReview from "./helper/components/EstelamSajedDetailWaitingReview/EstelamSajedDetailWaitingReview";

import "./_estelamSajedDetail.scss";

const EstelamSajedDetail = () => {
  const {
    params: { status, id },
  } = useQueryParams();

  const [data, setData] = useState<EstelamSajedDetailResponse | null>(null);

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست‌ها",
      },
      {
        title: (
          <Link to={MANAGEMENT_REQUESTS_ESTELAM_SAJED_LIST_PAGE_ROUTE}>استعلام ساجد</Link>
        ),
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getDetailData, { isFetching: isDetailDataLoading }] =
    useLazyGetSajedDetailQuery();

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
      className="management-requests-estelam-sajed-detail-container"
    >
      <EstelamSajedDetailInfo data={data} />
      {+status === ESTELAM_SAJED_WAITING_REVIEW && <EstelamSajedDetailWaitingReview />}
      {+status === ESTELAM_SAJED_REJECTED && <EstelamSajedDetailRejected data={data} />}
    </Div>
  );
};

export default EstelamSajedDetail;
