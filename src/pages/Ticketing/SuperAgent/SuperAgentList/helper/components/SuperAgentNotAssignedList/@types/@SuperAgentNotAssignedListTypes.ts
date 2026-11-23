import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type SuperAgentNotAssignedTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type SuperAgentNotAssignedTicketType = "PRIMARY" | "REFERENCED";

export type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type SuperAgentUnAssignedListAndAdvanceFilterItems = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<SuperAgentNotAssignedTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<SuperAgentNotAssignedTicketType>;
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
  title: string;
  description: string;
  lastMessage: string;
  assignedToUserKeyCloakId: string;
  assignedToUserId: number;
  userId: number;
  waitingDays: number;
};

export type SuperAgentUnAssignedListAndAdvanceFilterResponse = {
  content: SuperAgentUnAssignedListAndAdvanceFilterItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type SuperAgentUnAssignedListAndAdvanceFilterRequest = {
  branchIds?: string;
  provinceIds?: string;
  cityIds?: string;
  businessIds?: string;
  mobileNumber?: string;
  personalCode?: string;
  ticketNumber?: string;
  nationalCode?: string;
  topicIds?: string;
  services?: string;
  from?: string;
  to?: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: string;
  origin?: string;
  waitingDay?: string;
  priority?: string;
};

export type SuperAgentNotAssignedAdvanceFilterFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  origin: SelectType<IdTitleName>;
  priority: SelectType<IdTitleName>[];
  waitingDay: string[];
  date: [string, string];
};
