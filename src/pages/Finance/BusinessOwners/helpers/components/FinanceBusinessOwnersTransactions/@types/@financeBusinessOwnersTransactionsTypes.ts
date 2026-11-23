export type FinanceBusinessOwnerTransactionDataType = {
  amount: number;
  businessId: number;
  businessName: string;
  branchName: string;
  branchId: number;
  status: string;
  isMain: true;
  invoiceCustomerId: number;
  invoiceSupplierId: number;
  product: string;
  documentId: number;
  createdDate: string;
  service: string;
  firstname: string;
  lastname: string;
  username: string;
  personalCode: string;
  mobileNumber: string;
  transactionId: number;
};

export type GetFinanceBusinessOwnerTransactionAdvanceFilterResponse = {
  content: FinanceBusinessOwnerTransactionDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetFinanceBusinessOwnerTransactionAdvanceFilterRequest = {
  from?: string;
  to?: string;
  status?: string;
  minAmount?: number;
  maxAmount?: number;
  username?: string;
  service?: string;
  isRefunded?: boolean;
  pageNumber: number;
  pageSize: number;
};
