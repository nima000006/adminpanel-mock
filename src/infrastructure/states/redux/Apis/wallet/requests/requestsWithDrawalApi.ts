import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { WithdrawalAcceptDetailRequest } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalDetail/@types/@WithdrawalAcceptDetail";
import { WithdrawalDetailResponse } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalDetail/@types/@withdrawalDetail";
import { WithdrawalRejectDetailRequest } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalDetail/@types/@withdrawalRejectDetail";
import { GetWithdrawalStatsResponse } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/@types/@allWithdrawalList";
import {
  WithdrawalRequest,
  WithdrawalResponse,
} from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@walletRequestUsersList";
import { GetWithdrawalAdvanceFilterLegalListRequest } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@withdrawalAdvanceFilterLegalList";
import { GetWithdrawalAdvanceFilterPersonalListRequest } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/@types/@withdrawalAdvanceFilterPersonalList";
import { WithdrawalAcceptRequestRequest } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/components/WalletRequestDrawer/@types/@withdrawalAcceptRequest";
import { GetRejectReasonSelectListResponse } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/components/WalletRequestRejectedDrawer/helper/@types/@getRejectReasonSelectList";
import { WithdrawalRejectRequestRequest } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/_shared/components/WalletRequestRejectedDrawer/helper/@types/@withdrawalRejectRequest";
import {
  WithdrawalAllRequest,
  WithdrawalAllResponse,
} from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/helper/components/WalletRequestUsers/helper/components/WalletRequestUsersAll/@types/@walletRequestUsersAll";
import { WithdrawalSendToBankRequestRequest } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalList/helper/components/WalletRequestUsers/helper/components/WalletRequestUsersWaiting/helper/drawers/WalletRequestSentToBank/@types/@walletRequestSentToBankDrawer";

import { walletApi } from "../../walletApi";

export const requestsWithDrawalApi = walletApi.injectEndpoints({
  endpoints: (builder) => ({
    getWithdrawalStats: builder.query<GetWithdrawalStatsResponse, { walletType: string }>(
      {
        query: ({ walletType }) => ({
          url: `/admin/withdrawal-requests/${walletType}/stats`,
          method: "GET",
        }),
      }
    ),
    getWithdrawalList: builder.query<WithdrawalResponse, WithdrawalRequest>({
      query: ({ walletType, status, params }) => ({
        url: `/admin/withdrawal-request/${walletType}/${status}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    //! all list
    getWithdrawalAllList: builder.query<WithdrawalAllResponse, WithdrawalAllRequest>({
      query: ({ walletType, params }) => ({
        url: `/admin/withdrawal-request/${walletType}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getRejectReasonSelectList: builder.query<GetRejectReasonSelectListResponse, void>({
      query: () => ({
        url: "/admin/withdrawal-requests/reject-reason",
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
    }),
    //! detail
    getWithdrawalDetail: builder.query<
      WithdrawalDetailResponse,
      { withdrawalRequestsId: number }
    >({
      query: ({ withdrawalRequestsId }) => ({
        url: `/admin/withdrawal-requests/detail/${withdrawalRequestsId}`,
        method: "GET",
      }),
    }),
    //! advance filter
    getWithdrawalAdvanceFilterPersonalList: builder.query<
      WithdrawalResponse,
      GetWithdrawalAdvanceFilterPersonalListRequest
    >({
      query: (params) => {
        return {
          url: `/admin/withdrawal-requests/personal/advanced-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),

    getWithdrawalAdvanceFilterLegalList: builder.query<
      WithdrawalResponse,
      GetWithdrawalAdvanceFilterLegalListRequest
    >({
      query: (params) => {
        return {
          url: `/admin/withdrawal-requests/legal/advanced-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),

    //! bulk accept and reject
    withdrawalRejectRequest: builder.mutation<void, WithdrawalRejectRequestRequest>({
      query: (body) => {
        return {
          url: `/admin/withdrawal-requests/reject`,
          method: "PUT",
          body,
        };
      },
    }),

    withdrawalAcceptRequest: builder.mutation<void, WithdrawalAcceptRequestRequest>({
      query: (body) => {
        return {
          url: `/admin/withdrawal-requests/accept`,
          method: "PUT",
          body,
        };
      },
    }),
    withdrawalSendToBankRequest: builder.mutation<
      void,
      WithdrawalSendToBankRequestRequest
    >({
      query: ({ ids }) => {
        return {
          url: `/admin/withdrawal-requests/send-to-bank${createQueryString({ ids })}`,
          method: "PUT",
        };
      },
    }),
    withdrawalSingleSendToBankRequest: builder.mutation<void, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/admin/withdrawal-requests/${id}/send-to-bank`,
          method: "PUT",
        };
      },
    }),
    withdrawalSingleRevertToRequestedRequest: builder.mutation<void, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/admin/withdrawal-requests/${id}/revert-to-request`,
          method: "PUT",
        };
      },
    }),
    withdrawalRevertToRequestedRequest: builder.mutation<void, { ids: string }>({
      query: ({ ids }) => {
        return {
          url: `/admin/withdrawal-requests/revert-to-request${createQueryString({ ids })}`,
          method: "PUT",
        };
      },
    }),

    //! accept and reject detail
    withdrawalRejectRequestDetail: builder.mutation<void, WithdrawalRejectDetailRequest>({
      query: ({ params, id }) => {
        return {
          url: `/admin/withdrawal-requests/${id}/reject${createQueryString(params)}`,
          method: "PUT",
        };
      },
    }),
    withdrawalAcceptRequestDetail: builder.mutation<void, WithdrawalAcceptDetailRequest>({
      query: ({ id, params }) => {
        return {
          url: `/admin/withdrawal-requests/${id}/accept${createQueryString(params ?? {})}`,
          method: "PUT",
        };
      },
    }),
    paymentUploadFile: builder.mutation<{ uuid: string }, { body: FormData }>({
      query: ({ body }) => ({
        method: "POST",
        url: `/admin/files`,
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
  }),
});

export const {
  useLazyGetWithdrawalStatsQuery,
  useLazyGetWithdrawalAllListQuery,
  useLazyGetWithdrawalDetailQuery,
  useLazyGetRejectReasonSelectListQuery,
  useLazyGetWithdrawalListQuery,
  useLazyGetWithdrawalAdvanceFilterPersonalListQuery,
  useLazyGetWithdrawalAdvanceFilterLegalListQuery,
  useWithdrawalRejectRequestMutation,
  useWithdrawalRejectRequestDetailMutation,
  useWithdrawalAcceptRequestMutation,
  useWithdrawalAcceptRequestDetailMutation,
  useWithdrawalSendToBankRequestMutation,
  useWithdrawalSingleSendToBankRequestMutation,
  useWithdrawalSingleRevertToRequestedRequestMutation,
  useWithdrawalRevertToRequestedRequestMutation,
  usePaymentUploadFileMutation,
} = requestsWithDrawalApi;
