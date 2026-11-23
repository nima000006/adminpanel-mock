import {
  SelectType,
  IdTitleName,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetMyBusinessAccountingSettlementRequest = {
  branchIds?: string;
  cityIds?: string;
  provinceIds?: string;
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

export type GetMyBusinessAccountingSettlementItem = {
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
};

export type GetMyBusinessAccountingSettlementResponse = {
  content: GetMyBusinessAccountingSettlementItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyBusinessInvoicesAndDocsSettlementFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  service: SelectType<IdTitleName>[];
  status: SelectType<IdTitleName>;
};
export type GetMyBusinessAccountingSettlementBannerRequest = {
  branchIds?: string;
  cityIds?: string;
  provinceIds?: string;
  fromDate?: string;
  toDate?: string;
  service?: string;
  settlementStatus?: string;
  uuids?: string;
};
export type GetMyBusinessAccountingSettlementBannerResponse = {
  allSettlementCounts: number;
  pendingSettlementCounts: number;
  pendingSettlementAmount: number;
  paidSettlementCounts: number;
  paidSettlementAmount: number;
  currency: IdTitleName;
  moneyType: IdTitleName;
};

export type GetBusinessSettlementByIdResponse = {
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

export type GetBusinessDocumentSettlementCountResponse = {
  total: number;
  amount: number;
};

export type GetBusinessDocumentSettlementCountRequest = {
  settlementId: string;
  params: {
    documentType: string;
  };
};

export type DocumentBusinessCreditSettlementRecordType = {
  uuid: string;
  createdTime: string;
  amount: number;
  walletTransactionUuid: string;
  status: string;
};

export type GetBusinessDocumentCreditSettlementResponse = {
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
  content: DocumentBusinessCreditSettlementRecordType[];
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

export type GetBusinessDocumentCreditSettlementRequest = {
  settlementId: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string | undefined;
    direction?: string | undefined;
  };
};

export type DocumentBusinessDebitSettlementRecordType = {
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

export type GetBusinessDocumentDebitSettlementResponse = {
  content: DocumentBusinessDebitSettlementRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetBusinessDocumentDebitSettlementRequest = {
  settlementId: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string | undefined;
    direction?: string | undefined;
  };
};
