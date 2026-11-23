import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TicketingAgentAssignedToMeAnsweredPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";

export type TicketingAgentAssignedToMeAnsweredType = "PRIMARY" | "REFERENCED";

export type TicketingAgentAssignedToMeAnsweredAdvanceFilterFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  origin: SelectType<IdTitleName>;
  priority: SelectType<IdTitleName>[];
  date: [string, string];
};

export type TicketingAgentAssignedToMeAnsweredListRequest = {
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
};

export type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type TicketingAgentAssignedToMeAnsweredRecord = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<TicketingAgentAssignedToMeAnsweredPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<TicketingAgentAssignedToMeAnsweredType>;
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
  rate: number;
  content: string;
  title: string;
  lastMessage: string;
  assignedToUserKeyCloakId: string;
  assignedToUserId: number;
  userId: number;
};

export type TicketingAgentAssignedToMeAnsweredListResponse = {
  content: TicketingAgentAssignedToMeAnsweredRecord[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
