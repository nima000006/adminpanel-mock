import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! GENERAL
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
  interfaceName: string;
  interfaceLastName: string;
  nationalCode: string;
  universityUnit: CustomSelectType[];
  phoneNumber: string;
  desc: string;
  province: CustomSelectType;
  city: CustomSelectType;
  postalCode: string;
  phonOne: string;
  phoneTwo: string;
  address: string;
  iban: string;
  economicNom: string;
  legalCode: string;
};
export type AllVendorListDrawerContentProps = {
  onOpenDrawer: boolean;
  onCloseDrawer: () => void;
  getData: () => void;
};

//! API
export type ProvinceType = {
  title: string;
  id: number;
};
export type GetProvinceResponse = GENERAL_RESPONSE<ProvinceType[]>;
export type CityType = {
  id: number;
  title: string;
  stateId: null;
};
export type GetCityResponse = GENERAL_RESPONSE<CityType[]>;
export type FoodUploadFileResponse = GENERAL_RESPONSE<string>;

export type onUploadFileSuccess = {
  imageSetter: React.Dispatch<React.SetStateAction<string>>;
  response: FoodUploadFileResponse;
};
export type FoodMealType = {
  name: string;
  id: number;
};
export type GetMealAllResponse = GENERAL_RESPONSE<FoodMealType[]>;
export type CancelReasonsType = {
  id: number;
  title: string;
  description: string;
};

export type GetCancelReasonsAllResponse = GENERAL_RESPONSE<CancelReasonsType[]>;
