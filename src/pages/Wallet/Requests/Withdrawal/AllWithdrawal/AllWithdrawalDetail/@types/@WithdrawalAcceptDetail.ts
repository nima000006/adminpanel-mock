export type WithdrawalAcceptDetailParams = {
  fileUuid?: string;
  title?: string;
  description?: string;
};

export type WithdrawalAcceptDetailRequest = {
  id: number;
  params?: WithdrawalAcceptDetailParams;
};
