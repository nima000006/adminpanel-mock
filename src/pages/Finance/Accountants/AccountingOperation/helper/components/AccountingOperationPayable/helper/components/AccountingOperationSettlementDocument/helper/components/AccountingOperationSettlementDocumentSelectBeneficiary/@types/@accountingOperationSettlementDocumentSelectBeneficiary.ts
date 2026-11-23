import dayjs from "dayjs";

export type GetAccountingOperationSettlementDocumentBannerRequest = {
  toDate?: string;
  samimService?: string;
  businessIds?: number[];
  provinceIds?: number[];
  cityIds?: number[];
  branchIds?: number[];
};

export type SettlementDocumentFilters = {
  toDate: string;
  service: string;
  businessIds?: number[];
  provinceIds?: number[];
  cityIds?: number[];
  branchIds?: number[];
  allSelected?: boolean;
};

export type GetAccountingOperationSettlementDocumentBannerResponse = {
  totalDebitAmount: number;
  totalCreditAmount: number;
  totalPayableAmount: number;
};

export type AccountingOperationSettlementDocumentSelectBeneficiaryFormType = {
  date: dayjs.ConfigType;
  service: string;
  business: string[];
  city: string[];
  province: string[];
};
