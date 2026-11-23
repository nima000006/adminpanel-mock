import { FormInstance } from "antd";

import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { MyWalletDetailsMyWalletSearchFormType } from "../../../../@types/@myWalletDetailsList";

//! LAYOUTs
export type MyWalletDetailsYourAccountDrawerContentProps = {
  closeDrawerHandler: () => void;
  walletSearchForm: FormInstance<MyWalletDetailsMyWalletSearchFormType>;
};

export type MyWalletDetailsAddBankAccountFormDataType = {
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
export type MyWalletDetailsCreateWalletBankAccountRequest = {
  iban: string;
  isDefault?: boolean;
  cardNumber: string;
  branchId: number;
  samimServices: string[];
  bankAccountNumber?: string;
};

export type MyWalletDetailsWalletBankAccountsDataType = {
  id: number;
  iban: string;
  isDefault: true;
  cardNumber: string;
  bankId: number;
  bankName: string;
  status: "ACCEPTED" | "REQUESTED" | "REJECTED";
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

export type MyWalletDetailsGetWalletBankAccountsListResponse = {
  content: MyWalletDetailsWalletBankAccountsDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyWalletDetailsGetWalletBankAccountsListRequest = {
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
export type MyWalletLegalDetailsWalletBankAccountsDataType = {
  id: number;
  iban: string;
  isDefault: boolean;
  cardNumber: string;
  bankId: number;
  bankName: string;
  status: string;
  createdDate: string;
  modifiedDate: string;
  branchName: string | null;
  branchCode: number | null;
  businessName: string | null;
  regionTitle: string | null;
  createdBy: {
    username: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
  province: string;
  city: string;
  services: IdTitleName[];
  personalityGroupType: IdTitleName;
};
export type MyWalletDetailsGetLegalWalletBankAccountsListResponse = {
  content: MyWalletLegalDetailsWalletBankAccountsDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyWalletDetailsGetLegalWalletBankAccountsListRequest = {
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
