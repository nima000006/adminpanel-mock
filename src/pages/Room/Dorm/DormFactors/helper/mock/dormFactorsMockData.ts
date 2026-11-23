/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetDormFactorListResponse,
  DormUpdateFactorResponse,
  CancelDormitoryFactorResponse,
} from "../../@types/@dormFactors";

export const GET_DORM_FACTOR_LIST_RESPONSE_MOCK: GetDormFactorListResponse = {
  status: 1,
  msg: "نمونه msg",
  count: 10,
  curenttherm: null,
  totalCount: 10,
  data: [{
  id: 1,
  paymentdate: "2026-05-02T10:20:27.741127",
  ispay: true,
  username: "نمونه username",
  roomid: 1,
  roomName: "نمونه roomName",
  floorId: 1,
  floorName: "نمونه floorName",
  buildngId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  buildingName: "نمونه buildingName",
  dormitoryId: 1,
  dormitoryName: "نمونه dormitoryName",
  status: true,
  requestStatus: 1,
  amount: 10,
  createdDate: "2026-05-02T10:20:27.741127",
  modifiedDate: "2026-05-02T10:20:27.741127",
  policyid: 1,
  requstid: 1,
  term: 1,
  todate: "2026-05-02T10:20:27.741127",
  isValid: true,
  studentNumber: "studentNumber-mock",
  name: "نمونه name",
  family: "family-mock",
}],
};

export const DORM_UPDATE_FACTOR_RESPONSE_MOCK: DormUpdateFactorResponse = {
  data: true,
  msg: "نمونه msg",
  status: 1,
};

export const CANCEL_DORMITORY_FACTOR_RESPONSE_MOCK: CancelDormitoryFactorResponse = {
  status: 1,
  msg: "نمونه msg",
  data: true,
};
