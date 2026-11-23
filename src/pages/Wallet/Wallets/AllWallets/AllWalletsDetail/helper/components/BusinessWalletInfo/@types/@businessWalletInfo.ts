import { WALLET_REQUEST_STATUS } from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import { WalletItem } from "./@allWalletDetailsGetListOfWallet";

//! LAYOUts
type BusinessWalletDetailsSelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
  };
  code: number;
};

export type BusinessWalletDetailsMyWalletSearchFormType = {
  business: BusinessWalletDetailsSelectType;
  branch: BusinessWalletDetailsSelectType;
  service: BusinessWalletDetailsSelectType & {
    item: {
      id: number;
      title: string;
      name: string;
    };
  };
};

export type GetLegalWalletsDetailResponse = {
  businessName: string;
  branchId: number;
  branchName: string;
  province: string;
  walletUuid: string;
  city: string;
  mobileNumber: null;
  money: {
    totalAmount: number;
    currency: string;
    moneyType: string;
  };
  wallets: WalletItem[];
};

export type AdminBankAccountPersonalResponse = BankAccountPersonal[];

export type BankAccountPersonal = {
  id: number;
  iban?: string;
  isDefault?: boolean;
  cardNumber?: string;
  bankId?: number;
  bankName?: string;
  status: keyof typeof WALLET_REQUEST_STATUS; // "ACCEPTED" | "REJECTED" | "REQUESTED" | undefined;
  createdDate?: string;
  modifiedDate?: string;
  branchName?: null;
  branchCode?: null;
  businessName?: null;
  regionTitle?: null;
  createdBy?: null;
};

export type AdminBankAccountPersonalRequest = {
  username: string;
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
