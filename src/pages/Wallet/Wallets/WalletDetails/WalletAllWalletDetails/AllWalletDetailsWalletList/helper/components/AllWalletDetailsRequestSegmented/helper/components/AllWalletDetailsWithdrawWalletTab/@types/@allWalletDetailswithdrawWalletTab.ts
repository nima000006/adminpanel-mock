import { FormInstance } from "antd";

import { AllWalletDetailsMyWalletSearchFormType } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/@types/@allWalletDetailsList";

//! LAYOUTs
export type AllWalletDetailsWithdrawWalletTabProps = {
  walletUuid: string | undefined;
  walletSearchForm: FormInstance<AllWalletDetailsMyWalletSearchFormType>;
};

//! APIs
export type AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType = {
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

export type AllWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterResponse = {
  content: AllWalletDetailsWalletWithdrawalRequestsListAdvanceFilterContentType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type AllWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterRequest = {
  pageNumber: number;
  pageSize: number;
  samimService: string;
  branchId: number;
  businessId: number;
  walletUuid: string;
  statuses?: string;
};
