import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import AllRoleRequestConfirmedListTab from "./helper/components/AllRoleRequestConfirmedListTab/AllRoleRequestConfirmedListTab";
import AllRoleRequestRejectedListTab from "./helper/components/AllRoleRequestRejectedListTab/AllRoleRequestRejectedListTab";
import AllRoleRequestWaitingReviewListTab from "./helper/components/AllRoleRequestWaitingReviewListTab/AllRoleRequestWaitingReviewListTab";
import "./_allRoleRequestList.scss";

const AllRoleRequestList = () => {
  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">درخواست ها</span>,
      },
      { title: "نقش‌ها" },
    ],
  });

  // ================================ Effects ================================

  useEffect(() => {
    if (!params?.status) {
      setSearchParams({ ...params, status: "1" });
    }
  }, []);

  // ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="management-requests-all-role-request-list-container">
      {/* DemandCard Navigation */}
      <div className="role-request-card-container">
        <DemandCard
          title="در انتظار بررسی"
          active={params?.status === "1"}
          clickHandler={() => changeCardHandler("1")}
        />
        <DemandCard
          title="تایید شده"
          active={params?.status === "2"}
          clickHandler={() => changeCardHandler("2")}
        />
        <DemandCard
          title="رد شده"
          active={params?.status === "3"}
          clickHandler={() => changeCardHandler("3")}
        />
      </div>

      {/* Content */}
      <div className="role-request-content">
        {params?.status === "1" ? (
          <AllRoleRequestWaitingReviewListTab />
        ) : params?.status === "2" ? (
          <AllRoleRequestConfirmedListTab />
        ) : params?.status === "3" ? (
          <AllRoleRequestRejectedListTab />
        ) : null}
      </div>
    </div>
  );
};

export default AllRoleRequestList;
