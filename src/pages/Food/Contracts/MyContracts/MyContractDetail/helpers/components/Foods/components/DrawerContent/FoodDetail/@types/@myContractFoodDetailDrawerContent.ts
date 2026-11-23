import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type MyContractFoodDetailDrawerContentProps = {
  id: number;
  closeDrawerHandler: () => void;
};

//! APIs
export type MyFoodDetailDataType = {
  id: number;
  title: string;
  description: string;
  mainImage: string;
  secondImage: string;
  thirdImage: string;
  fourthImage: string;
  contractId: number;
  restaurantId: number;
  restaurantTitle: string;
  vendorId: number;
  vendorName: string;
  studentalPrice: number;
  minPrice: number;
  maxPrice: number;
  category: string;
  categoryId: number;
  createdDate: string;
  modifiedDate: string;
  deleted: boolean;
  active: boolean;
  rate: number;
  contractTitle?: string;
  contractRestaurantTitle?: string;
  contractVendorTitle?: string;

  //newly added
  mainImageTitle: string;
  secondImageTitle: string;
  thirdImageTitle: string;
  fourthImageTitle: string;
  //
};

export type MyFoodDetailData = {
  productDtos: MyFoodDetailDataType[];
  totalElements: number;
};

export type GetMyFoodDetailResponse = GENERAL_RESPONSE<MyFoodDetailData>;
export type MyFoodDetailResponse = GENERAL_RESPONSE<MyFoodDetailDataType>;

export type GetMyFoodByFilterRequest = {
  Boolean?: "true" | "false";
  pageNo?: string;
  pageSize?: string;
  contractId?: string;
  maxPrice?: string;
  minPrice?: string;
  branchCode?: string;
  productTitle?: string;
  restaurantId?: string;
  vendorId?: string;
};

export type GetMyFoodByFilterResponse = GetMyFoodDetailResponse;
