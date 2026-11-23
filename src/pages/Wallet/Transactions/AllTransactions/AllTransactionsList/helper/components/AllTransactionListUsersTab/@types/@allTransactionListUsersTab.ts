import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! LAYOUTs
export type UseAllTransactionAdvanceFilterFormType = {
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
export type AllTransactionMoneyDataType = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};

export type AllTransactionDataType = {
  uuid: string;
  money: AllTransactionMoneyDataType;
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
  userGroup?: string;
  gateWayPaymentTitle?: string;
  walletType?: IdTitleName;
  walletBranchCode: number;
  walletBranchName: string;
};

export type GetAllTransactionListResponse = {
  content: AllTransactionDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetAllTransactionListRequest = {
  walletType: string;
  params: {
    pageNumber: number;
    pageSize: number;
  };
};

export type GetPersonalWalletTransactionListAdvanceFilterResponse = {
  content: AllTransactionDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetPersonalWalletTransactionListAdvanceFilterRequest = {
  walletUuid?: string;
  from?: string;
  to?: string;
  transactionType?: string;
  ipgTrackNo?: string;
  referenceNo?: string;
  trackNo?: string;
  uuid?: string;
  pageNumber: number;
  pageSize: number;
};
