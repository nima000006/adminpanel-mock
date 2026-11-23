import { GetLegalWalletTransactionListAdvanceFilterResponse } from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListBranchTab/@types/@allTransactionListBranchTab";
import { GetPersonalWalletTransactionListAdvanceFilterResponse } from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListUsersTab/@types/@allTransactionListUsersTab";

import { GetWalletsTransactionsListByWalletIdResponse } from "../../../../@types/@allWalletsDetail";

export type SegmentTableProps = {
  data:
    | GetWalletsTransactionsListByWalletIdResponse
    | GetPersonalWalletTransactionListAdvanceFilterResponse
    | GetLegalWalletTransactionListAdvanceFilterResponse
    | undefined;
  loading: boolean;
};

//! APIs
export type GetWalletTransactionDetailResponse = {
  uuid: string;
  money: {
    totalAmount: number;
    currency: string;
    moneyType: string;
  };
  transactionSource: string;
  walletUuid: string;
  businessName: string;
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
  userId: number;
  ipgReferenceNo: string;
  referenceNo: string;
  trackNo: string;
  branchCode: number;
  branchName: string;
  transactionType: string;
  previousTransactionHash: string;
  currentTransactionHash: string;
  createdByUsername: string;
  service: string;
  createdDate: string;
  currentDate: string;
  degree: string;
  field: string;
  mobileNumber: string;
  facultyName: string;
  staffCode: string;
  province: string;
  city: string;
};
