import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

//! GENERAL

//! LAYOUT
export type MyVendorListDrawerContentProps = {
  onOpenDrawe: boolean;
  onCloseDrawer: () => void;
  getData: () => void;
};

export type onUploadFileSuccess = {
  imageSetter: React.Dispatch<React.SetStateAction<string>>;
  response: FoodUploadFileResponse;
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
export type FormItemsTypes = {
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
  number: string;
  economicNom: string;
  iban: string;
  legalCode: string;
};
