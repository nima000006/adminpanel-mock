import { useEffect, useState } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import AllPositionsAndRolesRoleGroupList from "./helper/components/AllPositionsAndRolesRoleGroupList/AllPositionsAndRolesRoleGroupList";
import AllPositionsAndRolesRoleList from "./helper/components/AllPositionsAndRolesRoleList/AllPositionsAndRolesRoleList";
import "./_allPositionsAndRolesList.scss";

const AllPositionsAndRolesList = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">سمت و نقش</span>,
      },
      {
        title: "نقش‌ها",
      },
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    const statusFromUrl = params.status;
    if (statusFromUrl === "2") setActiveTab(2);
    else setActiveTab(1);
  }, [params.status]);

  //* ================================ Util Functions ================================
  const handleTabChange = (tab: 1 | 2) => {
    setActiveTab(tab);
    setSearchParams({ status: String(tab) });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="all-position-and-roles-list-container">
      <div className="all-position-and-roles-card-container">
        <DemandCard
          title="لیست نقش‌ها"
          badgeColor="transparent"
          badge={true}
          active={activeTab === 1}
          clickHandler={() => handleTabChange(1)}
        />
        <DemandCard
          title="لیست گروه نقش"
          badgeColor="transparent"
          badge={true}
          active={activeTab === 2}
          clickHandler={() => handleTabChange(2)}
        />
      </div>
      <div className="all-position-and-roles-content">
        {activeTab === 1 ? (
          <AllPositionsAndRolesRoleList />
        ) : (
          <AllPositionsAndRolesRoleGroupList activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};
export default AllPositionsAndRolesList;
