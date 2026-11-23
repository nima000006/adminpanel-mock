import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type InnerTicketReceivedAssignedToMeAnsweredTicketPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";
export type InnerTicketReceivedAssignedToMeAnsweredTicketType = "PRIMARY" | "REFERENCED";
export type InnerTicketReceivedAssignedToMeAnsweredStatus =
  | "REPLIED"
  | "USER_CLOSED"
  | "ADMIN_CLOSED"
  | "UNASSIGNED"
  | "WAITING_FOR_REPLY"
  | "AUTO_CLOSED";

export type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type AllInnerTicketReceivedAssignedToMeAnsweredRecordType = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<InnerTicketReceivedAssignedToMeAnsweredTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<InnerTicketReceivedAssignedToMeAnsweredTicketType>;
  fullName: string;
  staffId: number;
  keycloakId: string;
  nationalCode: string;
  personalityCode: string;
  mobileNumber: string;
  branchName: string;
  cityName: string;
  provinceName: string;
  createdAt: string;
  lastAnswerAt: string;
  status: IdTitleNameLocal<InnerTicketReceivedAssignedToMeAnsweredStatus>;
  assignedToUserStaffIdName: string;
  waitingDays: number;
  rating: number;
  closedBy: string;
  closedByUserId: number;
  description: string;
  title: string;
  lastMessage: string;
  assignedToUserKeyCloakId: string;
  userId: number;
  assignedToUserId: number;
};
export type AllInnerTicketReceivedAssignedToMeAnsweredResponse = {
  content: AllInnerTicketReceivedAssignedToMeAnsweredRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type AllInnerTicketReceivedAssignedToMeAnsweredRequest = {
  branchIds?: string;
  provinceIds?: string;
  cityIds?: string;
  businessIds?: string;
  services?: string;
  origin?: string;
  topicIds?: string;
  priority?: string;
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

export type InnerTicketsAssignedToMeAdvanceFilterFormType = {
  province: string[];
  city: string[];
  branch: string[];
  service: string[];
  ticketType: string[];
  subjectIssue: string[];
  priority: string[];
  ticketDate: [string, string];
};

export type InnerTicketsAssignedToMeReceivedAnsweredAdvanceFilterFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  origin: SelectType<IdTitleName>;
  priority: SelectType<IdTitleName>[];
  date: [string, string];
};
