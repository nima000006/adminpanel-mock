import { Moment } from "jalali-moment";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyBusinessTurnOverFormType = {
  rangeDate: [Moment, Moment];
  branch: SelectType<IdTitle>;
  service: SelectType<IdTitleName>;
};

export type GetMyBusinessAccountingListTurnOverRequest = {
  settlementStatuses?: string;
  from?: string;
  to?: string;
  samimServices?: string;
  branchIds?: string;
  businessIds?: string;
  documentType?: string;
  cityIds?: string;
  provinceIds?: string;
  accountingInvoiceSettleStatus?: string;
  documentReasons?: string[] | string;
  id?: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: string;
};
export type GetMyBusinessAccountingListTurnOverResponse = {
  content: GetMyBusinessAccountingListTurnOver[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetMyBusinessAccountingListTurnOver = {
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

export type GetMyBusinessAccountingTurnOverBannerRequest = {
  from?: string;
  to?: string;
  samimServices?: string;
  branchIds?: number;
};

export type GetMyBusinessAccountingTurnOverBannerResponse = {
  totalCredits: number;
  totalDebits: number;
  balanceBeforeFrom: number;
  balanceInPeriodTime: number;
  currency: IdTitleName;
  moneyType: IdTitleName;
};

export type GetMyBusinessAccountingServicesResponse = string[];
export type GetMyBusinessAccountingServicesRequest = {
  isPaid: boolean;
  branchId: number;
};

export type GetMyBusinessAccountingBranches = {
  id: number;
  name: string;
};
export type GetMyBusinessAccountingBranchesResponse = GetMyBusinessAccountingBranches[];

export type GetMyBusinessAccountingBranchesRequest = {
  isPaid: boolean;
};
