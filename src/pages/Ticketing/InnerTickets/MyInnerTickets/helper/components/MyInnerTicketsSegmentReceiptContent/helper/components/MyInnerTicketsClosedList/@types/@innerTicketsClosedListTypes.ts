import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyInnerTicketsClosedTicketPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type MyInnerTicketsClosedTicketType = "PRIMARY" | "REFERENCED";

export type IdTitleNameLocal<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type MyInnerTicketsClosedListAndAdvanceFilterItems = {
  ticketNumber: number;
  uuid: string;
  priority: IdTitleNameLocal<MyInnerTicketsClosedTicketPriority>;
  service: IdTitleName;
  topic: IdTitle;
  originTicket: IdTitleNameLocal<MyInnerTicketsClosedTicketType>;
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

export type MyInnerTicketsClosedListAndAdvanceFilterResponse = {
  content: MyInnerTicketsClosedListAndAdvanceFilterItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyInnerTicketsClosedListAndAdvanceFilterRequest = {
  branchIds?: string;
  provinceIds?: string;
  cityIds?: string;
  businessIds?: string;
  mobileNumber?: string;
  personalCode?: string;
  ticketNumber?: string;
  nationalCode?: string;
  services?: string;
  origin?: string;
  topicIds?: string;
  priority?: string;
  from?: string;
  to?: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: string;
  closedBy?: string;
  assignedTo?: string;
  closedType?: string;
  rates?: string;
};

export type MyInnerTicketsClosedListAndAdvanceFilterFormType = {
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
