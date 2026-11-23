import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type FoodScheduleDetailData = {
  id: number;
  productId: number;
  productMainImage: string;
  productSecondImage: string;
  productThirdImage: string;
  productFourthImage: string;
  productDescription: string;
  restaurantTitle: null;
  productContractRestaurantTitle: string;
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
  description: null;
  active: boolean;
  timer: null;
  sale: boolean;
  base: boolean;
  everyDay: boolean;
  productContractTitle: string;
  branches: {
    branchCode: number;
    branchName: string;
  }[];
  productContractRestaurantId: string;
  productContractId: string;
  mealId: number;
  requestTitle: string;
};

//! APIs
export type GetAllFoodScheduleDetailResponse = GENERAL_RESPONSE<FoodScheduleDetailData>;
