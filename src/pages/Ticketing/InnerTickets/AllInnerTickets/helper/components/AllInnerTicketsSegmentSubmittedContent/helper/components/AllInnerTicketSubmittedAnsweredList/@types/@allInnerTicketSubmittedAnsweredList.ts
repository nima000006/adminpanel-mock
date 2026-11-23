import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type InnerTicketSubmittedAnsweredFilterItemsType = {
  topicIds?: string;
  services?: string;
  from?: string;
  to?: string;
  origin?: string;
  sortBy?: string;
  sortDirection?: string;
  mobileNumber?: string;
  personalCode?: string;
  ticketNumber?: string;
  nationalCode?: string;
  priorities?: string;
  waitingDays?: number;
};

export type GetInnerTicketSubmittedAnsweredRequest = {
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

export type InnerTicketSubmittedAnsweredRecordType = {
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

export type GetInnerTicketSubmittedAnsweredResponse = {
  content: InnerTicketSubmittedAnsweredRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type TicketSubmittedRepliedAdvancedFilterFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  ticketDate: [string, string];
};
