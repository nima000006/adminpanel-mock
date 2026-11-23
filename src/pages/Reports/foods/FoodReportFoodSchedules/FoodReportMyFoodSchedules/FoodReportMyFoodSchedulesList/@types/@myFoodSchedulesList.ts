import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
//! APIs
export type FoodSchedule = {
  id: number;
  productId: number;
  productMainImage: string;
  productSecondImage: string;
  productThirdImage: string;
  productFourthImage: string;
  productDescription: string;
  restaurantTitle: null;
  remaining: null;
  productTitle: string;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealName: string;
  basePrice: number;
  subsidizedPrice: number;
  exceededPrice: number;
  dailyPrice: number;
  discount: number;
  tax: number;
  reserveType: number;
  reserveName: string;
  maxSubsidizedCount: null;
  dynamicPrice: boolean;
  requestType: number;
  limitedCount: boolean;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  rate: number;
  ratesCount: number;
  deleted: boolean;
  productPlanDescription: string;
  sale: boolean;
  base: boolean;
  timer: null;
  everyDay: boolean;
  productContractRestaurantTitle: string;
  productContractId: string;
};

export type GetMyFoodScheduleListResponse = GENERAL_RESPONSE<{
  planDtos: FoodSchedule[];
  totalElements: number;
}>;

export type GetMyFoodScheduleListRequest = {
  pageNo: string;
  pageSize: string;
};

export type CalendarFoodSimplePlanDto = {
  productContractId: string;
  id: number;
  productId: number;
  productMainImage: string;
  restaurantTitle: string;
  restaurantId: number;
  branchCode: number;
  branchName: string;
  remaining: number;
  productTitle: string;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealName: string;
  mealId: number;
  basePrice: number;
  discount: number;
  tax: null;
  requestType: number;
  limitedCount: boolean;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  productDescription: null;
  rate: number;
  ratesCount: null;
  currentCount: null;
  productContractRestaurantTitle: null;
  productContractRestaurantDescription: null;
  description: null;
  productContractRestaurantAddress: string;
  productContractRestaurantOwnerBranchCodeBranchName: string;
  productContractRestaurantOwnerBranchCodeBranchCode: number;
  sale: null;
};

export type CalendarMyFoods = {
  simplePlanDtos: CalendarFoodSimplePlanDto[];
  date: string;
};

export type GetCalendarDataForMyFoodSchedulesResponse = GENERAL_RESPONSE<
  CalendarMyFoods[]
>;

export type GetCalendarDataForMyFoodSchedulesRequest = {
  fromDate?: string;
  mealId: string;
  restaurantId: string;
  toDate?: string;
};
