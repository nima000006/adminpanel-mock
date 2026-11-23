import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! LAYOUTs
export type UseMyTransactionAdvanceFilterFormType = {
  transactionType: [
    {
      label: string;
      value: string;
      key: number;
      code: number;
      children: string;
      item: {
        id: number;
        title: string;
      };
    },
  ];
  date: [string, string];
};

//! APIs
export type MyTransactionMoneyDataType = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};

export type MyTransactionDataType = {
  uuid: string;
  money: MyTransactionMoneyDataType;
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
  gateWayPaymentTitle?: string;
  walletType?: IdTitleName;
};

export type GetMyTransactionListResponse = {
  content: MyTransactionDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetMyTransactionListRequest = {
  walletType: string;
  params: {
    pageNumber: number;
    pageSize: number;
  };
};

export type WalletMyTransactionMoneyType = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};

export type WalletMyTransactionDataType = {
  uuid: string;
  money: WalletMyTransactionMoneyType;
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
  walletType?: IdTitleName;
};

export type GetWalletMyTransactionResponse = {
  content: WalletMyTransactionDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetWalletMyTransactionRequest = {
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

export type WalletMyTransactionByAdvanceFilterRequest = {
  walletUuid?: string;
  from?: string;
  to?: string;
  transactionType?: string;
  ipgTrackNo?: string;
  referenceNo?: string;
  trackNo?: string;
  uuid?: string;
};

export type MyTransactionFilterMoneyDataType = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};

export type MyTransactionFilterDataType = {
  uuid: string;
  money: MyTransactionFilterMoneyDataType;
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
  userGroup: string;
  walletBranchCode: number;
  walletBranchName: string;
};

export type GetWalletMyTransactionAdvanceFilterResponse = {
  content: MyTransactionFilterDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetWalletMyTransactionAdvanceFilterRequest = {
  walletUuid?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  transactionType?: string | undefined;
  ipgTrackNo?: string | undefined;
  referenceNo?: string | undefined;
  trackNo?: string | undefined;
  uuid?: string | undefined;
  pageNumber?: number;
  pageSize?: number;
  branchId?: number | undefined;
  businessId?: number | undefined;
};
