import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type UseForeignNationalsRegistrationAdvanceFilterFormType = {
  date: string[];
};

export type ForeignBannerRequests = {
  fromDate?: string;
  toDate?: string;
};

export type ForeignBannerResponse = {
  rejected: number;
  accepted: number;
  pendingReview: number;
};

export type AllForeignFiltersRequest = {
  fromDate?: string;
  toDate?: string;
  firstName?: string;
  lastName?: string;
  regionId?: number;
  internationalCode?: string;
  mobileNumber?: string;
  studentNumber?: string;
  saorgCode?: string;
  sortBy?: string;
  sortDirection?: string;
};

export type AllForeignListRequest = {
  fromDate?: string;
  toDate?: string;
  firstName?: string;
  lastName?: string;
  regionId?: number;
  internationalCode?: string;
  mobileNumber?: string;
  studentNumber?: string;
  saorgCode?: string;
  requestsStatus: string;
  pageNumber: number;
  pageSize: number;
};

export type AllForeignListItemType = {
  region: string;
  firstName: string;
  lastName: string;
  internationalCode: string;
  saurgCode: string;
  mobileNumber: string;
  gender: IdTitleName;
  status: IdTitleName;
  birthDate: string;
  fatherName: string;
  id: number;
  createdDate: string;
  studentNumber: string;
  waitingDays: number;
};

export type AllForeignListResponse = {
  content: AllForeignListItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
