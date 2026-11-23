/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  statisticsDataTypes,
  TransactionListDataTypes,
  GetTransactionDetailResponse,
} from "../../@types/@transactionsList";

export const STATISTICS_DATA_TYPES_MOCK: statisticsDataTypes = {
  title: "نمونه title",
  count: 10,
  currency: "currency-mock",
};

export const TRANSACTION_LIST_DATA_TYPES_MOCK: TransactionListDataTypes = {
  id: 1,
  transactionAmount: 10,
  paymentType: "paymentType-mock",
  paymentMethod: "paymentMethod-mock",
  status: "ACTIVE",
  gatewayInvoiceNumber: "gatewayInvoiceNumber-mock",
  studentInvoiceNumber: "studentInvoiceNumber-mock",
};

export const GET_TRANSACTION_DETAIL_RESPONSE_MOCK: GetTransactionDetailResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  transactionAmount: 10,
  currency: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  transactionDate: "2026-05-02T10:20:27.741127",
  samimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  beneficiaryCount: 10,
  beneficiaries: [{
  id: 1,
  businessId: 1,
  businessName: "نمونه businessName",
  branchId: 1,
  branchName: "نمونه branchName",
  beneficiaryAmount: 10,
  beneficiaryPercentage: 1,
}],
  customerUserStaffId: 1,
  customerFullName: "نمونه customerFullName",
  customerFirstname: "نمونه customerFirstname",
  customerLastname: "نمونه customerLastname",
  customerPersonalCode: "0012345678",
  customerPhoneNumber: "09121234567",
  customerDegreeName: "نمونه customerDegreeName",
  customerFieldName: "نمونه customerFieldName",
  customerBranchId: 1,
  customerBranchName: "نمونه customerBranchName",
  customerBusinessId: 1,
  customerBusinessName: "نمونه customerBusinessName",
  customerUsername: "نمونه customerUsername",
};
