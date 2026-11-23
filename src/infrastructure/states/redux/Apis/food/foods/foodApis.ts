import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  CreateNewFoodRequest,
  CreateNewFoodResponse,
} from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/components/DrawerContent/CreateFood/@types/@allContractCreateFoodDrawerContent";
import { GetAllFoodDetailResponse } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@allContractFoodDetailDrawerContent";
import {
  CreateMyNewFoodRequest,
  CreateMyNewFoodResponse,
} from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/CreateFood/@types/@myContractCreateFoodDrawerContent";
import {
  GetMyFoodByFilterRequest,
  GetMyFoodByFilterResponse,
  MyFoodDetailResponse,
} from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";
import {
  UpdateDetailAllFoodsRequest,
  UpdateDetailAllFoodsResponse,
} from "@pages/Food/Foods/AllFoods/AllFoodsDetail/helpers/components/AllFoodsDetailEditDrawerContent/@types/allFoodsDetailEditDrawerContent";
import {
  CreateAllFoodRequest,
  CreateAllFoodResponse,
} from "@pages/Food/Foods/AllFoods/AllFoodsList/helpers/components/AllFoodsListDrawerContent/@types/@allFoodsListDrawerContent";
import {
  UpdateDetailMyFoodsRequest,
  UpdateDetailMyFoodsResponse,
} from "@pages/Food/Foods/MyFoods/MyFoodsDetail/helpers/components/MyFoodsDetailEditDrawerContent/@types/@myFoodsDetailEditDrawerContent";
import {
  CreateMyFoodRequest,
  CreateMyFoodResponse,
} from "@pages/Food/Foods/MyFoods/MyFoodsList/helpers/components/MyFoodsListDrawerContent/@types/myFoodsListDrawerContent";

import {
  GetAllFoodByFilterRequest,
  GetAllFoodByFilterResponse,
  GetFoodsListRequest,
  GetFoodsListResponse,
} from "../../../../../../pages/Food/Foods/AllFoods/AllFoodsList/@types/allFoodsList";
import {
  GetMyFoodsListRequest,
  GetMyFoodsListResponse,
} from "../../../../../../pages/Food/Foods/MyFoods/MyFoodsList/@types/myFoodList";
import { foodApi } from "../../foodApi";
export const foodsApi = foodApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFoodDetail: builder.query<GetAllFoodDetailResponse, { productId: number }>({
      query: (params) => ({
        url: `/admin/product/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyFoodDetail: builder.query<MyFoodDetailResponse, { productId: number }>({
      query: (params) => ({
        url: `/manager/product/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createNewFood: builder.mutation<CreateNewFoodResponse, CreateNewFoodRequest>({
      query: (body) => ({
        url: "/admin/product/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    createMyNewFood: builder.mutation<CreateMyNewFoodResponse, CreateMyNewFoodRequest>({
      query: (body) => ({
        url: "/manager/product/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    getAllFoodsList: builder.query<GetFoodsListResponse, GetFoodsListRequest>({
      query: (params) => ({
        url: `/admin/product/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    getMyFoodsList: builder.query<GetMyFoodsListResponse, GetMyFoodsListRequest>({
      query: (params) => ({
        url: `/manager/product/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    createAllFood: builder.mutation<CreateAllFoodResponse, CreateAllFoodRequest>({
      query: (body) => ({
        url: "/admin/product/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/food"],
    }),
    createMyFood: builder.mutation<CreateMyFoodResponse, CreateMyFoodRequest>({
      query: (body) => ({
        url: "/manager/product/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    updateDetailAllFoods: builder.mutation<
      UpdateDetailAllFoodsResponse,
      UpdateDetailAllFoodsRequest
    >({
      query: (body) => ({
        url: "/admin/product/update",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateDetailMyFoods: builder.mutation<
      UpdateDetailMyFoodsResponse,
      UpdateDetailMyFoodsRequest
    >({
      query: (body) => ({
        url: "/manager/product/update",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // REMOVE FOOD BY ID
    removeFoodById: builder.query<any, { productId: string }>({
      query: (params) => ({
        url: `admin/product/delete${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    // GET ALL FOODS BY FILTER
    getAllFoodByFilter: builder.query<
      GetAllFoodByFilterResponse,
      GetAllFoodByFilterRequest
    >({
      query: (params) => ({
        url: `admin/product/filter/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    // GET MY FOODS BY FILTER
    getMyFoodByFilter: builder.query<GetMyFoodByFilterResponse, GetMyFoodByFilterRequest>(
      {
        query: (params) => ({
          url: `manager/product/filter/all${createQueryString(params)}`,
          method: "GET",
        }),
      }
    ),
  }),
});
export const {
  useLazyGetAllFoodDetailQuery,
  useLazyGetMyFoodDetailQuery,
  useCreateNewFoodMutation,
  useCreateMyNewFoodMutation,
  useLazyGetAllFoodsListQuery,
  useLazyGetMyFoodsListQuery,
  useCreateAllFoodMutation,
  useCreateMyFoodMutation,
  useUpdateDetailAllFoodsMutation,
  useUpdateDetailMyFoodsMutation,
  useLazyRemoveFoodByIdQuery,
  useLazyGetAllFoodByFilterQuery,
  useLazyGetMyFoodByFilterQuery,
} = foodsApi;
