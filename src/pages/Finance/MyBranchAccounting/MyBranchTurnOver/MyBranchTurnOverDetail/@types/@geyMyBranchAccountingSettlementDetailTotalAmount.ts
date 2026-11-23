export type GeyMyBranchAccountingSettlementDetailTotalAmountRequest = {
  settlementId: number;
  params: {
    documentType: string;
  };
};
export type GeyMyBranchAccountingSettlementDetailTotalAmountResponse = {
  total: number;
  amount: number;
};
