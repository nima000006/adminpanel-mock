import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AllCancelledOrdersListDeliveryStatus,
  AllCancelledOrdersListRecordType,
} from "@pages/Catering/Orders/CancelledOrders/AllCancelledOrders/AllCancelledOrdersList/@types/@allCancelledOrdersList";

/** Shared advance-filter field shape (same as cancelled-orders list). */
export type AllVendorOrdersListAdvanceFilterFormType = {
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

export type AllVendorOrdersListTodayAdvanceFilterFormType =
  AllVendorOrdersListAdvanceFilterFormType;
export type AllVendorOrdersListUpcomingAdvanceFilterFormType = Omit<
  AllVendorOrdersListAdvanceFilterFormType,
  "foodScheduleDate"
> & {
  foodScheduleDate?: string;
};
export type AllVendorOrdersListPastAdvanceFilterFormType = Omit<
  AllVendorOrdersListAdvanceFilterFormType,
  "foodScheduleDate"
> & {
  foodScheduleDate?: string;
};
export type AllVendorOrdersListAllAdvanceFilterFormType =
  AllVendorOrdersListAdvanceFilterFormType;

export type AllVendorOrdersListTodayAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllVendorOrdersListTodayAdvanceFilterFormType>;
};

export type AllVendorOrdersListUpcomingAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllVendorOrdersListUpcomingAdvanceFilterFormType>;
};

export type AllVendorOrdersListPastAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllVendorOrdersListPastAdvanceFilterFormType>;
};

export type AllVendorOrdersListAllAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllVendorOrdersListAllAdvanceFilterFormType>;
};

/** Same basket-plan filter payload shape as cancelled-orders list API. */
export type AllVendorOrdersListRecordType = AllCancelledOrdersListRecordType;

export type AllVendorOrdersListDeliveryStatus = AllCancelledOrdersListDeliveryStatus;

export type AllVendorOrdersListAllTableModelParams = {
  onDeliverOrder?: (record: AllVendorOrdersListRecordType) => void;
};

export type AllVendorOrdersListTodayTableModelParams = {
  onDeliverOrder?: (record: AllVendorOrdersListRecordType) => void;
};

/** CountsDetailCard banner view-model (mapped from analytics API). */
export type AllVendorOrdersListAnalyticsType = {
  totalQuantity?: number | null;
  pendingQuantity?: number | null;
  pendingPercentage?: number | null;
  deliveredQuantity?: number | null;
  deliveredPercentage?: number | null;
  notDeliveredQuantity?: number | null;
  notDeliveredPercentage?: number | null;
};

export type AllBasketPlanFilterAnalyticsRequest = {
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

export type AllBasketPlanFilterAnalyticsPlanItem = {
  productId: number;
  productTitle: string;
  productUserTitle: string;
  totalReservationCount: number;
  totalPrice: number;
};

export type AllBasketPlanFilterAnalyticsResponse = {
  deliveredCounts: number;
  noShowCounts: number;
  notDeliveredCounts: number;
  totalQuantity: number;
  planAnalytics: AllBasketPlanFilterAnalyticsPlanItem[];
  sidePlanAnalytics: AllBasketPlanFilterAnalyticsPlanItem[];
};
