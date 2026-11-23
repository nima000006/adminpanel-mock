import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetMyBranchAccountingSettlementListRequest = {
  service?: string;
  fromDate?: string;
  toDate?: string;
  isPaid?: boolean;
  page: number;
  pageSize: number;
};
export type GetMyBranchAccountingSettlement = {
  id: number;
  samimService: string;
  amount: number;
  walletTransactionUuid: string;
  branchName: string;
  businessName: string;
  beneficiaryBranchName: string;
  beneficiaryBusinessName: string;
  branchId: number;
  businessId: number;
  creditDocumentCount: number;
  debitDocumentCount: number;
  documentCount: number;
  createdAt: string;
  createdBy: string;
};
export type GetMyBranchAccountingSettlementListResponse = {
  content: GetMyBranchAccountingSettlement[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type statisticsSettledMyBranchDataResponse = {
  allSettlementCounts: number;
  pendingSettlementCounts: number;
  pendingSettlementAmount: number;
  paidSettlementCounts: number;
  paidSettlementAmount: number;
  currency: IdTitleName;
  moneyType: IdTitleName;
};

export type statisticsSettledMyBranchDataRequest = {
  fromDate?: string;
  toDate?: string;
  service?: string;
  settlementStatus?: string;
  uuids?: string;
};

export type GetMyBranchAccountingSettlementSearchListItem = {
  uuid: string;
  businessName: string;
  businessId: number;
  branchName: string;
  branchId: number;
  samimService: IdTitleName;
  documentCount: number;
  debitAmount: number;
  creditAmount: number;
  payableAmount: number;
  paymentDate: string;
  status: IdTitleName;
  cityId: number;
  cityName: string;
  provinceId: number;
  provinceName: string;
  createDate: string;
  createUserId: number;
  createUserStaffId: number;
  createByName: string;
  currency: IdTitleName;
  moneyType: IdTitleName;
  amount: string;
};

export type GetMyBranchAccountingSettlementSearchListResponse = {
  content: GetMyBranchAccountingSettlementSearchListItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetMyBranchAccountingSettlementSearchListRequest = {
  fromDate?: string;
  toDate?: string;
  service?: string;
  settlementStatus?: string;
  uuids?: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: string;
};

export type GetBranchSettlementByIdResponse = {
  creditAmount: number;
  debitAmount: number;
  paidAmount: number;
  uuid: string;
  settlementStatus: IdTitleName;
  createdAt: string;
  attachedDocumentCount: number;
  createdByUserStaffId: number;
  createdByUserId: number;
  createdByName: string;
  currency: IdTitleName;
  moneyType: IdTitleName;
  businessId: number;
  businessName: string;
  branchName: string;
  branchId: number;
  samimService: IdTitleName;
  description: string;
};

export type GetBranchDocumentSettlementCountResponse = { total: number; amount: number };

export type GetBranchDocumentSettlementCountRequest = {
  settlementId: string;
  params: {
    documentType: string;
  };
};

export type DocumentBranchCreditSettlementRecordType = {
  uuid: string;
  createdTime: string;
  amount: number;
  walletTransactionUuid: string;
  status: string;
};

export type GetBranchDocumentCreditSettlementResponse = {
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
  first: boolean;
  last: boolean;
  size: number;
  content: DocumentBranchCreditSettlementRecordType[];
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

export type GetBranchDocumentCreditSettlementRequest = {
  settlementId: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string | undefined;
    direction?: string | undefined;
  };
};

export type DocumentBranchDebitSettlementRecordType = {
  uuid: string;
  accountingInvoiceId: string;
  settlementAggregationStatus: IdTitleName;
  accountingInvoiceSettleStatus: IdTitleName;
  amount: number;
  createdDateTime: string;
  businessName: string;
  branchName: string;
  beneficiaryName: string;
  serviceName: string;
  samimService: IdTitleName;
  description: string;
  documentType: IdTitleName;
  documentReason: IdTitleName;
};

export type GetBranchDocumentDebitSettlementResponse = {
  content: DocumentBranchDebitSettlementRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetBranchDocumentDebitSettlementRequest = {
  settlementId: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string | undefined;
    direction?: string | undefined;
  };
};
