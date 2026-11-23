export type GetMyBusinessAccountingDetailServiceDocumentRequest = {
  id: string;
};
export type GetMyBusinessAccountingDetailServiceDocumentResponse = {
  uuid: string;
  accountingInvoiceId: number;
  isPaid: boolean;
  amount: number;
  createdDateTime: string;
  businessName: string;
  branchName: string;
  beneficiaryName: string;
  serviceName: string;
  description: string;
  samimService: string;
  documentType: string;
  documentReason: string;
};
