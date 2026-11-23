import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! APIs
export type ContractsFoodDataType = {
  id: number;
  title: string;
  description: string;
  mainImage: string;
  secondImage: string;
  thirdImage: string;
  fourthImage: string;
  contractId: number;
  restaurantId: null;
  restaurantTitle: null;
  vendorId: null;
  vendorName: null;
  studentalPrice: number;
  minPrice: number;
  maxPrice: number;
  category: string;
  categoryId: number;
  createdDate: string;
  modifiedDate: null;
  deleted: boolean;
};
export type GetMyContractFoodsResponse = GENERAL_RESPONSE<ContractsFoodDataType[]>;
