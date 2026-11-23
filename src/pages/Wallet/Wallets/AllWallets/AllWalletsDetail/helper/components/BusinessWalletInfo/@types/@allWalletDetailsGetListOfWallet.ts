export type AllWalletDetailsGetListOfWalletResponse = {
  branchTitle: string;
  branchId: number;
  businessTitle: string;
  businessId: number;
  region: {
    provinceTitle: string;
    cityTitle: string;
    contryTitle: string;
  };
  branchOwnerFirstname: string;
  branchOwnerLastname: string;
  mobileNumber: string;
  wallets: WalletItem[];
};

export type WalletItem = {
  uuid: string;
  service: "CONSULTANT" | string;
  balance: {
    totalAmount: number;
    currency: "NONE" | string;
    moneyType: "NONE" | string;
  };
  recordStatus: number;
};
