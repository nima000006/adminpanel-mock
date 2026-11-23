import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type InnerTicketSendingClosedListAndAdvanceFilterItems = {
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

export type InnerTicketSendingClosedListAndAdvanceFilterResponse = {
  content: InnerTicketSendingClosedListAndAdvanceFilterItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type InnerTicketSendingClosedListAndAdvanceFilterRequestItemsType = {
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
  closedByUserStaffId?: string;
  rate?: number;
  closeType?: string;
};
export type InnerTicketSendingClosedListAndAdvanceFilterRequest = {
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
  closedByUserStaffId?: string;
  rate?: number;
  closeType?: string;
};

export type InnerTicketSendingClosedListAndAdvanceFilterFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  rate: SelectType<IdTitleName>[];
  closeType: SelectType<IdTitleName>[];
  date: [string, string];
};
