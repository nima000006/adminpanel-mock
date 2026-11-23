import { lazy } from "react";

import {
  NOTIFICATION_PRODUCT_SELECTOR_PAGE_ROUTE,
  NOTIFICATION_UNIVERSITY_SELECTOR_PAGE_ROUTE,
} from "../routes/notification";

const NotificationProductSelector = lazy(
  () =>
    import("../../../pages/Notification/NotificationProductSelector/NotificationProductSelector")
);
const NotificationUniversitySelector = lazy(
  () =>
    import("../../../pages/Notification/NotificationUniversitySelector/NotificationUniversitySelector")
);

export const NotificationScreens = [
  {
    component: NotificationProductSelector,
    path: NOTIFICATION_PRODUCT_SELECTOR_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: NotificationUniversitySelector,
    path: NOTIFICATION_UNIVERSITY_SELECTOR_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
