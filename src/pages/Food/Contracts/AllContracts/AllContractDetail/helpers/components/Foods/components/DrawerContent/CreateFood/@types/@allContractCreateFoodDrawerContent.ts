import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

//! LAYOUT
export type FormDataType = {
  foodName: string;
  studentPrice: string;
  minPrice: string;
  maxPrice: string;
  description: string;
};

export type AllContractCreateFoodDrawerContentProps = {
  closeDrawerHandler: () => void;
  getData: () => void;
};

export type AllContractCreateFoodContentUploadFile = {
  response: FoodUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

//! APIs
export type CreateNewFoodResponse = GENERAL_RESPONSE<number>;
export type CreateNewFoodRequest = {
  contractId: number;
  description: string;
  maxPrice: number;
  minPrice: number;
  studentalPrice: number;
  active: boolean;
  title: string;
  mainImage: string | null;
  secondImage: string | null;
  thirdImage: string | null;
  fourthImage: string | null;
};
