import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! GENERAL
//! LAYOUT
//! API
export type VendorMyType = {
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
};
export type GetVendorMyResponse = GENERAL_RESPONSE<VendorMyType[]>;

export type CreateMyVendorResponse = { status: number; msg: string; data: number };
export type CreateMyVendorRequest = {
  address: string;
  description: string;
  iban: string;
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
