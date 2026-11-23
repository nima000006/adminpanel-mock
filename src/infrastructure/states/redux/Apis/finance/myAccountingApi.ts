import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GeyMyBranchAccountingFactorsDetailRequest,
  GeyMyBranchAccountingFactorsDetailResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsDetail/MyBranchInvoicesAndDocsFactorsDetail/@types/@geyMyBranchAccountingFactorsDetailTypes";
import {
  GeyMyBranchAccountingAmountTotalDiffRequest,
  GeyMyBranchAccountingAmountTotalDiffResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/_shared/@types/@geyMyBranchAccountingAmountTotalDiffTypes";
import {
  GeyMyBranchAccountingRefundDetailRequest,
  GeyMyBranchAccountingRefundDetailResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsDebtDocuments/helper/components/MyBranchInvoicesAndDocsDetailRefundDrawerContent/@types/@geyMyBranchAccountingRefundDetail";
import {
  GetBranchAccountingFactorListRequest,
  GetBranchAccountingFactorListResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsFactors/@types/@getBranchAccountingFactorList";
import {
  GetMyAccountantBranchDocumentsDetailsResponse,
  GetMyAccountantBusinessDocumentsDetailsResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsServiceDocuments/@types/@myBranchInvoicesAndDocsServiceDataType";
import {
  GetBranchDocumentCreditSettlementRequest,
  GetBranchDocumentCreditSettlementResponse,
  GetBranchDocumentDebitSettlementRequest,
  GetBranchDocumentDebitSettlementResponse,
  GetBranchDocumentSettlementCountRequest,
  GetBranchDocumentSettlementCountResponse,
  GetBranchSettlementByIdResponse,
  GetMyBranchAccountingSettlementListRequest,
  GetMyBranchAccountingSettlementListResponse,
  GetMyBranchAccountingSettlementSearchListRequest,
  GetMyBranchAccountingSettlementSearchListResponse,
  statisticsSettledMyBranchDataRequest,
  statisticsSettledMyBranchDataResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchInvoicesAndDocs/MyBranchInvoicesAndDocsList/helper/components/MyBranchInvoicesAndDocsSettlementDocuments/helper/@types/@getMyBranchAccountingSettlementListTypes";
import {
  GeyMyBranchAccountingSettlementDetailTotalAmountRequest,
  GeyMyBranchAccountingSettlementDetailTotalAmountResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/@types/@geyMyBranchAccountingSettlementDetailTotalAmount";
import {
  GetMyBranchAccountingDetailDebitRequest,
  GetMyBranchAccountingDetailDebitResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverDebitDocument/@types/@getMyBranchAccountingDetailDebit";
import {
  GetMyBranchAccountingDetailSettlementRequest,
  GetMyBranchAccountingDetailSettlementResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverSettlementsDocuments/@types/@getMyBranchAccountingDetailSettlement";
import {
  GetMyBranchAccountingDetailSystemDocRequest,
  GetMyBranchAccountingDetailSystemDocResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverSystemDocuments/@types/@getMyBranchAccountingDetailSystemDoc";
import {
  GetMyBranchAccountingBranchesRequest,
  GetMyBranchAccountingBranchesResponse,
  GetMyBranchAccountingListTurnOverRequest,
  GetMyBranchAccountingListTurnOverResponse,
  GetMyBranchAccountingServicesRequest,
  GetMyBranchAccountingServicesResponse,
  GetMyBranchAccountingTurnOverBannerRequest,
  GetMyBranchAccountingTurnOverBannerResponse,
  GetMyBranchAccountingTurnOverListRequest,
  GetMyBranchAccountingTurnOverListResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverList/@types/@getMyBranchAccountingListTurnOverTypes";
import {
  GetMyBranchAccountingDetailServiceDocumentRequest,
  GetMyBranchAccountingDetailServiceDocumentResponse,
} from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverList/helper/drawer/BranchServiceDocumentDrawerContent/@types/@getMyBranchAccountingDetailServiceDocumentTypes";
import {
  GeyMyBusinessAccountingFactorsDetailRequest,
  GeyMyBusinessAccountingFactorsDetailResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsDetail/MyBusinessInvoicesAndDocsFactorsDetail/@types/@geyMyBusinessAccountingFactorsDetailTypes";
import {
  GeyMyBusinessAccountingAmountTotalDiffRequest,
  GeyMyBusinessAccountingAmountTotalDiffResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/_shared/@types/@geyMyBusinessAccountingAmountTotalDiffTypes";
import {
  GeyMyBusinessAccountingRefundDetailRequest,
  GeyMyBusinessAccountingRefundDetailResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsDebtDocuments/helper/components/MyBusinessInvoicesAndDocsDetailRefundDrawerContent/@types/@geyMyBusinessAccountingRefundDetail";
import {
  GetBusinessAccountingFactorListRequest,
  GetBusinessAccountingFactorListResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsFactors/@types/@getBusinessAccountingFactorList";
import {
  GetBusinessDocumentCreditSettlementRequest,
  GetBusinessDocumentCreditSettlementResponse,
  GetBusinessDocumentDebitSettlementRequest,
  GetBusinessDocumentDebitSettlementResponse,
  GetBusinessDocumentSettlementCountRequest,
  GetBusinessDocumentSettlementCountResponse,
  GetBusinessSettlementByIdResponse,
  GetMyBusinessAccountingSettlementBannerRequest,
  GetMyBusinessAccountingSettlementBannerResponse,
  GetMyBusinessAccountingSettlementRequest,
  GetMyBusinessAccountingSettlementResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessInvoicesAndDocs/MyBusinessInvoicesAndDocsList/helper/components/MyBusinessInvoicesAndDocsSettlementDocuments/@types/@myBusinessInvoicesAndDocsSettlementDocuments";
import {
  GeyMyBusinessAccountingSettlementDetailTotalAmountRequest,
  GeyMyBusinessAccountingSettlementDetailTotalAmountResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/@types/@geyMyBusinessAccountingSettlementDetailTotalAmount";
import {
  GetMyBusinessAccountingDetailDebitRequest,
  GetMyBusinessAccountingDetailDebitResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/helper/MyBusinessTurnOverCreditDocument/@types/@getMyBusinessAccountingDetailDebit";
import {
  GetMyBusinessAccountingDetailSettlementRequest,
  GetMyBusinessAccountingDetailSettlementResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/helper/MyBusinessTurnOverSettlementsDocuments/@types/@getMyBusinessAccountingDetailSettlement";
import {
  GetMyBusinessAccountingDetailSystemDocRequest,
  GetMyBusinessAccountingDetailSystemDocResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverDetail/helper/MyBusinessTurnOverSystemDocuments/@types/@getMyBusinessAccountingDetailSystemDoc";
import {
  GetMyBusinessAccountingBranchesRequest,
  GetMyBusinessAccountingBranchesResponse,
  GetMyBusinessAccountingListTurnOverRequest,
  GetMyBusinessAccountingListTurnOverResponse,
  GetMyBusinessAccountingServicesRequest,
  GetMyBusinessAccountingServicesResponse,
  GetMyBusinessAccountingTurnOverBannerRequest,
  GetMyBusinessAccountingTurnOverBannerResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/@types/@myBusinessTurnOverList";
import {
  GetMyBusinessAccountingDetailServiceDocumentRequest,
  GetMyBusinessAccountingDetailServiceDocumentResponse,
} from "@pages/Finance/myBusinessAccounting/MyBusinessTurnOver/MyBusinessTurnOverList/helper/drawer/BusinessServiceDocumentDrawerContent/@types/@getMyBusinessAccountingDetailServiceDocument";

import { accountingApi } from "../accountingApi";

export const financeMyAccounting = accountingApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBusinessAccountingBranches: builder.query<
      GetMyBusinessAccountingBranchesResponse,
      GetMyBusinessAccountingBranchesRequest
    >({
      query: (params) => ({
        url: `/business-manager/document/branches-ids${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBranchAccountingBranches: builder.query<
      GetMyBranchAccountingBranchesResponse,
      GetMyBranchAccountingBranchesRequest
    >({
      query: (params) => ({
        url: `/branch-manager/document/branches-ids${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBusinessAccountingServices: builder.query<
      GetMyBusinessAccountingServicesResponse,
      GetMyBusinessAccountingServicesRequest
    >({
      query: (params) => ({
        url: `/business-manager/document/document/services${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBranchAccountingServices: builder.query<
      GetMyBranchAccountingServicesResponse,
      GetMyBranchAccountingServicesRequest
    >({
      query: (params) => ({
        url: `/branch-manager/document/document/services${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBusinessAccountingListTurnOver: builder.query<
      GetMyBusinessAccountingListTurnOverResponse,
      GetMyBusinessAccountingListTurnOverRequest
    >({
      query: (params) => ({
        url: `/business-manager/document/advance-search${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBranchAccountingListTurnOver: builder.query<
      GetMyBranchAccountingListTurnOverResponse,
      GetMyBranchAccountingListTurnOverRequest
    >({
      query: (params) => ({
        url: `/branch-manager/document/advance-search${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBranchAccountingDetailServiceDocument: builder.query<
      GetMyBranchAccountingDetailServiceDocumentResponse,
      GetMyBranchAccountingDetailServiceDocumentRequest
    >({
      query: ({ id }) => ({
        url: `/branch-manager/document/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBusinessAccountingDetailServiceDocument: builder.query<
      GetMyBusinessAccountingDetailServiceDocumentResponse,
      GetMyBusinessAccountingDetailServiceDocumentRequest
    >({
      query: ({ id }) => ({
        url: `/business-manager/document/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBranchAccountingDetailSettlement: builder.query<
      GetMyBranchAccountingDetailSettlementResponse,
      GetMyBranchAccountingDetailSettlementRequest
    >({
      query: ({ id }) => ({
        url: `/branch-manager/settlement/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBusinessAccountingDetailSettlement: builder.query<
      GetMyBusinessAccountingDetailSettlementResponse,
      GetMyBusinessAccountingDetailSettlementRequest
    >({
      query: ({ id }) => ({
        url: `/business-manager/settlement/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBranchAccountingDetailSystemDoc: builder.query<
      GetMyBranchAccountingDetailSystemDocResponse,
      GetMyBranchAccountingDetailSystemDocRequest
    >({
      query: ({ params, settlementId }) => ({
        url: `/branch-manager/document/credit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBusinessAccountingDetailSystemDoc: builder.query<
      GetMyBusinessAccountingDetailSystemDocResponse,
      GetMyBusinessAccountingDetailSystemDocRequest
    >({
      query: ({ params, settlementId }) => ({
        url: `/business-manager/document/credit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBranchAccountingDetailDebit: builder.query<
      GetMyBranchAccountingDetailDebitResponse,
      GetMyBranchAccountingDetailDebitRequest
    >({
      query: ({ params, settlementId }) => ({
        url: `/branch-manager/document/debit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBusinessAccountingDetailDebit: builder.query<
      GetMyBusinessAccountingDetailDebitResponse,
      GetMyBusinessAccountingDetailDebitRequest
    >({
      query: ({ params, settlementId }) => ({
        url: `/business-manager/document/debit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBranchAccountingFactorList: builder.query<
      GetBranchAccountingFactorListResponse,
      GetBranchAccountingFactorListRequest
    >({
      query: (params) => ({
        url: `/branch-manager/accounting-invoice/advanced-search${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBusinessAccountingFactorList: builder.query<
      GetBusinessAccountingFactorListResponse,
      GetBusinessAccountingFactorListRequest
    >({
      query: (params) => ({
        url: `/business-manager/accounting-invoice/advanced-search${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBranchAccountingSettlementList: builder.query<
      GetMyBranchAccountingSettlementListResponse,
      GetMyBranchAccountingSettlementListRequest
    >({
      query: (params) => ({
        url: `/branch-manager/settlement/advance-filter${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    geyMyBranchAccountingSettlementDetailTotalAmount: builder.query<
      GeyMyBranchAccountingSettlementDetailTotalAmountResponse,
      GeyMyBranchAccountingSettlementDetailTotalAmountRequest
    >({
      query: ({ params, settlementId }) => ({
        url: `/branch-manager/document/settlement/${settlementId}/count${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    geyMyBusinessAccountingSettlementDetailTotalAmount: builder.query<
      GeyMyBusinessAccountingSettlementDetailTotalAmountResponse,
      GeyMyBusinessAccountingSettlementDetailTotalAmountRequest
    >({
      query: ({ params, settlementId }) => ({
        url: `/business-manager/document/settlement/${settlementId}/count${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    geyMyBranchAccountingAmountTotalDiff: builder.query<
      GeyMyBranchAccountingAmountTotalDiffResponse,
      GeyMyBranchAccountingAmountTotalDiffRequest
    >({
      query: (params) => ({
        url: `/branch-manager/document/amounts${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    geyMyBusinessAccountingAmountTotalDiff: builder.query<
      GeyMyBusinessAccountingAmountTotalDiffResponse,
      GeyMyBusinessAccountingAmountTotalDiffRequest
    >({
      query: (params) => ({
        url: `/business-manager/document/amounts${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    geyMyBranchAccountingFactorsDetail: builder.query<
      GeyMyBranchAccountingFactorsDetailResponse,
      GeyMyBranchAccountingFactorsDetailRequest
    >({
      query: ({ id }) => ({
        url: `/branch-manager/accounting-invoice/${id}`,
        method: "GET",
      }),
    }),
    geyMyBusinessAccountingFactorsDetail: builder.query<
      GeyMyBusinessAccountingFactorsDetailResponse,
      GeyMyBusinessAccountingFactorsDetailRequest
    >({
      query: ({ id }) => ({
        url: `/business-manager/accounting-invoice/${id}`,
        method: "GET",
      }),
    }),
    geyMyBranchAccountingRefundDetail: builder.query<
      GeyMyBranchAccountingRefundDetailResponse,
      GeyMyBranchAccountingRefundDetailRequest
    >({
      query: ({ uuid }) => ({
        url: `/branch-manager/refund-request/${uuid}`,
        method: "GET",
      }),
    }),
    geyMyBusinessAccountingRefundDetail: builder.query<
      GeyMyBusinessAccountingRefundDetailResponse,
      GeyMyBusinessAccountingRefundDetailRequest
    >({
      query: ({ uuid }) => ({
        url: `/business-manager/refund-request/${uuid}`,
        method: "GET",
      }),
    }),
    getStatisticsSettledMyBranchData: builder.query<
      statisticsSettledMyBranchDataResponse,
      statisticsSettledMyBranchDataRequest
    >({
      query: (params) => {
        return {
          url: `/branch-manager/settlement/stats/search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getMyBranchAccountingSettlementSearchList: builder.query<
      GetMyBranchAccountingSettlementSearchListResponse,
      GetMyBranchAccountingSettlementSearchListRequest
    >({
      query: (params) => ({
        url: `/branch-manager/settlement/search${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBusinessAccountingSettlement: builder.query<
      GetMyBusinessAccountingSettlementResponse,
      GetMyBusinessAccountingSettlementRequest
    >({
      query: (params) => ({
        url: `business-manager/settlement/search${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBusinessAccountingSettlementBanner: builder.query<
      GetMyBusinessAccountingSettlementBannerResponse,
      GetMyBusinessAccountingSettlementBannerRequest
    >({
      query: (params) => ({
        url: `business-manager/settlement/stats/search${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyAccountantBranchDocumentsDetails: builder.query<
      GetMyAccountantBranchDocumentsDetailsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/branch-manager/document/${id}`,
        method: "GET",
      }),
    }),
    getMyAccountantBusinessDocumentsDetails: builder.query<
      GetMyAccountantBusinessDocumentsDetailsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/business-manager/document/${id}`,
        method: "GET",
      }),
    }),
    getBranchSettlementById: builder.query<GetBranchSettlementByIdResponse, string>({
      query: (uuid) => ({
        url: `/branch-manager/settlement/${uuid}`,
        method: "GET",
      }),
    }),
    getBusinessSettlementById: builder.query<GetBusinessSettlementByIdResponse, string>({
      query: (uuid) => ({
        url: `/business-manager/settlement/${uuid}`,
        method: "GET",
      }),
    }),
    getBranchDocumentSettlementCount: builder.query<
      GetBranchDocumentSettlementCountResponse,
      GetBranchDocumentSettlementCountRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/branch-manager/document/settlement/${settlementId}/count${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBusinessDocumentSettlementCount: builder.query<
      GetBusinessDocumentSettlementCountResponse,
      GetBusinessDocumentSettlementCountRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/business-manager/document/settlement/${settlementId}/count${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBranchDocumentCreditSettlement: builder.query<
      GetBranchDocumentCreditSettlementResponse,
      GetBranchDocumentCreditSettlementRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/branch-manager/document/credit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBusinessDocumentCreditSettlement: builder.query<
      GetBusinessDocumentCreditSettlementResponse,
      GetBusinessDocumentCreditSettlementRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/business-manager/document/credit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBranchDocumentDebitSettlement: builder.query<
      GetBranchDocumentDebitSettlementResponse,
      GetBranchDocumentDebitSettlementRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/branch-manager/document/debit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBusinessDocumentDebitSettlement: builder.query<
      GetBusinessDocumentDebitSettlementResponse,
      GetBusinessDocumentDebitSettlementRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/business-manager/document/debit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBranchAccountingTurnOverBanner: builder.query<
      GetMyBranchAccountingTurnOverBannerResponse,
      GetMyBranchAccountingTurnOverBannerRequest
    >({
      query: (params) => ({
        url: `/branch-manager/document/financial-turnover/summary${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyBranchAccountingTurnOverList: builder.query<
      GetMyBranchAccountingTurnOverListResponse,
      GetMyBranchAccountingTurnOverListRequest
    >({
      query: (params) => ({
        url: `/branch-manager/document/advance-search${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyBusinessAccountingTurnOverBanner: builder.query<
      GetMyBusinessAccountingTurnOverBannerResponse,
      GetMyBusinessAccountingTurnOverBannerRequest
    >({
      query: (params) => ({
        url: `/business-manager/document/financial-turnover/summary${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetMyBusinessAccountingBranchesQuery,
  useLazyGetMyBranchAccountingBranchesQuery,
  useLazyGetMyBusinessAccountingServicesQuery,
  useLazyGetMyBranchAccountingServicesQuery,
  useLazyGetMyBusinessAccountingListTurnOverQuery,
  useLazyGetMyBranchAccountingListTurnOverQuery,
  useLazyGetMyBranchAccountingDetailServiceDocumentQuery,
  useLazyGetMyBusinessAccountingDetailServiceDocumentQuery,
  useLazyGetMyBranchAccountingDetailSettlementQuery,
  useLazyGetMyBusinessAccountingDetailSettlementQuery,
  useLazyGetMyBranchAccountingDetailSystemDocQuery,
  useLazyGetMyBusinessAccountingDetailSystemDocQuery,
  useLazyGetMyBranchAccountingDetailDebitQuery,
  useLazyGetMyBusinessAccountingDetailDebitQuery,
  useLazyGetBranchAccountingFactorListQuery,
  useLazyGetBusinessAccountingFactorListQuery,
  useLazyGetMyBranchAccountingSettlementListQuery,
  useLazyGeyMyBranchAccountingSettlementDetailTotalAmountQuery,
  useLazyGeyMyBusinessAccountingSettlementDetailTotalAmountQuery,
  useLazyGeyMyBranchAccountingAmountTotalDiffQuery,
  useLazyGeyMyBusinessAccountingAmountTotalDiffQuery,
  useLazyGeyMyBranchAccountingFactorsDetailQuery,
  useLazyGeyMyBusinessAccountingFactorsDetailQuery,
  useLazyGeyMyBranchAccountingRefundDetailQuery,
  useLazyGeyMyBusinessAccountingRefundDetailQuery,
  useLazyGetStatisticsSettledMyBranchDataQuery,
  useLazyGetMyBranchAccountingSettlementSearchListQuery,
  useLazyGetMyBusinessAccountingSettlementQuery,
  useLazyGetMyBusinessAccountingSettlementBannerQuery,
  useLazyGetMyAccountantBranchDocumentsDetailsQuery,
  useLazyGetMyAccountantBusinessDocumentsDetailsQuery,
  useLazyGetBranchSettlementByIdQuery,
  useLazyGetBusinessSettlementByIdQuery,
  useLazyGetBranchDocumentSettlementCountQuery,
  useLazyGetBusinessDocumentSettlementCountQuery,
  useLazyGetBranchDocumentCreditSettlementQuery,
  useLazyGetBusinessDocumentCreditSettlementQuery,
  useLazyGetBranchDocumentDebitSettlementQuery,
  useLazyGetBusinessDocumentDebitSettlementQuery,
  useLazyGetMyBranchAccountingTurnOverBannerQuery,
  useLazyGetMyBranchAccountingTurnOverListQuery,
  useLazyGetMyBusinessAccountingTurnOverBannerQuery,
} = financeMyAccounting;
