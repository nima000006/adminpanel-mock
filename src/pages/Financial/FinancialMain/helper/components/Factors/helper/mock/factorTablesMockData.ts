/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetFactorDescResponse,
  GetFactorDetailResponse,
  GetFinancialListResponse,
  GetAdvanceFilterResponse,
} from "../../@types/@factorTables";

export const GET_FACTOR_DESC_RESPONSE_MOCK: GetFactorDescResponse = {
  status: 1,
  msg: "نمونه msg",
  data: null,
};

export const GET_FACTOR_DETAIL_RESPONSE_MOCK: GetFactorDetailResponse = {
  status: 1,
  msg: "نمونه msg",
  data: {
  sumAmount: 10,
  sumUniversityReceive: 1,
  countFactorNo: 10,
},
};

export const GET_FINANCIAL_LIST_RESPONSE_MOCK: GetFinancialListResponse = {
  status: 1,
  msg: "نمونه msg",
  data: {
  totalElement: 10,
  totalPage: 0,
  last: true,
  financialPaymentDtos: [null],
},
};

export const GET_ADVANCE_FILTER_RESPONSE_MOCK: GetAdvanceFilterResponse = {
  status: 1,
  msg: "نمونه msg",
  data: {
  totalElement: 10,
  paymentRequestDtoList: [null],
},
};
