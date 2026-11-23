import { lazy } from "react";

import {
  CREATE_BUSINESS_PAGE_ROUTE,
  CREATE_BUSINESS_WITH_FIFTH_STEP_PAGE_ROUTE,
  MODIFY_BUSINESS_DETAIL_PAGE_ROUTE,
  MODIFY_BUSINESS_LIST_PAGE_ROUTE,
} from "../routes/organization";

const BusinessList = lazy(
  () => import("../../../pages/Organization/Business/BusinessList/BusinessList")
);
const CreateBusiness = lazy(
  () =>
    import("../../../pages/Organization/Business/CreateBusiness/CreateBusiness/CreateBusiness")
);
const CreateBusinessWithFifthStep = lazy(
  () =>
    import("../../../pages/Organization/Business/CreateBusiness/CreateBusinessWithFifthStep/CreateBusinessWithFifthStep")
);
const BusinessDetail = lazy(
  () => import("../../../pages/Organization/Business/BusinessDetail/BusinessDetail")
);

export const ModifyBusinessScreens = [
  {
    component: BusinessList,
    path: MODIFY_BUSINESS_LIST_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CreateBusiness,
    path: CREATE_BUSINESS_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: CreateBusinessWithFifthStep,
    path: CREATE_BUSINESS_WITH_FIFTH_STEP_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: BusinessDetail,
    path: MODIFY_BUSINESS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: true,
  },
];
