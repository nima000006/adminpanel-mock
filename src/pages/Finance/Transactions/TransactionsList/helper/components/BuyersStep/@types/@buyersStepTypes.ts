import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetFinanceTransactionBuyerAdvanceFilterListItem = {
  transactionAmount: number;
  currency: IdTitleName;
  uuid: string;
  paymentDate: string;
  firstName: string;
  lastName: string;
  userName: string;
  personalNumber: string;
  phoneNumber: string;
  businessId: number;
  businessName: string;
  branchId: number;
  branchName: string;
  cityId: number;
  city: string;
  provinceId: number;
  province: string;
  samimService: IdTitleName;
  supplierBeneficiaries: {
    businessName: string;
    branchName: string;
  }[];
};

export type GetFinanceTransactionBuyerAdvanceFilterListResponse = {
  content: GetFinanceTransactionBuyerAdvanceFilterListItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetFinanceTransactionBuyerAdvanceFilterListRequest = {
  fromDate?: string;
  toDate?: string;
  provinceIds?: string;
  cityIds?: string;
  businessIds?: string;
  samimServices?: string;
  branchIds?: string;
  transactionUuid?: string;
  nationalCode?: string;
  mobileNumber?: string;
  employeeCode?: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: string;
  isRefunded?: boolean;
};
