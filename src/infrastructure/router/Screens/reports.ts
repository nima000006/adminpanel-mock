import { lazy } from "react";

import {
  REPORT_DORM_LIST,
  REPORT_DORM_LIST_DETAIL,
  REPORT_DORM_REQUESTS,
  REPORT_FINANCIAL_MAIN,
  REPORT_STUDENT_CARD,
  REPORT_FOOD_ALL_SELF_PAGE_ROUTE,
  REPORT_FOOD_MY_SELF_PAGE_ROUTE,
  MY_REPORT_PAGE_ROUTE,
  MY_REPORT_DETAIL_PAGE_ROUTE,
  REPORT_FOOD_ALL_SELF_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_MY_SELF_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_ALL_VENDOR_PAGE_ROUTE,
  REPORT_FOOD_MY_VENDOR_PAGE_ROUTE,
  REPORT_FOOD_ALL_VENDOR_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_MY_VENDOR_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_ALL_CONTRACTS_PAGE_ROUTE,
  REPORT_FOOD_MY_CONTRACTS_PAGE_ROUTE,
  REPORT_FOOD_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_MY_CONTRACTS_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_ALL_FOODS_PAGE_ROUTE,
  REPORT_FOOD_MY_FOODS_PAGE_ROUTE,
  REPORT_FOOD_ALL_FOODS_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_MY_FOODS_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_ALL_FOOD_SCHEDULE_PAGE_ROUTE,
  REPORT_FOOD_MY_FOOD_SCHEDULE_PAGE_ROUTE,
  REPORT_FOOD_ALL_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_MY_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE,
  REPORT_FOOD_ALL_RESERVATION_PAGE_ROUTE,
  REPORT_FOOD_MY_RESERVATION_PAGE_ROUTE,
  REPORT_FOOD_ORDER_DELIVERY_PAGE_ROUTE,
  REPORT_FOOD_RETURNED_MONEY_PAGE_ROUTE,
  REPORT_FOOD_MY_CANCELLED_PAGE_ROUTE,
  REPORT_FOOD_ALL_CANCELLED_PAGE_ROUTE,
  MY_REPORT_MY_DOCTOR_STATIC_PAGE_ROUTE,
  MY_REPORT_DORM_STATIC_PAGE_ROUTE,
  MY_REPORT_FOOD_STATIC_PAGE_ROUTE,
  MY_REPORT_TICKETING_STATIC_PAGE_ROUTE,
  REPORT_FINANCE_BUSINESS_OWNERS,
} from "../routes/reports";

const ReportDormList = lazy(
  () => import("../../../pages/Reports/dorms/DormsReportList/DormsReportList")
);
const ReportDormListDetail = lazy(
  () =>
    import("../../../components/Reports/Dorm/DormReportList/ListDetail/DormReportListDetail")
);
const ReportDormRequests = lazy(
  () =>
    import("../../../pages/Reports/dorms/DormsRequests/DormReportRequests/MainDormReportRequests/MainDormReportRequests")
);
const ReportStudentCardList = lazy(
  () =>
    import("../../../pages/Reports/student/StudentCardListReport/StudentCardListReport")
);
const ReportFinancialMain = lazy(
  () => import("../../../pages/Reports/financial/FinancialMain/FinancialMain")
);

const MyReports = lazy(
  () => import("../../../pages/Reports/myReport/MyReportList/MyReportList")
);

const MyDoctorStaticReport = lazy(
  () =>
    import("../../../pages/Reports/myReport/StaticReports/MyDoctor/MyDoctorStaticReport")
);
const DormStaticReport = lazy(
  () => import("../../../pages/Reports/myReport/StaticReports/Dorm/DormStaticReport")
);
const TicketingStaticReport = lazy(
  () =>
    import("../../../pages/Reports/myReport/StaticReports/Ticketing/TicketingStaticReport")
);

