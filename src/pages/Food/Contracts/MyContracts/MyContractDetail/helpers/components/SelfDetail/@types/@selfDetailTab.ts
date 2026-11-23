import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
//! APIs
export type MySelfDetailDataType = {
  id: number;
  title: string;
  description: string;
  rules: string;
  ownerBranchCode: {
    branchCode: number;
    branchName: string;
  };
  genderType: number;
  logoName: string;
  coverName: string;
  coverTitle: string | null;
  logoTitle: string | null;
  phone: string;
  managerUserName: string;
  managerFirstName: string;
  managerLastName: string;
  managerUserId: number;
  latitude: number;
  longitude: number;
  score: number;
  modifiedDate: string;
  deleted: boolean;
  status: number;
  private: boolean;
  capacity: number;
  restaurantPhone: string;
  provinceStateName: string;
  provinceName: string;
  address: string;
  postalCode: string;
  active: boolean;
  provinceId: number;
  provinceStateId: number;
  ownerBranchCodeBranchName: string;
  ownerBranchCodeBranchCode: number;
};

export type GetMySelfDetailResponse = GENERAL_RESPONSE<MySelfDetailDataType>;
