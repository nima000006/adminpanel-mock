import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TicketRolesListItem = {
  id: string;
  role: string;
  topicCount: number;
  samimServices: IdTitleName[];
};

export type TicketRolesListResponse = {
  content: TicketRolesListItem[];
  pageNumber: 0;
  pageSize: 0;
  first: true;
  last: true;
  totalElements: 0;
  totalPages: 0;
  size: 0;
};

export type TicketRolesListRequest = {
  samimServices?: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: string;
};