const MyReportDetail = lazy(
  () => import("../../../pages/Reports/myReport/MyReportDetail/MyReportDetail")
);

const ReportFoodMySelfList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportSelfs/FoodReportMySelfs/FoodReportMySelfList/FoodReportMySelfList")
);
const ReportFoodAllSelfList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportSelfs/FoodReportAllSelfs/FoodReportAllSelfList/FoodReportAllSelfList")
);

const ReportFoodMySelfDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportSelfs/FoodReportMySelfs/FoodReportMyDetailSelf/FoodReportMyDetailSelf")
);
const ReportFoodAllSelfDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportSelfs/FoodReportAllSelfs/FoodReportAllDetailSelf/FoodReportAllDetailSelf")
);
const ReportFoodMyVendorList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportVendors/FoodReportMyVendors/FoodReportMyVendorsList/FoodReportMyVendorsList")
);
const ReportFoodAllVendorList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportVendors/FoodReportAllVendors/FoodReportAllVendorList/FoodReportAllVendorList")
);

const ReportFoodMyVendorDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportVendors/FoodReportMyVendors/FoodReportMyVendorsDetail/FoodReportMyVendorsDetail")
);
const ReportFoodAllVendorDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportVendors/FoodReportAllVendors/FoodReportAllVendorDetail/FoodReportAllVendorDetail")
);
const ReportFoodMyContractsList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportContracts/FoodReportMyContracts/FoodReportMyContractsList/FoodReportMyContractsList")
);
const ReportFoodAllContractsList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportContracts/FoodReportAllContracts/FoodReportAllContractList/FoodReportAllContractList")
);

const ReportFoodMyContractsDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportContracts/FoodReportMyContracts/FoodReportMyContractDetail/FoodReportMyContractDetail")
);
const ReportFoodAllContractsDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportContracts/FoodReportAllContracts/FoodReportAllContractDetail/FoodReportAllContractDetail")
);

const ReportFoodMyFoodsList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportFoods/FoodReportMyFoods/FoodReportMyFoodsList/FoodReportMyFoodsList")
);
const ReportFoodAllFoodsList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportFoods/FoodReportAllFoods/FoodReportAllFoodsList/FoodReportAllFoodsList")
);

const ReportFoodMyFoodsDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportFoods/FoodReportMyFoods/FoodReportMyFoodsDetail/FoodReportMyFoodsDetail")
);
const ReportFoodAllFoodsDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportFoods/FoodReportAllFoods/FoodReportAllFoodsDetail/FoodReportAllFoodsDetail")
);
const ReportFoodMyFoodScheduleList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportFoodSchedules/FoodReportMyFoodSchedules/FoodReportMyFoodSchedulesList/FoodReportMyFoodSchedules")
);
const ReportFoodAllFoodScheduleList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportFoodSchedules/FoodReportAllFoodSchedules/FoodReportAllFoodScheduleList/FoodReportAllFoodSchedules")
);

const ReportFoodMyFoodScheduleDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportFoodSchedules/FoodReportMyFoodSchedules/FoodReportMyFoodSchedulesDetail/FoodReportMyFoodSchedulesDetail")
);
const ReportFoodAllFoodScheduleDetail = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportFoodSchedules/FoodReportAllFoodSchedules/FoodReportAllFoodScheduleDetail/FoodReportAllFoodScheduleDetail")
);

const ReportFoodMyReservationList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportReservation/MyReservation/MyReservationOrderResultList/MyReservationOrderResultList")
);
const ReportFoodAllReservationList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportReservation/AllReservation/AllReservationOrderResultList/AllReservationOrderResultList")
);
const ReportOrderDeliveryList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportReservation/OrderDelivery/OrderDelivery")
);
const ReportReturnedMoneyList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportReservation/ReturnedMoney/ReturnedMoney")
);
const ReportMyCancelledList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportReservation/MyCancelled/MyCancelled")
);
const ReportAllCancelledList = lazy(
  () =>
    import("../../../pages/Reports/foods/FoodReportReservation/AllCancelled/AllCancelled")
);

