import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { createQueryStringEnhanced } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString.enhanced";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AccountingGetAllFactorsDetailsResponse,
  getBranchAccountingResponse,
  getBusinessAccountingResponse,
  GetSettlementBranchesResponse,
  GetSettlementBusinessIdsResponse,
} from "@pages/Finance/Accountants/_shared/@types/@accountantsType";
import {
  GetAccountingOperationPayableListRequest,
  GetAccountingOperationPayableListResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/@types/@accountingOperationPayable";
import {
  getSettlementBeneficiariesDetailRequest,
  getSettlementBeneficiariesDetailResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDrawerContent";
import {
  getSettlementBeneficiariesDetailDocumentsListRequest,
  getSettlementBeneficiariesDetailDocumentsListResponse,
  getSettlementBeneficiariesDetailDocumentsRequest,
  getSettlementBeneficiariesDetailDocumentsResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/_shared/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDrawerContent/helper/components/AccountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent/@types/@accountingOperationSettlementDocumentSelectBeneficiaryDocDrawerContent";
import {
  GetAccountingOperationSettlementDocumentBannerRequest,
  GetAccountingOperationSettlementDocumentBannerResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/AccountingOperationSettlementDocumentSelectBeneficiary/@types/@accountingOperationSettlementDocumentSelectBeneficiary";
import {
  getAccountingOperationQueueBannerRequest,
  getAccountingOperationQueueBannerResponse,
} from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/@types/@accountingOperationPaymentQueue";
import { SendAccountingOperationQueuePaidToBeneficiaryRequest } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPaymentQueue/helper/components/AccountingOperationQueuePaidToBeneficiaryDrawerContent/@types/@accountingOperationQueuePaidToBeneficiaryDrawerContent";
import {
  AccountingAdvanceSearchRequest,
  AccountingDebtDocumentRequest,
  AccountingDebtDocumentResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/@types/@factorsAndDocsDebtDocuments";
import { getDocumentsDetailsResponse } from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsDocuments/helper/components/FactorsAndDocsDocumentsDrawerContent/@types/@documentsDetailsTypes";
import {
  AccountingGetAccountingFactorsRequest,
  AccountingGetAccountingFactorsResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsFactors/@types/@accountingFactors";
import {
  AccountingInvoicedTransactionDetailsResponse,
  AccountingInvoicedTransactionRequest,
  AccountingInvoicedTransactionResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsInvoicedTransactions/@types/@accountingInvoicedTransactionsTypes";
import {
  AccountingSettledRequest,
  AccountingSettledResponse,
  statisticsSettledDataRequest,
  statisticsSettledDataResponse,
} from "@pages/Finance/Accountants/FactorsAndDocs/helper/components/FactorsAndDocsSettledDocuments/@types/@factorsAndDocsSettledDocumentsTypes";
import {
  AdminSettlementAdvanceFilterRequest,
  AdminSettlementAdvanceFilterResponse,
  CreateSettlementRequest,
  CreateSettlementResponse,
  DocumentIdRequest,
  DocumentIdResponse,
  GetAccountingTurnOverBannerRequest,
  GetAccountingTurnOverBannerResponse,
  GetAdminSettlementByIdResponse,
  GetAmountTurnOverRequest,
  GetAmountTurnOverResponse,
  GetDocumentCreditSettlementRequest,
  GetDocumentCreditSettlementResponse,
  GetDocumentDebitSettlementRequest,
  GetDocumentDebitSettlementResponse,
  getDocumentsAllPreviewRequest,
  getDocumentsAllPreviewResponse,
  GetDocumentSettlementCountRequest,
  GetDocumentSettlementCountResponse,
  GetTotalAmountTurnOverRequest,
  GetTotalAmountTurnOverResponse,
  ParentAccountingAdvanceSearchResponse,
  SendAdminSettlementByIdAndDescRequest,
  sendDocumentDrawerDataRequest,
} from "@pages/Finance/Accountants/TurnOver/@type/@turnOver";

import { accountingApi } from "../accountingApi";

export const finance = accountingApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAmountTurnOver: builder.query<GetAmountTurnOverResponse, GetAmountTurnOverRequest>(
      {
        query: (params) => ({
          url: `/admin/document/amounts${createQueryString(params)}`,
          method: "GET",
        }),
      }
    ),
    GetTotalAmountTurnOver: builder.query<
      GetTotalAmountTurnOverResponse,
      GetTotalAmountTurnOverRequest
    >({
      query: (params) => ({
        url: `/admin/settlement/count/advance-filter${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    parentAdvanceSearchTransactions: builder.query<
      ParentAccountingAdvanceSearchResponse,
      AccountingAdvanceSearchRequest
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params.page !== undefined) queryParams.append("page", String(params.page));
        if (params.size !== undefined) queryParams.append("size", String(params.size));
        if (params.sort?.length)
          params.sort.forEach((s) => queryParams.append("sort", s));
        if (params.isPaid !== undefined)
          queryParams.append("isPaid", String(params.isPaid));
        if (params.from) queryParams.append("from", String(params.from));
        if (params.to) queryParams.append("to", String(params.to));
        if (params.branchId) queryParams.append("branchId", String(params.branchId));
        if (params.samimService)
          queryParams.append("samimService", String(params.samimService));

        return {
          url: `/admin/document/parent/advance-search?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
    documentId: builder.query<DocumentIdResponse, DocumentIdRequest>({
      query: ({ id }) => ({
        url: `admin/document/${id}`,
        method: "GET",
      }),
    }),
    adminSettlementAdvanceFilter: builder.query<
      AdminSettlementAdvanceFilterResponse,
      AdminSettlementAdvanceFilterRequest
    >({
      query: (params) => ({
        url: `/admin/settlement/advance-filter${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAllFactorsDetails: builder.query<
      AccountingGetAllFactorsDetailsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/admin/accounting-invoice/${id}`,
        method: "GET",
      }),
    }),
    getDocumentsAllPreview: builder.mutation<
      getDocumentsAllPreviewResponse,
      getDocumentsAllPreviewRequest
    >({
      query: (body) => ({
        url: "/admin/document/master-documents/preview",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["tag/accounting"],
    }),

    getDocumentsDetails: builder.query<getDocumentsDetailsResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/document/${id}`,
        method: "GET",
      }),
    }),
    // sendDocumentModalData: builder.mutation<number, sendDocumentModalDataRequest>({
    //   query: (body) => ({
    //     url: "/admin/document/master-documents",
    sendDocumentDrawerData: builder.mutation<number, sendDocumentDrawerDataRequest>({
      // query: ({ documentsUUID, description }) => {
      //   const queryParams = new URLSearchParams();

      //   documentsUUID.forEach((uuid: string) => {
      //     queryParams.append("documentsUUID", uuid);
      //   });

      //   queryParams.append("description", description);

      //   return {
      //     url: `/admin/document/sub-documents/master-document?${queryParams.toString()}`,
      //     method: "POST",
      //   };
      // },
      query: ({ documentsUUID, description }) => ({
        url: `/admin/document/sub-documents/master-document?${documentsUUID
          .map((uuid: string) => `documentsUUID=${uuid}`)
          .join("&")}&description=${description}`,
        method: "POST",
      }),
      invalidatesTags: ["tag/accounting"],
    }),
    getAllInvoicedTransactions: builder.mutation<
      AccountingInvoicedTransactionResponse,
      AccountingInvoicedTransactionRequest
    >({
      query: (body) => ({
        url: "/admin/document/get-all-transaction",
        method: "POST",
        body,
      }),
    }),
    createSettlement: builder.mutation<CreateSettlementResponse, CreateSettlementRequest>(
      {
        query: (body) => ({
          url: "/admin/settlement",
          method: "POST",
          body,
        }),
      }
    ),
    getAllInvoicedTransactionsDetails: builder.query<
      AccountingInvoicedTransactionDetailsResponse,
      { transactionId: number }
    >({
      query: ({ transactionId }) => ({
        url: `/admin/document/transaction/${transactionId}`,
        method: "GET",
      }),
    }),
    getAccountingFactors: builder.query<
      AccountingGetAccountingFactorsResponse,
      AccountingGetAccountingFactorsRequest
    >({
      query: (params) => {
        return {
          url: `/admin/accounting-invoice/search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getBusinessAccounting: builder.query<
      getBusinessAccountingResponse,
      { isPaid: boolean | undefined }
    >({
      query: (params) => ({
        url: `/admin/document/business-ids${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getSettlementBusinessIds: builder.query<
      GetSettlementBusinessIdsResponse,
      { isPaid: boolean }
    >({
      query: (params) => ({
        url: `/admin/settlement/business-ids${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getBranchAccounting: builder.query<
      getBranchAccountingResponse,
      { isPaid: boolean; businessId: number }
    >({
      query: (params) => ({
        url: `/admin/document/branches-ids${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getSettlementBranches: builder.query<
      GetSettlementBranchesResponse,
      { params: { isPaid: boolean }; businessId: number }
    >({
      query: ({ businessId, params }) => ({
        url: `/admin/settlement/business/${businessId}/branch-ids${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getServiceAccounting: builder.query<string[], { isPaid: boolean; branchId: number }>({
      query: (params) => ({
        url: `/admin/document/document/services${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getSettlementService: builder.query<
      string[],
      { params: { isPaid: boolean }; branchId: number }
    >({
      query: ({ params, branchId }) => ({
        url: `/admin/settlement/business/branch/${branchId}/services${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAdminSettlementById: builder.query<GetAdminSettlementByIdResponse, string>({
      query: (uuid) => ({
        url: `/admin/settlement/${uuid}`,
        method: "GET",
      }),
    }),
    getDocumentDebitSettlement: builder.query<
      GetDocumentDebitSettlementResponse,
      GetDocumentDebitSettlementRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/admin/document/debit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    sendAdminSettlementByIdAndDesc: builder.mutation<
      void,
      SendAdminSettlementByIdAndDescRequest
    >({
      query: ({ id, params }) => ({
        url: `/admin/settlement/${id}/pay${createQueryString(params)}`,
        method: "PUT",
      }),
    }),
    sendSettlementDocumentsDrawerContent: builder.mutation<number, string[]>({
      query: (body) => ({
        url: "/admin/document/pay",
        method: "POST",
        body,
      }),
    }),
    getDocumentSettlementCount: builder.query<
      GetDocumentSettlementCountResponse,
      GetDocumentSettlementCountRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/admin/document/settlement/${settlementId}/count${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getDocumentCreditSettlement: builder.query<
      GetDocumentCreditSettlementResponse,
      GetDocumentCreditSettlementRequest
    >({
      query: ({ settlementId, params }) => ({
        url: `/admin/document/credit/settlement/${settlementId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAccountingSettled: builder.query<
      AccountingSettledResponse,
      AccountingSettledRequest
    >({
      query: (params) => {
        return {
          url: `/admin/settlement/search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getStatisticsSettledData: builder.query<
      statisticsSettledDataResponse,
      statisticsSettledDataRequest
    >({
      query: (params) => {
        return {
          url: `/admin/settlement/stats/search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getAccountingDebtDocument: builder.query<
      AccountingDebtDocumentResponse,
      AccountingDebtDocumentRequest
    >({
      query: (params) => {
        return {
          url: `/admin/document/advance-search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    getAccountingPaymentStats: builder.query<IdTitleName[], void>({
      query: () => {
        return {
          url: "/enum/settlement-status",
          method: "GET",
          headers: {
            "Accept-Language": "fa",
          },
        };
      },
    }),
    getAccountingOperationPayableList: builder.query<
      GetAccountingOperationPayableListResponse,
      GetAccountingOperationPayableListRequest
    >({
      query: ({ request, ...rest }) => ({
        url: `admin/settlement/preview/search${createQueryStringEnhanced(
          {
            ...request,
            ...rest,
          },
          { useCommaSeparatedArrays: true }
        )}`,
        method: "GET",
      }),
    }),
    getAccountingOperationSettlementDocumentBanner: builder.query<
      GetAccountingOperationSettlementDocumentBannerResponse,
      GetAccountingOperationSettlementDocumentBannerRequest
    >({
      query: (params) => ({
        url: `admin/settlement/preview/amounts${createQueryStringEnhanced(params, {
          useCommaSeparatedArrays: true,
        })}`,
        method: "GET",
      }),
    }),
    sendAccountingOperationQueuePaidToBeneficiary: builder.mutation<
      { maskedMobileNumber: string; payableAmount: number },
      SendAccountingOperationQueuePaidToBeneficiaryRequest
    >({
      query: (body) => ({
        url: "admin/settlement/pay",
        method: "POST",
        body,
      }),
    }),
    sendAccountingOperationQueuePaidToBeneficiaryOtp: builder.mutation<
      void,
      {
        otpCode: string;
      }
    >({
      query: ({ otpCode }: { otpCode: string }) => ({
        url: "admin/settlement/pay/confirm",
        method: "POST",
        body: { otpCode: otpCode },
      }),
    }),
    getAccountingOperationQueueBanner: builder.query<
      getAccountingOperationQueueBannerResponse,
      getAccountingOperationQueueBannerRequest
    >({
      query: (params) => ({
        url: `admin/settlement/pending-for-payment/banner${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getSettlementBeneficiariesDetail: builder.query<
      getSettlementBeneficiariesDetailResponse,
      getSettlementBeneficiariesDetailRequest
    >({
      query: (params) => ({
        url: `admin/document-aggregation/preview/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getSettlementBeneficiariesDetailDocuments: builder.query<
      getSettlementBeneficiariesDetailDocumentsResponse,
      getSettlementBeneficiariesDetailDocumentsRequest
    >({
      query: ({ uuid }) => ({
        url: `admin/document-aggregation/${uuid}`,
        method: "GET",
      }),
    }),
    getSettlementBeneficiariesDetailDocumentsList: builder.query<
      getSettlementBeneficiariesDetailDocumentsListResponse,
      getSettlementBeneficiariesDetailDocumentsListRequest
    >({
      query: (params) => ({
        url: `admin/document-aggregation/document${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAccountingTurnOverBanner: builder.query<
      GetAccountingTurnOverBannerResponse,
      GetAccountingTurnOverBannerRequest
    >({
      query: (params) => ({
        url: `/admin/document/financial-turnover/summary${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyParentAdvanceSearchTransactionsQuery,
  useLazyDocumentIdQuery,
  useLazyGetAllFactorsDetailsQuery,
  useGetAllInvoicedTransactionsMutation,
  useLazyGetAllInvoicedTransactionsDetailsQuery,
  useLazyGetAccountingFactorsQuery,
  useLazyGetBusinessAccountingQuery,
  useLazyGetBranchAccountingQuery,
  useLazyGetServiceAccountingQuery,
  useSendDocumentDrawerDataMutation,
  useSendSettlementDocumentsDrawerContentMutation,
  useLazyGetDocumentsDetailsQuery,
  useCreateSettlementMutation,
  useLazyAdminSettlementAdvanceFilterQuery,
  useLazyGetAdminSettlementByIdQuery,
  useLazyGetDocumentDebitSettlementQuery,
  useSendAdminSettlementByIdAndDescMutation,
  useLazyGetDocumentSettlementCountQuery,
  useLazyGetDocumentCreditSettlementQuery,
  useLazyGetSettlementBusinessIdsQuery,
  useLazyGetSettlementBranchesQuery,
  useLazyGetSettlementServiceQuery,
  useLazyGetAmountTurnOverQuery,
  useLazyGetTotalAmountTurnOverQuery,
  useLazyGetAccountingSettledQuery,
  useLazyGetStatisticsSettledDataQuery,
  useLazyGetAccountingDebtDocumentQuery,
  useLazyGetAccountingPaymentStatsQuery,
  useLazyGetAccountingOperationPayableListQuery,
  useLazyGetAccountingOperationSettlementDocumentBannerQuery,
  useSendAccountingOperationQueuePaidToBeneficiaryMutation,
  useSendAccountingOperationQueuePaidToBeneficiaryOtpMutation,
  useLazyGetAccountingOperationQueueBannerQuery,
  useLazyGetSettlementBeneficiariesDetailQuery,
  useLazyGetSettlementBeneficiariesDetailDocumentsQuery,
  useLazyGetSettlementBeneficiariesDetailDocumentsListQuery,
  useLazyGetAccountingTurnOverBannerQuery,
} = finance;
