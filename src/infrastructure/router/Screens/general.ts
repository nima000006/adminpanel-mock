import { lazy } from "react";

import { LANDING_PAGE_ROUTE } from "../routes/general";

const Home = lazy(() => import("../../../pages/home/Home"));

export const GeneralScreens = [
  {
    component: Home,
    path: LANDING_PAGE_ROUTE,
    isBgContentCustom: true,
  },
];

// auth-register
// auth-signin
// auth-forget-password
// auth-change-number
