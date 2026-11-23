import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type InnerTicketAllReceivedAssignedToMeWaitingTicketPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";
export type InnerTicketAllReceivedAssignedToMeWaitingTicketType =
  | "PRIMARY"
  | "REFERENCED";
export type InnerTicketAllReceivedAssignedToMeWaitingStatus =
  | "REPLIED"
  | "USER_CLOSED"
  | "ADMIN_CLOSED"
  | "UNASSIGNED"
  | "WAITING_FOR_REPLY"
  | "AUTO_CLOSED";

export type TicketingAllReceivedAssignedToMeWaitingListRequest = {
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

export type InnerTicketAllReceivedAssignedToMeWaitingRecordType = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<InnerTicketAllReceivedAssignedToMeWaitingTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<InnerTicketAllReceivedAssignedToMeWaitingTicketType>;
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
  status: IdTitleNameLocal<InnerTicketAllReceivedAssignedToMeWaitingStatus>;
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

export type TicketingAllReceivedAssignedToMeWaitingListResponse = {
  content: InnerTicketAllReceivedAssignedToMeWaitingRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type InnerTicketsAllAssignedToMeReceivedWaitingAdvanceFilterFormType = {
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
