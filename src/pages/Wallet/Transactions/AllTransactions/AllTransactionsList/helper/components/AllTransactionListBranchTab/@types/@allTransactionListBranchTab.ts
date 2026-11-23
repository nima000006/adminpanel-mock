import { AllTransactionDataType } from "../../AllTransactionListUsersTab/@types/@allTransactionListUsersTab";

export type GetLegalWalletTransactionListAdvanceFilterResponse = {
  content: AllTransactionDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetLegalWalletTransactionListAdvanceFilterRequest = {
  walletUuid?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  transactionType?: string | undefined;
  ipgTrackNo?: string | undefined;
  referenceNo?: string | undefined;
  trackNo?: string | undefined;
  uuid?: string | undefined;
  branchId?: number | undefined;
  pageNumber: number;
  pageSize: number;
};
