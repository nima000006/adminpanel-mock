import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! APIS
export type AllTransactionSamimWalletMoneyDataType = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};

export type AllTransactionSamimWalletContentType = {
  facultyName: string;
  uuid: string;
  money: AllTransactionSamimWalletMoneyDataType;
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
  walletType?: IdTitleName;
};

export type GetAllTransactionSamimWalletListResponse = {
  content: AllTransactionSamimWalletContentType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetAllTransactionSamimWalletListRequest = {
  pageNumber: number;
  pageSize: number;
};
