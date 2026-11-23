import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetRefundRequestDetailResponse,
  SendSingleRejectAndConfirmRefundRequest,
} from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyDetail/@types/@returnMoneyDetail";
import {
  GetRefundRequestCountResponse,
  RefundRequestListAndAdvanceFilterRequest,
  RefundRequestListAndAdvanceFilterResponse,
} from "@pages/Finance/Requests/ReturnMoney/ReturnMoneyList/@types/@returnMoneyList";

import { accountingApi } from "../accountingApi";

export const financeRequests = accountingApi.injectEndpoints({
  endpoints: (builder) => ({
    getRefundRequestCount: builder.query<GetRefundRequestCountResponse, void>({
      query: () => ({
        url: `/admin/refund-request/status/count`,
        method: "GET",
      }),
    }),
    getRefundRequestDetail: builder.query<GetRefundRequestDetailResponse, string>({
      query: (uuid) => ({
        url: `/admin/refund-request/${uuid}`,
        method: "GET",
      }),
    }),
    getRefundRequestListAndAdvanceFilter: builder.query<
      RefundRequestListAndAdvanceFilterResponse,
      RefundRequestListAndAdvanceFilterRequest
    >({
      query: (params) => ({
        url: `/admin/refund-request/advance-filter${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    sendSingleRejectAndConfirmRefundRequest: builder.mutation<
      void,
      SendSingleRejectAndConfirmRefundRequest
    >({
      query: ({ id, params }) => ({
        url: `/admin/refund-request/${id}${createQueryString(params)}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetRefundRequestCountQuery,
  useLazyGetRefundRequestDetailQuery,
  useLazyGetRefundRequestListAndAdvanceFilterQuery,
  useSendSingleRejectAndConfirmRefundRequestMutation,
} = financeRequests;
