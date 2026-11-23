import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! APIs
export type FoodDataType = {
  id: 1;
  title: string;
  restaurantId: number;
  contractRestaurantTitle: string;
  contractId?: number;
  contractTitle: string;
  studentalPrice: number;
  minPrice: number;
  maxPrice: number;
  active: true;
  contractVendorTitle?: string;
};
export type GetMyFoodsListResponse = GENERAL_RESPONSE<{
  productDtos: FoodDataType[];
  totalElements: number;
}>;
export type GetMyFoodsListRequest = {
  pageNo: number;
  pageSize: number;
};
