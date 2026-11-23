import { useEffect, useState } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import MyPositionsAndRolesRoleGroupList from "./helper/components/MyPositionsAndRolesRoleGroupList/MyPositionsAndRolesRoleGroupList";
import MyPositionsAndRolesRoleList from "./helper/components/MyPositionsAndRolesRoleList/MyPositionsAndRolesRoleList";
import "./_myPositionsAndRolesList.scss";

const MyPositionsAndRolesList = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">سمت و نقش</span>,
      },
      {
        title: "نقش های من",
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
    <div className="my-position-and-roles-list-container">
      <div className="my-position-and-roles-card-container">
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
      <div className="my-position-and-roles-content">
        {activeTab === 1 ? (
          <MyPositionsAndRolesRoleList />
        ) : (
          <MyPositionsAndRolesRoleGroupList activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};
export default MyPositionsAndRolesList;
