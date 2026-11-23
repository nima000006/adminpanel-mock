import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

//! GENERAL
//! LAYOUT
export type AllSelfListDrawerContentProps = {
  onCloseDrawer: () => void;
  getRestaurantData: () => void;
  isModalClosed: boolean;
};

export type SelectType = {
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
export type FormItems = {
  active: boolean;
  title: string;
  unit: SelectType;
  capacity: string;
  gender: SelectType;
  selfManagerName: string;
  selfManagerLastName: string;
  nationalCode: string;
  phoneManager: string;
  desc: string;
  rule: string;
  province: SelectType;
  city: SelectType;
  postalCode: string;
  phonOne: string;
  phoneTwo: string;
  address: string;
};

export type onUploadFileSuccess = {
  name: string;
  response: FoodUploadFileResponse;
};

//! APIS
export type CreateAllRestaurantResponse = GENERAL_RESPONSE<number>;
export type CreateAllRestaurantRequest = {
  active: boolean;
  address: string;
  branchIds: number[];
  capacity: number;
  coverName?: string | null;
  description: string;
  genderType: number;
  latitude: number;
  logoName?: string | null;
  longitude: number;
  managerFirstName: string;
  managerLastName: string;
  managerUserName: string;
  ownerBranchCode?: number;
  ownerBranchName?: string;
  phone: string;
  postalCode: string;
  private?: boolean;
  provinceId: number;
  restaurantPhone: string;
  rules: string;
  score?: number;
  status?: number;
  title: string;
};
