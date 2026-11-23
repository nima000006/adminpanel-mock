import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FoodUploadFileResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import { VendorByIdType } from "../../../components/AllVendorDetailTabContent/@types/@allVendorDetailTabContent";

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
export type FormDataTypes = {
  title: string;
  vendorTitle: string;
  legalCode: string;
  economicCode: string;
  number: string;
  adminName: string;
  adminFamily: string;
  adminPersonalityCode: string;
  adminPhoneNumber: string;
  vendorDescription: string;
  province: CustomSelectType;
  city: CustomSelectType;
  postalCode: string;
  firstPhoneNumber: string;
  secondPhoneNumber: string;
  address: string;
  interfaceLastName: string;
  interfaceName: string;
  phoneNumber: string;
  nationalCode: string;
  universityUnit: CustomSelectType[];
  desc: string;
  phonOne: string;
  phoneTwo: string;
  activeMode: boolean;
};

export type VendorDetailDrawerContentProps = {
  isDrawerOpen: boolean;
  detailFirstTabData: VendorByIdType | undefined;
  getDataHandle: () => void;
  closeDrawerHandler: () => void;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type onUploadFileSuccess = {
  name: string;
  response: FoodUploadFileResponse;
};

export type AllVendorOnUploadFileSuccess = {
  imageSetter: React.Dispatch<React.SetStateAction<string>>;
  response: FoodUploadFileResponse;
};

//! API
export type EditAllVendorRequest = {
  active: boolean;
  address: string;
  branches: number[];
  description: string;
  economicNom: string;
  id: number;
  latitude: number;
  logoName: string | null;
  coverName: string | null;
  longitude: number;
  managerFirstName: string;
  managerLastName: string;
  managerMobile: string;
  managerUserName: number;
  nationalNom: string;
  phone1: string;
  phone2: string;
  provinceId: number;
  title: string;
  iban: string;
  postalCode: string;
};
export type EditAllVendorResponse = GENERAL_RESPONSE<number>;
