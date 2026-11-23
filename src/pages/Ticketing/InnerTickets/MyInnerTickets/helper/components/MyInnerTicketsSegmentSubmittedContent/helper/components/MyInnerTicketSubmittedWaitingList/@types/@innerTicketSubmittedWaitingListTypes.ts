import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type InnerTicketSendingPendingListAndAdvanceFilterItems = {
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
  assignedToUserId: number;
  lastMessage: string;
  lastAnswerAt: string;
  assignedToUserStaffIdName: string;
  rate: number;
  closeBy: string;
  closedByUserId: number;
};

export type InnerTicketSendingPendingListAndAdvanceFilterResponse = {
  content: InnerTicketSendingPendingListAndAdvanceFilterItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type InnerTicketSendingPendingListAndAdvanceFilterRequestItemsType = {
  topicIds?: string;
  services?: string;
  from?: string;
  to?: string;
  sortBy?: string;
  sortDirection?: string;
  mobileNumber?: string;
  personalCode?: string;
  ticketNumber?: string;
  nationalCode?: string;
  assignedUserStaffId?: string;
};
export type InnerTicketSendingPendingListAndAdvanceFilterRequest = {
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
  assignedUserStaffId?: string;
};

export type InnerTicketSendingPendingListAndAdvanceFilterFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  date: [string, string];
};
