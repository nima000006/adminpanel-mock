import { useState, useLayoutEffect, useRef, useMemo } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import MyRoleRequestConfirmedListTab from "./helper/components/MyRoleRequestConfirmedListTab/MyRoleRequestConfirmedListTab";
import MyRoleRequestRejectedListTab from "./helper/components/MyRoleRequestRejectedListTab/MyRoleRequestRejectedListTab";
import MyRoleRequestWaitingReviewListTab from "./helper/components/MyRoleRequestWaitingReviewListTab/MyRoleRequestWaitingReviewListTab";
import "./_myRoleRequestList.scss";

const FILTER_PARAMS = [
  "firstName",
  "lastName",
  "username",
  "mobileNumber",
  "employeeCode",
];

const MyRoleRequestList = () => {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);

  const { params, setSearchParams } = useQueryParams();
  const pendingTabRef = useRef<1 | 2 | 3 | null>(null);

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">درخواست ها</span>,
      },
      { title: "نقش‌ها" },
    ],
  });

  // ================================ Effects ================================
  // Check if filters exist
  const hasFilters = useMemo(
    () => FILTER_PARAMS.some((key) => params?.[key]),
    [
      params?.firstName,
      params?.lastName,
      params?.username,
      params?.mobileNumber,
      params?.employeeCode,
    ]
  );

  // Reset filters synchronously before new tab renders to prevent it from seeing old filters
  useLayoutEffect(() => {
    if (pendingTabRef.current !== null && pendingTabRef.current === activeTab) {
      // Tab changed, reset filters before new tab renders
      // This prevents new tab from mounting with old filters
      const { firstName, lastName, username, mobileNumber, employeeCode, ...restParams } =
        params || {};

      setSearchParams({
        ...restParams,
        page: "1",
        pageSize: params?.pageSize || "8",
      });
      pendingTabRef.current = null;
    }
  }, [activeTab]);

  // ================================ Util Functions ================================
  const handleTabChange = (tab: 1 | 2 | 3) => {
    if (tab === activeTab) return;

    if (hasFilters) {
      // Change tab first (previous tab will unmount)
      // Then reset filters in useEffect (new tab will mount with clean filters)
      pendingTabRef.current = tab;
      setActiveTab(tab);
    } else {
      // No filters to clear, change tab immediately
      setActiveTab(tab);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 1:
        return <MyRoleRequestWaitingReviewListTab />;
      case 2:
        return <MyRoleRequestConfirmedListTab />;
      case 3:
        return <MyRoleRequestRejectedListTab />;
      default:
        return null;
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="management-requests-my-role-request-list-container">
      {/* DemandCard Navigation */}
      <div className="role-request-card-container">
        <DemandCard
          title="در انتظار بررسی"
          active={activeTab === 1}
          clickHandler={() => handleTabChange(1)}
        />
        <DemandCard
          title="تایید شده"
          active={activeTab === 2}
          clickHandler={() => handleTabChange(2)}
        />
        <DemandCard
          title="رد شده"
          active={activeTab === 3}
          clickHandler={() => handleTabChange(3)}
        />
      </div>

      {/* Content */}
      <div className="role-request-content">{renderActiveTab()}</div>
    </div>
  );
};

export default MyRoleRequestList;
