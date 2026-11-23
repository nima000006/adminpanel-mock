export type SuperAgentAssignedToMeWaitingTicketPriority =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";
export type SuperAgentAssignedToMeWaitingTicketType = "PRIMARY" | "REFERENCED";

type SelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
    name?: string;
  };
  code: number;
};

export type SuperAgentAssignedToMeWaitingAdvanceFilterFormType = {
  province: SelectType[];
  city: SelectType[];
  branch: SelectType[];
  business: SelectType[];
  services: SelectType[];
  topicIds: SelectType[];
  origin: SelectType;
  priority: SelectType[];
  waitingDay: SelectType[];
  date: [string, string];
};

export type GetTicketSuperAgentAssignedToMeWaitingRequest = {
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
  priorities?: string;
  origin?: string;
};

export type IdTitle = {
  id: number;
  title: string;
};

export type IdTitleName<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type GetSuperAgentAssignedToMeWaitingRecord = {
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
  rate: number;
  description: string;
  title: string;
  lastMessage: string;
  assignedToUserKeyCloakId: string;
  assignedToUserId: number;
  userId: number;
  assignedToUserStaffIdName: string;
};

export type GetTicketSuperAgentAssignedToMeWaitingResponse = {
  content: GetSuperAgentAssignedToMeWaitingRecord[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
