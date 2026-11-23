export type Withdrawal = {
  id: number;
  walletUuid: string;
  walletId: number;
  amount: WithdrawalAmount;
  status: string;
  statusId: number;
  statusMessage: string;
  description: string;
  requestDate: string;
  approvalDate: string;
  paymentDate: string;
  referenceNo: string;
  trackingNo: string;
  adminFirstname: string;
  adminLastname: string;
  nationalCode: string;
  userId: number;
  isAutoApproved: boolean;
  createdDate: string;
  currentDate: string;
  withdrawTransactionUuid: string;
  depositTransactionUuid: string;
  bankAccount: BankAccount;
  staffId: number;
  staffType: string;
  personalCode: string;
  studyFieldTitle: string;
  degreeTitle: string;
  branchName: string;
  userStaffDetail: UserStaffDetail;
};

export type UserStaffDetail = {
  firstname: string;
  LastName: string;
  mobile: string;
  branchName: string;
  modifiedDate: string;
  branchCode: number;
  code: string;
  city: string;
  province: string;
  businessName: string;
  serviceName: string;
  businessType: number;
  bankAccount: {
    iban: string;
    cardNumber: string;
    isDefault: boolean;
    bankName: string;
  };
  staffType: "STUDENT" | "EMPLOYEE" | "ADMIN";
};

export type WithdrawalAmount = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};

export type BankAccount = {
  id: number;
  iban: string;
  cardNumber: string;
  name: string;
  isDefault: boolean;
  status: "REQUESTED" | "CONFIRMED" | "REJECTED" | string;
  bankId: number;
  bankName: string;
};

export type WithdrawalResponse = {
  content: Withdrawal[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type WithdrawalRequest = {
  walletType: "NONE" | "PERSONAL" | "LEGAL";
  status?:
    "REQUESTED" | "IN_PROGRESS" | "REJECTED" | "ACCEPTED" | "PAID" | "UNDEFINED" | string;
  params: {
    pageNumber: number;
    pageSize: number;
  };
};
