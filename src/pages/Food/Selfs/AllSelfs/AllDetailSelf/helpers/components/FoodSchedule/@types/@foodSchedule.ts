import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! APIs
export type FoodSchedule = {
  id: number;
  productId: number;
  productMainImage: string;
  productSecondImage: string;
  productThirdImage: string;
  productFourthImage: string;
  productDescription: string;
  restaurantTitle: string;
  productContractRestaurantTitle: string;
  remaining: string;
  productTitle: string;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealName: string;
  mealId: number;
  basePrice: number;
  subsidizedPrice: number;
  exceededPrice: number;
  dailyPrice: number;
  discount: number;
  tax: number;
  reserveType: number;
  reserveName: string;
  maxSubsidizedCount: number;
  dynamicPrice: number;
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
  description: string;
  active: boolean;
  productContractId: string;
  productContractVendorId: number;
  productContractRestaurantId: string;
  productContractTitle: string;
  productContractVendorTitle: string;
  branches: {
    branchCode: number;
    branchName: string;
  }[];
  requestTitle: string;
  timer: string;
  sale: null;
  base: boolean;
  everyDay: boolean;
};

export type GetAllRestaurantFoodScheduleListResponse = GENERAL_RESPONSE<{
  planDtos: FoodSchedule[];
  totalElements: number;
}>;

export type GetAllRestaurantFoodScheduleListRequest = {
  pageNo: number;
  pageSize: number;
  restaurantId: number;
};
