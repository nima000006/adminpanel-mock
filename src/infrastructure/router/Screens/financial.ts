import { lazy } from "react";

import {
  FINANCIAL_BILLING_MAIN_PAGE_ROUTE,
  COMMITTEE_BILLING_DETAIL_PAGE_ROUTE,
  FINANCIAL_HOME_PAGE_ROUTE,
} from "../routes/financial";

const FinancialHome = lazy(
  () => import("../../../pages/Financial/FinancialMain/FinancialMain")
);
const BillingMain = lazy(
  () => import("../../../pages/Financial/Billing/BillingMain/BillingMain")
);
const BillingDetail = lazy(
  () => import("../../../pages/Financial/Billing/BillingDetail/BillingDetail")
);
export const FinancialScreens = [
  {
    component: FinancialHome,
    path: FINANCIAL_HOME_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: BillingMain,
    path: FINANCIAL_BILLING_MAIN_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: BillingDetail,
    path: COMMITTEE_BILLING_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
