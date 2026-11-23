import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { GetFinanceBuyersDetailResponse } from "@pages/Finance/Buyers/BuyersDetails/@types/@buyersDetails";
import {
  GetFinanceBuyersListRequest,
  GetFinanceBuyersListResponse,
} from "@pages/Finance/Buyers/BuyersList/@types/@buyersList";

import { accountingApi } from "../accountingApi";

export const financeBuyers = accountingApi.injectEndpoints({
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
    getFinanceBuyersDetail: builder.query<GetFinanceBuyersDetailResponse, string>({
      query: (uuid) => ({
        url: `/admin/transaction/users/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetFinanceBuyersListQuery, useLazyGetFinanceBuyersDetailQuery } =
  financeBuyers;
