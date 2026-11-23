import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContentProps =
  {
    onClose: () => void;
    uuid: string;
  };

export type getSettlementBeneficiariesDetailDocumentsRequest = {
  uuid: string;
};

export type getSettlementBeneficiariesDetailDocumentsResponse = {
  uuid: string;
  businessName: string;
  branchName: string;
  creditAmount: number;
  debitAmount: number;
  payableAmount: number;
  documentCount: number;
  aggregationDate: string;
  samimService: IdTitleName;
};

export type getSettlementBeneficiariesDetailDocumentsListRequest = {
  uuid: string;
  documentType: "CREDIT" | "DEBIT";
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: string;
};

export type getSettlementBeneficiariesDetailDocumentsContent = {
  uuid: string;
  amount: number;
  currency: IdTitleName;
  documentReason: IdTitleName;
  createdDate: string;
};
export type getSettlementBeneficiariesDetailDocumentsListResponse = {
  content: getSettlementBeneficiariesDetailDocumentsContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
