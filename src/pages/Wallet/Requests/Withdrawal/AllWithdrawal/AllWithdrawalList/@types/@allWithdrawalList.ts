export type GetWithdrawalStatsResponse = {
  requested: number;
  rejected: number;
  accepted: number;
  total: number;
  sendToBank: number;
};
