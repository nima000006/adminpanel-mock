import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type VendorDetailTemplateProps = {
  openDrawerHAndler: () => void;
  setDetailFirstTabData: React.Dispatch<React.SetStateAction<VendorByIdType | undefined>>;
};

//! API
export type VendorByIdType = {
  id: number;
  parentVendor: null;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  score: number;
  commentsCounts: number;
  orderCounts: number;
  leastOrder: number;
  commissionType: number;
  commissionName: string;
  address: string;
  privatePhone: string;
  status: string;
  statusId: number;
  active: boolean;
  managerFirstName: string;
  managerLastName: string;
  managerUserName: string;
  managerUserId: number;
  logoName: string;
  coverName: string;
  phone1: string;
  phone2: string;
  createdDate: string;
  modifiedDate: string;
  userId: null;
  provinceId: number;
  managerMobile: string;
  nationalNom: string;
  economicNom: string;
  provinceName: string;
  stateName: string;
  vip: boolean;
  mainBranch: boolean;
  deleted: boolean;
  iban: string;
  postalCode: string;
  stateId: number;
  branches: {
    branchCode: number;
    branchName: string;
  }[];
  logoTitle: string;
  coverTitle: string;
};
export type GetVendorByIdResponse = GENERAL_RESPONSE<VendorByIdType>;
