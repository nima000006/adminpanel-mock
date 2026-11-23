import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetBankAccountDetailResponse,
  SendSingleConfirmAndRejectRequest,
} from "@pages/Wallet/Requests/BankAccount/AllBankAccountDetail/@types/@bankAccountDetailTypes";
import {
  GetBankAccountListCountResponse,
  GetRequestBankAccountListAdvanceFilterRequest,
  GetRequestBankAccountListResponse,
} from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";
import { SendAllRejectRequest } from "@pages/Wallet/Requests/BankAccount/BankAccountList/helper/components/BankAccuntPendingList/@types/@bankAccountPendingListTypes";
import { SendAllAcceptedRequest } from "@pages/Wallet/Requests/BankAccount/BankAccountList/helper/components/BankAccuntPendingList/helper/drawer/ConfirmAllRequestDrawerContent/@types/@confirmAllRequestDrawerContentTypes";
import { GetRejectReasonSelectListResponse } from "@pages/Wallet/Requests/BankAccount/BankAccountList/helper/components/BankAccuntPendingList/helper/drawer/RejectAllRequestDrawerContent/@types/@rejectAllRequestDrawerContent";

import { walletApi } from "../../walletApi";

export const walletsApis = walletApi.injectEndpoints({
  endpoints: (builder) => ({
    // get count list
    getBankAccountListCount: builder.query<GetBankAccountListCountResponse, void>({
      query: () => ({
        url: "/admin/bank-accounts/status",
        method: "GET",
      }),
    }),

    // get reason reject
    getRejectReasonSelectList: builder.query<GetRejectReasonSelectListResponse, void>({
      query: () => ({
        url: "/admin/withdrawal-requests/reject-reason",
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    // get bank account detail
    getBankAccountDetail: builder.query<GetBankAccountDetailResponse, number>({
      query: (id) => ({
        url: `/admin/bank-accounts/detail/${id}`,
        method: "GET",
      }),
    }),

    // send single confirm and reject
    sendSingleConfirmAndReject: builder.mutation<void, SendSingleConfirmAndRejectRequest>(
      {
        query: (params) => ({
          url: `/admin/bank-accounts/${params.id}/status${createQueryString(params)}`,
          method: "PUT",
        }),
      }
    ),

    // send all reject
    sendAllReject: builder.mutation<void, SendAllRejectRequest>({
      query: ({ body, params }) => ({
        url: `/admin/bank-accounts/reject${createQueryString(params)}`,
        method: "PUT",
        body,
      }),
    }),

    // send all accepted
    sendAllAccepted: builder.mutation<void, SendAllAcceptedRequest>({
      query: (body) => ({
        url: `/admin/bank-accounts/confirm`,
        method: "PUT",
        body,
      }),
    }),

    // get list
    getRequestBankAccountList: builder.query<
      GetRequestBankAccountListResponse,
      { params: { pageNumber: number; pageSize: number }; status: string }
    >({
      query: ({ params, status }) => ({
        url: `/admin/bank-accounts/status/${status}${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // get all list
    getRequestBankAccountAllList: builder.query<
      GetRequestBankAccountListResponse,
      { pageNumber: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/admin/bank-accounts${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // advance filter
    getBankAccountListAdvanceFilter: builder.query<
      GetRequestBankAccountListResponse,
      GetRequestBankAccountListAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/admin/bank-accounts/advance-search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLazyGetBankAccountListCountQuery,
  useLazyGetRejectReasonSelectListQuery,
  useLazyGetBankAccountDetailQuery,
  useSendSingleConfirmAndRejectMutation,
  useSendAllRejectMutation,
  useSendAllAcceptedMutation,
  useLazyGetRequestBankAccountListQuery,
  useLazyGetRequestBankAccountAllListQuery,
  useLazyGetBankAccountListAdvanceFilterQuery,
} = walletsApis;
