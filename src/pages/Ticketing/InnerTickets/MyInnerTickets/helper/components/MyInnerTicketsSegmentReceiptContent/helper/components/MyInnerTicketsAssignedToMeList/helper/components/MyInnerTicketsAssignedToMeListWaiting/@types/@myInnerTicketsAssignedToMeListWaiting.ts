import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type InnerTicketReceivedAssignedToMeWaitingTicketPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";
export type InnerTicketReceivedAssignedToMeWaitingTicketType = "PRIMARY" | "REFERENCED";
export type InnerTicketReceivedAssignedToMeWaitingStatus =
  | "REPLIED"
  | "USER_CLOSED"
  | "ADMIN_CLOSED"
  | "UNASSIGNED"
  | "WAITING_FOR_REPLY"
  | "AUTO_CLOSED";

export type TicketingReceivedAssignedToMeWaitingListRequest = {
  branchIds?: string;
  provinceIds?: string;
  cityIds?: string;
  businessIds?: string;
  services?: string;
  origin?: string;
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
  waitingDay?: string;
};

export type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type InnerTicketReceivedAssignedToMeWaitingRecordType = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<InnerTicketReceivedAssignedToMeWaitingTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<InnerTicketReceivedAssignedToMeWaitingTicketType>;
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
  status: IdTitleNameLocal<InnerTicketReceivedAssignedToMeWaitingStatus>;
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

export type TicketingReceivedAssignedToMeWaitingListResponse = {
  content: InnerTicketReceivedAssignedToMeWaitingRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type InnerTicketsAssignedToMeReceivedWaitingAdvanceFilterFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  origin: SelectType<IdTitleName>;
  waitingDay: SelectType<IdTitleName>;
  priority: SelectType<IdTitleName>[];
  date: [string, string];
};
