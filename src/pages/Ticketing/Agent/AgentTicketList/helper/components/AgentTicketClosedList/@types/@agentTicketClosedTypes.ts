import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AgentTicketClosedTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type AgentTicketClosedTicketType = "PRIMARY" | "REFERENCED";
export type AgentTicketClosedTypeOfClose =
  | "UNASSIGNED"
  | "WAITING_FOR_REPLY"
  | "REPLIED"
  | "USER_CLOSED"
  | "ADMIN_CLOSED"
  | "AUTO_CLOSED";

export type AgentClosedListAndAdvanceFilterRequest = {
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
  rates?: string;
  status?: string;
};

type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type AgentClosedListAndAdvanceFilterItems = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<AgentTicketClosedTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<AgentTicketClosedTicketType>;
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
  status: IdTitleNameLocal<AgentTicketClosedTypeOfClose>;
  waitingDays: number;
  rate: number;
  content: string;
  title: string;
  lastMessage: string;
  assignedToUserKeyCloakId: string;
  assignedToUserId: number;
  userId: number;
};

export type AgentClosedListAndAdvanceFilterResponse = {
  content: AgentClosedListAndAdvanceFilterItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type AgentTicketClosedAdvanceFilterFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  rate: SelectType<IdTitleName>[];
  origin: SelectType<IdTitleName>[];
  ticketStatusName: SelectType<IdTitleName>[];
  date: [string, string];
};

export type TicketClosedSearchFormType = {
  nationalCode: string;
};
