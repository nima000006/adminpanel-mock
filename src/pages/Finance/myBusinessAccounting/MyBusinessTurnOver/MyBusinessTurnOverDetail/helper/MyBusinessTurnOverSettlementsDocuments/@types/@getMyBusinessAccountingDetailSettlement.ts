export type GetMyBusinessAccountingDetailSettlementRequest = {
  id: string;
};
export type GetMyBusinessAccountingDetailSettlementResponse = {
  documentType: string;
  creditAmount: number;
  debitAmount: number;
  paidAmount: number;
  settlementDocumentId: number;
  createdAt: string;
  attachedDocumentCount: number;
  createdByName: string;
  businessName: string;
  branchName: string;
  samimService: string;
  serviceName: string;
  beneficiaryBranchName: string;
  description: string;
};
