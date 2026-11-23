import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  MANAGEMENT_CUSTOMERS_ALL_LIST_PAGE_ROUTE,
  MANAGEMENT_ALL_STUDENTS_LIST_PAGE_ROUTE,
  MANAGEMENT_ALL_EMPLOYEES_LIST_PAGE_ROUTE,
  MANAGEMENT_ALL_ADMINS_LIST_PAGE_ROUTE,
} from "@infra/router/routes/management";

import ManagementUserAllDetailsInfo from "./helper/components/ManagementAllDetailsInfo/ManagementUserAllDetailsInfo";
import ManagementAllDetailsRolesUserInfo from "./helper/components/ManagementAllDetailsRolesUserInfo/ManagementAllDetailsRolesUserInfo";
import ManagementUserAllManagementDetailsInfo from "./helper/components/ManagementUserAllManagementDetailsInfo/ManagementUserAllManagementDetailsInfo";
import "./_managementAllInfoDetails.scss";

export default function ManagementAllInfoDetails() {
  const { params } = useQueryParams();

  // ================================ Dynamic Breadcrumb ================================
  const isAllStudents = params?.from === "allStudents";
  const isAllEmployees = params?.from === "allEmployees";
  const isAllAdmins = params?.from === "allAdmins";

  const sectionTitle = isAllStudents
    ? "دانشجویان "
    : isAllEmployees
      ? "کارمندان"
      : isAllAdmins
        ? "ادمین ها"
        : "کاربران";

  const sectionRoute = isAllStudents
    ? MANAGEMENT_ALL_STUDENTS_LIST_PAGE_ROUTE
    : isAllEmployees
      ? MANAGEMENT_ALL_EMPLOYEES_LIST_PAGE_ROUTE
      : isAllAdmins
        ? MANAGEMENT_ALL_ADMINS_LIST_PAGE_ROUTE
        : MANAGEMENT_CUSTOMERS_ALL_LIST_PAGE_ROUTE;

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

  // ================================ Components ================================
  const tabsItems = [
    {
      label: <>اطلاعات کاربر</>,
      children: <ManagementUserAllDetailsInfo />,
      key: "1",
    },
    {
      label: <>مدیریت کاربر</>,
      children: <ManagementUserAllManagementDetailsInfo />,
      key: "2",
    },
    {
      label: <>نقش‌های کاربر</>,
      children: <ManagementAllDetailsRolesUserInfo />,
      key: "3",
    },
  ];

  // ================================ Main TSX ================================
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="management-users-all-detail-container"
    />
  );
}
