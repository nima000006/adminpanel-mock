import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type SuperAgentAllTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type SuperAgentAllTicketType = "PRIMARY" | "REFERENCED";
export type SuperAgentAllTypeOfClose = "customer" | "system" | "agentOfTicket";
export type SuperAgentAllStatus =
  | "REPLIED"
  | "USER_CLOSED"
  | "ADMIN_CLOSED"
  | "AUTO_CLOSED"
  | "UNASSIGNED"
  | "WAITING_FOR_REPLY";

export type SuperAgentAllAdvanceFilterFormType = {
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

//! APIs

export type SuperAgentAllListTypes = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleName;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleName;
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
  status: IdTitleName;
  waitingDays: number;
  rate: string;
  content: string;
  closedBy: string;
  closedByUserId: string;
  assignedTo: string;
  title: string;
  lastMessage: string;
  assignedToUserKeyCloakId: string;
  assignedToUserId: number;
  userId: number;
};

export type TicketingSuperAgentAllListRequest = {
  branchIds?: string;
  provinceIds?: string;
  cityIds?: string;
  businessIds?: string;
  services?: string;
  origin?: string;
  topicIds?: string;
  priorities?: string;
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
  statuses?: string;
  // Todo[Atefeh]: delete if not needed in the future. these items were in the api request model but they were not in the figma
  // closedBy?: string;
  // assignedTo?: string;
};

export type TicketingSuperAgentAllListResponse = {
  content: SuperAgentAllListTypes[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
