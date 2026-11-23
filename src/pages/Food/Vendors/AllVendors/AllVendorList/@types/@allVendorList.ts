import { GENERAL_RESPONSE } from "../../../../../../infrastructure/models/modules/GeneralTypes/GeneralTypes";

//! GENERAL
//! LAYOUT
//! API
export type VendorAllType = {
  id: number;
  title: string;
  score: number;
  active: boolean;
  managerFirstName: string;
  managerLastName: string;
  phone1: string;
  createdDate: string;
  modifiedDate: string;
  userId: null;
  provinceId: number;
  economicNom: string;
};
export type GetVendorAllResponse = GENERAL_RESPONSE<VendorAllType[]>;
export type CreateAllVendorResponse = { status: number; msg: string; data: number };
export type CreateAllVendorRequest = {
  address: string;
  description: string;
  iban: string;
  branches: number[];
  latitude: number;
  longitude: number;
  managerFirstName: string;
  managerLastName: string;
  managerMobile: string;
  managerUserName: string;
  nationalNom: string;
  phone1: string;
  phone2: string;
  title: string;
  postalCode: string;
  provinceId: number;
  active: boolean;
  logoName: string | null;
  coverName: string | null;
  economicNom?: string;
  parentVendorId?: number;
};
