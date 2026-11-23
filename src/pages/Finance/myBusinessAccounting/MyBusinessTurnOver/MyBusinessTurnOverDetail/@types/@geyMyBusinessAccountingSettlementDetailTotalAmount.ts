export type GeyMyBusinessAccountingSettlementDetailTotalAmountRequest = {
  settlementId: number;
  params: {
    documentType: string;
  };
};
export type GeyMyBusinessAccountingSettlementDetailTotalAmountResponse = {
  total: number;
  amount: number;
};
