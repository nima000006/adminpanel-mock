import { Withdrawal } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@walletRequestUsersList";

export type WalletRequestReturnToRequestedDrawerProps = {
  onClose: () => void;
  selectedUsers: Withdrawal[] | undefined;
  refreshData: () => void;
  getStats: () => void;
};
