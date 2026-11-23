import { lazy } from "react";

import {
  CATERING_ALL_SELF_DETAILS_PAGE_ROUTE,
  CATERING_ALL_VENDOR_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_ALL_VENDOR_LIST_PAGE_ROUTE,
  CATERING_ALL_VENDOR_DETAILS_PAGE_ROUTE,
  CATERING_BASE_INFO_DETAILS_ARCHIVES_PAGE_ROUTE,
  CATERING_BASE_INFO_DETAILS_PAGE_ROUTE,
  CATERING_BASE_LIST_PAGE_ROUTE,
  CATERING_CONTRACTS_REQUESTS_LIST_PAGE_ROUTE,
  CATERING_MY_CONTRACTS_REQUESTS_LIST_PAGE_ROUTE,
  CATERING_MY_VENDOR_DETAILS_PAGE_ROUTE,
  CATERING_MY_SELF_ARCHIVES_LIST_PAGE_ROUTE,
  CATERING_MY_SELF_DETAILS_PAGE_ROUTE,
  CATERING_MY_SELF_LIST_PAGE_ROUTE,
  CATERING_MY_VENDOR_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_MY_VENDOR_LIST_PAGE_ROUTE,
  CATERING_SELF_ARCHIVES_LIST_PAGE_ROUTE,
  CATERING_SELF_LIST_PAGE_ROUTE,
  CATERING_ALL_FOOD_LIST_PAGE_ROUTE,
  CATERING_MY_FOOD_LIST_PAGE_ROUTE,
  CATERING_MY_FOOD_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_ALL_FOOD_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_MY_FOOD_DETAILS_PAGE_ROUTE,
  CATERING_ALL_FOOD_DETAILS_PAGE_ROUTE,
  CATERING_MY_CONTRACTS_DETAILS_PAGE_ROUTE,
  CATERING_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
  CATERING_MY_CONTRACTS_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_ALL_CONTRACTS_ARCHIEVE_LIST_PAGE_ROUTE,
  CATERING_ALL_CONTRACTS_LIST_PAGE_ROUTE,
  CATERING_MY_CONTRACTS_LIST_PAGE_ROUTE,
  CATERING_ALL_FOOD_SIDE_DISHES_PAGE_ROUTE,
  CATERING_MY_FOOD_SIDE_DISHES_PAGE_ROUTE,
  CATERING_ALL_FOOD_SIDE_DISHES_ARCHIVE_PAGE_ROUTE,
  CATERING_MY_FOOD_SIDE_DISHES_ARCHIVE_PAGE_ROUTE,
  CATERING_ALL_CANCELLED_ORDERS_LIST_PAGE_ROUTE,
  CATERING_MY_CANCELLED_ORDERS_LIST_PAGE_ROUTE,
  CATERING_MY_VENDOR_ORDERS_LIST_PAGE_ROUTE,
  CATERING_ALL_VENDOR_ORDERS_LIST_PAGE_ROUTE,
  CATERING_ALL_FOOD_SCHEDULES_LIST_PAGE_ROUTE,
  CATERING_MY_FOOD_SCHEDULES_LIST_PAGE_ROUTE,
  CATERING_ALL_FOOD_SCHEDULES_ADD_PAGE_ROUTE,
  CATERING_MY_FOOD_SCHEDULES_ADD_PAGE_ROUTE,
} from "@infra/router/routes/catering";

