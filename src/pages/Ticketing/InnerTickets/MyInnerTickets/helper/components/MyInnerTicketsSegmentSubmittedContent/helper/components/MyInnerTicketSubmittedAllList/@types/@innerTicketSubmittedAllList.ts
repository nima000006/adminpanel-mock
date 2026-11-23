import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TicketSubmittedAllFilterFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  ticketStatus: SelectType<IdTitleName>[];
  rate: SelectType<IdTitleName>[];
  closeType: SelectType<IdTitleName>[];
  ticketDate: [string, string];
};
export type InnerTicketSubmittedAllFilterItemsType = {
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
  status?: string;
};
export type InnerTicketSendingAllListAndAdvanceFilterRequest = {
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
  rate?: string;
  closeType?: string;
  status?: string;
};

export type InnerTicketSendingAllListAndAdvanceFilterRecordType = {
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
  closedByUserId: string;
};

export type InnerTicketSendingAllListAndAdvanceFilterResponse = {
  content: InnerTicketSendingAllListAndAdvanceFilterRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type InnerTicketStatusResponse = IdTitleName[];
