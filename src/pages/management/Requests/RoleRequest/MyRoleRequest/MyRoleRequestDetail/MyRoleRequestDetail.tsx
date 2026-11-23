import { useEffect, useState } from "react";

import { Link } from "react-router";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyGetManagementMyRoleRequestDetailQuery } from "@infra/states/redux/Apis/management/requests/requestApi";

import { GetManagementMyRoleRequestDetailResponse } from "./@types/@myRoleRequestDetail";
import MyRoleRequestDetailConfirmed from "./helper/components/MyRoleRequestDetailConfirmed/MyRoleRequestDetailConfirmed";
import MyRoleRequestDetailInfo from "./helper/components/MyRoleRequestDetailInfo/MyRoleRequestDetailInfo";
import MyRoleRequestDetailRejected from "./helper/components/MyRoleRequestDetailRejected/MyRoleRequestDetailRejected";
import MyRoleRequestDetailWaitingReview from "./helper/components/MyRoleRequestDetailWaitingReview/MyRoleRequestDetailWaitingReview";
import {
  ROLE_REQUEST_CONFIRMED,
  ROLE_REQUEST_REJECTED,
  ROLE_REQUEST_WAITING_REVIEW,
} from "../../_shared/utils/roleRequestUtil";

import "./_myRoleRequestDetail.scss";

const MyRoleRequestDetail = () => {
  const [data, setData] = useState<GetManagementMyRoleRequestDetailResponse | null>(null);

  const {
    params: { status, id },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">درخواست ها</span>,
      },
      {
        title: (
          <Link to={MANAGEMENT_MY_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE}>
            <span className="management-breadcrumb-title">درخواست نقش</span>
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
    useLazyGetManagementMyRoleRequestDetailQuery();

  //? ================================ Effects ================================
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
      className="management-requests-my-role-request-detail-container"
    >
      <MyRoleRequestDetailInfo
        data={data?.employeeResponseDto?.[0]}
        message={data?.message}
        createdDate={data?.createdDate}
        modifiedDate={data?.modifiedDate}
        modifiedByName={data?.modifiedByName}
      />
      {+status === ROLE_REQUEST_WAITING_REVIEW && (
        <MyRoleRequestDetailWaitingReview adminStaffId={data?.adminStaffId} />
      )}
      {+status === ROLE_REQUEST_CONFIRMED && (
        <MyRoleRequestDetailConfirmed staffId={data?.adminStaffId} />
      )}
      {+status === ROLE_REQUEST_REJECTED && (
        <MyRoleRequestDetailRejected
          description={data?.description}
          title={data?.reason}
        />
      )}
    </Div>
  );
};

export default MyRoleRequestDetail;
