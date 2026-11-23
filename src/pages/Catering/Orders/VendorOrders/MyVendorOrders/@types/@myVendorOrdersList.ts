import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  MyCancelledOrdersListDeliveryStatus,
  MyCancelledOrdersListRecordType,
} from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/@types/@myCancelledOrdersList";

export type MyVendorOrdersListAdvanceFilterFormType = {
  // single: self API accepts one ownerBranchCode, not an array

  branch: SelectType<IdTitle>;
  self: SelectType<IdTitle>[];
  foodScheduleDate: [string | undefined, string | undefined];
  educationLevel: SelectType<IdTitle>[];
  fieldOfStudy: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  deliveryStatus: SelectType<IdTitle>;
  sideDishes: SelectType<IdTitle>[];
};

export type MyVendorOrdersListTodayAdvanceFilterFormType =
  MyVendorOrdersListAdvanceFilterFormType;
export type MyVendorOrdersListUpcomingAdvanceFilterFormType = Omit<
  MyVendorOrdersListAdvanceFilterFormType,
  "foodScheduleDate"
> & {
  foodScheduleDate?: string;
};
export type MyVendorOrdersListPastAdvanceFilterFormType = Omit<
  MyVendorOrdersListAdvanceFilterFormType,
  "foodScheduleDate"
> & {
  foodScheduleDate?: string;
};
export type MyVendorOrdersListAllAdvanceFilterFormType =
  MyVendorOrdersListAdvanceFilterFormType;

export type MyVendorOrdersListTodayAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyVendorOrdersListTodayAdvanceFilterFormType>;
};

export type MyVendorOrdersListUpcomingAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyVendorOrdersListUpcomingAdvanceFilterFormType>;
};

export type MyVendorOrdersListPastAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyVendorOrdersListPastAdvanceFilterFormType>;
};

export type MyVendorOrdersListAllAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyVendorOrdersListAllAdvanceFilterFormType>;
};

/** Same basket-plan filter payload shape as cancelled-orders list API. */
export type MyVendorOrdersListRecordType = MyCancelledOrdersListRecordType;

export type MyVendorOrdersListDeliveryStatus = MyCancelledOrdersListDeliveryStatus;

export type MyVendorOrdersListAllTableModelParams = {
  onDeliverOrder?: (record: MyVendorOrdersListRecordType) => void;
};

export type MyVendorOrdersListTodayTableModelParams = {
  onDeliverOrder?: (record: MyVendorOrdersListRecordType) => void;
};

/** CountsDetailCard banner view-model (mapped from analytics API). */
export type MyVendorOrdersListAnalyticsType = {
  totalQuantity?: number | null;
  pendingQuantity?: number | null;
  pendingPercentage?: number | null;
  deliveredQuantity?: number | null;
  deliveredPercentage?: number | null;
  notDeliveredQuantity?: number | null;
  notDeliveredPercentage?: number | null;
};

export type MyBasketPlanFilterAnalyticsRequest = {
  basketPlanId?: number;
  basketPlanIds?: number[];
  username?: string;
  studentNumber?: string;
  mobile?: string;
  firstName?: string;
  lastName?: string;
  restaurantIds?: number[];
  fromDate?: string;
  toDate?: string;
  mealIds?: number[];
  requestTypes?: number[];
  branchCodes?: number[];
  deliveryStatus?: number;
  paid?: boolean;
  cancelStatus?: number[];
  levelIds?: number[];
  fieldIds?: number[];
  planIds?: number[];
  productIds?: number[];
  sideProductIds?: number[];
};

export type MyBasketPlanFilterAnalyticsPlanItem = {
  productId: number;
  productTitle: string;
  productUserTitle: string;
  totalReservationCount: number;
  totalPrice: number;
};

export type MyBasketPlanFilterAnalyticsResponse = {
  deliveredCounts: number;
  noShowCounts: number;
  notDeliveredCounts: number;
  totalQuantity: number;
  planAnalytics: MyBasketPlanFilterAnalyticsPlanItem[];
  sidePlanAnalytics: MyBasketPlanFilterAnalyticsPlanItem[];
};
