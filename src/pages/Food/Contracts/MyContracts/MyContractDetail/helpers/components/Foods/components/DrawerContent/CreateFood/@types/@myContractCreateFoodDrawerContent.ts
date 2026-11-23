import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

//! LAYOUT
export type FormDataDrawer = {
  foodName: string;
  studentPrice: string;
  minPrice: string;
  maxPrice: string;
  description: string;
};

export type MyContractCreateFoodDrawerContentProps = {
  closeDrawerHandler: () => void;
  getData: () => void;
};

export type MyContractCreateFoodContentUploadFile = {
  response: FoodUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

//! APIs
export type CreateMyNewFoodResponse = GENERAL_RESPONSE<number>;
export type CreateMyNewFoodRequest = {
  contractId: number;
  description: string;
  maxPrice: number;
  minPrice: number;
  studentalPrice: number;
  title: string;
  active: boolean;
  mainImage: string | null;
  secondImage: string | null;
  thirdImage: string | null;
  fourthImage: string | null;
};
