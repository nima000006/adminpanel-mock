import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyCancelledOrdersListAdvanceFilterFormType = {
  // single: self API accepts one ownerBranchCode, not an array

  branch: SelectType<IdTitle>;
  self: SelectType<IdTitle>[];
  foodScheduleDate: [string, string];
  educationLevel: SelectType<IdTitle>[];
  fieldOfStudy: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  sideDishes: SelectType<IdTitle>[];
};

export type MyCancelledOrdersListAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyCancelledOrdersListAdvanceFilterFormType>;
};

export type MyCancelledOrdersListCancelStatus = {
  id: number;
  title: string;
  faTitle: string;
};

export type MyCancelledOrdersListDeliveryStatus = {
  id: number;
  title: string;
  faTitle: string;
};

export type MyCancelledOrdersListBasketSidePlan = {
  id: number;
  sidePlanId: number;
  sidePlanTitle: string;
  sidePlanTypeId: number;
  sidePlanTypeTitle: string;
  productId: number;
  productTitle: string;
  quantity: number;
  totalAmount: number;
  price: number;
  cancelStatus: MyCancelledOrdersListCancelStatus;
};

export type MyCancelledOrdersListRecordType = {
  firstName: string;
  lastName: string;
  userName: string;
  studentNumber: string;
  mobile: string;
  fieldName: string;
  levelName: string;
  restaurantTitle: string;
  branchCode: number;
  branchName: string;
  id: number;
  planId: number;
  productId: number;
  productTitle: string;
  productMainImage: string;
  basketId: number;
  basketInvoiceId: string;
  paymentDate: string;
  quantity: number;
  amount: number;
  totalAmountWithSidePlan: number;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  endCancellationDate: string;
  currentDate: string;
  mealId: number;
  mealName: string;
  basePrice: number;
  discount: number;
  tax: number;
  reserveType: number;
  reserveName: string;
  requestType: number;
  limitedCount: boolean;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  rate: number;
  ratesCount: number;
  description: string;
  persianDate: string;
  restaurantAddress: string;
  ownerBranchName: string;
  ownerBranchCode: number;
  cancellable: boolean;
  cancelTypeId: number;
  cancelTypeTitle: string;
  cancelStatus: MyCancelledOrdersListCancelStatus;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  deliveryStatus: MyCancelledOrdersListDeliveryStatus;
  isDateChanged: boolean;
  isScored: boolean;
  commented: boolean;
  deliveryScore: number;
  planScore: number;
  error: boolean;
  message: string;
  comment: string;
  basketSidePlans: MyCancelledOrdersListBasketSidePlan[];
  deliveryCode: string;
  deliveryUUID: string;
  deliverDate: string;
  sale: boolean;
};

export type GetMyCancelledOrdersFilterRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
  };
  body: {
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
    levelIds?: number[];
    fieldIds?: number[];
    planIds?: number[];
    productIds?: number[];
    sidePlanProductIds?: number[];
    cancelStatus?: number[];
  };
};

export type GetMyCancelledOrdersFilterResponse = {
  content: MyCancelledOrdersListRecordType[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetMyCancelledOrdersAmountAnalyticsRequest = {
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

export type GetMyCancelledOrdersAmountAnalyticsResponse = {
  totalQuantity: number;
  totalAmount: number;
  totalAmountWithSidePlan: number;
};

export type CreateMyCancelledOrdersHolidayRequest = {
  restaurantId?: number;
  planId?: number;
  reserveDate: string;
  cancelReasonId: number;
}[];

type CreateMyCancelledOrdersHolidayBranch = {
  branchCode: number;
  branchName: string;
  businessId?: number;
};

type CreateMyCancelledOrdersHolidayCancelReasons = {
  id: number;
  title: string;
  description: string;
};

type CreateMyCancelledOrdersHolidayRestaurant = {
  id: number;
  title: string;
  description: string;
  rules: string;
  ownerBranchCode: CreateMyCancelledOrdersHolidayBranch;
  genderType: number;
  logoName: string;
  coverName: string;
  phone: string;
  restaurantPhone2: string;
  managerUserName: string;
  managerFirstName: string;
  managerLastName: string;
  managerUserId: number;
  latitude: number;
  longitude: number;
  score: number;
  scoreCount: number;
  deliveryCount: number;
  totalCounts: number;
  branch: CreateMyCancelledOrdersHolidayBranch[];
  provinceId: number;
  cityId: number;
  provinceTitle: string;
  cityTitle: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  show: boolean;
  capacity: number;
  address: string;
  postalCode: string;
  restaurantPhone: string;
  statusType: string;
  deActiveReason: string;
  private: boolean;
};

type CreateMyCancelledOrdersHolidayPlan = {
  id: number;
  product: {
    id: number;
    title: string;
    userTitle: string;
    description: string;
    mainImage: string;
    secondImage: string;
    thirdImage: string;
    fourthImage: string;
    studentalPrice: number;
    maxPrice: number;
    createdDate: string;
    modifiedDate: string;
    modifiedByUsername: string;
    modifiedBy: string;
    statusType: string;
    deActiveReason: string;
    score: number;
    scoreCount: number;
    deliveryScore: number;
    deliveryCount: number;
    totalCounts: number;
    invoiceProductId: number;
  };
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealId: string;
  basePrice: number;
  subsidizedPrice: number;
  exceededPrice: number;
  dailyPrice: number;
  discount: number;
  tax: number;
  reserveType: number;
  reserveName: string;
  dynamicPrice: boolean;
  requestType: string;
  limitedCount: boolean;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  rate: number;
  ratesCount: number;
  isForAll: boolean;
  status: number;
  branches: CreateMyCancelledOrdersHolidayBranch[];
  description: string;
  statusType: string;
  deActiveReason: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  endCancellationDate: string;
  cancellable: boolean;
  staffTypes: string[];
  fields: number[];
  levels: number[];
  sale: boolean;
  base: boolean;
  everyDay: boolean;
};

export type CreateMyCancelledOrdersHolidayResponseItem = {
  id: number;
  branch: CreateMyCancelledOrdersHolidayBranch;
  cancelReasons: CreateMyCancelledOrdersHolidayCancelReasons;
  restaurant: CreateMyCancelledOrdersHolidayRestaurant;
  plan: CreateMyCancelledOrdersHolidayPlan;
  reserveDate: string;
  createdByUsername: string;
  createdDate: string;
  statusType: string;
};

export type CreateMyCancelledOrdersHolidayResponse =
  CreateMyCancelledOrdersHolidayResponseItem[];
