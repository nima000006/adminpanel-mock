export type MoreDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  transactionUuid: string;
};

//! APIs
export type GetTransactionListDetailResponse = {
  uuid: string;
  money: {
    totalAmount: number;
    currency: string;
    moneyType: string;
  };
  transactionSource: string;
  walletUuid: string;
  walletUserName: string;
  walletFirstName: string;
  walletLastName: string;
  totalAmount: number;
  currency: string;
  moneyType: string;
  invoiceId: string;
  ipgTrackNo: string;
  ipgReferenceNo: string;
  referenceNo: string;
  trackNo: string;
  branchCode: number;
  branchName: string;
  businessName: string;
  staffCode: string;
  transactionType: string;
  previousTransactionHash: string;
  currentTransactionHash: string;
  createdByUsername: string;
  service: string;
  createdDate: string;
  currentDate: string;
  degree: string;
  field: string;
  facultyName: string;
  userId: number;
  province: string;
  city: string;
  mobileNumber: string;
  userGroup: string;
  fromWallet: string;
  toWallet: string;
  walletBranchCode: number;
  walletBranchName: string;
};
