//! APIs

import {
  IdTitleName,
  TicketingViewStatusNameType,
} from "@pages/Ticketing/_shared/@ticketingTypes";
import { TicketingAgentAssignedToMeAnsweredPriority } from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAssignedToList/helper/components/AgentTicketAssignedToMeAnsweredList/@types/@agentTicketAssignedToMeAnsweredList";

export type IssuesSubjectListType = {
  id: number;
  title: string;
  active: boolean;
  samimService: IdTitleName;
  priority: IdTitleName<TicketingAgentAssignedToMeAnsweredPriority>;
  viewStatus: IdTitleName<TicketingViewStatusNameType>;
  createDate: string;
  modifiedBy: string;
  modifiedByUserId: number;
  modifiedDate: string;
};

export type TicketIssuesSubjectListResponse = {
  content: IssuesSubjectListType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type TicketIssuesSubjectListRequest = {
  samimServices?: string;
  priorities?: string;
  topicName?: string;
  pageSize: number;
  pageNumber: number;
  activationStatus?: boolean;
  sortBy?: string;
  sortDirection?: string;
};
