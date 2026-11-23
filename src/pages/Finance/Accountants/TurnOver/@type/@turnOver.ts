import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { Moment } from "jalali-moment";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TurnOverFormType = {
  rangeDate: [Moment, Moment];
  business: SelectType<IdTitle>;
  branch: SelectType<IdTitle>;
  service: SelectType<IdTitleName>;
};

export type ClearedCreditDocumentTypes = {
  id: number;
  documentNumber: number;
  reasonOfCredit: string;
  amount: string;
  serviceName: string;
  createdDate: string;
};

export type AdminSettlementAdvanceFilterRequest = {
  service?: string;
  businessId?: number;
  branchId?: number;
  fromDate?: string;
  toDate?: string;
  isPaid?: boolean;
  page: number;
  pageSize: number;
};

export type AdminSettlementAdvanceFilterRecordType = {
  id: number;
  samimService: string;
  amount: number;
  walletTransactionUuid: string;
  branchName: string;
  businessName: string;
  beneficiaryBranchName: string;
  beneficiaryBusinessName: string;
  branchId: number;
  businessId: number;
  creditDocumentCount: number;
  debitDocumentCount: number;
  documentCount: number;
  createdAt: string;
  createdBy: string;
};

export type AdminSettlementAdvanceFilterResponse = {
  content: AdminSettlementAdvanceFilterRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type CreateSettlementRequest = {
  description: string;
  toDate: string;
  samimService: string;
  businessIds?: number[];
  provinceIds?: number[] | undefined;
  cityIds?: number[] | undefined;
  branchIds?: number[] | undefined;
};

export type CreateSettlementResponse = number;

export type GetAmountTurnOverRequest = {
  businessId?: number;
  branchId?: number;
  fromDate?: string;
  toDate?: string;
  isPaid?: boolean;

  settlementStatuses?: string;
  from?: string;
  to?: string;
  samimServices?: string;
  branchIds?: string;
  businessIds?: string;
  documentType?: string;
  cityIds?: string;
  provinceIds?: string;
  accountingInvoiceSettleStatus?: string;
  id?: string;
  documentReasons: string[] | string;
};

export type GetAmountTurnOverResponse = {
  totalDebit: number;
  totalCredit: number;
  difference: number;
  totalNumber: number;
  debitPercentage: number;
  creditPercentage: number;
  beforeTotal: number;
  unSettledAmount: number;
  settledAggregationAmount: number;
  paidDocumentsAmount: number;
  waitingForPaymentDocumentAmount: number;
};

export type GetTotalAmountTurnOverRequest = {
  service?: string;
  businessId?: number;
  branchId?: number;
  fromDate?: string;
  toDate?: string;
  isPaid?: boolean;
};

export type GetTotalAmountTurnOverResponse = {
  totalAmount: number;
  totalNumber: number;
};

import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type PaymentFormType = {
  fiscalYear?: [Dayjs, Dayjs];
  business: SelectType<{
    id: number;
    title: string;
    value?: string;
  }>;
  branch: SelectType<{
    id: number;
    title: string;
    value?: string;
  }>;
  service: SelectType<{
    id: number;
    title: string;
    value?: string;
  }>;
  paidStatus?: string;
  beneficial?: string;
};

export type DocumentsPaymentQueueTabProps = {
  form: FormInstance<PaymentFormType>;
  activeTab: string;
};
export type ClearedDocumentsTabProps = {
  form: FormInstance<PaymentFormType>;
  activeTab: string;
};

export type ParentAccountingAdvanceSearchItem = {
  id: number;
  amount: number;
  status: string;
  createdDate: string;
  businessName: string;
  businessId: string;
  businessCode: string;
  businessBranchId: number;
  serviceName: string;
};
export type ParentAccountingAdvanceSearchResponse = {
  content: ParentAccountingAdvanceSearchItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getDocumentsAllPreviewRequest = {
  branchCode: number;
  samimService: string | undefined;
  fromDate: string | undefined;
  toDate: string | undefined;
};

export type getDocumentsAllPreviewResponse = {
  totalPrice: {
    amount: number;
    currency: string;
    moneyType: string;
  };
  count: number;
};

export type getDocumentsPreviewRequest = {
  documentsUUID: string[];
  description?: string;
};

export type sendDocumentDrawerDataRequest = {
  documentsUUID: string[];
  description: string;
};

export type InfoPaymentDocumentSectionProps = {
  form: FormInstance<PaymentFormType>;
};

export type DocumentDebitSettlementRecordType = {
  uuid: string;
  accountingInvoiceId: string;
  settlementAggregationStatus: IdTitleName;
  accountingInvoiceSettleStatus: IdTitleName;
  amount: number;
  createdDateTime: string;
  businessName: string;
  branchName: string;
  beneficiaryName: string;
  serviceName: string;
  samimService: IdTitleName;
  description: string;
  documentType: IdTitleName;
  documentReason: IdTitleName;
};

export type GetDocumentDebitSettlementResponse = {
  content: DocumentDebitSettlementRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetDocumentDebitSettlementRequest = {
  settlementId: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string | undefined;
    direction?: string | undefined;
  };
};

export type ClearedDocumentsWalletQueueTypes = {
  id: number;
  documentNumber: number;
  documentCount: number;
  createdDate: string;
  amount: string;
  creator: string;
};

export type GetDocumentSettlementCountResponse = { total: number; amount: number };

export type GetDocumentSettlementCountRequest = {
  settlementId: string;
  params: {
    documentType: string;
  };
};

export type DocumentCreditSettlementRecordType = {
  uuid: string;
  createdTime: string;
  amount: number;
  walletTransactionUuid: string;
  status: string;
};

export type GetDocumentCreditSettlementResponse = {
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
    paged: boolean;
    offset: number;
    sort: {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    }[];
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  size: number;
  content: DocumentCreditSettlementRecordType[];
  number: number;
  sort: {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }[];
  numberOfElements: number;
  empty: boolean;
};

export type GetDocumentCreditSettlementRequest = {
  settlementId: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string | undefined;
    direction?: string | undefined;
  };
};

export type FactorsDocumentDrawerContentProps = {
  setOpenFactorsDocumentDrawer: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
  id: number;
};

export type DocumentIdRequest = {
  id: string;
};

export type DocumentIdResponse = {
  uuid: string;
  accountingInvoiceId: number;
  amount: number;
  createdDateTime: string;
  businessName: string;
  branchName: string;
  serviceName: string;
  beneficiaryName: string;
  description: string;
};

export type factorListType = {
  id: number;
  factorNum: number;
  transactionCount: number;
  totalTransaction: number;
};

//! LAYOUTs
export type SettlementDocumentsDrawerContentProps = {
  setSettlementDocumentsDrawer: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
  settlementDocumentsDrawer: {
    isOpen: boolean;
    id: number;
  };
  data: AdminSettlementAdvanceFilterResponse | undefined;
  getAdminSettlementDataHandler: () => void;
};

//! APIs
export type SendAdminSettlementByIdAndDescRequest = {
  id: number;
  params: {
    description: string;
  };
};

export type SelectedDocumentsProps = {
  data: AdminSettlementAdvanceFilterResponse | undefined;
  settlementDocumentsDrawer: {
    isOpen: boolean;
    id: number;
  };
  setDebitAmount: React.Dispatch<React.SetStateAction<number>>;
  setSettledInfo: React.Dispatch<
    React.SetStateAction<GetAdminSettlementByIdResponse | null>
  >;
};

//! APIs
export type GetAdminSettlementByIdResponse = {
  creditAmount: number;
  debitAmount: number;
  paidAmount: number;
  uuid: string;
  settlementStatus: IdTitleName;
  createdAt: string;
  attachedDocumentCount: number;
  createdByUserStaffId: number;
  createdByUserId: number;
  createdByName: string;
  currency: IdTitleName;
  moneyType: IdTitleName;
  businessId: number;
  businessName: string;
  branchName: string;
  branchId: number;
  samimService: IdTitleName;
  description: string;
};

export type TransferDocumentToPaymentModalContentProps = {
  form: FormInstance<PaymentFormType>;

  allDataSource: getDocumentsAllPreviewResponse | undefined;
  loading: boolean;
};

export type GetAccountingTurnOverBannerRequest = {
  from?: string;
  to?: string;
  samimServices?: string;
  branchIds?: string;
};

export type GetAccountingTurnOverBannerResponse = {
  totalCredits: number;
  totalDebits: number;
  balanceBeforeFrom: number;
  balanceInPeriodTime: number;
  currency: IdTitleName;
  moneyType: IdTitleName;
};
