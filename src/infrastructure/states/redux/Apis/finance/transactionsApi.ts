import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetFinanceTransactionAdvanceFilterListRequest,
  GetFinanceTransactionAdvanceFilterListResponse,
} from "@pages/Finance/Buyers/BuyersDetails/@types/@buyersDetails";
import { GetTransactionDetailResponse } from "@pages/Finance/Transactions/TransactionsList/@types/@transactionsList";
import { GetTransactionDetailFactorsResponse } from "@pages/Finance/Transactions/TransactionsList/helper/components/_shared/@types/@getTransactionDetailFactors";
import {
  GetFinanceTransactionBuyerAdvanceFilterListRequest,
  GetFinanceTransactionBuyerAdvanceFilterListResponse,
} from "@pages/Finance/Transactions/TransactionsList/helper/components/BuyersStep/@types/@buyersStepTypes";

import { accountingApi } from "../accountingApi";

export const financeTransactions = accountingApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceTransactionAdvanceFilterList: builder.mutation<
      GetFinanceTransactionAdvanceFilterListResponse,
      GetFinanceTransactionAdvanceFilterListRequest
    >({
      query: (body) => ({
        url: "/admin/transaction/advance-search",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["tag/accounting"],
    }),
    getFinanceTransactionBuyerAdvanceFilterList: builder.query<
      GetFinanceTransactionBuyerAdvanceFilterListResponse,
      GetFinanceTransactionBuyerAdvanceFilterListRequest
    >({
      query: (params) => ({
        url: `/admin/transaction/search${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    getTransactionDetail: builder.query<GetTransactionDetailResponse, string>({
      query: (uuid) => ({
        url: `/admin/transaction/${uuid}`,
        method: "GET",
      }),
    }),
    getTransactionDetailFactors: builder.query<
      GetTransactionDetailFactorsResponse,
      string
    >({
      query: (uuid) => ({
        url: `/admin/accounting-invoice/transaction/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFinanceTransactionAdvanceFilterListMutation,
  useLazyGetFinanceTransactionBuyerAdvanceFilterListQuery,
  useLazyGetTransactionDetailQuery,
  useLazyGetTransactionDetailFactorsQuery,
} = financeTransactions;
