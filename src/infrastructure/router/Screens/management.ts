import { lazy } from "react";

import {
  MANAGEMENT_MY_ADMINS_LIST_PAGE_ROUTE,
  MANAGEMENT_ALL_ADMINS_LIST_PAGE_ROUTE,
  MANAGEMENT_ALL_EMPLOYEES_LIST_PAGE_ROUTE,
  MANAGEMENT_MY_EMPLOYEES_LIST_PAGE_ROUTE,
  MANAGEMENT_CUSTOMERS_ALL_LIST_PAGE_ROUTE,
  MANAGEMENT_CUSTOMERS_MY_LIST_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_ROLE_REQUEST_DETAIL_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_ESTELAM_SAJED_LIST_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_ESTELAM_SAJED_DETAIL_PAGE_ROUTE,
  MANAGEMENT_ALL_POSITIONS_AND_ROLES_ROLES_LIST_PAGE_ROUTE,
  MANAGEMENT_MY_POSITIONS_AND_ROLES_ROLES_LIST_PAGE_ROUTE,
  MANAGEMENT_ALL_POSITIONS_AND_ROLES_ROLES_DETAIL_PAGE_ROUTE,
  MANAGEMENT_MY_POSITIONS_AND_ROLES_ROLES_DETAIL_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_ALL_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_ALL_ESTELAM_AMOZESHYAR_DETAIL_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_MY_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_MY_ESTELAM_AMOZESHYAR_DETAIL_PAGE_ROUTE,
  MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
  MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
  MANAGEMENT_ALL_STUDENTS_LIST_PAGE_ROUTE,
  MANAGEMENT_MY_STUDENTS_LIST_PAGE_ROUTE,
  MANAGEMENT_MY_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE,
  MANAGEMENT_MY_REQUESTS_ROLE_REQUEST_DETAIL_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_MY_ESTELAM_SAJED_DETAIL_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_MY_ESTELAM_SAJED_LIST_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_DETAIL_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_MY_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_MY_FOREIGN_NATIONALS_REGISTRATION_DETAIL_PAGE_ROUTE,
} from "../routes/management";

const AllCustomers = lazy(
  () =>
    import("../../../pages/management/CustomersList/AllCustomersList/AllCustomersList")
);
const MyCustomers = lazy(
  () => import("../../../pages/management/CustomersList/MyCustomerList/MyCustomersList")
);
const CustomersAllDetail = lazy(
  () =>
    import("../../../pages/management/_shared/UserDetails/ManagementAllInfoDetails/ManagementAllInfoDetails")
);
const CustomersMyDetail = lazy(
  () =>
    import("../../../pages/management/_shared/UserDetails/ManagementMyInfoDetails/ManagementMyDetails")
);
const AllStudentsList = lazy(
  () => import("../../../pages/management/StudentList/AllStudentList/AllStudentsList")
);
const MyStudentsList = lazy(
  () => import("../../../pages/management/StudentList/MyStudentList/MyStudentsList")
);
const AllEmployees = lazy(
  () =>
    import("../../../pages/management/EmployeesList/AllEmployeesList/AllEmployeesList")
);
const MyEmployees = lazy(
  () => import("../../../pages/management/EmployeesList/MyEmployeesList/MyEmployeesList")
);
const AllAdmins = lazy(
  () => import("../../../pages/management/AdminsList/AllAdminsList/AllAdminsList")
);
const MyAdmins = lazy(
  () => import("../../../pages/management/AdminsList/MyAdminsList/MyAdminsList")
);
const RoleRequestList = lazy(
  () =>
    import("../../../pages/management/Requests/RoleRequest/AllRoleRequest/AllRoleRequestList/AllRoleRequestList")
);
const RoleRequestDetail = lazy(
  () =>
    import("../../../pages/management/Requests/RoleRequest/AllRoleRequest/AllRoleRequestDetail/AllRoleRequestDetail")
);
const RoleMyRequestList = lazy(
  () =>
    import("../../../pages/management/Requests/RoleRequest/MyRoleRequest/MyRoleRequestList/MyRoleRequestList")
);
const RoleMyRequestDetail = lazy(
  () =>
    import("../../../pages/management/Requests/RoleRequest/MyRoleRequest/MyRoleRequestDetail/MyRoleRequestDetail")
);
const AllEstelamAmozeshyarList = lazy(
  () =>
    import("../../../pages/management/Requests/EstelamAmozeshyar/AllEstelamAmozeshyar/AllEstelamAmozeshyarList/AllEstelamAmozeshyarList")
);
const AllEstelamAmozeshyarDetail = lazy(
  () =>
    import("../../../pages/management/Requests/EstelamAmozeshyar/AllEstelamAmozeshyar/AllEstelamAmozeshyarDetail/AllEstelamAmozeshyarDetail")
);
const MyEstelamAmozeshyarList = lazy(
  () =>
    import("../../../pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarList/MyEstelamAmozeshyarList")
);
const MyEstelamAmozeshyarDetail = lazy(
  () =>
    import("../../../pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/MyEstelamAmozeshyarDetail")
);
const EstelamSajedList = lazy(
  () =>
    import("../../../pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/EstelamSajedList")
);
const EstelamSajedDetail = lazy(
  () =>
    import("../../../pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/EstelamSajedDetail")
);
const MyEstelamSajedList = lazy(
  () =>
    import("../../../pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedList/MyEstelamSajedList")
);
const MyEstelamSajedDetail = lazy(
  () =>
    import("../../../pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/MyEstelamSajedDetail")
);
const AllPositionAndRolesRoleList = lazy(
  () =>
    import("../../../pages/management/PositionsAndRoles/AllPositionsAndRolesList/AllPositionsAndRolesList")
);
const AllPositionAndRolesRoleDetail = lazy(
  () =>
    import("../../../pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleDetail/AllPositionsAndRolesRoleDetail")
);
const MyPositionAndRolesRoleList = lazy(
  () =>
    import("../../../pages/management/PositionsAndRoles/MyPositionsAndRolesList/MyPositionsAndRolesList")
);
const MyPositionAndRolesRoleDetail = lazy(
  () =>
    import("../../../pages/management/PositionsAndRoles/MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleDetail/MyPositionsAndRolesRoleDetail")
);
const AllForeignNationalsRegistrationList = lazy(
  () =>
    import("../../../pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/AllForeignNationalsRegistrationList")
);
const AllForeignNationalsRegistrationDetail = lazy(
  () =>
    import("../../../pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/AllForeignNationalsRegistrationDetail")
);
const MyForeignNationalsRegistrationList = lazy(
  () =>
    import("../../../pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationList/MyForeignNationalsRegistrationList")
);
const MyForeignNationalsRegistrationDetail = lazy(
  () =>
    import("../../../pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/MyForeignNationalsRegistrationDetail")
);

