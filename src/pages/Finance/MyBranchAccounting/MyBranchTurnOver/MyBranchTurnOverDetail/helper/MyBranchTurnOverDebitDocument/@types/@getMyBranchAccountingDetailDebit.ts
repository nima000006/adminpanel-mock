export type AccountingDetailDebit = {
  uuid: string;
  accountingInvoiceId: number;
  isPaid: boolean;
  amount: number;
  createdDateTime: string;
  businessName: string;
  branchName: string;
  beneficiaryName: string;
  serviceName: string;
  samimService: string;
  description: string;
  documentType: string;
  documentReason: string;
};
export type GetMyBranchAccountingDetailDebitResponse = {
  content: AccountingDetailDebit[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type GetMyBranchAccountingDetailDebitRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
  };
  settlementId: string;
};
