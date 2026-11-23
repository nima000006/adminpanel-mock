/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  AdminSettlementAdvanceFilterResponse,
  GetAmountTurnOverResponse,
  GetTotalAmountTurnOverResponse,
  ParentAccountingAdvanceSearchResponse,
  getDocumentsAllPreviewResponse,
  GetDocumentDebitSettlementResponse,
  GetDocumentSettlementCountResponse,
  GetDocumentCreditSettlementResponse,
  DocumentIdResponse,
  GetAdminSettlementByIdResponse,
  GetAccountingTurnOverBannerResponse,
} from "../../@type/@turnOver";

export const ADMIN_SETTLEMENT_ADVANCE_FILTER_RESPONSE_MOCK: AdminSettlementAdvanceFilterResponse = {
  content: [{
  id: 1,
  samimService: "samimService-mock",
  amount: 10,
  walletTransactionUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  branchName: "نمونه branchName",
  businessName: "نمونه businessName",
  beneficiaryBranchName: "نمونه beneficiaryBranchName",
  beneficiaryBusinessName: "نمونه beneficiaryBusinessName",
  branchId: 1,
  businessId: 1,
  creditDocumentCount: 10,
  debitDocumentCount: 10,
  documentCount: 10,
  createdAt: "2026-05-02T10:20:27.741127",
  createdBy: "2026-05-02T10:20:27.741127",
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const GET_AMOUNT_TURN_OVER_RESPONSE_MOCK: GetAmountTurnOverResponse = {
  totalDebit: 10,
  totalCredit: 10,
  difference: 1,
  totalNumber: 10,
  debitPercentage: 1,
  creditPercentage: 1,
  beforeTotal: 10,
  unSettledAmount: 10,
  settledAggregationAmount: 10,
  paidDocumentsAmount: 10,
  waitingForPaymentDocumentAmount: 10,
};

export const GET_TOTAL_AMOUNT_TURN_OVER_RESPONSE_MOCK: GetTotalAmountTurnOverResponse = {
  totalAmount: 10,
  totalNumber: 10,
};

export const PARENT_ACCOUNTING_ADVANCE_SEARCH_RESPONSE_MOCK: ParentAccountingAdvanceSearchResponse = {
  content: [{
  id: 1,
  amount: 10,
  status: "ACTIVE",
  createdDate: "2026-05-02T10:20:27.741127",
  businessName: "نمونه businessName",
  businessId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  businessCode: "0012345678",
  businessBranchId: 1,
  serviceName: "نمونه serviceName",
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const GET_DOCUMENTS_ALL_PREVIEW_RESPONSE_MOCK: getDocumentsAllPreviewResponse = {
  totalPrice: {
  amount: 10,
  currency: "currency-mock",
  moneyType: "moneyType-mock",
},
  count: 10,
};

export const GET_DOCUMENT_DEBIT_SETTLEMENT_RESPONSE_MOCK: GetDocumentDebitSettlementResponse = {
  content: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  accountingInvoiceId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  settlementAggregationStatus: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  accountingInvoiceSettleStatus: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  amount: 10,
  createdDateTime: "2026-05-02T10:20:27.741127",
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  beneficiaryName: "نمونه beneficiaryName",
  serviceName: "نمونه serviceName",
  samimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  description: "نمونه description",
  documentType: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  documentReason: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const GET_DOCUMENT_SETTLEMENT_COUNT_RESPONSE_MOCK: GetDocumentSettlementCountResponse = {
  total: 10,
  amount: 10,
};

export const GET_DOCUMENT_CREDIT_SETTLEMENT_RESPONSE_MOCK: GetDocumentCreditSettlementResponse = {
  totalElements: 10,
  totalPages: 0,
  pageable: {
  pageNumber: 0,
  paged: true,
  offset: 1,
  sort: [{
  direction: "direction-mock",
  nullHandling: "nullHandling-mock",
  ascending: true,
  property: "property-mock",
  ignoreCase: true,
}],
  pageSize: 0,
  unpaged: true,
},
  first: true,
  last: true,
  size: 10,
  content: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  createdTime: "2026-05-02T10:20:27.741127",
  amount: 10,
  walletTransactionUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  status: "ACTIVE",
}],
  number: 1,
  sort: [{
  direction: "direction-mock",
  nullHandling: "nullHandling-mock",
  ascending: true,
  property: "property-mock",
  ignoreCase: true,
}],
  numberOfElements: 1,
  empty: true,
};

export const DOCUMENT_ID_RESPONSE_MOCK: DocumentIdResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  accountingInvoiceId: 10,
  amount: 10,
  createdDateTime: "2026-05-02T10:20:27.741127",
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  serviceName: "نمونه serviceName",
  beneficiaryName: "نمونه beneficiaryName",
  description: "نمونه description",
};

export const GET_ADMIN_SETTLEMENT_BY_ID_RESPONSE_MOCK: GetAdminSettlementByIdResponse = {
  creditAmount: 10,
  debitAmount: 10,
  paidAmount: 10,
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  settlementStatus: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  createdAt: "2026-05-02T10:20:27.741127",
  attachedDocumentCount: 10,
  createdByUserStaffId: 1,
  createdByUserId: 1,
  createdByName: "2026-05-02T10:20:27.741127",
  currency: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  moneyType: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  businessId: 1,
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  branchId: 1,
  samimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  description: "نمونه description",
};

export const GET_ACCOUNTING_TURN_OVER_BANNER_RESPONSE_MOCK: GetAccountingTurnOverBannerResponse = {
  totalCredits: 10,
  totalDebits: 10,
  balanceBeforeFrom: 1,
  balanceInPeriodTime: 1,
  currency: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  moneyType: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
};

export const ADMIN_SETTLEMENT_ADVANCE_FILTER_RECORD_TYPE_LIST_MOCK: AdminSettlementAdvanceFilterRecordType[] = [
{
  id: 1,
  samimService: "samimService-mock",
  amount: 10,
  walletTransactionUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  branchName: "نمونه branchName",
  businessName: "نمونه businessName",
  beneficiaryBranchName: "نمونه beneficiaryBranchName",
  beneficiaryBusinessName: "نمونه beneficiaryBusinessName",
  branchId: 1,
  businessId: 1,
  creditDocumentCount: 10,
  debitDocumentCount: 10,
  documentCount: 10,
  createdAt: "2026-05-02T10:20:27.741127",
  createdBy: "2026-05-02T10:20:27.741127",
},
{
  id: 2,
  samimService: "samimService-mock-2",
  amount: 10,
  walletTransactionUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  branchName: "نمونه branchName",
  businessName: "نمونه businessName",
  beneficiaryBranchName: "نمونه beneficiaryBranchName",
  beneficiaryBusinessName: "نمونه beneficiaryBusinessName",
  branchId: 2,
  businessId: 2,
  creditDocumentCount: 10,
  debitDocumentCount: 10,
  documentCount: 10,
  createdAt: "2026-05-02T10:20:27.741127",
  createdBy: "2026-05-02T10:20:27.741127",
},
];

export const PARENT_ACCOUNTING_ADVANCE_SEARCH_ITEM_LIST_MOCK: ParentAccountingAdvanceSearchItem[] = [
{
  id: 1,
  amount: 10,
  status: "ACTIVE",
  createdDate: "2026-05-02T10:20:27.741127",
  businessName: "نمونه businessName",
  businessId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  businessCode: "0012345678",
  businessBranchId: 1,
  serviceName: "نمونه serviceName",
},
{
  id: 2,
  amount: 10,
  status: "ACTIVE",
  createdDate: "2026-05-02T10:20:27.741127",
  businessName: "نمونه businessName",
  businessId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  businessCode: "0012345678",
  businessBranchId: 2,
  serviceName: "نمونه serviceName",
},
];

export const DOCUMENT_DEBIT_SETTLEMENT_RECORD_TYPE_LIST_MOCK: DocumentDebitSettlementRecordType[] = [
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  accountingInvoiceId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  settlementAggregationStatus: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  accountingInvoiceSettleStatus: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  amount: 10,
  createdDateTime: "2026-05-02T10:20:27.741127",
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  beneficiaryName: "نمونه beneficiaryName",
  serviceName: "نمونه serviceName",
  samimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  description: "نمونه description",
  documentType: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  documentReason: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
},
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  accountingInvoiceId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  settlementAggregationStatus: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  accountingInvoiceSettleStatus: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  amount: 10,
  createdDateTime: "2026-05-02T10:20:27.741127",
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  beneficiaryName: "نمونه beneficiaryName",
  serviceName: "نمونه serviceName",
  samimService: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  description: "نمونه description",
  documentType: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  documentReason: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
},
];

export const DOCUMENT_CREDIT_SETTLEMENT_RECORD_TYPE_LIST_MOCK: DocumentCreditSettlementRecordType[] = [
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  createdTime: "2026-05-02T10:20:27.741127",
  amount: 10,
  walletTransactionUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  status: "ACTIVE",
},
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  createdTime: "2026-05-02T10:20:27.741127",
  amount: 10,
  walletTransactionUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  status: "ACTIVE",
},
];
