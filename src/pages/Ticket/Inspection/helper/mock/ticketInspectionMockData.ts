/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetTicketDetailResponse,
  AddMessageForUserTicketResponse,
  CloseTicketResponse,
} from "../../@types/@ticketInspection";

export const GET_TICKET_DETAIL_RESPONSE_MOCK: GetTicketDetailResponse = {
  status: 1,
  msg: "نمونه msg",
  ticketDetail: {
  id: 1,
  title: "نمونه title",
  imgname: "نمونه imgname",
  problemname: "نمونه problemname",
  createdate: "2026-05-02T10:20:27.741127",
  status: 1,
  servicename: "نمونه servicename",
  messeages: [{
  id: 1,
  msg: "نمونه msg",
  date: "2026-05-02T10:20:27.741127",
  typemsg: 1,
  filedatas: [{
  filename: "نمونه filename",
  url: "https://example.com",
  id: 1,
}],
}],
},
};

export const ADD_MESSAGE_FOR_USER_TICKET_RESPONSE_MOCK: AddMessageForUserTicketResponse = {
  status: 1,
  msg: "نمونه msg",
  registerticket: null,
};

export const CLOSE_TICKET_RESPONSE_MOCK: CloseTicketResponse = {
  status: 1,
  msg: "نمونه msg",
  tikets: null,
};
