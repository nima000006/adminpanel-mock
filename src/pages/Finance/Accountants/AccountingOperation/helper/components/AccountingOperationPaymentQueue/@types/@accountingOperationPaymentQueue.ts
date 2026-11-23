export type getAccountingOperationQueueBannerRequest = {
  businessIds?: string | undefined;
  branchIds?: string | undefined;
  service?: string | undefined;
  settlementStatus?: string[];
  cityIds?: number[];
  provinceIds?: number[];
  uuids?: string[];
};

export type getAccountingOperationQueueBannerResponse = {
  mainSystemWalletBalance: number;
  pendingForPaymentBalance: number;
};
