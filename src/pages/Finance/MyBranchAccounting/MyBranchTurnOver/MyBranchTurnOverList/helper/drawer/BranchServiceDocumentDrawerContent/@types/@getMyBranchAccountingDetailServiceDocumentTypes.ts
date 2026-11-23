export type GetMyBranchAccountingDetailServiceDocumentRequest = {
  id: string;
};
export type GetMyBranchAccountingDetailServiceDocumentResponse = {
  uuid: string;
  accountingInvoiceId: number;
  isPaid: boolean;
  amount: number;
  createdDateTime: string;
  businessName: string;
  branchName: string;
  beneficiaryName: string;
  samimService: string;
  serviceName: string;
  description: string;
  documentType: string;
  documentReason: string;
};
