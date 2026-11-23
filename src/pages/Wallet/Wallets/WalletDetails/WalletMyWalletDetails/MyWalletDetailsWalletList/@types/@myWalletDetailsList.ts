//! LAYOUTs
export type MyWalletDetailsGetServicesListByBranchIdResponse = {
  id: number;
  title: string;
  name: string;
}[];

type MyWalletDetailsSelectType = {
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

export type MyWalletDetailsMyWalletSearchFormType = {
  business: MyWalletDetailsSelectType;
  branch: MyWalletDetailsSelectType;
  service: MyWalletDetailsSelectType & {
    item: {
      id: number;
      title: string;
      name: string;
    };
  };
};

export type MyWalletDetailsWithdrawalWalletFormType = {
  withdrawMount: number;
  bankAccountId: number;
};

//! APIs
export type MyWalletDetailsCreateWalletWithdrawalRequestRequest = {
  walletUuid: string;
  bankAccountId: number;
  params: {
    amount: number;
    requestUuid: string;
  };
};
export type MyWalletDetailsCreateWalletWithdrawalRequestResponse = {
  token: string;
  maskedMobileNumber: string;
  amount: number;
};
