import { lazy } from "react";

import {
  INSURANCE_REQUESTS_DETAIL_PAGE_ROUTE,
  INSURANCE_REQUESTS_PAGE_ROUTE,
} from "../routes/insurance";

const Insurance = lazy(
  () =>
    import("../../../pages/Insurance/InsuranceRequests/InsuranceRequestsList/InsuranceRequestsList")
);
const InsuranceDetail = lazy(
  () =>
    import("../../../pages/Insurance/InsuranceRequests/InsuranceRequestsDetail/InsuranceRequestsDetail")
);

export const InsuranceScreens = [
  {
    component: Insurance,
    path: INSURANCE_REQUESTS_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: InsuranceDetail,
    path: INSURANCE_REQUESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
