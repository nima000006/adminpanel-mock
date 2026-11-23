import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type FormType = {
  nationalCode?: string;
  phoneNo?: string;
  readOnlyNationalCode: string;
  readOnlyPhoneNo: string;
  name: string;
  family: string;
  studentNumber: string;
  level: string;
  field: string;
  gender: {
    label: string;
    title: string;
    value: string;
    key: number;
    item: {
      id: number;
      title: string;
    };
    code: number;
  };
};

export type UserEstelaamModel = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  mobile: string;
  businessId: null;
  residencyName: null;
  sexStatus: null;
  studentNumber: null;
  subgroupCode: null;
  subgroupName: null;
  uniqueId: null;
  levelName: null;
  levelCode: null;
  nationalCode: string;
  nationality: string;
  residencyCode: null;
  digitalCardQr: null;
  digitalCardSerialNumber: string;
  userPhoto: null;
  points: null;
  unitName: null;
  userRole: null;
  studentCardState: null;
  cardValidDate: null;
  receiveMethod: null;
  cardStatus: null;
  createDate: string;
  estelamAmoozesh: boolean | null;
  estelamDasti: boolean | null;
  totalPassedUnits: null;
  fieldName: null;
  email: null;
  branchCode: string;
  enTerm: null;
  fatherName: string;
  fieldCode: null;
  healthStatus: null;
};
//! API
export type GetUserByPhoneOrUserNameResponse = GENERAL_RESPONSE<UserEstelaamModel>;
export type GetUserByPhoneOrUserNameRequest = {
  phoneNumber?: string | null;
  username?: string | null;
};
export type RetriedUserData = {
  firstName: string;
  lastName: string;
  nationalCode: string;
  branchName: string;
  fieldName: string;
  degreeName: string;
  studentNumber: string;
  genderName: string;
};
export type RetryEstelaamWithCredResponse = GENERAL_RESPONSE<RetriedUserData>;
export type RetryEstelaamWithCredRequest = {
  nationalCode: string;
  phoneNumber: string;
  studentNumber?: string | null;
};

export type UpdateUserByUnitMangerResponse = GENERAL_RESPONSE<{ data: boolean }>;
export type UpdateUserByUnitMangerRequest = {
  fieldCode?: string | null;
  fieldName?: string | null;
  firstName?: string | null;
  gender?: string | null;
  lastName?: string | null;
  levelCode?: string | null;
  levelName?: string | null;
  nationalCode?: string | null;
  studentNumber?: string | null;
};
