import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetAccountingAllSamimServiceResponse } from "@pages/Finance/Accountants/AccountingOperation/shared/@types/@accountingOperation";
import {
  GetFinanceBuyersListRequest,
  GetFinanceBuyersListResponse,
} from "@pages/Finance/Buyers/BuyersList/@types/@buyersList";

import { accountingApi } from "../accountingApi";

export const financeAccounting = accountingApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceBuyersList: builder.query<
      GetFinanceBuyersListResponse,
      GetFinanceBuyersListRequest
    >({
      query: (params) => ({
        url: `/admin/transaction/users/latest${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAccountingInvoiceType: builder.query<IdTitleName[], void>({
      query: () => ({
        url: "/enum/accounting-invoice-type",
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    getAccountingAllSamimService: builder.query<
      GetAccountingAllSamimServiceResponse,
      void
    >({
      query: () => ({
        method: "GET",
        url: `/enum/samim-service`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/accounting"],
    }),
  }),
});

export const {
  useLazyGetFinanceBuyersListQuery,
  useLazyGetAccountingInvoiceTypeQuery,
  useLazyGetAccountingAllSamimServiceQuery,
} = financeAccounting;
