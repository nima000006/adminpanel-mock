export type AllWalletsDetailListTableModelProps = {
  walletType: number;
  openUserDrawer: (id: string) => void;
  openBusinessDrawer: (id: string) => void;
};

export type AllWalletsDetailTransactionMoneyType = {
  totalAmount: number;
  currency: string;
  moneyType: string;
};
