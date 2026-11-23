import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";
//! LAYOUT
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

export type onUploadFileSuccess = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  response: FoodUploadFileResponse;
};

//! API
export type CreateMyFoodRequest = {
  active: boolean;
  contractId: number;
  description: string;
  maxPrice: number;
  minPrice: number;
  studentalPrice: number;

  title: string;

  //
  category?: string;
  categoryId?: number;

  mainImage: string | null;
  secondImage: string | null;
  thirdImage: string | null;
  fourthImage: string | null;
};
export type CreateMyFoodResponse = GENERAL_RESPONSE<number>;
