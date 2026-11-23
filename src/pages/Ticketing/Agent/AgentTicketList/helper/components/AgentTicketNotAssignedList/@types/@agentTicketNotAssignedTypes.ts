import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AgentTicketNotAssignedTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type AgentTicketNotAssignedTicketType = "PRIMARY" | "REFERENCED";

export type UnAssignListFilterItemsType = {
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
  waitingDays?: string;
};
export type AgentTicketNotAssignedListAndAdvanceFilterRequest = {
  topicIds?: string;
  services?: string;
  from?: string;
  to?: string;
  origin?: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: string;
  mobileNumber?: string;
  personalCode?: string;
  ticketNumber?: string;
  nationalCode?: string;
  priorities?: string;
  waitingDays?: string;
};

type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type AgentTicketNotAssignedListAndAdvanceFilterItems = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<AgentTicketNotAssignedTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<AgentTicketNotAssignedTicketType>;
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
  status: IdTitle;
  waitingDays: number;
  rate: number;
  content: string;
  title: string;
  lastMessage: string;
  assignedToUserKeyCloakId: string;
  userId: number;
};

export type AgentTicketNotAssignedListAndAdvanceFilterResponse = {
  content: AgentTicketNotAssignedListAndAdvanceFilterItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type ViewMode = "card" | "table";
export type SortOrder = "none" | "asc" | "desc";

export type AgentTicketNotAssignedAdvanceFilterFormType = {
  services: SelectType<IdTitleName>[];
  ticketType: SelectType<IdTitleName>[];
  subjectIssue: SelectType<IdTitleName>[];
  priority: SelectType<IdTitleName>[];
  waitingTime: string[];
  topicIds: SelectType<IdTitleName>[];
  ticketDate: [string, string];
};

export type TicketOnAssignedSearchFormType = {
  nationalCode: string;
};
