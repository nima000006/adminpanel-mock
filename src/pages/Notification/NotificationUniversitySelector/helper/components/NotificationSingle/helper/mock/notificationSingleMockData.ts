/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  PostNotificationResponse,
  GetAllUserResponse,
  GetUserListResponse,
} from "../../@types/@notificationSingle";

export const POST_NOTIFICATION_RESPONSE_MOCK: PostNotificationResponse = {
  status: 1,
  msg: "نمونه msg",
  data: null,
};

export const GET_ALL_USER_RESPONSE_MOCK: GetAllUserResponse = {
  status: 1,
  msg: "نمونه msg",
  data: {
  userList: [{
  id: 1,
  userName: "نمونه userName",
  firstName: "نمونه firstName",
  lastName: "نمونه lastName",
  mobile: "09121234567",
  businessId: null,
  residencyName: null,
  sexStatus: "ACTIVE",
  studentNumber: null,
  subgroupCode: null,
  subgroupName: null,
  uniqueId: null,
  levelName: null,
  levelCode: null,
  nationalCode: "0012345678",
  nationality: "0012345678",
  residencyCode: null,
  digitalCardQr: null,
  digitalCardSerialNumber: "digitalCardSerialNumber-mock",
  userPhoto: null,
  points: null,
  unitName: "نمونه unitName",
  userRole: null,
  studentCardState: null,
  cardValidDate: null,
  receiveMethod: null,
  cardStatus: null,
  createDate: "2026-05-02T10:20:27.741127",
  estelamAmoozesh: null,
  totalPassedUnits: null,
  fieldName: "نمونه fieldName",
  branchCode: "0012345678",
  email: null,
  enTerm: null,
  fatherName: null,
  fieldCode: null,
  healthStatus: null,
}],
  totalElement: 10,
  totalPage: 0,
},
};

export const GET_USER_LIST_RESPONSE_MOCK: GetUserListResponse = {
  status: 1,
  msg: "نمونه msg",
  data: {
  totalElement: 10,
  totalUnseenElement: 10,
  totalPage: 0,
  currentDate: "2026-05-02T10:20:27.741127",
  notificationDtos: null,
},
};
