export type WithdrawalAllRequest = {
  walletType: string;
  params: {
    pageNumber: number;
    pageSize: number;
  };
};
export type WithdrawalAllResponse = {
  content: WithdrawalAll[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type WithdrawalAll = {
  id: number;
  walletUuid: string;
  walletId: number;
  amount: {
    totalAmount: number;
    currency: string;
    moneyType: string;
  };
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
  bankAccount: {
    id: number;
    iban: string;
    cardNumber: string;
    name: string;
    isDefault: boolean;
    status: string;
    bankId: number;
    bankName: string;
  };
  staffId: number;
  staffType: string;
  personalCode: string;
  studyFieldTitle: string;
  degreeTitle: string;
  branchName: string;
  userStaffDetail: UserStaffAllDetail;
};
export type UserStaffAllDetail = {
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
  businessType: number;
  serviceName: string;
  bankAccount: {
    iban: string;
    cardNumber: string;
    isDefault: boolean;
    bankName: string;
  };
  staffType: "STUDENT" | "EMPLOYEE" | "ADMIN";
};
