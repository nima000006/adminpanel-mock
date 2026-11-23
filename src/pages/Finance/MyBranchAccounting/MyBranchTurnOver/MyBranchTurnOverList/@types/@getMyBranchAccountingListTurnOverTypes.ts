import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetMyBranchAccountingServicesResponse = string[];
export type GetMyBranchAccountingServicesRequest = {
  isPaid: boolean;
  branchId: number;
};

export type GetMyBranchAccountingBranches = {
  id: number;
  name: string;
};
export type GetMyBranchAccountingBranchesResponse = GetMyBranchAccountingBranches[];

export type GetMyBranchAccountingBranchesRequest = {
  isPaid: boolean;
};

export type GetMyBranchAccountingListTurnOverRequest = {
  settlementStatuses?: string;
  from?: string | number;
  to?: string | number;
  samimService?: string;
  branchId?: number;
  businessIds?: number;
  documentType?: string;
  provinceIds?: number;
  accountingInvoiceSettleStatus?: string;
  documentReasons: string[] | string;
  id?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

export type GetMyBranchAccountingListTurnOver = {
  uuid: string;
  amount: number;
  settlementAggregationStatus: IdTitleName;
  accountingInvoiceSettleStatus: IdTitleName;
  invoiceId: string;
  paymentDate: string;
  businessName: string;
  businessId: number;
  branchName: string;
  businessBranchId: number;
  samimService: IdTitleName;
  documentType: IdTitleName;
  provinceName: string;
  cityName: string;
  documentReason: IdTitleName;
  cityId: number;
  provinceId: number;
  createdDate: string;
};

export type GetMyBranchAccountingListTurnOverResponse = {
  content: GetMyBranchAccountingListTurnOver[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetMyBranchAccountingTurnOverBannerRequest = {
  from?: string;
  to?: string;
  samimServices?: string;
};

export type GetMyBranchAccountingTurnOverBannerResponse = {
  totalCredits: number;
  totalDebits: number;
  balanceBeforeFrom: number;
  balanceInPeriodTime: number;
  currency: IdTitleName;
  moneyType: IdTitleName;
};

export type GetMyBranchAccountingTurnOverListRequest = {
  from?: string;
  to?: string;
  samimServices: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: string;
};

export type GetMyBranchAccountingTurnOverListItem = {
  uuid: string;
  amount: number;
  invoiceId: string;
  businessName: string;
  businessId: number;
  branchName: string;
  businessBranchId: number;
  samimService: IdTitleName;
  documentType: IdTitleName;
  provinceName: string;
  cityName: string;
  documentReason: IdTitleName;
  cityId: number;
  provinceId: number;
  createdDate: string;
};
export type GetMyBranchAccountingTurnOverListResponse = {
  content: GetMyBranchAccountingTurnOverListItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
