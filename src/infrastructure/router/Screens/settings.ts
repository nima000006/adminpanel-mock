import { lazy } from "react";

import {
  BUSINESS_BANNER_MANAGEMENT_PAGE_ROUTE,
  BUSINESS_FAQ_MANAGEMENT_PAGE_ROUTE,
  BUSINESS_SERVICE_MANAGEMENT_PAGE_ROUTE,
} from "../routes/settings";

const BusinessServiceManagement = lazy(
  () => import("../../../pages/Settings/ServiceManagement/ServiceManagement")
);
const BusinessBannerManagement = lazy(
  () => import("../../../pages/Settings/BannerManagement/BannerManagement")
);
const BusinessFaqManagement = lazy(
  () => import("../../../pages/Settings/FaqManagement/FaqManagement")
);

export const SettingScreens = [
  {
    component: BusinessServiceManagement,
    path: BUSINESS_SERVICE_MANAGEMENT_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: BusinessBannerManagement,
    path: BUSINESS_BANNER_MANAGEMENT_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: BusinessFaqManagement,
    path: BUSINESS_FAQ_MANAGEMENT_PAGE_ROUTE,
    isBgContentCustom: true,
  },
];
