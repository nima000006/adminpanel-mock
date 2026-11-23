import { Withdrawal } from "../../../@types/@walletRequestUsersList";

export type WithdrawalAcceptRequestRequest = {
  ids: number[];
  fileUuid?: string;
  title?: string;
  description?: string;
};

export type WalletRequestDrawerProps = {
  onClose: () => void;
  selectedUsers: Withdrawal[] | undefined;
  refreshData: () => void;
  getStats: () => void;
};

export type WalletRequestAcceptFlattenedDataType = Withdrawal & {
  firstname: string;
  LastName: string;
};
