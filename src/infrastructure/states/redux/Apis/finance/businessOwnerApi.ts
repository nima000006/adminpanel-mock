import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetFinanceBusinessOwnerTransactionAdvanceFilterRequest,
  GetFinanceBusinessOwnerTransactionAdvanceFilterResponse,
} from "@pages/Finance/BusinessOwners/helpers/components/FinanceBusinessOwnersTransactions/@types/@financeBusinessOwnersTransactionsTypes";

import { accountingApi } from "../accountingApi";

export const financeBusinessOwner = accountingApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceBusinessOwnerTransactionAdvanceFilter: builder.query<
      GetFinanceBusinessOwnerTransactionAdvanceFilterResponse,
      GetFinanceBusinessOwnerTransactionAdvanceFilterRequest
    >({
      query: (params) => ({
        url: `/business-manager/transaction-beneficiary${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useLazyGetFinanceBusinessOwnerTransactionAdvanceFilterQuery } =
  financeBusinessOwner;
