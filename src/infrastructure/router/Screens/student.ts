import { lazy } from "react";

import { STUDENT_PAGE_ROUTE } from "../routes/student";

const StudentHome = lazy(() => import("../../../pages/student/StudentHome"));

export const StudentScreens = [
  {
    component: StudentHome,
    path: STUDENT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
