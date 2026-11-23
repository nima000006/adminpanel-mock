import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MyFoodDetailDataType } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

//! LAYOUT
export type MyFoodsDetailEditDrawerContentProps = {
  onCloseDrawerHandler: () => void;
  getFoodData: () => void;
  foodData: MyFoodDetailDataType | undefined;
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
export type FormData = {
  title: string;
  contract: CustomSelectType;
  studentPrice: number;
  maxPrice: number;
  minPrice: number;
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
export type UpdateDetailMyFoodsRequest = {
  active: boolean;
  contractId: number;
  description: string;
  id: number;
  maxPrice: number | string;
  minPrice: number | string;
  studentalPrice: number | string;
  title: string;
  mainImage: string | null;
  secondImage: string | null;
  thirdImage: string | null;
  fourthImage: string | null;
};
export type UpdateDetailMyFoodsResponse = GENERAL_RESPONSE<number>;
