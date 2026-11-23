import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
type SelectItem = {
  key: string;
  value: string;
  children: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type FormDataType = {
  self: SelectItem;
  date: string;
  meal: SelectItem;
};

//! API
export type RestaurantType = {
  id: number;
  title: string;
  description: string;
  rules: string;
  ownerBranchCodeBranchCode: number;
  ownerBranchCodeBranchName: string;
  genderType: number;
  logoName: string;
  coverName: string;
  phone: string;
  managerUserName: string;
  managerFirstName: string;
  managerLastName: string;
  managerUserId: number;
  latitude: number;
  longitude: number;
  score: number;
  modifiedDate: string;
  deleted: boolean;
  status: number;
  private: boolean;
  //

  logoTitle: null;
  coverTitle: null;

  capacity: number;
  branchDtos: null;
  restaurantPhone: string;
  provinceName: string;
  provinceId: number;
  provinceStateName: string;
  provinceStateId: number;
  address: string;
  postalCode: string;
  active: boolean;
};

export type GetAllRestaurantsResponse = GENERAL_RESPONSE<RestaurantType[]>;

export type BasketPlanByDateAndIdAndMealData = {
  firstName: string;
  lastName: string;
  restaurantTitle: string;
  branchCode: number;
  branchName: string;
  id: number;
  planId: number;
  productId: number;
  productTitle: string;
  productMainImage: string;
  basketId: number;
  quantity: number;
  delivered: boolean;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealId: number;
  mealName: string;
  basePrice: number;
  discount: number;
  tax: null;
  reserveType: number;
  reserveName: string;
  requestType: number;
  limitedCount: true;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  rate: number;
  ratesCount: null;
  description: string;
  sale: null;
  base: boolean;
  everyDay: boolean;
};

export type GetBasketPlanByDateAndIdAndMealResponse = GENERAL_RESPONSE<{
  basketPlansDtos: BasketPlanByDateAndIdAndMealData[];
  totalElements: number;
}>;

export type GetBasketPlanByDateAndIdAndMealRequest = {
  date: string;
  pageNo: number;
  pageSize: number;
  restaurantId: string;
  mealId: string;
};

export type GetBasketFilterPlanByDateAndIdAndMealResponse = GENERAL_RESPONSE<
  BasketPlanByDateAndIdAndMealData[]
>;

export type GetBasketFilterPlanByDateAndIdAndMealRequest = {
  date: string;
  restaurantId: string;
  mealId: string;
  username: string;
};

export type ChangeStatusToDeliveredRequest = {
  basketPlanId: number;
  deliveryStatus?: number;
};

//! GENERAl
