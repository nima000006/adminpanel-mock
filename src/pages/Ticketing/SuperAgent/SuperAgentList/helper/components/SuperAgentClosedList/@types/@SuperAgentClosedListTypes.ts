import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type SuperAgentClosedTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type SuperAgentClosedTicketType = "PRIMARY" | "REFERENCED";

export type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type SuperAgentClosedListAndAdvanceFilterItems = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<SuperAgentClosedTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<SuperAgentClosedTicketType>;
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
  closeBy: string;
  closeById: number;
  rate: number;
};

export type SuperAgentClosedListAndAdvanceFilterResponse = {
  content: SuperAgentClosedListAndAdvanceFilterItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type SuperAgentClosedListAndAdvanceFilterRequest = {
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
  closedBy?: string;
  rates?: string;
  priority?: string;
  status?: string;
};

export type SuperAgentClosedListAndAdvanceFilterFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  services: SelectType<IdTitleName>[];
  topicIds: SelectType<IdTitleName>[];
  origin: SelectType<IdTitleName>;
  priority: SelectType<IdTitleName>[];
  rates: string[];
  ticketStatus: SelectType<IdTitleName>[];
  date: [string, string];
};
