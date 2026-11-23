import { lazy } from "react";

import {
  FOOD_ALL_CONTRACTS_ROUTE,
  FOOD_ALL_FOOD_SCHEDULE_ROUTE,
  FOOD_ALL_DETAIL_SELF_PAGE_ROUTE,
  FOOD_ALL_FOODS_ROUTE,
  FOOD_ALL_SELF_PAGE_ROUTE,
  FOOD_ALL_VENDORS_ROUTE,
  FOOD_MY_CONTRACTS_ROUTE,
  FOOD_MY_FOOD_SCHEDULE_ROUTE,
  FOOD_MY_DETAIL_SELF_PAGE_ROUTE,
  FOOD_MY_FOODS_ROUTE,
  FOOD_MY_SELF_PAGE_ROUTE,
  FOOD_MY_VENDORS_ROUTE,
  FOOD_ALL_DETAIL_CONTRACTS_ROUTE,
  FOOD_ALL_VENDORS_DETAIL_PAGE_ROUTE,
  FOOD_MY_VENDORS_DETAIL_PAGE_ROUTE,
  FOOD_MY_DETAIL_CONTRACTS_ROUTE,
  FOOD_ALL_FOODS_DETAIL_PAGE_ROUTE,
  FOOD_MY_FOODS_DETAIL_PAGE_ROUTE,
  FOOD_ALL_DETAIL_FOOD_SCHEDULE_ROUTE,
  FOOD_MY_DETAIL_FOOD_SCHEDULE_ROUTE,
  ALL_FOOD_RESERVATION_TABLE_RESULT_ROUTE,
  ALL_FOOD_RESERVATION_ROUTE,
  MY_FOOD_RESERVATION_TABLE_RESULT_ROUTE,
  MY_FOOD_RESERVATION_ROUTE,
  FOOD_ORDER_DELIVERY_ROUTE,
  FOOD_ORDER_RETURNED_MONEY_PAGE_ROUTE,
  FOOD_ORDER_ALL_CANCELLED_PAGE_ROUTE,
  FOOD_ORDER_My_CANCELLED_PAGE_ROUTE,
  FOOD_DYNAMIC_DELIVERY_PAGE_ROUTE,
} from "../routes/food";

