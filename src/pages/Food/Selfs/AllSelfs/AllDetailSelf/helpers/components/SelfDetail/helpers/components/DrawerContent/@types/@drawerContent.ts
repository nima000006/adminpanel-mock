import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { AllSelfDetailDataType } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/SelfDetail/@types/@selfDetailTab";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

//! LAYOUT
export type SelfDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  getSelfData: (selfId?: string) => void;
  isDrawerOpen: boolean;
  selfDetailData?: AllSelfDetailDataType;
};

type CustomSelectItem = {
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

export type FormDataType = {
  activeMode: boolean;
  selfTitle: string;
  uniName: CustomSelectItem;
  capacity: number;
  gender: CustomSelectItem;
  adminName: string;
  adminFamily: string;
  adminPersonalityCode: string;
  adminPhoneNumber: string;
  selfDescription: string;
  selfRules: string;
  province: CustomSelectItem;
  city: CustomSelectItem;
  postalCode: number;
  firstPhoneNumber: string;
  address: string;
};

export type onUploadFileSuccess = {
  imageSetter: React.Dispatch<React.SetStateAction<string>>;
  response: FoodUploadFileResponse;
};

//! APIs
export type UpdateAllRestaurantResponse = GENERAL_RESPONSE<number>;

export type UpdateAllRestaurantRequest = {
  active: boolean;
  address: string;
  branchIds: [number];
  capacity: number;
  description: string;
  genderType: number;
  latitude: number;
  longitude: number;
  managerFirstName: string;
  managerLastName: string;
  managerUserName: string;
  phone: string;
  postalCode: string;
  provinceId: number;
  restaurantPhone: string;
  rules: string;
  title: string;
  id: number;
  coverName: string | null;
  logoName: string | null;
  ownerBranchCode: number;
  ownerBranchName: string;
};
