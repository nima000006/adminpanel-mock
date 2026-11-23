export type GeyMyBranchAccountingAmountTotalDiffResponse = {
  totalDebit: number;
  totalCredit: number;
  difference: number;
  totalNumber: number;
  debitPercentage: number;
  creditPercentage: number;
  beforeTotal: number;
  unSettledAmount: number;
  settledAggregationAmount: number;
  paidDocumentsAmount: number;
  waitingForPaymentDocumentAmount: number;
};
export type GeyMyBranchAccountingAmountTotalDiffRequest = {
  settlementStatuses?: string;
  from?: string;
  to?: string;
  samimServices?: string;
  branchIds?: number;
  businessIds?: number;
  documentType: string;
  cityIds?: number;
  provinceIds?: number;
  accountingInvoiceSettleStatus?: string;
  documentReasons: string[] | string;
  id?: string;
};