const mySelfs = lazy(
  () => import("../../../pages/Food/Selfs/MySelfs/MySelfList/MySelfList")
);
const AllSelfs = lazy(
  () => import("../../../pages/Food/Selfs/AllSelfs/AllSelfList/AllSelfList")
);
const myVendors = lazy(
  () => import("../../../pages/Food/Vendors/MyVendors/MyVendorsList/MyVendorsList")
);
const allVendors = lazy(
  () => import("../../../pages/Food/Vendors/AllVendors/AllVendorList/AllVendorList")
);
const myContracts = lazy(
  () =>
    import("../../../pages/Food/Contracts/MyContracts/MyContractsList/MyContractsList")
);
const AllContracts = lazy(
  () =>
    import("../../../pages/Food/Contracts/AllContracts/AllContractList/AllContractList")
);
const allDetailContracts = lazy(
  () =>
    import("../../../pages/Food/Contracts/AllContracts/AllContractDetail/AllContractDetail")
);
const myDetailContracts = lazy(
  () =>
    import("../../../pages/Food/Contracts/MyContracts/MyContractDetail/MyContractDetail")
);
const myFoods = lazy(
  () => import("../../../pages/Food/Foods/MyFoods/MyFoodsList/MyFoodsList")
);
const AllFoods = lazy(
  () => import("../../../pages/Food/Foods/AllFoods/AllFoodsList/AllFoodsList")
);
const allReservationOrdersSearch = lazy(
  () =>
    import("../../../pages/Food/Reservation/AllReservation/AllReservationOrderResultList/AllReservationOrderResultList")
);
const myReservationOrdersSearch = lazy(
  () =>
    import("../../../pages/Food/Reservation/MyReservation/MyReservationOrderResultList/MyReservationOrderResultList")
);
const myDetailSelf = lazy(
  () => import("../../../pages/Food/Selfs/MySelfs/MyDetailSelf/MyDetailSelf")
);
const allDetailSelfs = lazy(
  () => import("../../../pages/Food/Selfs/AllSelfs/AllDetailSelf/AllDetailSelf")
);
const allReservationOrdersResult = lazy(
  () =>
    import("../../../pages/Food/Reservation/AllReservation/AllReservationOrderResultList/AllReservationOrderResultList")
);
const myReservationOrdersResult = lazy(
  () =>
    import("../../../pages/Food/Reservation/MyReservation/MyReservationOrderResultList/MyReservationOrderResultList")
);
const myFoodSchedule = lazy(
  () =>
    import("../../../pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/MyFoodSchedules")
);
const AllFoodSchedule = lazy(
  () =>
    import("../../../pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/AllFoodSchedules")
);
const AllFoodScheduleDetail = lazy(
  () =>
    import("../../../pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleDetail/AllFoodScheduleDetail")
);
const MyFoodScheduleDetail = lazy(
  () =>
    import("../../../pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesDetail/MyFoodSchedulesDetail")
);
const allVendorDetail = lazy(
  () => import("../../../pages/Food/Vendors/AllVendors/AllVendorDetail/AllVendorDetail")
);
const myVendorDetail = lazy(
  () => import("../../../pages/Food/Vendors/MyVendors/MyVendorsDetail/MyVendorsDetail")
);
const allFoodsDetail = lazy(
  () => import("../../../pages/Food/Foods/AllFoods/AllFoodsDetail/AllFoodsDetail")
);
const myFoodsDetail = lazy(
  () => import("../../../pages/Food/Foods/MyFoods/MyFoodsDetail/MyFoodsDetail")
);
const foodOrderDelivery = lazy(
  () => import("../../../pages/Food/Reservation/OrderDelivery/OrderDelivery")
);
const foodReturnedMoney = lazy(
  () => import("../../../pages/Food/Reservation/ReturnedMoney/ReturnedMoney")
);
const foodAllCancelled = lazy(
  () => import("../../../pages/Food/Reservation/AllCancelled/AllCancelled")
);
const foodMyCancelled = lazy(
  () => import("../../../pages/Food/Reservation/MyCancelled/MyCancelled")
);
const foodDynamicDelivery = lazy(
  () => import("../../../pages/Food/Reservation/DynamicReservation/DynamicReservation")
);
export const FoodScreens = [
  {
    component: mySelfs,
    path: FOOD_MY_SELF_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllSelfs,
    path: FOOD_ALL_SELF_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myVendors,
    path: FOOD_MY_VENDORS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allVendors,
    path: FOOD_ALL_VENDORS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myContracts,
    path: FOOD_MY_CONTRACTS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllContracts,
    path: FOOD_ALL_CONTRACTS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myFoods,
    path: FOOD_MY_FOODS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllFoods,
    path: FOOD_ALL_FOODS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myFoodSchedule,
    path: FOOD_MY_FOOD_SCHEDULE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllFoodSchedule,
    path: FOOD_ALL_FOOD_SCHEDULE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: AllFoodScheduleDetail,
    path: FOOD_ALL_DETAIL_FOOD_SCHEDULE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: MyFoodScheduleDetail,
    path: FOOD_MY_DETAIL_FOOD_SCHEDULE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allReservationOrdersSearch,
    path: ALL_FOOD_RESERVATION_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myReservationOrdersSearch,
    path: MY_FOOD_RESERVATION_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allReservationOrdersResult,
    path: ALL_FOOD_RESERVATION_TABLE_RESULT_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myReservationOrdersResult,
    path: MY_FOOD_RESERVATION_TABLE_RESULT_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myDetailSelf,
    path: FOOD_MY_DETAIL_SELF_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allDetailSelfs,
    path: FOOD_ALL_DETAIL_SELF_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allDetailContracts,
    path: FOOD_ALL_DETAIL_CONTRACTS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myDetailContracts,
    path: FOOD_MY_DETAIL_CONTRACTS_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allVendorDetail,
    path: FOOD_ALL_VENDORS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myVendorDetail,
    path: FOOD_MY_VENDORS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: allFoodsDetail,
    path: FOOD_ALL_FOODS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: myFoodsDetail,
    path: FOOD_MY_FOODS_DETAIL_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: foodOrderDelivery,
    path: FOOD_ORDER_DELIVERY_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: foodReturnedMoney,
    path: FOOD_ORDER_RETURNED_MONEY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: foodAllCancelled,
    path: FOOD_ORDER_ALL_CANCELLED_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: foodMyCancelled,
    path: FOOD_ORDER_My_CANCELLED_PAGE_ROUTE,
    isBgContentCustom: false,
  },
  {
    component: foodDynamicDelivery,
    path: FOOD_DYNAMIC_DELIVERY_PAGE_ROUTE,
    isBgContentCustom: false,
  },
];
