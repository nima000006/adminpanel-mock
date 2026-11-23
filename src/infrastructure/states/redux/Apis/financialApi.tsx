import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";
import {
  GetAdvanceFilterRequest,
  GetAdvanceFilterResponse,
  GetAdvanceFilterWithDateRequest,
  GetAdvanceFilterWithDateResponse,
  GetFinancialListRequest,
  GetFinancialListResponse,
} from "@pages/Financial/FinancialMain/helper/components/Factors/@types/@factorTables";

import {
  GetFactorDescRequest,
  GetFactorDescResponse,
  GetFactorDetailRequest,
  GetFactorDetailResponse,
} from "../../../../pages/Reports/financial/FinancialMain/Factors/helper/modal/ClearSettlementModal/@types/@clearSettlementModal";

export const financialApi = createApi({
  reducerPath: "api/financial",
  tagTypes: ["api/financial"],
  baseQuery: customBaseQuery({
    baseUrl: import.meta.env.VITE_URL_FINANCIAL_URL,
  }),
  endpoints: (builder) => ({
    getFinancialList: builder.mutation<GetFinancialListResponse, GetFinancialListRequest>(
      {
        query: (body) => ({
          url: "financial/getAllFinancialPayment",
          method: "POST",
          body,
        }),
        invalidatesTags: ["api/financial"],
      }
    ),
    getFactorDetail: builder.mutation<GetFactorDetailResponse, GetFactorDetailRequest>({
      query: (body) => ({
        url: "financial/getFinancialPaymentSpecification",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["api/financial"],
    }),
    postFactorDesc: builder.mutation<GetFactorDescResponse, GetFactorDescRequest>({
      query: (body) => ({
        url: "financial/updateFinancialPayment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/financial"],
    }),
    postFinancialAdvanceFilter: builder.mutation<
      GetAdvanceFilterResponse,
      GetAdvanceFilterRequest
    >({
      query: (body) => ({
        url: "financial/financialAdvancedFilter",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/financial"],
    }),
    FinancialAdvanceFilterWithDate: builder.mutation<
      GetAdvanceFilterWithDateResponse,
      GetAdvanceFilterWithDateRequest
    >({
      query: (body) => ({
        url: "financial/financialAdvancedFilterWithDate",
        method: "POST",
        body,
      }),
      invalidatesTags: ["api/financial"],
    }),
  }),
});

export const {
  useGetFinancialListMutation,
  useGetFactorDetailMutation,
  usePostFactorDescMutation,
  usePostFinancialAdvanceFilterMutation,
  useFinancialAdvanceFilterWithDateMutation,
} = financialApi;
