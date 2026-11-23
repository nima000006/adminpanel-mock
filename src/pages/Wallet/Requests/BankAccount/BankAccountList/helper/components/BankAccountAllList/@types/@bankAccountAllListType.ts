import { FormInstance } from "antd";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { AllWalletDetailsGetLegalWalletBankAccountsListResponse } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/drawer/AllWalletDetailsYourAccountDrawerContent/@types/@allWalletDetailsyourAccountDrawerContent";

import {
  BankAccountAdvanceFilterFormType,
  GetRequestBankAccountListResponse,
} from "../../../../@types/@bankAccountList";

export type BankAccountAllListProps = {
  data:
    | GetRequestBankAccountListResponse
    | AllWalletDetailsGetLegalWalletBankAccountsListResponse
    | null;
  // loading: boolean;
  filterItemsList: AdvanceFilterItemsListType[];
  form: FormInstance<BankAccountAdvanceFilterFormType>;
  loadingAdvance: boolean;
};
