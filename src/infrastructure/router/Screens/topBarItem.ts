import { lazy } from "react";

import { TOP_BAR_PROFILE_PAGE_ROUTE } from "../routes/topBarItem";

const TopBarProfileItem = lazy(() => import("../../../pages/Auth/Profile/Profile"));

export const topBarScreens = [
  {
    component: TopBarProfileItem,
    path: TOP_BAR_PROFILE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
