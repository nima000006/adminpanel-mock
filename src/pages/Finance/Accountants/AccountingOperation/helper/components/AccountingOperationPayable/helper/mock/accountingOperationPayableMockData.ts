/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetAccountingOperationPayableListResponse,
} from "../../@types/@accountingOperationPayable";

export const GET_ACCOUNTING_OPERATION_PAYABLE_LIST_RESPONSE_MOCK: GetAccountingOperationPayableListResponse = {
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
  last: true,
  first: true,
  size: 10,
  content: [{
  businessId: 1,
  branchId: 1,
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  samimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  documentCount: 10,
  debitAmount: 10,
  creditAmount: 10,
  payableAmount: 10,
  lastSettleDate: "2026-05-02T10:20:27.741127",
  lastSettleDays: 1,
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

export const GET_ACCOUNTING_OPERATION_PAYABLE_LIST_ITEMS_LIST_MOCK: GetAccountingOperationPayableListItems[] = [
{
  businessId: 1,
  branchId: 1,
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  samimService: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  documentCount: 10,
  debitAmount: 10,
  creditAmount: 10,
  payableAmount: 10,
  lastSettleDate: "2026-05-02T10:20:27.741127",
  lastSettleDays: 1,
},
{
  businessId: 2,
  branchId: 2,
  businessName: "نمونه businessName",
  branchName: "نمونه branchName",
  samimService: { id: 2, title: "نمونه", name: "نمونه", value: "1" },
  documentCount: 10,
  debitAmount: 10,
  creditAmount: 10,
  payableAmount: 10,
  lastSettleDate: "2026-05-02T10:20:27.741127",
  lastSettleDays: 2,
},
];