const FoodStaticReport = lazy(
  () => import("../../../pages/Reports/myReport/StaticReports/Food/FoodStaticReports")
);
const ReportFinanceBusinessOwners = lazy(
  () =>
    import("../../../pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/FinanceBusinessOwner")
);
export const ReportsScreens = [
  {
    component: ReportDormList,
    path: REPORT_DORM_LIST,
    isBgContentCustom: false,
  },
  {
    component: ReportDormListDetail,
    path: REPORT_DORM_LIST_DETAIL,
    isBgContentCustom: false,
  },
  {
    component: ReportDormRequests,
    path: REPORT_DORM_REQUESTS,
    isBgContentCustom: false,
  },
  {
    component: ReportFinancialMain,
    path: REPORT_FINANCIAL_MAIN,
    isBgContentCustom: false,
  },
  {
    component: ReportStudentCardList,
    path: REPORT_STUDENT_CARD,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMySelfList,
    path: REPORT_FOOD_MY_SELF_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllSelfList,
    path: REPORT_FOOD_ALL_SELF_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyReportDetail,
    path: MY_REPORT_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyReports,
    path: MY_REPORT_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyDoctorStaticReport,
    path: MY_REPORT_MY_DOCTOR_STATIC_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: DormStaticReport,
    path: MY_REPORT_DORM_STATIC_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: TicketingStaticReport,
    path: MY_REPORT_TICKETING_STATIC_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMySelfDetail,
    path: REPORT_FOOD_MY_SELF_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllSelfDetail,
    path: REPORT_FOOD_ALL_SELF_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyVendorList,
    path: REPORT_FOOD_MY_VENDOR_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllVendorList,
    path: REPORT_FOOD_ALL_VENDOR_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyVendorDetail,
    path: REPORT_FOOD_MY_VENDOR_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllVendorDetail,
    path: REPORT_FOOD_ALL_VENDOR_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyContractsList,
    path: REPORT_FOOD_MY_CONTRACTS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllContractsList,
    path: REPORT_FOOD_ALL_CONTRACTS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyContractsDetail,
    path: REPORT_FOOD_MY_CONTRACTS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllContractsDetail,
    path: REPORT_FOOD_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyFoodsList,
    path: REPORT_FOOD_MY_FOODS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllFoodsList,
    path: REPORT_FOOD_ALL_FOODS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyFoodsDetail,
    path: REPORT_FOOD_MY_FOODS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllFoodsDetail,
    path: REPORT_FOOD_ALL_FOODS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyFoodScheduleList,
    path: REPORT_FOOD_MY_FOOD_SCHEDULE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllFoodScheduleList,
    path: REPORT_FOOD_ALL_FOOD_SCHEDULE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyFoodScheduleDetail,
    path: REPORT_FOOD_MY_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllFoodScheduleDetail,
    path: REPORT_FOOD_ALL_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodMyReservationList,
    path: REPORT_FOOD_MY_RESERVATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFoodAllReservationList,
    path: REPORT_FOOD_ALL_RESERVATION_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportOrderDeliveryList,
    path: REPORT_FOOD_ORDER_DELIVERY_PAGE_ROUTE,
    isBgContentCustom: false,
  },

  {
    component: ReportReturnedMoneyList,
    path: REPORT_FOOD_RETURNED_MONEY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportMyCancelledList,
    path: REPORT_FOOD_MY_CANCELLED_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportAllCancelledList,
    path: REPORT_FOOD_ALL_CANCELLED_PAGE_ROUTE,
    isBgContentCustom: false,
  },

  {
    component: FoodStaticReport,
    path: MY_REPORT_FOOD_STATIC_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: ReportFinanceBusinessOwners,
    path: REPORT_FINANCE_BUSINESS_OWNERS,
    isBgContentCustom: false,
  },
];
