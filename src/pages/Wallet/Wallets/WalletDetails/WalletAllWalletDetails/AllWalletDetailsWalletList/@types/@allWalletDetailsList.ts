//! LAYOUTs
export type AllWalletDetailsGetServicesListByBranchIdResponse = {
  id: number;
  title: string;
  name: string;
}[];

type AllWalletDetailsSelectType = {
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

export type AllWalletDetailsMyWalletSearchFormType = {
  business: AllWalletDetailsSelectType;
  branch: AllWalletDetailsSelectType;
  service: AllWalletDetailsSelectType & {
    item: {
      id: number;
      title: string;
      name: string;
    };
  };
};

export type AllWalletDetailsWithdrawalWalletFormType = {
  withdrawMount: number;
  bankAccountId: number;
};

//! APIs
export type AllWalletDetailsCreateWalletWithdrawalRequestRequest = {
  walletUuid: string;
  bankAccountId: number;
  params: {
    amount: number;
    requestUuid: string;
  };
};

export type AllWalletDetailsCreateWalletWithdrawalRequestResponse = {
  token: string;
  maskedMobileNumber: string;
  amount: number;
};
