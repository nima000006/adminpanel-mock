import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! APIs
export type ContentDataType = {
  id: number;
};
export type GetBusinessListResponse = GENERAL_RESPONSE<{
  content: ContentDataType[];
  totalElements: number;
}>;
export type GetBusinessListRequest = {
  pageNo: number;
  pageSize: number;
};

export type AllBusinessListDataType = {
  waitingDays: null;
  id: number;
  businessTempHistoryId: number;
  status: string;
  statusId: number;
  applicantNationalCode: string;
  applicantName: string;
  applicantMobileNumber: string;
  businessTitle: string;
  personalityType: string;
  requestDate: string;
  lastEditDate: string;
  lastEditUser: string;
  responsibleManager: string;
};
export type GetAllBusinessListResponse = {
  content: AllBusinessListDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
