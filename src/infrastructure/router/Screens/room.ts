import { lazy } from "react";

import {
  APARTMENT_CREATE_PAGE_ROUTE,
  BED_CREATE_PAGE_ROUTE,
  DORM_ALLOCATION_PAGE_ROUTE,
  DORM_CREATE_PAGE_ROUTE,
  DORM_DETAIL_PAGE_ROUTE,
  DORM_FACTOR_PAGE_ROUTE,
  DORM_HOME_PAGE_ROUTE,
  DORM_LEAVE_REQUEST_PAGE_ROUTE,
  DORM_PAYMENT_RECEIPT_PAGE_ROUTE,
  DORM_PAYMENT_RULES_DETAIL_PAGE_ROUTE,
  DORM_PAYMENT_RULES_PAGE_ROUTE,
  DORM_PRICING_BASIC_DETAIL_PAGE_ROUTE,
  DORM_PRICING_BASIC_PAGE_ROUTE,
  DORM_REQUESTS_PAGE_ROUTE,
  DORM_RESIDENTS_LIST_PAGE_ROUTE,
  DORM_SCORES_PAGE_ROUTE,
  DORM_SEMESTER_PAGE_ROUTE,
  DORM_STUDENT_INFO_PAGE_ROUTE,
  DORM_TIMING_BASIC_PAGE_ROUTE,
  DORM_TIMING_DETAIL_PAGE_ROUTE,
  FLOOR_CREATE_PAGE_ROUTE,
  ROOM_CREATE_PAGE_ROUTE,
} from "../routes/room";

const Dorm = lazy(() => import("../../../pages/Room/Dorm/Main/Dorm"));

const RoomDormRequests = lazy(
  () => import("../../../pages/Room/Requests/MainRequests/MainRequests")
);

const RoomAllocation = lazy(
  () => import("../../../pages/Room/Allocation/RoomAllocation")
);
const RoomScore = lazy(() => import("../../../pages/Room/Scores/RoomScore"));
const DormDetail = lazy(() => import("../../../pages/Room/Dorm/DormDetail/DormDetail"));
const PaymentRules = lazy(
  () => import("../../../pages/Room/Pricing/PaymentRules/PaymentRules")
);
const PaymentRulesDetail = lazy(
  () => import("../../../pages/Room/Pricing/PaymentRulesDetail/PaymentRulesDetail")
);
const PricingBasic = lazy(
  () => import("../../../pages/Room/Pricing/PricingBasic/PricingBasic")
);
const PricingBasicDetail = lazy(
  () => import("../../../pages/Room/Pricing/PricingBasicDetail/PricingBasicDetail")
);

const ListOfResidentsMain = lazy(
  () =>
    import("../../../pages/Room/ListOfResidents/ListOfResidentsMain/ListOfResidentsMain")
);

const RoomTimingBasic = lazy(
  () => import("../../../pages/Room/Timing/TimingBasic/RoomTimingBasic")
);
const RoomTimingDetail = lazy(
  () => import("../../../pages/Room/Timing/TimingDetail/RoomTimingDetail")
);
const DormSemester = lazy(
  () => import("../../../pages/Room/Timing/DormSemester/DormSemester")
);
const RoomPaymentReceipt = lazy(
  () => import("../../../pages/Room/Pricing/PaymentReceipt/PaymentReceipt")
);
const LeaveRequest = lazy(
  () => import("../../../pages/Room/Timing/LeaveRequest/LeaveRequest")
);
const StudentInfo = lazy(
  () => import("../../../pages/Room/Timing/StudentInfo/StudentInfo")
);

const RoomDormCreate = lazy(
  () => import("../../../pages/Room/Dorm/CreateDorm/CreateDorm")
);

const RoomCreate = lazy(() => import("../../../pages/Room/Dorm/CreateRoom/CreateRoom"));

const BedCreate = lazy(() => import("../../../pages/Room/Dorm/CreateBed/CreateBed"));

const FloorCreate = lazy(
  () => import("../../../pages/Room/Dorm/CreateFloor/CreateFloor")
);

const ApartmentCreate = lazy(
  () => import("../../../pages/Room/Dorm/CreateApartment/CreateApartment")
);
const DormFactor = lazy(() => import("../../../pages/Room/Dorm/DormFactors/DormFactors"));

export const DormScreens = [
  {
    component: Dorm,
    path: DORM_HOME_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoomDormRequests,
    path: DORM_REQUESTS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  // {
  //   component: RoomRequestsActive,
  //   path: DORM_REQUESTS_ACTIVE_PAGE_ROUTE,
  //   isBgContentCustom: false,
  // },
  // {
  //   component: RoomRequestsPending,
  //   path: DORM_REQUESTS_PENDING_PAGE_ROUTE,
  //   isBgContentCustom: false,
  // },
  // {
  //   component: RoomRequestsConfirmed,
  //   path: DORM_REQUESTS_CONFIRMED_PAGE_ROUTE,
  //   isBgContentCustom: false,
  // },
  // {
  //   component: RoomRequestsDelivered,
  //   path: DORM_REQUESTS_DELIVERED_PAGE_ROUTE,
  //   isBgContentCustom: false,
  // },
  // {
  //   component: RoomRequestsRejected,
  //   path: DORM_REQUESTS_REJECTED_PAGE_ROUTE,
  //   isBgContentCustom: false,
  // },
  {
    component: RoomScore,
    path: DORM_SCORES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ListOfResidentsMain,
    path: DORM_RESIDENTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormDetail,
    path: DORM_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: PaymentRules,
    path: DORM_PAYMENT_RULES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: PaymentRulesDetail,
    path: DORM_PAYMENT_RULES_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: PricingBasic,
    path: DORM_PRICING_BASIC_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: PricingBasicDetail,
    path: DORM_PRICING_BASIC_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoomAllocation,
    path: DORM_ALLOCATION_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: RoomTimingBasic,
    path: DORM_TIMING_BASIC_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoomTimingDetail,
    path: DORM_TIMING_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormSemester,
    path: DORM_SEMESTER_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoomPaymentReceipt,
    path: DORM_PAYMENT_RECEIPT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: LeaveRequest,
    path: DORM_LEAVE_REQUEST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: StudentInfo,
    path: DORM_STUDENT_INFO_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoomDormCreate,
    path: DORM_CREATE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: BedCreate,
    path: BED_CREATE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: FloorCreate,
    path: FLOOR_CREATE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: RoomCreate,
    path: ROOM_CREATE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormFactor,
    path: DORM_FACTOR_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ApartmentCreate,
    path: APARTMENT_CREATE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
