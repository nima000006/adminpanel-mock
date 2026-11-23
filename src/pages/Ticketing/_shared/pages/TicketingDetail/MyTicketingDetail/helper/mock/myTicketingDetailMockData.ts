/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  TicketingMyDetailsBannerInfoResponse,
  TicketingMyDetailsMessagesResponse,
  TicketingMyDetailsMessagesAIResponse,
  TicketingMyDetailsNotesResponse,
  TicketingMyDetailsAddFilesResponse,
  TicketingMyDetailsAddFilesMessageResponse,
  TicketingMyDetailsHistoryResponse,
  TicketingMyDetailsInformationResponse,
  TicketingMyDetailsUserInformationResponse,
  TicketingMyDetailsExpertInformationResponse,
} from "../../@types/@myTicketingDetail";

export const TICKETING_MY_DETAILS_BANNER_INFO_RESPONSE_MOCK: TicketingMyDetailsBannerInfoResponse = {
  title: "نمونه title",
  ticketNumber: 1,
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  samimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  ticketUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  ticketOrigin: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  priority: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  assignedToUserStaff: "assignedToUserStaff-mock",
  assignedToUserStaffId: 1,
  internal: true,
  topic: null,
  relatedTicket: {
  id: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
  ticketRating: 1,
  ticketRatingComment: "ticketRatingComment-mock",
  waitingDays: 1,
  modifiedBy: "modifiedBy-mock",
  modifiedByUserId: 1,
  createdDate: "2026-05-02T10:20:27.741127",
  modifiedDate: "2026-05-02T10:20:27.741127",
};

export const TICKETING_MY_DETAILS_MESSAGES_RESPONSE_MOCK: TicketingMyDetailsMessagesResponse = {
  content: "content-mock",
  attachmentUrl: "https://example.com",
  firstname: "نمونه firstname",
  lastname: "نمونه lastname",
  role: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  createdUuid: "2026-05-02T10:20:27.741127",
  createDate: "2026-05-02T10:20:27.741127",
  bySelf: true,
  dayChange: true,
};

export const TICKETING_MY_DETAILS_MESSAGES_AI_RESPONSE_MOCK: TicketingMyDetailsMessagesAIResponse = {
  attachmentUrl: "https://example.com",
  fromUserFirstname: "نمونه fromUserFirstname",
  fromUserLastname: "نمونه fromUserLastname",
  content: "content-mock",
  fromUserRole: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  createdDate: "2026-05-02T10:20:27.741127",
};

export const TICKETING_MY_DETAILS_NOTES_RESPONSE_MOCK: TicketingMyDetailsNotesResponse = {
  attachmentUrl: "https://example.com",
  fromUserFirstname: "نمونه fromUserFirstname",
  fromUserLastname: "نمونه fromUserLastname",
  content: "content-mock",
  fromUserRole: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  createdDate: "2026-05-02T10:20:27.741127",
};

export const TICKETING_MY_DETAILS_ADD_FILES_RESPONSE_MOCK: TicketingMyDetailsAddFilesResponse = {
  objectName: "نمونه objectName",
  title: "نمونه title",
  url: "https://example.com",
  uploadFileId: 1,
  ticketId: 1,
};

export const TICKETING_MY_DETAILS_ADD_FILES_MESSAGE_RESPONSE_MOCK: TicketingMyDetailsAddFilesMessageResponse = {
  objectName: "نمونه objectName",
  title: "نمونه title",
  url: "https://example.com",
  uploadFileId: 1,
  ticketId: 1,
};

export const TICKETING_MY_DETAILS_HISTORY_RESPONSE_MOCK: TicketingMyDetailsHistoryResponse = {
  ticketUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  userRevisionId: 1,
  userRevisionName: "نمونه userRevisionName",
  revisionDate: "2026-05-02T10:20:27.741127",
  actionType: [{ id: 1, title: "نمونه", name: "نمونه", value: "1" }],
  oldSamimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  newSamimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  oldStatus: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  newStatus: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  oldTopic: null,
  newTopic: null,
  oldAssignBy: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  newAssignBy: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  details: "details-mock",
};

export const TICKETING_MY_DETAILS_INFORMATION_RESPONSE_MOCK: TicketingMyDetailsInformationResponse = {
  ticketId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  ticketNumber: 1,
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  ticketOrigin: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  priority: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  service: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  ticketRating: 1,
  waitingTime: 1,
  internal: true,
  topicTitle: "نمونه topicTitle",
  createdDate: "2026-05-02T10:20:27.741127",
  closedDate: "2026-05-02T10:20:27.741127",
  cancelableAssign: true,
  closedBy: "closedBy-mock",
  closedByUserId: 1,
  assignedToUserStaffUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  assignedToUserStaffId: 1,
  assignedToUserStaffName: "نمونه assignedToUserStaffName",
  relatedTicket: {
  id: "30acd599-f0fd-4d67-9593-aab003100e2e",
  title: "نمونه title",
},
  userId: 1,
};

export const TICKETING_MY_DETAILS_USER_INFORMATION_RESPONSE_MOCK: TicketingMyDetailsUserInformationResponse = {
  staffType: "staffType-mock",
  firstName: "نمونه firstName",
  lastName: "نمونه lastName",
  username: "نمونه username",
  personalCode: "0012345678",
  studentNumber: "studentNumber-mock",
  mobileNumber: "09121234567",
  studyFieldId: 1,
  studyFieldName: "نمونه studyFieldName",
  degreeId: 1,
  employeePosition: "employeePosition-mock",
  degreeName: "نمونه degreeName",
  branchId: 1,
  branchName: "نمونه branchName",
  cityName: "نمونه cityName",
  provinceName: "نمونه provinceName",
  userId: 1,
  businessId: 1,
};

export const TICKETING_MY_DETAILS_EXPERT_INFORMATION_RESPONSE_MOCK: TicketingMyDetailsExpertInformationResponse = {
  assignById: 1,
  assignByName: "نمونه assignByName",
  assignRole: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  assignBranchId: 1,
  assignBranchName: "نمونه assignBranchName",
};
