import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetCateringMySelfsListRequest,
  GetCateringMySelfsListResponse,
  GetCateringSelfsListRequest,
  GetCateringSelfsListResponse,
} from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import {
  CreateCateringMyRestaurantRequest,
  CreateCateringMyRestaurantResponse,
  UpdateCateringMyRestaurantRequest,
  UpdateCateringMyRestaurantResponse,
  cateringUploadFileResponse,
  createCateringRestaurantRequest,
  createCateringRestaurantResponse,
  updateCateringRestaurantRequest,
  updateCateringRestaurantResponse,
} from "@pages/Catering/Selfs/_shared/@types/@cateringSelfMutations";
import { deactiveCateringSelfsListRequest } from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsFoodSchedule/@types/@cateringSelfsFoodSchedule";
import {
  GetDetailAllSelfsContractsRequest,
  GetDetailAllSelfsContractsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsContracts/@types/@cateringAllSelfsContracts";
import {
  getDetailAllSelfRequest,
  getDetailAllSelfResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsDetail/@types/@cateringAllSelfsDetail";
import {
  GetDetailAllSelfsFoodScheduleRequest,
  GetDetailAllSelfsFoodScheduleResponse,
  GetDetailAllSelfsProductsRequest,
  GetDetailAllSelfsProductsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";
import {
  GetDetailAllSelfsHistoryRequest,
  GetDetailAllSelfsHistoryResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsHistory/@types/@cateringAllSelfsHistory";
import {
  GetDetailAllSelfsHistoryDetailRequest,
  GetDetailAllSelfsHistoryDetailResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsHistory/helper/components/CateringAllSelfsHistoryDrawer/@types/@cateringAllSelfsHistoryDrawer";
import { GetDeactiveReasonsResponse } from "@pages/Catering/Selfs/AllSelfs/AllSelfList/helper/components/AllSelfListDeactivateModal/@types/@allSelfListDeactivateModal";
import {
  GetDetailMySelfsContractsRequest,
  GetDetailMySelfsContractsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsContracts/@types/@cateringMySelfsContracts";
import {
  getDetailMySelfsRequest,
  getDetailMySelfsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsDetail/@types/@cateringMySelfsDetail";
import {
  GetDetailMySelfsFoodScheduleRequest,
  GetDetailMySelfsFoodScheduleResponse,
  GetDetailMySelfsProductsRequest,
  GetDetailMySelfsProductsResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";
import {
  GetDetailMySelfsHistoryRequest,
  GetDetailMySelfsHistoryResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsHistory/@types/@cateringMySelfsHistory";
import {
  GetDetailMySelfsHistoryDetailRequest,
  GetDetailMySelfsHistoryDetailResponse,
} from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsHistory/helper/components/CateringMySelfsHistoryDrawer/@types/@cateringMySelfsHistoryDrawer";

import { cateringApi } from "../../cateringApi";

export const selfsApi = cateringApi.injectEndpoints({
  endpoints: (builder) => ({
    getCateringSelfsList: builder.mutation<
      GetCateringSelfsListResponse,
      GetCateringSelfsListRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/restaurant/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    deactiveCateringSelfsList: builder.mutation<void, deactiveCateringSelfsListRequest>({
      query: (body) => ({
        url: "/admin/restaurant/status",
        method: "PUT",
        body,
      }),
    }),

    getDeactiveReasons: builder.query<GetDeactiveReasonsResponse, void>({
      query: () => ({
        url: "enums/de-active-reason",
        method: "GET",
      }),
    }),

    getCateringMySelfsList: builder.mutation<
      GetCateringMySelfsListResponse,
      GetCateringMySelfsListRequest
    >({
      query: ({ params, body }) => ({
        url: `/manager/restaurant/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    createCateringRestaurant: builder.mutation<
      createCateringRestaurantResponse,
      createCateringRestaurantRequest
    >({
      query: (body) => ({
        url: `/admin/restaurant/create`,
        method: "POST",
        body,
      }),
    }),

    createCateringMyRestaurant: builder.mutation<
      CreateCateringMyRestaurantResponse,
      CreateCateringMyRestaurantRequest
    >({
      query: (body) => ({
        url: `/manager/restaurant/create`,
        method: "POST",
        body,
      }),
    }),

    updateCateringRestaurant: builder.mutation<
      updateCateringRestaurantResponse,
      updateCateringRestaurantRequest
    >({
      query: (body) => ({
        url: `/admin/restaurant/update`,
        method: "PUT",
        body,
      }),
    }),

    updateCateringMyRestaurant: builder.mutation<
      UpdateCateringMyRestaurantResponse,
      UpdateCateringMyRestaurantRequest
    >({
      query: (body) => ({
        url: `/manager/restaurant/update`,
        method: "PUT",
        body,
      }),
    }),

    cateringUploadFile: builder.mutation<cateringUploadFileResponse, FormData>({
      query: (formData) => ({
        url: "/admin/upload",
        method: "POST",
        body: formData,
        responseHandler: "text",
      }),
    }),

    // tab 1 self details
    getDetailAllSelf: builder.query<getDetailAllSelfResponse, getDetailAllSelfRequest>({
      query: (params) => ({
        url: `/admin/restaurant/view${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getDetailMySelfs: builder.query<getDetailMySelfsResponse, getDetailMySelfsRequest>({
      query: (params) => ({
        url: `/manager/restaurant/view${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // tab 2 self detail Schegule
    getDetailAllSelfsFoodSchedule: builder.mutation<
      GetDetailAllSelfsFoodScheduleResponse,
      GetDetailAllSelfsFoodScheduleRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/plan/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getDetailMySelfsFoodSchedule: builder.mutation<
      GetDetailMySelfsFoodScheduleResponse,
      GetDetailMySelfsFoodScheduleRequest
    >({
      query: ({ params, body }) => ({
        url: `/manager/plan/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getDetailAllSelfsProducts: builder.mutation<
      GetDetailAllSelfsProductsResponse,
      GetDetailAllSelfsProductsRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/product/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getDetailMySelfsProducts: builder.mutation<
      GetDetailMySelfsProductsResponse,
      GetDetailMySelfsProductsRequest
    >({
      query: ({ params, body }) => ({
        url: `/manager/product/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    // tab 3 self detail contracts
    getDetailAllSelfsContracts: builder.mutation<
      GetDetailAllSelfsContractsResponse,
      GetDetailAllSelfsContractsRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/contract/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getDetailMySelfsContracts: builder.mutation<
      GetDetailMySelfsContractsResponse,
      GetDetailMySelfsContractsRequest
    >({
      query: ({ params, body }) => ({
        url: `/manager/contract/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    // tab 4 self detail history
    getDetailAllSelfsHistory: builder.mutation<
      GetDetailAllSelfsHistoryResponse,
      GetDetailAllSelfsHistoryRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/restaurant/history${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getDetailMySelfsHistory: builder.mutation<
      GetDetailMySelfsHistoryResponse,
      GetDetailMySelfsHistoryRequest
    >({
      query: ({ params, body }) => ({
        url: `/manager/restaurant/history${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getDetailAllSelfsHistoryDetail: builder.query<
      GetDetailAllSelfsHistoryDetailResponse,
      GetDetailAllSelfsHistoryDetailRequest
    >({
      query: (params) => ({
        url: `/admin/restaurant/history/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getDetailMySelfsHistoryDetail: builder.query<
      GetDetailMySelfsHistoryDetailResponse,
      GetDetailMySelfsHistoryDetailRequest
    >({
      query: (params) => ({
        url: `/manager/restaurant/history/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCateringSelfsListMutation,
  useGetCateringMySelfsListMutation,
  useCreateCateringRestaurantMutation,
  useCreateCateringMyRestaurantMutation,
  useUpdateCateringRestaurantMutation,
  useUpdateCateringMyRestaurantMutation,
  useCateringUploadFileMutation,
  useGetDetailAllSelfQuery,
  useGetDetailMySelfsQuery,
  useGetDetailAllSelfsContractsMutation,
  useGetDetailMySelfsContractsMutation,
  useGetDetailAllSelfsFoodScheduleMutation,
  useGetDetailMySelfsFoodScheduleMutation,
  useGetDetailAllSelfsHistoryMutation,
  useGetDetailMySelfsHistoryMutation,
  useGetDetailAllSelfsHistoryDetailQuery,
  useGetDetailMySelfsHistoryDetailQuery,
  useGetDetailAllSelfsProductsMutation,
  useGetDetailMySelfsProductsMutation,
  useDeactiveCateringSelfsListMutation,
  useGetDeactiveReasonsQuery,
} = selfsApi;
