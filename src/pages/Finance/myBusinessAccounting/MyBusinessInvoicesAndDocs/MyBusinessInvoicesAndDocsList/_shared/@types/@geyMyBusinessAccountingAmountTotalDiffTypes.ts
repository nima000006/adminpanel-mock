export type GeyMyBusinessAccountingAmountTotalDiffResponse = {
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
export type GeyMyBusinessAccountingAmountTotalDiffRequest = {
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
};
