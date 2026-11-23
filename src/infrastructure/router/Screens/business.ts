import { lazy } from "react";

import {
  BUSINESS_BASE_PAGE_ROUTE,
  BUSINESS_HOME_PAGE_ROUTE,
  BUSINESS_LIST_PAGE_ROUTE,
  BUSINESS_STRUCTURE_PAGE_ROUTE,
  BUSINESS_UNIVERSITY_SEARCH_PAGE_ROUTE,
  BUSINESS_USERS_LIST_PAGE_ROUTE,
  MANAGEMENT_MY_USERS_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_DETAILS_PAGE_ROUTE,
  MANAGEMENT_REQUESTS_PAGE_ROUTE,
} from "../routes/business";

const Business = lazy(() => import("../../../pages/Business/Main/BusinessMain"));
const BusinessBase = lazy(() => import("../../../pages/Business/Base/BusinessBase"));
const BusinessStructure = lazy(
  () => import("../../../pages/Business/Structure/BusinessStructure")
);
const BusinessList = lazy(() => import("../../../pages/Business/List/BusinessList"));
const BusinessUsersList = lazy(
  () => import("../../../pages/Business/UsersList/UsersList")
);
const BusinessUniversitySearch = lazy(
  () => import("../../../pages/Business/UsersList/SearchMode/SearchMode")
);
const ManageMyUsers = lazy(() => import("../../../pages/Business/MyUsers/MyUsers"));
const ManageRequests = lazy(
  () =>
    import("../../../pages/Business/BusinessRequests/BusinessRequestsList/BusinessRequests")
);
const ManageRequestsDetails = lazy(
  () =>
    import("../../../pages/Business/BusinessRequests/BusinessRequestsDetail/BusinessRequestsDetail")
);

export const BusinessScreens = [
  {
    component: Business,
    path: BUSINESS_HOME_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: BusinessBase,
    path: BUSINESS_BASE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: BusinessStructure,
    path: BUSINESS_STRUCTURE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: BusinessList,
    path: BUSINESS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: BusinessUsersList,
    path: BUSINESS_USERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: BusinessUniversitySearch,
    path: BUSINESS_UNIVERSITY_SEARCH_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ManageMyUsers,
    path: MANAGEMENT_MY_USERS_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ManageRequests,
    path: MANAGEMENT_REQUESTS_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ManageRequestsDetails,
    path: MANAGEMENT_REQUESTS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: true,
  },
];
