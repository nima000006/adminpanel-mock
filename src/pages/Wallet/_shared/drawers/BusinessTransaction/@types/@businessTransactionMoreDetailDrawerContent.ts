import { GetWalletTransactionDetailResponse } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/SegmentTable/@types/@segmentTable";

export type BusinessTransactionMoreDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  transactionDetail: GetWalletTransactionDetailResponse | null;
  loading: boolean;
};
