/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  getSettlementBeneficiariesDetailDocumentsResponse,
  getSettlementBeneficiariesDetailDocumentsListResponse,
} from "../../@types/@accountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";

export const GET_SETTLEMENT_BENEFICIARIES_DETAIL_DOCUMENTS_RESPONSE_MOCK: getSettlementBeneficiariesDetailDocumentsResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  creditAmount: 10,
  debitAmount: 10,
  payableAmount: 10,
  documentCount: 10,
  aggregationDate: "2026-05-02T10:20:27.741127",
  samimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
};

export const GET_SETTLEMENT_BENEFICIARIES_DETAIL_DOCUMENTS_LIST_RESPONSE_MOCK: getSettlementBeneficiariesDetailDocumentsListResponse = {
  content: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  amount: 10,
  currency: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  documentReason: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  createdDate: "2026-05-02T10:20:27.741127",
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const GET_SETTLEMENT_BENEFICIARIES_DETAIL_DOCUMENTS_CONTENT_LIST_MOCK: getSettlementBeneficiariesDetailDocumentsContent[] = [
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  amount: 10,
  currency: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  documentReason: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  createdDate: "2026-05-02T10:20:27.741127",
},
{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  amount: 10,
  currency: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  documentReason: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  createdDate: "2026-05-02T10:20:27.741127",
},
];
