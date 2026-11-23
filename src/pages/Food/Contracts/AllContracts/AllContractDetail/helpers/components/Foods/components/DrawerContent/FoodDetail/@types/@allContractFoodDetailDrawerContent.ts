import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type AllContractFoodDetailDrawerContentProps = {
  id: number;
  closeDrawerHandler: () => void;
};

//! APIs
export type AllFoodDetailDataType = {
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

  mainImageTitle: string;
  secondImageTitle: string;
  thirdImageTitle: string;
  fourthImageTitle: string;
};
export type GetAllFoodDetailResponse = GENERAL_RESPONSE<AllFoodDetailDataType>;
