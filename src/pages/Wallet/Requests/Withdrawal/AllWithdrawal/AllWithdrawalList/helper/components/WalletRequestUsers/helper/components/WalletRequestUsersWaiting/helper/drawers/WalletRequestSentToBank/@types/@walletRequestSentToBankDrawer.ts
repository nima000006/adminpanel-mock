import { Withdrawal } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@walletRequestUsersList";

export type WalletRequestSentToBankDrawerProps = {
  onClose: () => void;
  selectedUsers: Withdrawal[] | undefined;
  refreshData: () => void;
  getStats: () => void;
  from: "personal" | "business";
};

export type WithdrawalSendToBankRequestRequest = {
  ids: string;
};
