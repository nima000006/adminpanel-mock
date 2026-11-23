import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { GetAllSelfDetailResponse } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/SelfDetail/@types/@selfDetailTab";
import { GetMySelfDetailResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/SelfDetail/@types/@selfDetailTab";
import { GetAllContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";
import { GetMyContractsBySelfIdResponse } from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/drawer/MySingleFoodScheduleListDrawerContent/@types/@mySingleFoodScheduleListDrawerContent";
import {
  UpdateAllRestaurantRequest,
  UpdateAllRestaurantResponse,
} from "@pages/Food/Selfs/AllSelfs/AllDetailSelf/helpers/components/SelfDetail/helpers/components/DrawerContent/@types/@drawerContent";
import {
  CreateAllRestaurantRequest,
  CreateAllRestaurantResponse,
} from "@pages/Food/Selfs/AllSelfs/AllSelfList/helper/components/AllSelfListDrawerContent/@types/@allSelfListDrawerContent";
import {
  UpdateMyRestaurantRequest,
  UpdateMyRestaurantResponse,
} from "@pages/Food/Selfs/MySelfs/MyDetailSelf/helpers/components/SelfDetail/helpers/components/DrawerContent/@types/@drawerContent";
import {
  CreateMyRestaurantRequest,
  CreateMyRestaurantResponse,
} from "@pages/Food/Selfs/MySelfs/MySelfList/helpers/components/MySelfListDrawerContent/@types/mySelfListDrawerContent";

import { foodApi } from "../../foodApi";

export const selfApi = foodApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSelfDetail: builder.query<GetAllSelfDetailResponse, { restaurantId: string }>({
      query: (params) => ({
        url: `/admin/restaurant/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    getAllContractsBySelfId: builder.query<
      GetAllContractsBySelfIdResponse,
      { restaurantId: string }
    >({
      query: (params) => ({
        url: `/admin/restaurant/contracts/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getMyContractsBySelfId: builder.query<
      GetMyContractsBySelfIdResponse,
      { restaurantId: string }
    >({
      query: (params) => ({
        url: `/manager/restaurant/contracts/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getMySelfDetail: builder.query<GetMySelfDetailResponse, { restaurantId: string }>({
      query: (params) => ({
        url: `/manager/restaurant/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    createAllRestaurant: builder.mutation<
      CreateAllRestaurantResponse,
      CreateAllRestaurantRequest
    >({
      query: (body) => ({
        url: `/admin/restaurant/create`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    createMyRestaurant: builder.mutation<
      CreateMyRestaurantResponse,
      CreateMyRestaurantRequest
    >({
      query: (body) => ({
        url: `/manager/restaurant/create`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    updateAllRestaurant: builder.mutation<
      UpdateAllRestaurantResponse,
      UpdateAllRestaurantRequest
    >({
      query: (body) => ({
        url: "/admin/restaurant/update",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/food"],
    }),
    updateMyRestaurant: builder.mutation<
      UpdateMyRestaurantResponse,
      UpdateMyRestaurantRequest
    >({
      query: (body) => ({
        url: "/manager/restaurant/update",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/food"],
    }),
  }),
});
export const {
  useLazyGetAllSelfDetailQuery,
  useLazyGetAllContractsBySelfIdQuery,
  useLazyGetMyContractsBySelfIdQuery,
  useLazyGetMySelfDetailQuery,
  useCreateAllRestaurantMutation,
  useCreateMyRestaurantMutation,
  useUpdateAllRestaurantMutation,
  useUpdateMyRestaurantMutation,
} = selfApi;
