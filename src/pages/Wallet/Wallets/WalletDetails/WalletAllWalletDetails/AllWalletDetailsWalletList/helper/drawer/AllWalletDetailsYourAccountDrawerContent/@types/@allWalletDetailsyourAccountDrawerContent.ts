import { FormInstance } from "antd";

import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";

import { AllWalletDetailsMyWalletSearchFormType } from "../../../../@types/@allWalletDetailsList";

//! LAYOUTs
export type AllWalletDetailsYourAccountDrawerContentProps = {
  closeDrawerHandler: () => void;
  walletSearchForm: FormInstance<AllWalletDetailsMyWalletSearchFormType>;
};

export type AllWalletDetailsAddBankAccountFormDataType = {
  iban: string;
  cardNumber: string;
  accountNumber: string;
  service: {
    label: string;
    title: string;
    value: string;
    key: number;
    item: {
      id: number;
      title: string;
      name: string;
    };
    code: number;
  };
};

//! APIs
export type AllWalletDetailsCreateWalletBankAccountRequest = {
  iban: string;
  isDefault?: boolean;
  cardNumber: string;
  branchId: number;
  samimServices: string[];
  bankAccountNumber?: string;
};

export type AllWalletDetailsWalletBankAccountsDataType = {
  id: number;
  iban: string;
  isDefault: true;
  cardNumber: string;
  bankId: number;
  bankName: string;
  status: string;
  createdDate: string;
  modifiedDate: string;
  branchName: null;
  branchCode: null;
  businessName: null;
  regionTitle: null;
  createdBy: {
    username: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
};

export type AllWalletDetailsGetWalletBankAccountsListResponse = {
  content: AllWalletDetailsWalletBankAccountsDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type AllWalletDetailsGetWalletBankAccountsListRequest = {
  username?: string;
  iban?: string;
  verified?: boolean;
  cardNumber?: string;
  isDefault?: boolean;
  bankId?: number;
  bankName?: string;
  status?: string;
  branchId?: number;
  samimService?: string;
  businessId?: number;
  pageNumber: number;
  pageSize: number;
};

export type AllWalletDetailsGetLegalWalletBankAccountsListResponse = {
  content: RequestBankAccountDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type AllWalletDetailsGetLegalWalletBankAccountsListRequest = {
  username?: string;
  iban?: string;
  verified?: boolean;
  cardNumber?: string;
  isDefault?: boolean;
  bankId?: number;
  bankName?: string;
  status?: string;
  branchId?: number;
  samimService?: string;
  businessId?: number;
  pageNumber: number;
  pageSize: number;
};
