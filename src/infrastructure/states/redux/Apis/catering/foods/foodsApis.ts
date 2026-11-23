import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetAllFoodHistoryDetailRequest,
  GetAllFoodHistoryDetailResponse,
  GetAllFoodHistoryRequest,
  GetAllFoodHistoryResponse,
} from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodHistory/@types/@cateringAllFoodHistory";
import {
  CreateAllFoodRequest,
  CreateAllFoodResponse,
  DeactiveAllFoodRequest,
  DeactiveAllFoodResponse,
  ViewAllFoodRequest,
  ViewAllFoodResponse,
} from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodList/@types/@cateringAllFoodList";
import {
  GetMyFoodHistoryDetailRequest,
  GetMyFoodHistoryDetailResponse,
  GetMyFoodHistoryRequest,
  GetMyFoodHistoryResponse,
} from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/@types/@cateringMyFoodHistory";
import {
  CreateMyFoodRequest,
  CreateMyFoodResponse,
  DeactiveMyFoodRequest,
  DeactiveMyFoodResponse,
  ViewMyFoodRequest,
  ViewMyFoodResponse,
} from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/@types/@cateringMyFoodList";

import { cateringApi } from "../../cateringApi";

export const foodsApis = cateringApi.injectEndpoints({
  endpoints: (builder) => ({
    deactiveAllFood: builder.mutation<DeactiveAllFoodResponse, DeactiveAllFoodRequest>({
      query: (body) => ({
        url: "/admin/product/status",
        method: "PUT",
        body,
      }),
    }),

    deactiveMyFood: builder.mutation<DeactiveMyFoodResponse, DeactiveMyFoodRequest>({
      query: (body) => ({
        url: "/manager/product/status",
        method: "PUT",
        body,
      }),
    }),

    createAllFood: builder.mutation<CreateAllFoodResponse, CreateAllFoodRequest>({
      query: (body) => ({
        url: "/admin/product/create",
        method: "POST",
        body,
      }),
    }),

    createMyFood: builder.mutation<CreateMyFoodResponse, CreateMyFoodRequest>({
      query: (body) => ({
        url: "/manager/product/create",
        method: "POST",
        body,
      }),
    }),

    viewAllFood: builder.query<ViewAllFoodResponse, ViewAllFoodRequest>({
      query: (params) => ({
        url: `/admin/product/view${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    viewMyFood: builder.query<ViewMyFoodResponse, ViewMyFoodRequest>({
      query: (params) => ({
        url: `/manager/product/view${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getAllFoodHistory: builder.mutation<
      GetAllFoodHistoryResponse,
      GetAllFoodHistoryRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/product/history${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getMyFoodHistory: builder.mutation<GetMyFoodHistoryResponse, GetMyFoodHistoryRequest>(
      {
        query: ({ params, body }) => ({
          url: `/manager/product/history${createQueryString(params)}`,
          method: "POST",
          body,
        }),
      }
    ),

    getAllFoodHistoryDetail: builder.query<
      GetAllFoodHistoryDetailResponse,
      GetAllFoodHistoryDetailRequest
    >({
      query: (params) => ({
        url: `/admin/product/history/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getMyFoodHistoryDetail: builder.query<
      GetMyFoodHistoryDetailResponse,
      GetMyFoodHistoryDetailRequest
    >({
      query: (params) => ({
        url: `/manager/product/history/detail${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDeactiveAllFoodMutation,
  useDeactiveMyFoodMutation,
  useCreateAllFoodMutation,
  useCreateMyFoodMutation,
  useViewAllFoodQuery,
  useViewMyFoodQuery,
  useGetAllFoodHistoryMutation,
  useGetMyFoodHistoryMutation,
  useGetAllFoodHistoryDetailQuery,
  useGetMyFoodHistoryDetailQuery,
} = foodsApis;
