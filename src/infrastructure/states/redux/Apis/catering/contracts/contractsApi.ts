import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  UpdateAllContractRequest,
  UpdateAllContractResponse,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailContract/helper/drawer/AllContractsDetailContractEditDrawerContent/@types/@allContractsDetailContractEditDrawerContent";
import {
  GetAllContractHistoryDetailRequest,
  GetAllContractHistoryDetailResponse,
  GetAllContractHistoryRequest,
  GetAllContractHistoryResponse,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailHistory/@types/@allContractsDetailHistory";
import {
  CopyAllContractRequest,
  CopyAllContractResponse,
  ExtendAllContractRequest,
  ExtendAllContractResponse,
  UpdateAllContractStatusRequest,
  UpdateAllContractStatusResponse,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/@types/@allContractsListContracts";
import {
  CreateAllContractRequest,
  CreateAllContractResponse,
  SubmitAllContractRequest,
  SubmitAllContractResponse,
} from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCreateDrawer/helper/components/AllContractsListContractsCreateDrawerContent/@types/@allContractsListContractsCreateDrawerContent";
import {
  GetMyContractHistoryDetailRequest,
  GetMyContractHistoryDetailResponse,
  GetMyContractHistoryRequest,
  GetMyContractHistoryResponse,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailHistory/@types/@myContractsDetailHistory";
import {
  CopyMyContractRequest,
  CopyMyContractResponse,
  ExtendMyContractRequest,
  ExtendMyContractResponse,
  UpdateMyContractStatusRequest,
  UpdateMyContractStatusResponse,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/@types/@myContractsListContracts";
import {
  CreateMyContractRequest,
  CreateMyContractResponse,
  SubmitMyContractRequest,
  SubmitMyContractResponse,
} from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCreateDrawer/helper/components/MyContractsListContractsCreateDrawerContent/@types/@myContractsListContractsCreateDrawerContent";
import {
  GetMyRequestContractStatusAnalyticsRequest,
  GetMyRequestContractStatusAnalyticsResponse,
} from "@pages/Catering/contracts/Requests/RequestMyContractsList/@types/@getMyRequestContractStatusAnalytics";
import {
  GetMyRequestContractsViewRequest,
  GetMyRequestContractsViewResponse,
} from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/@types/@requestMyContractsListWaited";
import {
  DeleteMyRequestContractProductRequest,
  DeleteMyRequestContractProductResponse,
  UpdateMyRequestContractProductRequest,
  UpdateMyRequestContractProductResponse,
} from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentFoods/@types/@requestMyContractsListWaitedCreatedDrawerContentFoods";
import {
  GetAllRequestContractStatusAnalyticsRequest,
  GetAllRequestContractStatusAnalyticsResponse,
} from "@pages/Catering/contracts/Requests/RequestsContractsList/@types/@getAllRequestContractStatusAnalytics";
import {
  GetAllRequestContractsViewRequest,
  GetAllRequestContractsViewResponse,
} from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";
import {
  GetAllRequestContractRejectReasonsRequest,
  GetAllRequestContractRejectReasonsResponse,
} from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/_shared/components/RequestsContractsListWaitedModalContent/@types/@requestsContractsListWaitedModalContent";
import {
  AcceptAllRequestContractRequest,
  AcceptAllRequestContractResponse,
  RejectAllRequestContractRequest,
  RejectAllRequestContractResponse,
} from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/@types/@requestsContractsListWaitedCreatedDrawerContent";
import {
  DeleteAllRequestContractProductRequest,
  DeleteAllRequestContractProductResponse,
  UpdateAllRequestContractProductRequest,
  UpdateAllRequestContractProductResponse,
} from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/helper/components/RequestsContractsListWaitedCreatedDrawerContentFoods/@types/@requestsContractsListWaitedCreatedDrawerContentFoods";

import { cateringApi } from "../../cateringApi";

export const contractsApi = cateringApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRequestContractStatusAnalytics: builder.mutation<
      GetAllRequestContractStatusAnalyticsResponse,
      GetAllRequestContractStatusAnalyticsRequest
    >({
      query: (body) => ({
        url: `/admin/contract/filter/analytics`,
        method: "POST",
        body,
      }),
    }),
    getMyRequestContractStatusAnalytics: builder.mutation<
      GetMyRequestContractStatusAnalyticsResponse,
      GetMyRequestContractStatusAnalyticsRequest
    >({
      query: (body) => ({
        url: `/manager/contract/filter/analytics`,
        method: "POST",
        body,
      }),
    }),
    getAllRequestContractsView: builder.query<
      GetAllRequestContractsViewResponse,
      GetAllRequestContractsViewRequest
    >({
      query: (params) => ({
        url: `/admin/contract/view${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyRequestContractsView: builder.query<
      GetMyRequestContractsViewResponse,
      GetMyRequestContractsViewRequest
    >({
      query: (params) => ({
        url: `/manager/contract/view${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    acceptAllRequestContract: builder.mutation<
      AcceptAllRequestContractResponse,
      AcceptAllRequestContractRequest
    >({
      query: (body) => ({
        url: `/admin/contract/accept`,
        method: "POST",
        body,
      }),
    }),
    rejectAllRequestContract: builder.mutation<
      RejectAllRequestContractResponse,
      RejectAllRequestContractRequest
    >({
      query: (body) => ({
        url: `/admin/contract/reject`,
        method: "POST",
        body,
      }),
    }),
    getAllRequestContractRejectReasons: builder.query<
      GetAllRequestContractRejectReasonsResponse,
      GetAllRequestContractRejectReasonsRequest
    >({
      query: () => ({
        url: `/admin/contract/reject-reasons`,
        method: "GET",
      }),
    }),
    updateAllRequestContractProduct: builder.mutation<
      UpdateAllRequestContractProductResponse,
      UpdateAllRequestContractProductRequest
    >({
      query: (body) => ({
        url: `/admin/product/update`,
        method: "PUT",
        body,
      }),
    }),
    updateMyRequestContractProduct: builder.mutation<
      UpdateMyRequestContractProductResponse,
      UpdateMyRequestContractProductRequest
    >({
      query: (body) => ({
        url: `/manager/product/update`,
        method: "PUT",
        body,
      }),
    }),
    deleteAllRequestContractProduct: builder.mutation<
      DeleteAllRequestContractProductResponse,
      DeleteAllRequestContractProductRequest
    >({
      query: (params) => ({
        url: `/admin/product/delete${createQueryString(params)}`,
        method: "DELETE",
      }),
    }),
    deleteMyRequestContractProduct: builder.mutation<
      DeleteMyRequestContractProductResponse,
      DeleteMyRequestContractProductRequest
    >({
      query: (params) => ({
        url: `/manager/product/delete${createQueryString(params)}`,
        method: "DELETE",
      }),
    }),
    createAllContract: builder.mutation<
      CreateAllContractResponse,
      CreateAllContractRequest
    >({
      query: (body) => ({
        url: "/admin/contract/create",
        method: "POST",
        body,
      }),
    }),
    createMyContract: builder.mutation<CreateMyContractResponse, CreateMyContractRequest>(
      {
        query: (body) => ({
          url: "/manager/contract/create",
          method: "POST",
          body,
        }),
      }
    ),
    submitAllContract: builder.mutation<
      SubmitAllContractResponse,
      SubmitAllContractRequest
    >({
      query: (body) => ({
        url: "/admin/contract/submit",
        method: "POST",
        body,
      }),
    }),
    submitMyContract: builder.mutation<SubmitMyContractResponse, SubmitMyContractRequest>(
      {
        query: (body) => ({
          url: "/manager/contract/submit",
          method: "POST",
          body,
        }),
      }
    ),
    extendAllContract: builder.mutation<
      ExtendAllContractResponse,
      ExtendAllContractRequest
    >({
      query: (body) => ({
        url: "/admin/contract/extend",
        method: "POST",
        body,
      }),
    }),
    extendMyContract: builder.mutation<ExtendMyContractResponse, ExtendMyContractRequest>(
      {
        query: (body) => ({
          url: "/manager/contract/extend",
          method: "POST",
          body,
        }),
      }
    ),
    copyAllContract: builder.mutation<CopyAllContractResponse, CopyAllContractRequest>({
      query: (body) => ({
        url: "/admin/contract/copy",
        method: "POST",
        body,
      }),
    }),
    copyMyContract: builder.mutation<CopyMyContractResponse, CopyMyContractRequest>({
      query: (body) => ({
        url: "/manager/contract/copy",
        method: "POST",
        body,
      }),
    }),
    updateAllContractStatus: builder.mutation<
      UpdateAllContractStatusResponse,
      UpdateAllContractStatusRequest
    >({
      query: (body) => ({
        url: "/admin/contract/status",
        method: "PUT",
        body,
      }),
    }),
    updateMyContractStatus: builder.mutation<
      UpdateMyContractStatusResponse,
      UpdateMyContractStatusRequest
    >({
      query: (body) => ({
        url: "/manager/contract/status",
        method: "PUT",
        body,
      }),
    }),
    updateAllContract: builder.mutation<
      UpdateAllContractResponse,
      UpdateAllContractRequest
    >({
      query: (body) => ({
        url: "/admin/contract/update",
        method: "PUT",
        body,
      }),
    }),
    getAllContractHistory: builder.mutation<
      GetAllContractHistoryResponse,
      GetAllContractHistoryRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/contract/history${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),
    getMyContractHistory: builder.mutation<
      GetMyContractHistoryResponse,
      GetMyContractHistoryRequest
    >({
      query: ({ params, body }) => ({
        url: `/manager/contract/history${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),
    getAllContractHistoryDetail: builder.query<
      GetAllContractHistoryDetailResponse,
      GetAllContractHistoryDetailRequest
    >({
      query: (params) => ({
        url: `/admin/contract/history/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyContractHistoryDetail: builder.query<
      GetMyContractHistoryDetailResponse,
      GetMyContractHistoryDetailRequest
    >({
      query: (params) => ({
        url: `/manager/contract/history/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllRequestContractStatusAnalyticsMutation,
  useGetMyRequestContractStatusAnalyticsMutation,
  useGetAllRequestContractsViewQuery,
  useGetMyRequestContractsViewQuery,
  useAcceptAllRequestContractMutation,
  useRejectAllRequestContractMutation,
  useGetAllRequestContractRejectReasonsQuery,
  useUpdateAllRequestContractProductMutation,
  useUpdateMyRequestContractProductMutation,
  useDeleteAllRequestContractProductMutation,
  useDeleteMyRequestContractProductMutation,
  useCreateAllContractMutation,
  useCreateMyContractMutation,
  useSubmitAllContractMutation,
  useSubmitMyContractMutation,
  useExtendAllContractMutation,
  useExtendMyContractMutation,
  useCopyAllContractMutation,
  useCopyMyContractMutation,
  useUpdateAllContractStatusMutation,
  useUpdateMyContractStatusMutation,
  useUpdateAllContractMutation,
  useGetAllContractHistoryMutation,
  useGetMyContractHistoryMutation,
  useGetAllContractHistoryDetailQuery,
  useGetMyContractHistoryDetailQuery,
} = contractsApi;
