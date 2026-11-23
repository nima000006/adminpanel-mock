import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AccountingSettledRequest = {
  businessIds?: string;
  branchIds?: string;
  fromDate?: string;
  toDate?: string;
  service?: string;
  settlementStatus?: string;
  cityIds?: string;
  provinceIds?: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: string;
  uuid?: string;
};

export type AccountingSettledContent = {
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

export type AccountingSettledResponse = {
  content: AccountingSettledContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type statisticsSettledDataRequest = {
  businessIds?: string;
  branchIds?: string;
  fromDate?: string;
  toDate?: string;
  service?: string;
  settlementStatus?: string;
  cityIds?: string;
  provinceIds?: string;
  from?: string;
  to?: string;
};

export type statisticsSettledDataResponse = {
  allSettlementCounts: number;
  pendingSettlementCounts: number;
  pendingSettlementAmount: number;
  paidSettlementCounts: number;
  paidSettlementAmount: number;
  currency: IdTitleName;
  moneyType: IdTitleName;
};

export type FactorsAndDocsSettledDocumentsFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  status: IdTitle[];
  services: SelectType<IdTitleName>[];
};
