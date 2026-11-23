import { lazy } from "react";

import {
  MY_DOCTOR_ALL_TESTS_LIST_PAGE_ROUTE,
  MY_DOCTOR_MY_TESTS_LIST_PAGE_ROUTE,
  MY_DOCTOR_ALL_TESTS_DETAIL_PAGE_ROUTE,
  MY_DOCTOR_MY_TESTS_DETAIL_PAGE_ROUTE,
  MY_DOCTOR_GENETICS_LABS_LIST_PAGE_ROUTE,
  MY_DOCTOR_GENETIC_PARTICIPATES_LIST_PAGE_ROUTE,
  MY_DOCTOR_GENETIC_REQUESTS_LIST_PAGE_ROUTE,
  MY_DOCTOR_GENETIC_PARTICIPATES_DETAIL_PAGE_ROUTE,
} from "../routes/myDoctor";

const MyTestList = lazy(
  () => import("../../../pages/MyDoctor/Tests/TestsList/MyTestList/TestsList")
);
const AllTestList = lazy(
  () => import("../../../pages/MyDoctor/Tests/TestsList/AllTestList/TestsList")
);
const AllTestDetail = lazy(
  () => import("../../../pages/MyDoctor/Tests/TestDetail/AllTestDetail/AllTestDetail")
);
const MyTestDetail = lazy(
  () => import("../../../pages/MyDoctor/Tests/TestDetail/MyTestDetail/MyTestDetail")
);
const LabsList = lazy(
  () => import("../../../pages/MyDoctor/Genetics/Labs/LabsList/LabsList")
);
const GeneticsParticipantsList = lazy(
  () =>
    import("../../../pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsList/GeneticsParticipantsList")
);

const GeneticsParticipantsDetail = lazy(
  () =>
    import("../../../pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/GeneticsParticipantsDetail")
);

const GeneticsRequestsLists = lazy(
  () =>
    import("../../../pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/GeneticsRequestsList")
);

export const MyDoctorScreens = [
  {
    component: MyTestList,
    path: MY_DOCTOR_MY_TESTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllTestList,
    path: MY_DOCTOR_ALL_TESTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllTestDetail,
    path: MY_DOCTOR_ALL_TESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyTestDetail,
    path: MY_DOCTOR_MY_TESTS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: LabsList,
    path: MY_DOCTOR_GENETICS_LABS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: GeneticsParticipantsList,
    path: MY_DOCTOR_GENETIC_PARTICIPATES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: GeneticsParticipantsDetail,
    path: MY_DOCTOR_GENETIC_PARTICIPATES_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: GeneticsRequestsLists,
    path: MY_DOCTOR_GENETIC_REQUESTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