export const ManagementScreens = [
  {
    component: AllCustomers,
    path: MANAGEMENT_CUSTOMERS_ALL_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyCustomers,
    path: MANAGEMENT_CUSTOMERS_MY_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CustomersAllDetail,
    path: MANAGEMENT_ALL_DETAIL_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CustomersMyDetail,
    path: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: AllStudentsList,
    path: MANAGEMENT_ALL_STUDENTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyStudentsList,
    path: MANAGEMENT_MY_STUDENTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllEmployees,
    path: MANAGEMENT_ALL_EMPLOYEES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyEmployees,
    path: MANAGEMENT_MY_EMPLOYEES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllAdmins,
    path: MANAGEMENT_ALL_ADMINS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyAdmins,
    path: MANAGEMENT_MY_ADMINS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoleRequestList,
    path: MANAGEMENT_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoleRequestDetail,
    path: MANAGEMENT_REQUESTS_ROLE_REQUEST_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoleMyRequestList,
    path: MANAGEMENT_MY_REQUESTS_ROLE_REQUEST_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoleMyRequestDetail,
    path: MANAGEMENT_MY_REQUESTS_ROLE_REQUEST_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllEstelamAmozeshyarList,
    path: MANAGEMENT_REQUESTS_ALL_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllEstelamAmozeshyarDetail,
    path: MANAGEMENT_REQUESTS_ALL_ESTELAM_AMOZESHYAR_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyEstelamAmozeshyarList,
    path: MANAGEMENT_REQUESTS_MY_ESTELAM_AMOZESHYAR_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyEstelamAmozeshyarDetail,
    path: MANAGEMENT_REQUESTS_MY_ESTELAM_AMOZESHYAR_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: EstelamSajedList,
    path: MANAGEMENT_REQUESTS_ESTELAM_SAJED_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyEstelamSajedDetail,
    path: MANAGEMENT_REQUESTS_MY_ESTELAM_SAJED_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyEstelamSajedList,
    path: MANAGEMENT_REQUESTS_MY_ESTELAM_SAJED_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: EstelamSajedDetail,
    path: MANAGEMENT_REQUESTS_ESTELAM_SAJED_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllPositionAndRolesRoleList,
    path: MANAGEMENT_ALL_POSITIONS_AND_ROLES_ROLES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllPositionAndRolesRoleDetail,
    path: MANAGEMENT_ALL_POSITIONS_AND_ROLES_ROLES_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyPositionAndRolesRoleList,
    path: MANAGEMENT_MY_POSITIONS_AND_ROLES_ROLES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyPositionAndRolesRoleDetail,
    path: MANAGEMENT_MY_POSITIONS_AND_ROLES_ROLES_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllForeignNationalsRegistrationList,
    path: MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllForeignNationalsRegistrationDetail,
    path: MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyForeignNationalsRegistrationList,
    path: MANAGEMENT_REQUESTS_MY_FOREIGN_NATIONALS_REGISTRATION_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyForeignNationalsRegistrationDetail,
    path: MANAGEMENT_REQUESTS_MY_FOREIGN_NATIONALS_REGISTRATION_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
