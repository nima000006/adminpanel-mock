//! LAYOUTs
import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type InnerTicketSegmentNotAssignedFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  date: string[];
};

//! APIs
export type GetInnerTicketSendingUnAssignedListRequest = {
  topicIds?: string;
  services?: string;
  from?: string;
  to?: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: string;
  mobileNumber?: string;
  personalCode?: string;
  ticketNumber?: string;
  nationalCode?: string;
};

export type InnerTicketSendingUnAssignedRecordType = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleName;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleName;
  createdAt: string;
  status: IdTitleName;
  description: string;
  title: string;
  assignedToUserKeyCloakId: string;
  lastMessage: string;
  closedByUserId: string;
  assignedToUserId: string;
};

export type GetInnerTicketSendingUnAssignedListResponse = {
  content: InnerTicketSendingUnAssignedRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
