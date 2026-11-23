/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  AllInnerTicketsSendingStatusDetailResponse,
  AllInnerTicketsSendingMessageDetailResponse,
  AllInnerTicketsSendingSendMessageAndFileResponse,
} from "../../@types/@allSendingTicketDetailTypes";

export const ALL_INNER_TICKETS_SENDING_STATUS_DETAIL_RESPONSE_MOCK: AllInnerTicketsSendingStatusDetailResponse = {
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

export const ALL_INNER_TICKETS_SENDING_MESSAGE_DETAIL_RESPONSE_MOCK: AllInnerTicketsSendingMessageDetailResponse = {
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

export const ALL_INNER_TICKETS_SENDING_SEND_MESSAGE_AND_FILE_RESPONSE_MOCK: AllInnerTicketsSendingSendMessageAndFileResponse = {
  objectName: "نمونه objectName",
  title: "نمونه title",
  url: "https://example.com",
  uploadFileId: 1,
  ticketId: 1,
};
