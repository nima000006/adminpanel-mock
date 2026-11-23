import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  MANAGEMENT_MY_ADMINS_LIST_PAGE_ROUTE,
  MANAGEMENT_CUSTOMERS_MY_LIST_PAGE_ROUTE,
  MANAGEMENT_MY_STUDENTS_LIST_PAGE_ROUTE,
  MANAGEMENT_MY_EMPLOYEES_LIST_PAGE_ROUTE,
} from "@infra/router/routes/management";

import ManagementMyDetailsInfo from "./helper/components/ManagementMyDetailsInfo/ManagementMyDetailsInfo";
import ManagementMyDetailsRolesUserInfo from "./helper/components/ManagementMyDetailsRolesUserInfo/ManagementMyDetailsRolesUserInfo";
import ManagementUserMyManagementDetailsInfo from "./helper/components/ManagementUserMyManagementDetailsInfo/ManagementUserMyManagementDetailsInfo";

import "./_managementMyDetails.scss";

export default function ManagementMyDetails() {
  const { params } = useQueryParams();

  // ================================ Dynamic Breadcrumb ================================
  const isMyStudents = params?.from === "myStudents";
  const isMyEmployees = params?.from === "myEmployees";
  const isMyAdmins = params?.from === "myAdmins";

  const sectionTitle = isMyStudents
    ? "دانشجویان من"
    : isMyEmployees
      ? "کارمندان من"
      : isMyAdmins
        ? "ادمین های من"
        : "کاربران من";

  const sectionRoute = isMyStudents
    ? MANAGEMENT_MY_STUDENTS_LIST_PAGE_ROUTE
    : isMyEmployees
      ? MANAGEMENT_MY_EMPLOYEES_LIST_PAGE_ROUTE
      : isMyAdmins
        ? MANAGEMENT_MY_ADMINS_LIST_PAGE_ROUTE
        : MANAGEMENT_CUSTOMERS_MY_LIST_PAGE_ROUTE;

  // ================================ Breadcrumb ================================
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="management-breadcrumb-title">افراد</span>,
      },
      {
        title: (
          <Link to={sectionRoute} className="management-breadcrumb-title">
            {sectionTitle}
          </Link>
        ),
      },
      {
        title: "مشاهده جزئیات",
      },
    ],
  });

  // ================================ components ================================
  const tabsItems = [
    {
      label: <>اطلاعات کاربر</>,
      children: <ManagementMyDetailsInfo />,
      key: "1",
    },
    {
      label: <>مدیریت کاربر</>,
      children: <ManagementUserMyManagementDetailsInfo />,
      key: "2",
    },
    {
      label: <>نقش‌های کاربر</>,
      children: <ManagementMyDetailsRolesUserInfo />,
      key: "3",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs items={tabsItems} type="card" className="management-my-detail-container" />
  );
}
