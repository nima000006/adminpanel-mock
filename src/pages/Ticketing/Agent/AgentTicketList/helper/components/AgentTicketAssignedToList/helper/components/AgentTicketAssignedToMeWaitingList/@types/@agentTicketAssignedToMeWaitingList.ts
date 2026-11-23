import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TicketingAgentAssignedToMeWaitingPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";

export type TicketingAgentAssignedToMeWaitingType = "PRIMARY" | "REFERENCED";

export type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type TicketingAgentAssignedToMeWaitingAdvanceFilterFormType = {
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  origin: SelectType<IdTitleName>;
  priority: SelectType<IdTitleName>[];
  waitingDay: SelectType<IdTitleName>[];
  date: [string, string];
};

export type TicketingAgentAssignedToMeWaitingRecord = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<TicketingAgentAssignedToMeWaitingPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<TicketingAgentAssignedToMeWaitingType>;
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

export type TicketingAgentAssignedToMeWaitingListResponse = {
  content: TicketingAgentAssignedToMeWaitingRecord[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type TicketingAgentAssignedToMeWaitingListRequest = {
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
