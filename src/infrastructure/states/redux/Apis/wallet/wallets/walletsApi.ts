import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { GetBankAccountDetailResponse } from "@pages/Wallet/Requests/BankAccount/AllBankAccountDetail/@types/@bankAccountDetailTypes";
import {
  GetLegalWalletTransactionListAdvanceFilterRequest,
  GetLegalWalletTransactionListAdvanceFilterResponse,
} from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListBranchTab/@types/@allTransactionListBranchTab";
import {
  GetAllTransactionListRequest,
  GetAllTransactionListResponse,
  GetPersonalWalletTransactionListAdvanceFilterRequest,
  GetPersonalWalletTransactionListAdvanceFilterResponse,
} from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListUsersTab/@types/@allTransactionListUsersTab";
import { GetTransactionListDetailResponse } from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListUsersTab/helper/drawer/MoreDetailDrawerContent/@types/@moreDetailDrawerContentTypes";
import {
  GetAllTransactionSamimWalletListRequest,
  GetAllTransactionSamimWalletListResponse,
} from "@pages/Wallet/Transactions/AllTransactions/AllTransactionsList/helper/components/AllTransactionListWalletTab/@types/@allTransactionListWalletTab";
import {
  GetBankTransactionListsRequest,
  GetBankTransactionListsResponse,
} from "@pages/Wallet/Transactions/BankTransactions/@types/@bankTransactions";
import {
  GetBankTransactionDetailsRequest,
  GetBankTransactionDetailsResponse,
  transactionInquiryResponse,
} from "@pages/Wallet/Transactions/BankTransactions/helper/components/BankMoreDetailDrawerContent/@types/@bankMoreDetailDrawerContent";
import { ResolveConflictEstelamResponse } from "@pages/Wallet/Transactions/BankTransactions/helper/modal/ResolveConflictModalContent/@type/@resolveConflictModalContentType";
import {
  GetMyTransactionListRequest,
  GetMyTransactionListResponse,
  GetWalletMyTransactionAdvanceFilterRequest,
  GetWalletMyTransactionAdvanceFilterResponse,
  GetWalletMyTransactionRequest,
  GetWalletMyTransactionResponse,
} from "@pages/Wallet/Transactions/MyTransactions/MyTransactionsList/helper/components/MyTransactionListUsersTab/@types/@myTransactionListUsersTab";
import { GetMyTransactionListDetailResponse } from "@pages/Wallet/Transactions/MyTransactions/MyTransactionsList/helper/components/MyTransactionListUsersTab/helper/drawer/MoreDetailDrawerContent/@types/@moreDetailDrawerContentTypes";
import {
  GetMyTransactionSamimWalletListRequest,
  GetMyTransactionSamimWalletListResponse,
} from "@pages/Wallet/Transactions/MyTransactions/MyTransactionsList/helper/components/MyTransactionListWalletTab/@types/@myTransactionListWalletTab";
import { GetWalletsTransactionsListByWalletIdResponse } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/@types/@allWalletsDetail";
import { AllWalletDetailsGetListOfWalletResponse } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/BusinessWalletInfo/@types/@allWalletDetailsGetListOfWallet";
import {
  AdminBankAccountPersonalRequest,
  AdminBankAccountPersonalResponse,
  GetLegalWalletsDetailResponse,
} from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/BusinessWalletInfo/@types/@businessWalletInfo";
import { GetWalletTransactionDetailResponse } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/SegmentTable/@types/@segmentTable";
import { GetPersonalWalletsDetailResponse } from "@pages/Wallet/Wallets/AllWallets/AllWalletsDetail/helper/components/UserWalletInfo/@types/@userWalletInfo";
import {
  GetBusinessAndBranchesWalletsListByAdvanceFilterRequest,
  GetBusinessAndBranchesWalletsListResponse,
} from "@pages/Wallet/Wallets/AllWallets/AllWalletsList/helper/components/AllWalletsListBusinessAndBranchesTab/@types/@allWalletsListBusinessAndBranchesTab";
import {
  GetPersonalWalletsListByAdvanceFilterRequest,
  GetPersonalWalletsListResponse,
} from "@pages/Wallet/Wallets/AllWallets/AllWalletsList/helper/components/AllWalletsListUsersTab/@types/@allWalletsListUsersTab";
import {
  AllWalletDetailsCreateWalletWithdrawalRequestRequest,
  AllWalletDetailsCreateWalletWithdrawalRequestResponse,
  AllWalletDetailsGetServicesListByBranchIdResponse,
} from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/@types/@allWalletDetailsList";
import {
  AllWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterRequest,
  AllWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterResponse,
} from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/components/AllWalletDetailsRequestSegmented/helper/components/AllWalletDetailsWithdrawWalletTab/@types/@allWalletDetailswithdrawWalletTab";
import { AllWalletDetailsGetWalletWithdrawalDetailResponse } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/components/AllWalletDetailsRequestSegmented/helper/drawer/AllWalletDetailsWithdrawWalletDrawerContent/@types/@allWalletDetailswithdrawWalletDrawerContentTypes";
import {
  AllWalletDetailsGetWalletTransactionRequest,
  AllWalletDetailsGetWalletTransactionResponse,
} from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/components/AllWalletDetailsTransactionSegmented/helper/components/AllWalletDetailsTransactionSegmentTable/@types/@allWalletDetailsTransactionSegmentTable";
import {
  AllWalletDetailsCreateWalletBankAccountRequest,
  AllWalletDetailsGetLegalWalletBankAccountsListRequest,
  AllWalletDetailsGetLegalWalletBankAccountsListResponse,
  AllWalletDetailsGetWalletBankAccountsListRequest,
  AllWalletDetailsGetWalletBankAccountsListResponse,
} from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/drawer/AllWalletDetailsYourAccountDrawerContent/@types/@allWalletDetailsyourAccountDrawerContent";
import {
  MyWalletDetailsCreateWalletWithdrawalRequestRequest,
  MyWalletDetailsCreateWalletWithdrawalRequestResponse,
  MyWalletDetailsGetServicesListByBranchIdResponse,
} from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/@types/@myWalletDetailsList";
import {
  MyWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterRequest,
  MyWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterResponse,
} from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/components/MyWalletDetailsRequestSegmented/helper/components/MyWalletDetailsWithdrawWalletTab/@types/@myWalletDetailswithdrawWalletTab";
import { MyWalletDetailsGetBankAccountDetailResponse } from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/components/MyWalletDetailsRequestSegmented/helper/drawer/MyWalletDetailsBankAccountDrawerContent/@types/@myWalletDetailsbankAccountDrawerContent";
import { MyWalletDetailsGetWalletWithdrawalDetailResponse } from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/components/MyWalletDetailsRequestSegmented/helper/drawer/MyWalletDetailsWithdrawWalletDrawerContent/@types/@myWalletDetailswithdrawWalletDrawerContentTypes";
import {
  GetMyLegalWalletTransactionListAdvanceFilterRequest,
  GetMyLegalWalletTransactionListAdvanceFilterResponse,
} from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/components/MyWalletDetailsTransactionSegmented/helper/components/MyWalletDetailsTransactionSegmentTable/@types/@myWalletDetailsTransactionSegmentTable";
import {
  MyWalletDetailsCreateWalletBankAccountRequest,
  MyWalletDetailsGetLegalWalletBankAccountsListRequest,
  MyWalletDetailsGetLegalWalletBankAccountsListResponse,
  MyWalletDetailsGetWalletBankAccountsListRequest,
  MyWalletDetailsGetWalletBankAccountsListResponse,
} from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/drawer/MyWalletDetailsYourAccountDrawerContent/@types/@myWalletDetailsyourAccountDrawerContent";

