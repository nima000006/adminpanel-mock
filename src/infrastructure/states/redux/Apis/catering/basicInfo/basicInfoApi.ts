import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  deactivateBasicInfoFoodRequest,
  getBasicInfoFoodsListRequest,
  getBasicInfoFoodsListResponse,
} from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";
import {
  createBasicInfoFoodRequest,
  createBasicInfoFoodResponse,
} from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/helper/drawer/CateringBaseInfoDetailsAddDrawerContent/@types/@cateringBaseInfoDetailsAddDrawerContent";
import {
  updateBasicInfoFoodRequest,
  updateBasicInfoFoodResponse,
  viewBasicInfoFoodRequest,
  viewBasicInfoFoodResponse,
} from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/helper/drawer/CateringBaseInfoDetailsEditDrawerContent/@types/@cateringBaseInfoDetailsEditDrawerContent";
import {
  getBasicInfoCategoryCountRequest,
  getBasicInfoCategoryCountResponse,
} from "@pages/Catering/BasicInfo/CateringBasicInfoLists/@types/@CateringBasicInfoLists";

import { cateringApi } from "../../cateringApi";

export const basicInfoApi = cateringApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasicInfoCategoryCount: builder.mutation<
      getBasicInfoCategoryCountResponse,
      getBasicInfoCategoryCountRequest
    >({
      query: (body) => ({
        url: "/admin/base-product/filter/category-count",
        method: "POST",
        body,
      }),
    }),

    getBasicInfoFoodsList: builder.mutation<
      getBasicInfoFoodsListResponse,
      getBasicInfoFoodsListRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/base-product/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    createBasicInfoFood: builder.mutation<
      createBasicInfoFoodResponse,
      createBasicInfoFoodRequest
    >({
      query: (body) => ({
        url: "/admin/base-product/create",
        method: "POST",
        body,
      }),
    }),

    updateBasicInfoFood: builder.mutation<
      updateBasicInfoFoodResponse,
      updateBasicInfoFoodRequest
    >({
      query: (body) => ({
        url: "/admin/base-product/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "tag/catering", id: arg.id }],
    }),

    viewBasicInfoFood: builder.query<viewBasicInfoFoodResponse, viewBasicInfoFoodRequest>(
      {
        query: (params) => ({
          url: `/admin/base-product/view${createQueryString(params)}`,
          method: "GET",
        }),
        providesTags: (_result, _error, arg) => [{ type: "tag/catering", id: arg.id }],
      }
    ),
    deactivateBasicInfoFood: builder.mutation<void, deactivateBasicInfoFoodRequest>({
      query: (params) => ({
        url: `/admin/base-product/deactive${createQueryString(params)}`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "tag/catering", id: arg.id }],
    }),
  }),
});
export const {
  useGetBasicInfoCategoryCountMutation,
  useGetBasicInfoFoodsListMutation,
  useCreateBasicInfoFoodMutation,
  useUpdateBasicInfoFoodMutation,
  useViewBasicInfoFoodQuery,
  useDeactivateBasicInfoFoodMutation,
} = basicInfoApi;
