import {
  AccountingSettledContent,
  AccountingSettledRequest,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";

export type SendAccountingOperationQueuePaidToBeneficiaryRequest = {
  businessIds?: number[];
  branchIds?: number[];
  fromDate?: string;
  toDate?: string;
  service?: string[];
  settlementStatus?: string[];
  cityIds?: number[];
  provinceIds?: number[];
  settlementIds?: string[];
  requestUuid: string;
};

export type AccountingOperationQueuePaidToBeneficiaryDrawerContentTypeProps = {
  onClose: () => void;
  isAllSelected?: boolean;
  uuids?: string[];
  selectedRows?: AccountingSettledContent[];
  filters: Partial<AccountingSettledRequest>;
  onSuccess: () => void;
};
