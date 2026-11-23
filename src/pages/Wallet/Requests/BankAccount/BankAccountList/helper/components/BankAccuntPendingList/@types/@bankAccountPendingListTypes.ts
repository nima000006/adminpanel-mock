import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { AllWalletDetailsGetLegalWalletBankAccountsListResponse } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/drawer/AllWalletDetailsYourAccountDrawerContent/@types/@allWalletDetailsyourAccountDrawerContent";

import {
  BankAccountAdvanceFilterFormType,
  GetRequestBankAccountListResponse,
} from "../../../../@types/@bankAccountList";

// API
export type SendAllRejectRequest = {
  body: {
    bankAccountIds: number[];
    reason: string;
    description: string;
  };
  params: {
    bankAccountIds: number[];
    reason: string;
  };
};

export type BankAccountPendingListProps = {
  data:
    | GetRequestBankAccountListResponse
    | AllWalletDetailsGetLegalWalletBankAccountsListResponse
    | null;
  // loading: boolean;
  getListData: () => void;
  filterItemsList: AdvanceFilterItemsListType[];
  form: FormInstance<BankAccountAdvanceFilterFormType>;
  loadingAdvance: boolean;
  refreshCount: () => void;
};
