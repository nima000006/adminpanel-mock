//! APIs
export type AllWalletDetailsWalletTransactionMoneyType = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};

export type AllWalletDetailsWalletTransactionDataType = {
  uuid: string;
  money: AllWalletDetailsWalletTransactionMoneyType;
  transactionSource: string;
  walletUuid: string;
  walletUserName: string;
  walletFirstName: string;
  walletLastName: string;
  totalAmount: number;
  currency: string;
  moneyType: string;
  invoiceId: string;
  bankAccount: {
    id: number;
    enTitle: string;
    enDescription: string;
    faTitle: string;
    faDescription: string;
    arTitle: string;
    arDescription: string;
    createdDate: string;
    modifiedDate: string;
    createdByUserStaff: string;
    modifiedByUserStaff: string;
    recordStatus: number;
    name: string;
    iban: string;
    status: string;
    description: string;
    cardNumber: string;
    username: string;
    bankId: number;
    bankName: string;
    businessId: number;
    businessFaTitle: string;
    branchId: number;
    branchFaTitle: string;
    services: string[];
    default: boolean;
  };
  ipgTrackNo: string;
  ipgReferenceNo: string;
  referenceNo: string;
  trackNo: string;
  branchCode: number;
  branchName: string;
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
};

export type AllWalletDetailsGetWalletTransactionResponse = {
  content: AllWalletDetailsWalletTransactionDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type AllWalletDetailsGetWalletTransactionRequest = {
  walletUuid?: string;
  from?: string;
  to?: string;
  transactionType?: string;
  ipgTrackNo?: string;
  referenceNo?: string;
  trackNo?: string;
  uuid?: string;
  walletType?: string;
  pageNumber: number;
  pageSize: number;
};

export type AllWalletDetailsWalletTransactionByAdvanceFilterRequest = {
  walletUuid?: string;
  from?: string;
  to?: string;
  transactionType?: string;
  ipgTrackNo?: string;
  referenceNo?: string;
  trackNo?: string;
  uuid?: string;
};
