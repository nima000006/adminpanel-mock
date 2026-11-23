import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AccountingInvoicedTransactionRequest = {
  pageable: {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    }[];
    unpaged: boolean;
  };
  from?: string;
  to?: string;
  status?: string;
  branchId?: number;
  serviceName?: string;
};

export type TransactionItem = {
  transactionAmount: number;
  transactionAmountType: string;
  serviceName: string;
  paymentType: string;
  paymentWay: string;
  status: string;
  paidInvoiceId: string;
  trackNumber: string;
  paymentDate: string;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  id: number;
};

export type AccountingInvoicedTransactionResponse = {
  content: TransactionItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type BeneficiaryResponseDto = {
  amount: number;
  businessId: number;
  businessName: string;
  branchName: string;
  branchId: number;
  accountingInvoiceStatus: IdTitleName;
  paid: boolean;
  isSupplier: boolean;
  invoiceCustomerId: number;
  invoiceSupplierId: number;
  product: string;
  createdDate: string;
  service: string;
  firstname: string;
  lastname: string;
  username: string;
  personalCode: string;
  mobileNumber: string;
  transactionId: number;
  DocumentType: IdTitleName;
  beneficiaryPercentage: number;
};

export type AccountingInvoicedTransactionDetailsResponse = {
  amount: number;
  firstName: string;
  lastName: string;
  username: string;
  userStaffId: number;
  phone: string;
  userStaffType: string;
  tenantId: string;
  branchCode: number;
  branchName: string;
  paidInvoiceId: string;
  paymentDate: string;
  status: "TO_BE_INVOICED" | string;
  samimService: "CONSULTANT" | string;
  personalCode: string;
  referenceNumber: string;
  trackNumber: string;
  beneficiaryResponseDtoSet: BeneficiaryResponseDto[];
};
