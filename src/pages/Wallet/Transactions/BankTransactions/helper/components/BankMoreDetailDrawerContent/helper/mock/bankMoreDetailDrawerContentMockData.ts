/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetBankTransactionDetailsResponse,
  transactionInquiryResponse,
} from "../../@types/@bankMoreDetailDrawerContent";

export const GET_BANK_TRANSACTION_DETAILS_RESPONSE_MOCK: GetBankTransactionDetailsResponse = {
  staffType: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  transactionDetailResponseDto: {
  amount: 10,
  topic: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  createdDateTime: "2026-05-02T10:20:27.741127",
  trackNumber: "trackNumber-mock",
  referenceNumber: "referenceNumber-mock",
  service: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  bank: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  successful: true,
  gateway: "gateway-mock",
},
  student: {
  firstname: "نمونه firstname",
  lastname: "نمونه lastname",
  nationalCode: "0012345678",
  studentNumber: "studentNumber-mock",
  mobileNumber: "09121234567",
  studyField: "studyField-mock",
  degree: "degree-mock",
  branchName: "نمونه branchName",
},
  employee: {
  firstname: "نمونه firstname",
  lastname: "نمونه lastname",
  nationalCode: "0012345678",
  employeeCode: "0012345678",
  mobileNumber: "09121234567",
  position: "position-mock",
  branchName: "نمونه branchName",
},
};

export const TRANSACTION_INQUIRY_RESPONSE_MOCK: transactionInquiryResponse = {
  status: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  amount: 10,
  cardNo: "cardNo-mock",
  retrievalRefNo: "retrievalRefNo-mock",
  responseCode: "0012345678",
  transactionDateTime: "2026-05-02T10:20:27.741127",
  message: "نمونه message",
  orderId: 1,
  systemTraceNo: "systemTraceNo-mock",
};
