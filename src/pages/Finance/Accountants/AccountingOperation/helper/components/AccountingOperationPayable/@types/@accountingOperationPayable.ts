import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetAccountingOperationPayableListRequest = {
  request?: {
    toDate?: string;
    samimService?: string;
    businessIds?: number[];
    provinceIds?: number[];
    cityIds?: number[];
    branchIds?: number[];
  };
  pageNumber: number;
  pageSize: number;
  sortBy?: "modifiedDate" | "createdDate";
  sortDirection?: "ASC" | "DESC";
};

export type GetAccountingOperationPayableListItems = {
  businessId: number;
  branchId: number;
  businessName: string;
  branchName: string;
  samimService: IdTitleName;
  documentCount: number;
  debitAmount: number;
  creditAmount: number;
  payableAmount: number;
  lastSettleDate: string;
  lastSettleDays: number;
};

export type GetAccountingOperationPayableListResponse = {
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
    paged: boolean;
    offset: number;
    sort: {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    }[];
    pageSize: number;
    unpaged: boolean;
  };
  last: boolean;
  first: boolean;
  size: number;
  content: GetAccountingOperationPayableListItems[];
  number: number;
  sort: {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }[];
  numberOfElements: number;
  empty: boolean;
};
