import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type InsuredDetailType = {
  name: string;
  family: string;
  fatherName: string;
  studentNumber: string;
  university: string;
  nationalCode: string;
  birthDate: string;
  gender: string;
  mobile: string;
  province: string;
  city: string;
  baseInsurance: string;
  postalCode: string;
  address: string;
  plansImg: string;
  plansTitle: string;
  plansRole: string;
  plansPeriod: string;
  planPrice: string;
  plansStatus: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  shabaNumber: string;
  attachments: {
    uid: string;
    name: string;
    extension: string;
    url: string;
    status: null;
    size: number;
    relativeUrl: string;
  }[];
  tables: {
    requestNumber: string;
    insuranceName: string;
    insuranceType: string;
    insuranceStatus: string;
    requestDate: string;
    id: number;
  }[];
};

export type GetInsuredDetailResponse = GENERAL_RESPONSE<InsuredDetailType>;
export type GetInsuredRoleListResponse = GENERAL_RESPONSE<
  {
    label: string;
    role: string;
    id: number;
  }[]
>;
