import { useEffect, useState } from "react";

import { Link } from "react-router";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_MY_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyGetMyEstelamAmozeshyarDetailQuery } from "@infra/states/redux/Apis/management/requests/requestApi";

import { MyEstelamAmozeshyarDetailResponse } from "./@types/@myEstelamAmozeshyarDetail";
import EstelamAmozeshyarDetailInfo from "./helper/components/EstelamAmozeshyarDetailInfo/EstelamAmozeshyarDetailInfo";
import EstelamAmozeshyarDetailRejected from "./helper/components/EstelamAmozeshyarDetailRejected/EstelamAmozeshyarDetailRejected";
import EstelamAmozeshyarDetailWaitingReview from "./helper/components/EstelamAmozeshyarDetailWaitingReview/EstelamAmozeshyarDetailWaitingReview";
import {
  ESTELAM_AMOZESHYAR_REJECTED,
  ESTELAM_AMOZESHYAR_WAITING_REVIEW,
} from "../../_shared/utils/estelamAmozeshyarUtil";
import "./_myEstelamAmozeshyarDetail.scss";

const MyEstelamAmozeshyarDetail = () => {
  const [data, setData] = useState<MyEstelamAmozeshyarDetailResponse | null>(null);

  const {
    params: { status, id },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست‌ها",
      },
      {
        title: (
          <Link to={MANAGEMENT_REQUESTS_MY_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE}>
            استعلام آموزشیار من
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
    useLazyGetMyEstelamAmozeshyarDetailQuery();

  useEffect(() => {
    if (id) {
      getDetailData(id)
        .unwrap()
        .then((value) => {
          setData(value);
        });
    }
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div
      loading={isDetailDataLoading}
      className="management-requests-my-estelam-amozeshyar-detail-container"
    >
      <EstelamAmozeshyarDetailInfo data={data} />
      {+status === ESTELAM_AMOZESHYAR_WAITING_REVIEW && (
        <EstelamAmozeshyarDetailWaitingReview />
      )}
      {+status === ESTELAM_AMOZESHYAR_REJECTED && (
        <EstelamAmozeshyarDetailRejected
          reason={data?.rejectReason}
          rejectReasonDescription={data?.rejectReasonDescription ?? "-"}
        />
      )}
    </Div>
  );
};

export default MyEstelamAmozeshyarDetail;