import { walletApi } from "../../walletApi";

export const walletsApis = walletApi.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalWalletsList: builder.query<
      GetPersonalWalletsListResponse,
      { pageNumber: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/admin/wallets/personal${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getPersonalWalletsListByAdvanceFilter: builder.query<
      GetPersonalWalletsListResponse,
      GetPersonalWalletsListByAdvanceFilterRequest
    >({
      query: ({
        username,
        firstName,
        lastName,
        samimServices,
        pageNumber,
        pageSize,
        branchId,
      }) => {
        const queryString = createQueryString({
          username,
          firstName,
          lastName,
          pageNumber,
          pageSize,
          branchId,
        });
        // samimServices جدا هندل میشه (ممکنه خودش query کامل باشه)
        const serviceParam = samimServices ? `${samimServices}` : "";

        const finalQuery = queryString
          ? `${queryString}${serviceParam ? `&${serviceParam}` : ""}`
          : serviceParam
            ? `?${serviceParam}`
            : "";

        return {
          url: `/admin/wallet/personal/advance-filter${finalQuery}`,
          method: "GET",
        };
      },
    }),

    getBusinessAndBranchesWalletsList: builder.query<
      GetBusinessAndBranchesWalletsListResponse,
      { pageNumber: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/admin/wallets/legal${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBusinessAndBranchesWalletsListByAdvanceFilter: builder.query<
      GetBusinessAndBranchesWalletsListResponse,
      GetBusinessAndBranchesWalletsListByAdvanceFilterRequest
    >({
      query: ({ pageNo, pageSize, businessId, branchId, samimServices }) => {
        const params = [
          `pageNumber=${pageNo}`,
          `pageSize=${pageSize}`,
          businessId ? `businessId=${businessId}` : "",
          branchId ? `branchId=${branchId}` : "",
          samimServices ? samimServices : "",
        ];
        return {
          url: `/admin/wallets/legal/advanced-filter?${params.filter(Boolean).join("&")}`,
          method: "GET",
        };
      },
    }),
    getMyBusinessAndBranchesWalletsListByAdvanceFilter: builder.query<
      GetBusinessAndBranchesWalletsListResponse,
      GetBusinessAndBranchesWalletsListByAdvanceFilterRequest
    >({
      query: ({ pageNo, pageSize, businessId, branchId, samimServices }) => {
        const params = [
          `pageNumber=${pageNo}`,
          `pageSize=${pageSize}`,
          businessId ? `businessId=${businessId}` : "",
          branchId ? `branchId=${branchId}` : "",
          samimServices ? samimServices : "",
        ];
        return {
          url: `/manager/wallets/legal/advanced-filter?${params.filter(Boolean).join("&")}`,
          method: "GET",
        };
      },
    }),
    getWalletsTransactionsListByWalletId: builder.query<
      GetWalletsTransactionsListByWalletIdResponse,
      { params: { pageNumber: number; pageSize: number }; walletId: string }
    >({
      query: ({ params, walletId }) => ({
        url: `/admin/wallet/${walletId}/transaction${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getWalletTransactionDetail: builder.query<GetWalletTransactionDetailResponse, string>(
      {
        query: (id) => ({
          url: `/admin/transaction/${id}`,
          method: "GET",
        }),
      }
    ),
    getServicesListByBranchId: builder.query<
      AllWalletDetailsGetServicesListByBranchIdResponse,
      { branchId: number }
    >({
      query: (params) => ({
        url: `/admin/wallets/legal/services${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyServicesList: builder.query<
      MyWalletDetailsGetServicesListByBranchIdResponse,
      void
    >({
      query: () => ({
        url: `/manager/wallets/legal/services`,
        method: "GET",
      }),
    }),
    getListOfWallet: builder.query<
      AllWalletDetailsGetListOfWalletResponse,
      { branchId: number }
    >({
      query: ({ branchId }) => ({
        url: `admin/wallets/legal/branch/${branchId}`,
        method: "GET",
      }),
    }),
    createWalletBankAccount: builder.mutation<
      void,
      AllWalletDetailsCreateWalletBankAccountRequest
    >({
      query: (body) => ({
        url: `/admin/bank-accounts/branch/create`,
        method: "POST",
        body,
      }),
    }),
    createMyWalletBankAccount: builder.mutation<
      void,
      MyWalletDetailsCreateWalletBankAccountRequest
    >({
      query: (body) => ({
        url: `/manager/bank-accounts/branch/create`,
        method: "POST",
        body,
      }),
    }),
    getWalletWithdrawalRequestsListAdvanceFilter: builder.query<
      AllWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterResponse,
      AllWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/admin/withdrawal-requests/legal/advanced-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getMyWalletWithdrawalRequestsListAdvanceFilter: builder.query<
      MyWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterResponse,
      MyWalletDetailsGetWalletWithdrawalRequestsListAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/manager/withdrawal-requests/legal/advanced-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getWalletBankAccountsList: builder.query<
      AllWalletDetailsGetWalletBankAccountsListResponse,
      AllWalletDetailsGetWalletBankAccountsListRequest
    >({
      query: (params) => {
        return {
          url: `/admin/bank-accounts/advance-search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getMyWalletBankAccountsList: builder.query<
      MyWalletDetailsGetWalletBankAccountsListResponse,
      MyWalletDetailsGetWalletBankAccountsListRequest
    >({
      query: (params) => {
        return {
          url: `/manager/bank-accounts/advance-search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getLegalWalletBankAccountsList: builder.query<
      AllWalletDetailsGetLegalWalletBankAccountsListResponse,
      AllWalletDetailsGetLegalWalletBankAccountsListRequest
    >({
      query: (params) => {
        return {
          url: `/admin/bank-accounts/legal/advance-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getLegalMyWalletBankAccountsList: builder.query<
      MyWalletDetailsGetLegalWalletBankAccountsListResponse,
      MyWalletDetailsGetLegalWalletBankAccountsListRequest
    >({
      query: (params) => {
        return {
          url: `/manager/bank-accounts/legal/advance-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getWalletTransactionList: builder.query<
      AllWalletDetailsGetWalletTransactionResponse,
      AllWalletDetailsGetWalletTransactionRequest
    >({
      query: (params) => {
        return {
          url: `/admin/transaction/advance-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getPersonalWalletTransactionListAdvanceFilter: builder.query<
      GetPersonalWalletTransactionListAdvanceFilterResponse,
      GetPersonalWalletTransactionListAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/admin/transaction/personal/advance-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getLegalWalletTransactionListAdvanceFilter: builder.query<
      GetLegalWalletTransactionListAdvanceFilterResponse,
      GetLegalWalletTransactionListAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/admin/transaction/legal/advance-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getWalletMyTransactionAdvanceFilter: builder.query<
      GetWalletMyTransactionAdvanceFilterResponse,
      GetWalletMyTransactionAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/manager/transaction/personal/advance-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getWalletMyTransactionList: builder.query<
      GetWalletMyTransactionResponse,
      GetWalletMyTransactionRequest
    >({
      query: (params) => {
        return {
          url: `/manager/transaction/advance-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getMyLegalWalletTransactionListAdvanceFilter: builder.query<
      GetMyLegalWalletTransactionListAdvanceFilterResponse,
      GetMyLegalWalletTransactionListAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/manager/transaction/legal/advance-filter${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getWalletBankAccountDetail: builder.query<
      GetBankAccountDetailResponse,
      { accountId: number }
    >({
      query: ({ accountId }) => ({
        url: `/admin/bank-accounts/detail/${accountId}`,
        method: "GET",
      }),
    }),
    getMyBankAccountDetail: builder.query<
      MyWalletDetailsGetBankAccountDetailResponse,
      { accountId: number }
    >({
      query: ({ accountId }) => ({
        url: `/manager/bank-accounts/detail/${accountId}`,
        method: "GET",
      }),
    }),
    getWalletWithdrawalDetail: builder.query<
      AllWalletDetailsGetWalletWithdrawalDetailResponse,
      { withdrawalId: number }
    >({
      query: ({ withdrawalId }) => ({
        url: `/admin/withdrawal-requests/detail/${withdrawalId}`,
        method: "GET",
      }),
    }),
    getMyWalletWithdrawalDetail: builder.query<
      MyWalletDetailsGetWalletWithdrawalDetailResponse,
      { withdrawalId: number }
    >({
      query: ({ withdrawalId }) => ({
        url: `/manager/withdrawal-requests/detail/${withdrawalId}`,
        method: "GET",
      }),
    }),
    createWalletWithdrawalRequest: builder.mutation<
      AllWalletDetailsCreateWalletWithdrawalRequestResponse,
      AllWalletDetailsCreateWalletWithdrawalRequestRequest
    >({
      query: ({ walletUuid, bankAccountId, params }) => ({
        url: `/admin/withdrawals/wallets/${walletUuid}/bank-account/${bankAccountId}${createQueryString(params)}`,
        method: "POST",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    myCreateWalletWithdrawalRequest: builder.mutation<
      MyWalletDetailsCreateWalletWithdrawalRequestResponse,
      MyWalletDetailsCreateWalletWithdrawalRequestRequest
    >({
      query: ({ walletUuid, bankAccountId, params }) => ({
        url: `/manager/withdrawals/wallets/${walletUuid}/bank-account/${bankAccountId}${createQueryString(params)}`,
        method: "POST",
      }),
    }),
    myCreateWalletWithdrawalRequestCheckOtp: builder.mutation<
      void,
      { token: string; otp: string }
    >({
      query: ({ token, otp }) => ({
        url: "/manager/withdrawals/check",
        method: "POST",
        headers: {
          "X-Temporary-Token": token,
        },
        body: {
          otpCode: otp,
        },
      }),
    }),
    allCreateWalletWithdrawalRequestCheckOtp: builder.mutation<
      void,
      { token: string; otp: string }
    >({
      query: ({ token, otp }) => ({
        url: "/admin/withdrawals/check",
        method: "POST",
        headers: {
          "X-Temporary-Token": token,
        },
        body: {
          otpCode: otp,
        },
      }),
    }),
    getAllTransactionList: builder.query<
      GetAllTransactionListResponse,
      GetAllTransactionListRequest
    >({
      query: ({ walletType, params }) => ({
        url: `/admin/transaction/wallet-type/${walletType}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAllTransactionSamimWalletList: builder.query<
      GetAllTransactionSamimWalletListResponse,
      GetAllTransactionSamimWalletListRequest
    >({
      query: (params) => ({
        url: `/admin/transaction/wallet/samim${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyTransactionList: builder.query<
      GetMyTransactionListResponse,
      GetMyTransactionListRequest
    >({
      query: ({ walletType, params }) => ({
        url: `/manager/transaction/wallet-type/${walletType}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyTransactionSamimWalletList: builder.query<
      GetMyTransactionSamimWalletListResponse,
      GetMyTransactionSamimWalletListRequest
    >({
      query: (params) => ({
        url: `/manager/transaction/wallet/samim${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getTransactionListDetail: builder.query<
      GetTransactionListDetailResponse,
      { uuid: string }
    >({
      query: ({ uuid }) => ({
        url: `/admin/transaction/${uuid}`,
        method: "GET",
      }),
    }),
    getMyTransactionListDetail: builder.query<
      GetMyTransactionListDetailResponse,
      { uuid: string }
    >({
      query: ({ uuid }) => ({
        url: `/manager/transaction/${uuid}`,
        method: "GET",
      }),
    }),
    getPersonalWalletsDetail: builder.query<
      GetPersonalWalletsDetailResponse,
      { uuid: string }
    >({
      query: ({ uuid }) => ({
        url: `/admin/wallets/${uuid}/personal`,
        method: "GET",
      }),
    }),
    getLegalWalletsDetail: builder.query<GetLegalWalletsDetailResponse, { uuid: string }>(
      {
        query: ({ uuid }) => ({
          url: `/admin/wallets/${uuid}/legal`,
          method: "GET",
        }),
      }
    ),
    // ADMIN BANK ACCOUNT PERSONAL ADVANCE FILTER
    bankAccountPersonalAdvanceFilter: builder.mutation<
      AdminBankAccountPersonalResponse,
      AdminBankAccountPersonalRequest
    >({
      query: (body) => ({
        url: `/admin/bank-accounts/personal/advance-filter`,
        method: "POST",
        body,
      }),
    }),
    // My BANK ACCOUNT PERSONAL ADVANCE FILTER
    myBankAccountPersonalAdvanceFilter: builder.mutation<
      AdminBankAccountPersonalResponse,
      AdminBankAccountPersonalRequest
    >({
      query: (body) => ({
        url: `/manager/bank-accounts/personal/advance-filter`,
        method: "POST",
        body,
      }),
    }),
    // bank transactions list and filters
    getBankTransactionLists: builder.query<
      GetBankTransactionListsResponse,
      GetBankTransactionListsRequest
    >({
      query: (params) => ({
        url: `/admin/payment-requests/search${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    // bank transactions details
    getBankTransactionDetails: builder.query<
      GetBankTransactionDetailsResponse,
      GetBankTransactionDetailsRequest
    >({
      query: ({ id }) => ({
        url: `/admin/payment-request/${id}`,
        method: "GET",
      }),
    }),

    resolveConflictEstelam: builder.mutation<ResolveConflictEstelamResponse, number>({
      query: (id) => ({
        url: `admin/payment-request/${id}/recover`,
        method: "PUT",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    transactionInquiry: builder.query<transactionInquiryResponse, number>({
      query: (id) => ({
        url: `admin/payment-request/${id}/inquiry`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetPersonalWalletsListQuery,
  useLazyGetPersonalWalletsListByAdvanceFilterQuery,
  useLazyGetBusinessAndBranchesWalletsListQuery,
  useLazyGetBusinessAndBranchesWalletsListByAdvanceFilterQuery,
  useLazyGetMyBusinessAndBranchesWalletsListByAdvanceFilterQuery,
  useLazyGetWalletsTransactionsListByWalletIdQuery,
  useLazyGetWalletTransactionDetailQuery,
  useLazyGetServicesListByBranchIdQuery,
  useLazyGetMyServicesListQuery,
  useCreateWalletBankAccountMutation,
  useCreateMyWalletBankAccountMutation,
  useLazyGetWalletWithdrawalRequestsListAdvanceFilterQuery,
  useLazyGetMyWalletWithdrawalRequestsListAdvanceFilterQuery,
  useLazyGetWalletBankAccountsListQuery,
  useLazyGetLegalWalletBankAccountsListQuery,
  useLazyGetLegalMyWalletBankAccountsListQuery,
  useLazyGetMyWalletBankAccountsListQuery,
  useLazyGetWalletTransactionListQuery,
  useLazyGetWalletMyTransactionListQuery,
  useLazyGetMyLegalWalletTransactionListAdvanceFilterQuery,
  useLazyGetWalletBankAccountDetailQuery,
  useLazyGetMyBankAccountDetailQuery,
  useLazyGetWalletWithdrawalDetailQuery,
  useLazyGetMyWalletWithdrawalDetailQuery,
  useCreateWalletWithdrawalRequestMutation,
  useMyCreateWalletWithdrawalRequestMutation,
  useMyCreateWalletWithdrawalRequestCheckOtpMutation,
  useAllCreateWalletWithdrawalRequestCheckOtpMutation,
  useLazyGetAllTransactionListQuery,
  useLazyGetAllTransactionSamimWalletListQuery,
  useLazyGetMyTransactionListQuery,
  useLazyGetMyTransactionSamimWalletListQuery,
  useLazyGetTransactionListDetailQuery,
  useLazyGetMyTransactionListDetailQuery,
  useLazyGetPersonalWalletsDetailQuery,
  useLazyGetLegalWalletsDetailQuery,
  useLazyGetPersonalWalletTransactionListAdvanceFilterQuery,
  useLazyGetLegalWalletTransactionListAdvanceFilterQuery,
  useLazyGetListOfWalletQuery,
  useLazyGetBankTransactionListsQuery,
  useLazyGetBankTransactionDetailsQuery,
  useBankAccountPersonalAdvanceFilterMutation,
  useMyBankAccountPersonalAdvanceFilterMutation,
  useLazyGetWalletMyTransactionAdvanceFilterQuery,
  useResolveConflictEstelamMutation,
  useLazyTransactionInquiryQuery,
} = walletsApis;
