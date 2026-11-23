import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetAllVendorHistoryDetailRequest,
  GetAllVendorHistoryDetailResponse,
  GetAllVendorHistoryRequest,
  GetAllVendorHistoryResponse,
} from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorHistory/@types/@cateringAllVendorHistory";
import {
  CreateAllVendorRequest,
  CreateAllVendorResponse,
  DeactiveAllVendorRequest,
  DeactiveAllVendorResponse,
  GetAllVendorListRequest,
  GetAllVendorListResponse,
  GetAllVendorViewRequest,
  GetAllVendorViewResponse,
  UpdateAllVendorRequest,
  UpdateAllVendorResponse,
} from "@pages/Catering/Vendors/AllVendors/CateringAllVendorList/@types/@cateringAllVendorList";
import {
  GetMyVendorHistoryDetailRequest,
  GetMyVendorHistoryDetailResponse,
  GetMyVendorHistoryRequest,
  GetMyVendorHistoryResponse,
} from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorHistory/@types/@cateringMyVendorHistory";
import {
  CreateMyVendorRequest,
  CreateMyVendorResponse,
  DeactiveMyVendorRequest,
  DeactiveMyVendorResponse,
  GetMyVendorListRequest,
  GetMyVendorListResponse,
  GetMyVendorViewRequest,
  GetMyVendorViewResponse,
  UpdateMyVendorRequest,
  UpdateMyVendorResponse,
} from "@pages/Catering/Vendors/MyVendors/CateringMyVendorList/@types/@cateringMyVendorList";

import { cateringApi } from "../../cateringApi";

export const vendorsApi = cateringApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendorList: builder.mutation<GetAllVendorListResponse, GetAllVendorListRequest>(
      {
        query: ({ params, body }) => ({
          url: `/admin/vendor/filter${createQueryString(params)}`,
          method: "POST",
          body,
        }),
      }
    ),

    getMyVendorList: builder.mutation<GetMyVendorListResponse, GetMyVendorListRequest>({
      query: ({ params, body }) => ({
        url: `/manager/vendor/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    createAllVendor: builder.mutation<CreateAllVendorResponse, CreateAllVendorRequest>({
      query: (body) => ({
        url: "/admin/vendor/create",
        method: "POST",
        body,
      }),
    }),

    createMyVendor: builder.mutation<CreateMyVendorResponse, CreateMyVendorRequest>({
      query: (body) => ({
        url: "/manager/vendor/create",
        method: "POST",
        body,
      }),
    }),

    updateAllVendor: builder.mutation<UpdateAllVendorResponse, UpdateAllVendorRequest>({
      query: (body) => ({
        url: "/admin/vendor/update",
        method: "POST",
        body,
      }),
    }),

    updateMyVendor: builder.mutation<UpdateMyVendorResponse, UpdateMyVendorRequest>({
      query: (body) => ({
        url: "/manager/vendor/update",
        method: "POST",
        body,
      }),
    }),

    getAllVendorView: builder.query<GetAllVendorViewResponse, GetAllVendorViewRequest>({
      query: (params) => ({
        url: `/admin/vendor/view${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getMyVendorView: builder.query<GetMyVendorViewResponse, GetMyVendorViewRequest>({
      query: (params) => ({
        url: `/manager/vendor/view${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    deactiveAllVendor: builder.mutation<
      DeactiveAllVendorResponse,
      DeactiveAllVendorRequest
    >({
      query: (body) => ({
        url: "/admin/vendor/status",
        method: "PUT",
        body,
      }),
    }),

    deactiveMyVendor: builder.mutation<DeactiveMyVendorResponse, DeactiveMyVendorRequest>(
      {
        query: (body) => ({
          url: "/manager/vendor/status",
          method: "PUT",
          body,
        }),
      }
    ),

    getAllVendorHistory: builder.mutation<
      GetAllVendorHistoryResponse,
      GetAllVendorHistoryRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/vendor/history${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getMyVendorHistory: builder.mutation<
      GetMyVendorHistoryResponse,
      GetMyVendorHistoryRequest
    >({
      query: ({ params, body }) => ({
        url: `/manager/vendor/history${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getAllVendorHistoryDetail: builder.query<
      GetAllVendorHistoryDetailResponse,
      GetAllVendorHistoryDetailRequest
    >({
      query: (params) => ({
        url: `/admin/vendor/history/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getMyVendorHistoryDetail: builder.query<
      GetMyVendorHistoryDetailResponse,
      GetMyVendorHistoryDetailRequest
    >({
      query: (params) => ({
        url: `/manager/vendor/history/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllVendorListMutation,
  useGetMyVendorListMutation,
  useCreateAllVendorMutation,
  useCreateMyVendorMutation,
  useUpdateAllVendorMutation,
  useUpdateMyVendorMutation,
  useGetAllVendorViewQuery,
  useGetMyVendorViewQuery,
  useDeactiveAllVendorMutation,
  useDeactiveMyVendorMutation,
  useGetAllVendorHistoryMutation,
  useGetMyVendorHistoryMutation,
  useGetAllVendorHistoryDetailQuery,
  useGetMyVendorHistoryDetailQuery,
} = vendorsApi;
