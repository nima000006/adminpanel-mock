import { useEffect, useState } from "react";

import { Link } from "react-router";

import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE } from "@infra/router/routes/management";
import { useLazyGetManagementRoleRequestDetailQuery } from "@infra/states/redux/Apis/management/requests/requestApi";

import { GetManagementRoleRequestDetailResponse } from "./@types/@allRoleRequestDetail";
import {
  ROLE_REQUEST_CONFIRMED,
  ROLE_REQUEST_REJECTED,
  ROLE_REQUEST_WAITING_REVIEW,
} from "../../_shared/utils/roleRequestUtil";
import AllRoleRequestDetailConfirmed from "./helper/components/AllRoleRequestDetailConfirmed/AllRoleRequestDetailConfirmed";
import AllRoleRequestDetailInfo from "./helper/components/AllRoleRequestDetailInfo/AllRoleRequestDetailInfo";
import AllRoleRequestDetailRejected from "./helper/components/AllRoleRequestDetailRejected/AllRoleRequestDetailRejected";
import AllRoleRequestDetailWaitingReview from "./helper/components/AllRoleRequestDetailWaitingReview/AllRoleRequestDetailWaitingReview";

import "./_allRoleRequestDetail.scss";

const AllRoleRequestDetail = () => {
  const [data, setData] = useState<GetManagementRoleRequestDetailResponse | null>(null);

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
          <Link to={MANAGEMENT_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE}>
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
    useLazyGetManagementRoleRequestDetailQuery();

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
      className="management-requests-all-role-request-detail-container"
    >
      <AllRoleRequestDetailInfo
        data={data?.employeeResponseDto?.[0]}
        message={data?.message}
        createdDate={data?.createdDate}
        modifiedDate={data?.modifiedDate}
        modifiedByName={data?.modifiedByName}
      />
      {+status === ROLE_REQUEST_WAITING_REVIEW && (
        <AllRoleRequestDetailWaitingReview adminStaffId={data?.adminStaffId} />
      )}
      {+status === ROLE_REQUEST_CONFIRMED && (
        <AllRoleRequestDetailConfirmed staffId={data?.adminStaffId} />
      )}
      {+status === ROLE_REQUEST_REJECTED && (
        <AllRoleRequestDetailRejected
          description={data?.description}
          title={data?.reason}
        />
      )}
    </Div>
  );
};

export default AllRoleRequestDetail;
