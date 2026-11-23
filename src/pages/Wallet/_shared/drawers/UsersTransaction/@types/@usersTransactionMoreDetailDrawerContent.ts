import { GetWalletTransactionDetailResponse } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/SegmentTable/@types/@segmentTable";

export type UsersTransactionMoreDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  transactionDetail: GetWalletTransactionDetailResponse | null;
  loading: boolean;
};