const cateringBaseList = lazy(
  () =>
    import("../../../pages/Catering/BasicInfo/CateringBasicInfoLists/CateringBasicInfoLists")
);
const cateringBaseInfoDetails = lazy(
  () =>
    import("../../../pages/Catering/BasicInfo/CateringBaseInfoDetails/CateringBaseInfoDetails")
);
const cateringBaseInfoDetailsArchives = lazy(
  () =>
    import("../../../pages/Catering/BasicInfo/CateringBaseInfoDetailsArchives/CateringBaseInfoDetailsArchives")
);
const cateringSelfList = lazy(
  () => import("../../../pages/Catering/Selfs/AllSelfs/AllSelfList/AllSelfList")
);
const cateringSelfArchivesList = lazy(
  () => import("../../../pages/Catering/Selfs/AllSelfs/AllArchieveList/AllArchieveList")
);
const cateringMySelfList = lazy(
  () => import("../../../pages/Catering/Selfs/MySelfs/MySelfsList/MySelfsList")
);
const cateringMySelfArchivesList = lazy(
  () => import("../../../pages/Catering/Selfs/MySelfs/MyArchieveList/MyArchieveList")
);
const cateringAllSelfDetails = lazy(
  () => import("../../../pages/Catering/Selfs/AllSelfs/AllSelfDetail/AllSelfDetail")
);
const cateringMySelfDetails = lazy(
  () => import("../../../pages/Catering/Selfs/MySelfs/MySelfDetail/MySelfDetail")
);
const cateringContractsRequestsList = lazy(
  () =>
    import("../../../pages/Catering/contracts/Requests/RequestsContractsList/RequestsContractsList")
);
const cateringMyContractsRequestsList = lazy(
  () =>
    import("../../../pages/Catering/contracts/Requests/RequestMyContractsList/RequestMyContractsList")
);
const cateringAllVendorList = lazy(
  () =>
    import("../../../pages/Catering/Vendors/AllVendors/CateringAllVendorList/CateringAllVendorList")
);
const cateringMyVendorList = lazy(
  () =>
    import("../../../pages/Catering/Vendors/MyVendors/CateringMyVendorList/CateringMyVendorList")
);
const cateringAllArchieveVendorList = lazy(
  () =>
    import("../../../pages/Catering/Vendors/AllVendors/CateringAllArchieveVendorList/CateringAllArchieveVendorList")
);
const cateringMyArchieveVendorList = lazy(
  () =>
    import("../../../pages/Catering/Vendors/MyVendors/CateringMyArchieveVendorList/CateringMyArchieveVendorList")
);
const cateringAllVendorDetails = lazy(
  () =>
    import("../../../pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/CateringAllVendorDetail")
);
const cateringMyVendorDetails = lazy(
  () =>
    import("../../../pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/CateringMyVendorDetail")
);
const cateringAllFoodList = lazy(
  () =>
    import("../../../pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/CateringAllFoodList")
);
const cateringMyFoodList = lazy(
  () =>
    import("../../../pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/CateringMyFoodList")
);
const cateringAllFoodArchieveList = lazy(
  () =>
    import("../../../pages/Catering/Foods/CateringAllFoods/CateringAllFoodArchieveList/CateringAllFoodArchieveList")
);
const cateringMyFoodArchieveList = lazy(
  () =>
    import("../../../pages/Catering/Foods/CateringMyFoods/CateringMyFoodArchieveList/CateringMyFoodArchieveList")
);
const cateringAllFoodDetails = lazy(
  () =>
    import("../../../pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/CateringAllFoodDetail")
);
const cateringMyFoodDetails = lazy(
  () =>
    import("../../../pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/CateringMyFoodDetail")
);
const CateringAllContractsList = lazy(
  () =>
    import("../../../pages/Catering/contracts/Contracts/AllContracts/AllContractsList/AllContractsList")
);
const CateringMyContractsList = lazy(
  () =>
    import("../../../pages/Catering/contracts/Contracts/MyContracts/MyContractsList/MyContractsList")
);
const CateringAllContractsArchieveList = lazy(
  () =>
    import("../../../pages/Catering/contracts/Contracts/AllContracts/AllContractsArchieveList/AllContractsArchieveList")
);
const CateringMyContractsArchieveList = lazy(
  () =>
    import("../../../pages/Catering/contracts/Contracts/MyContracts/MyContractsArchieveList/MyContractsArchieveList")
);
const CateringAllContractsDetails = lazy(
  () =>
    import("../../../pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/AllContractsDetail")
);
const CateringMyContractsDetails = lazy(
  () =>
    import("../../../pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/MyContractsDetail")
);
const cateringAllFoodSideDishes = lazy(
  () =>
    import("../../../pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/CateringAllFoodSideDishesList")
);
const cateringMyFoodSideDishes = lazy(
  () =>
    import("../../../pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesList/CateringMyFoodSideDishesList")
);
const cateringAllFoodSideDishesArchive = lazy(
  () =>
    import("../../../pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesArchive/CateringAllFoodSideDishesArchive")
);
const cateringMyFoodSideDishesArchive = lazy(
  () =>
    import("../../../pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesArchive/CateringMyFoodSideDishesArchive")
);
const cateringAllCancelledOrdersList = lazy(
  () =>
    import("../../../pages/Catering/Orders/CancelledOrders/AllCancelledOrders/AllCancelledOrdersList/AllCancelledOrdersList")
);
const cateringMyCancelledOrdersList = lazy(
  () =>
    import("../../../pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/MyCancelledOrdersList")
);
const CateringAllVendorOrdersList = lazy(
  () =>
    import("../../../pages/Catering/Orders/VendorOrders/AllVendorOrders/AllVendorOrdersList")
);
const CateringMyVendorOrdersList = lazy(
  () =>
    import("../../../pages/Catering/Orders/VendorOrders/MyVendorOrders/MyVendorOrdersList")
);
const CateringAllFoodSchedulesList = lazy(
  () =>
    import("../../../pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/AllFoodSchedulesList")
);
const CateringMyFoodSchedulesList = lazy(
  () =>
    import("../../../pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/MyFoodSchedulesList")
);
const CateringAllFoodSchedulesAdd = lazy(
  () =>
    import("../../../pages/Catering/FoodSchedules/AllFoodSchedules/AllAddFoodSchedules/AllAddFoodSchedules")
);
const CateringMyFoodSchedulesAdd = lazy(
  () =>
    import("../../../pages/Catering/FoodSchedules/MyFoodSchedules/MyAddFoodSchedules/MyAddFoodSchedules")
)
export const CateringScreens = [
  {
    component: cateringBaseList,
    path: CATERING_BASE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringBaseInfoDetails,
    path: CATERING_BASE_INFO_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringBaseInfoDetailsArchives,
    path: CATERING_BASE_INFO_DETAILS_ARCHIVES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringSelfList,
    path: CATERING_SELF_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringSelfArchivesList,
    path: CATERING_SELF_ARCHIVES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMySelfList,
    path: CATERING_MY_SELF_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMySelfArchivesList,
    path: CATERING_MY_SELF_ARCHIVES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllSelfDetails,
    path: CATERING_ALL_SELF_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMySelfDetails,
    path: CATERING_MY_SELF_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringContractsRequestsList,
    path: CATERING_CONTRACTS_REQUESTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyContractsRequestsList,
    path: CATERING_MY_CONTRACTS_REQUESTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllVendorList,
    path: CATERING_ALL_VENDOR_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyVendorList,
    path: CATERING_MY_VENDOR_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllArchieveVendorList,
    path: CATERING_ALL_VENDOR_ARCHIEVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyArchieveVendorList,
    path: CATERING_MY_VENDOR_ARCHIEVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllVendorDetails,
    path: CATERING_ALL_VENDOR_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyVendorDetails,
    path: CATERING_MY_VENDOR_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllFoodList,
    path: CATERING_ALL_FOOD_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyFoodList,
    path: CATERING_MY_FOOD_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllFoodArchieveList,
    path: CATERING_ALL_FOOD_ARCHIEVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyFoodArchieveList,
    path: CATERING_MY_FOOD_ARCHIEVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllFoodDetails,
    path: CATERING_ALL_FOOD_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyFoodDetails,
    path: CATERING_MY_FOOD_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringAllContractsList,
    path: CATERING_ALL_CONTRACTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringMyContractsList,
    path: CATERING_MY_CONTRACTS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringAllContractsArchieveList,
    path: CATERING_ALL_CONTRACTS_ARCHIEVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringMyContractsArchieveList,
    path: CATERING_MY_CONTRACTS_ARCHIEVE_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringAllContractsDetails,
    path: CATERING_ALL_CONTRACTS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringMyContractsDetails,
    path: CATERING_MY_CONTRACTS_DETAILS_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllFoodSideDishes,
    path: CATERING_ALL_FOOD_SIDE_DISHES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyFoodSideDishes,
    path: CATERING_MY_FOOD_SIDE_DISHES_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllFoodSideDishesArchive,
    path: CATERING_ALL_FOOD_SIDE_DISHES_ARCHIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyFoodSideDishesArchive,
    path: CATERING_MY_FOOD_SIDE_DISHES_ARCHIVE_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringAllCancelledOrdersList,
    path: CATERING_ALL_CANCELLED_ORDERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: cateringMyCancelledOrdersList,
    path: CATERING_MY_CANCELLED_ORDERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringAllVendorOrdersList,
    path: CATERING_ALL_VENDOR_ORDERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringMyVendorOrdersList,
    path: CATERING_MY_VENDOR_ORDERS_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringAllFoodSchedulesAdd,
    path: CATERING_ALL_FOOD_SCHEDULES_ADD_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringMyFoodSchedulesAdd,
    path: CATERING_MY_FOOD_SCHEDULES_ADD_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringAllFoodSchedulesList,
    path: CATERING_ALL_FOOD_SCHEDULES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: CateringMyFoodSchedulesList,
    path: CATERING_MY_FOOD_SCHEDULES_LIST_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
