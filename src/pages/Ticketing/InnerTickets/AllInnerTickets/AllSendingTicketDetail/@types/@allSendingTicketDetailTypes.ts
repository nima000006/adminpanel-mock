import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllInnerTicketsSendingStatusDetailResponse = {
  title: string;
  ticketNumber: number;
  status: IdTitleName;
  samimService: IdTitleName;
  ticketUuid: string;
  ticketOrigin: IdTitleName;
  priority: IdTitleName;
  assignedToUserStaff: string;
  assignedToUserStaffId: number;
  internal: boolean;
  topic: IdTitle;
  relatedTicket: { id: string; title: string };
  ticketRating: number;
  ticketRatingComment: string;
  waitingDays: number;
  modifiedBy: string;
  modifiedByUserId: number;
  createdDate: string;
  modifiedDate: string;
};

export type AllInnerTicketsSendingMessageDetailResponse = {
  content: string;
  attachmentUrl: string;
  firstname: string;
  lastname: string;
  role: IdTitleName;
  createdUuid: string;
  createDate: string;
  bySelf: boolean;
  dayChange: boolean;
}[];

export type AllInnerTicketsSendingOnlySendMessageRequest = {
  ticketId: string;
  body: { message: string };
};

export type AllInnerTicketsSendingSendMessageAndFileRequest = {
  ticketId: string;
  body: FormData;
};

export type AllInnerTicketsSendingSendMessageAndFileResponse = {
  objectName: string;
  title: string;
  url: string;
  uploadFileId: number;
  ticketId: number;
};
