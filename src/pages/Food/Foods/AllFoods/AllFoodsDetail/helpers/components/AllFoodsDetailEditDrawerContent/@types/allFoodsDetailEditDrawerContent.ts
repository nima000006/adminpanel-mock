import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { AllFoodDetailDataType } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@allContractFoodDetailDrawerContent";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

//! LAYOUT
export type AllFoodsDetailEditDrawerContentProps = {
  onCloseDrawerHandler: () => void;
  getFoodData: () => void;
  foodData: AllFoodDetailDataType | undefined;
};

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
export type FormDataAllFood = {
  title: string;
  contract: CustomSelectType;
  studentPrice: number | string;
  maxPrice: number | string;
  minPrice: number | string;
  desc: string;
};

export type FormDataAllFoodType = {
  title: string;
  contract: { code: number; label: string };
  studentPrice: string;
  maxPrice: string;
  minPrice: string;
  desc: string;
};

export type onUploadFileSuccess = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  response: FoodUploadFileResponse;
};
//! API
export type UpdateDetailAllFoodsRequest = {
  active: boolean;
  contractId: number;
  description: string;
  title: string;
  id: number;
  maxPrice: number;
  studentalPrice: number;
  minPrice: number;
  mainImage: string | null;
  secondImage: string | null;
  thirdImage: string | null;
  fourthImage: string | null;

  // newly added
  category?: string;
  categoryId?: number;
};
export type UpdateDetailAllFoodsResponse = GENERAL_RESPONSE<number>;
