import { FormInstance } from "antd";

import { MyWalletDetailsMyWalletSearchFormType } from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/@types/@myWalletDetailsList";

//! LAYOUTs
export type MyWalletDetailsWithdrawWalletTabProps = {
  walletUuid: string | undefined;
  walletSearchForm: FormInstance<MyWalletDetailsMyWalletSearchFormType>;
};

//! APIs
export type MyWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType = {
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
  modifiedDate: string;
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
};

export type MyWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterResponse = {
  content: MyWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterRequest = {
  pageNumber: number;
  pageSize: number;
  samimService: string;
};
