import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";
//! GENERAL
export type CustomSelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};
//! LAYOUT
export type FormItemsProps = {
  title: string;
  contract: CustomSelectType;
  meal: CustomSelectType;
  studentPrice: string;
  limitPrice: string;
  maxPrice: string;
  desc: string;
};
export type formType = {
  open: boolean;
  onCloseDrawerHandler: () => void;
  getData: () => void;
};
export type ValueType = {
  title: string;
  contract: CustomSelectType;
  studentPrice: number;
  minPrice: number;
  maxPrice: number;
  desc: string;
};
export type AllFoodOnUploadFileSuccess = {
  response: FoodUploadFileResponse;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

//! API
export type CreateAllFoodRequest = {
  active: boolean;
  contractId: number;
  description: string;
  mainImage: string | null;
  secondImage: string | null;
  thirdImage: string | null;
  fourthImage: string | null;
  maxPrice: number;
  minPrice: number;
  studentalPrice: number;
  title: string;

  //newly add
  category?: string;
  categoryId?: number;
};
export type CreateAllFoodResponse = GENERAL_RESPONSE<number>;
