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
//! APIS
export type MyTransactionSamimWalletMoneyDataType = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};

export type MyTransactionSamimWalletContentType = {
  facultyName: string;
  uuid: string;
  money: MyTransactionSamimWalletMoneyDataType;
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
};

export type GetMyTransactionSamimWalletListResponse = {
  content: MyTransactionSamimWalletContentType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetMyTransactionSamimWalletListRequest = {
  pageNumber: number;
  pageSize: number;
};
