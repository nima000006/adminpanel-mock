import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AgentTicketAllTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type AgentTicketAllTicketType = "PRIMARY" | "REFERENCED";
export type AgentTicketAllTypeOfClose = "customer" | "system" | "agentOfTicket";
export type AgentTicketAllStatus =
  | "REPLIED"
  | "USER_CLOSED"
  | "ADMIN_CLOSED"
  | "UNASSIGNED"
  | "WAITING_FOR_REPLY"
  | "AUTO_CLOSED";

export type TicketAllAdvancedFilterByExpertRequest = {
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
  status?: string;
  priorities?: string;
};

type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type TicketAllAdvancedFilterByExpertItems = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<AgentTicketAllTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<AgentTicketAllTicketType>;
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
  status: IdTitleNameLocal<AgentTicketAllStatus>;
  waitingDays: number;
  rate: number;
  content: string;
  title: string;
  lastMessage: string;
  assignedToUserKeyCloakId: string;
  userId: number;
};

export type TicketAllAdvancedFilterByExpertResponse = {
  content: TicketAllAdvancedFilterByExpertItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type ViewMode = "card" | "table";

export type AgentTicketAllAdvanceFilterFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  origin: SelectType<IdTitleName>;
  ticketDate: [string, string];
  priority: SelectType<IdTitleName>[];
  ticketStatus: SelectType<IdTitleName>[];
};

export type AllTicketSearchFormType = {
  nationalCode: string;
};
