import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  CreateAllFoodScheduleRequest,
  CreateAllFoodScheduleResponse,
} from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllAddFoodSchedules/@types/@allAddFoodSchedules";
import {
  CreateMyFoodScheduleRequest,
  CreateMyFoodScheduleResponse,
} from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyAddFoodSchedules/@types/@myAddFoodSchedules";
import { GetAllFoodScheduleDetailResponse } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleDetail/helper/components/FoodSchedule/@types/@foodScheduleTab";
import {
  UpdateAllFoodScheduleRequest,
  UpdateAllFoodScheduleResponse,
} from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleDetail/helper/components/FoodSchedule/helper/drawer/@types/@allFoodScheduleTabDrawerContent";
import {
  GetAllFoodScheduleListResponse,
  GetAllFoodScheduleListRequest,
  GetCalendarDataForAllFoodSchedulesResponse,
  GetCalendarDataForAllFoodSchedulesRequest,
} from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/@types/@allFoodScheduleList";
import {
  CreateAllFoodScheduleBulkDaysRequest,
  CreateAllFoodScheduleBulkDaysResponse,
} from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllMultiFoodMultiDayScheduleListDrawerContent/@types/@allMultiFoodMultiDayScheduleListDrawerContent";
import {
  CreateNewAllBulkFoodScheduleRequest,
  CreateNewAllBulkFoodScheduleResponse,
} from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllOneFoodMultiDayScheduleListDrawerContent/@types/@allOneFoodMultiDateScheduleListDrawerContent";
import {
  CreateNewAllFoodScheduleRequest,
  CreateNewAllFoodScheduleResponse,
} from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllSingleFoodScheduleListDrawerContent/@types/@allSingleFoodScheduleListDrawerContent";
import { GetMyFoodScheduleDetailResponse } from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesDetail/helper/components/FoodSchedule/@types/@foodScheduleTab";
import {
  UpdateMyFoodScheduleRequest,
  UpdateMyFoodScheduleResponse,
} from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesDetail/helper/components/FoodSchedule/helper/drawer/@types/@myFoodScheduleTabDrawerContent";
import {
  GetCalendarDataForMyFoodSchedulesRequest,
  GetCalendarDataForMyFoodSchedulesResponse,
  GetMyFoodScheduleListRequest,
  GetMyFoodScheduleListResponse,
} from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/@types/@myFoodSchedulesList";
import {
  CreateMyFoodScheduleBulkDaysRequest,
  CreateMyFoodScheduleBulkDaysResponse,
} from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/drawer/MyMultiFoodMultiDayScheduleListDrawerContent/@types/@myMultiFoodMultiDayScheduleListDrawerContent";
import {
  CreateNewMyBulkFoodScheduleRequest,
  CreateNewMyBulkFoodScheduleResponse,
} from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/drawer/MyOneFoodMultiDayScheduleListDrawerContent/@types/@myMultipleFoodScheduleListDrawerContent";
import {
  CreateNewMyFoodScheduleRequest,
  CreateNewMyFoodScheduleResponse,
} from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/drawer/MySingleFoodScheduleListDrawerContent/@types/@mySingleFoodScheduleListDrawerContent";
import {
  GetAllRestaurantFoodScheduleListRequest,
  GetAllRestaurantFoodScheduleListResponse,
} from "@pages/Food/Selfs/AllSelfs/AllDetailSelf/helpers/components/FoodSchedule/@types/@foodSchedule";
import {
  GetFoodScheduleWithFilterRequest,
  GetFoodScheduleWithFilterResponse,
  GetMyRestaurantFoodScheduleListRequest,
  GetMyRestaurantFoodScheduleListResponse,
} from "@pages/Food/Selfs/MySelfs/MyDetailSelf/helpers/components/FoodSchedule/@types/foodSchedule";

import { foodApi } from "../../foodApi";

export const foodScheduleApi = foodApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFoodScheduleList: builder.query<
      GetAllFoodScheduleListResponse,
      GetAllFoodScheduleListRequest
    >({
      query: (params) => ({
        url: `/admin/plan/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getMyFoodScheduleList: builder.query<
      GetMyFoodScheduleListResponse,
      GetMyFoodScheduleListRequest
    >({
      query: (params) => ({
        url: `/manager/plan/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    createNewAllFoodSchedule: builder.mutation<
      CreateNewAllFoodScheduleResponse,
      CreateNewAllFoodScheduleRequest
    >({
      query: (body) => ({
        url: "/admin/plan/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createNewAllBulkFoodSchedule: builder.mutation<
      CreateNewAllBulkFoodScheduleResponse,
      CreateNewAllBulkFoodScheduleRequest
    >({
      query: (body) => ({
        url: "/admin/plan/bulk/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createNewMyFoodSchedule: builder.mutation<
      CreateNewMyFoodScheduleResponse,
      CreateNewMyFoodScheduleRequest
    >({
      query: (body) => ({
        url: "/manager/plan/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createNewMyBulkFoodSchedule: builder.mutation<
      CreateNewMyBulkFoodScheduleResponse,
      CreateNewMyBulkFoodScheduleRequest
    >({
      query: (body) => ({
        url: "/manager/plan/bulk/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createAllFoodSchedule: builder.mutation<
      CreateAllFoodScheduleResponse,
      CreateAllFoodScheduleRequest
    >({
      query: (body) => ({
        url: "/admin/plan/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createMyFoodSchedule: builder.mutation<
      CreateMyFoodScheduleResponse,
      CreateMyFoodScheduleRequest
    >({
      query: (body) => ({
        url: "/manager/plan/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllFoodScheduleDetail: builder.query<
      GetAllFoodScheduleDetailResponse,
      { planId: string }
    >({
      query: (params) => ({
        url: `/admin/plan/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getMyFoodScheduleDetail: builder.query<
      GetMyFoodScheduleDetailResponse,
      { planId: string }
    >({
      query: (params) => ({
        url: `/manager/plan/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    updateFoodSchedule: builder.mutation<
      UpdateAllFoodScheduleResponse,
      UpdateAllFoodScheduleRequest
    >({
      query: (body) => ({
        url: "/admin/plan/update",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateMyFoodSchedule: builder.mutation<
      UpdateMyFoodScheduleResponse,
      UpdateMyFoodScheduleRequest
    >({
      query: (body) => ({
        url: "/manager/plan/update",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllRestaurantFoodScheduleList: builder.query<
      GetAllRestaurantFoodScheduleListResponse,
      GetAllRestaurantFoodScheduleListRequest
    >({
      query: (params) => ({
        url: `/admin/plan/restaurant/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getMyRestaurantFoodScheduleList: builder.query<
      GetMyRestaurantFoodScheduleListResponse,
      GetMyRestaurantFoodScheduleListRequest
    >({
      query: (params) => ({
        url: `/manager/plan/restaurant/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    // ADMIN GET ALL FILTER LIST
    getFoodScheduleWithFilter: builder.query<
      GetFoodScheduleWithFilterResponse,
      GetFoodScheduleWithFilterRequest
    >({
      query: ({ query }) => ({
        url: `admin/plans/filter/${query}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    // MANAGER GET ALL FILTER LIST
    getMangerFoodScheduleWithFilter: builder.query<
      GetFoodScheduleWithFilterResponse,
      GetFoodScheduleWithFilterRequest
    >({
      query: ({ query }) => ({
        url: `manager/plans/filter/${query}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    // CALENDAR VIEW FOR ALL FOOD SCHEDULE
    getCalendarDataForAllFoodSchedules: builder.query<
      GetCalendarDataForAllFoodSchedulesResponse,
      GetCalendarDataForAllFoodSchedulesRequest
    >({
      query: (params) => ({
        url: `admin/plan/dates/restaurant/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    // CALENDAR VIEW FOR MY FOOD SCHEDULE
    getCalendarDataForMyFoodSchedules: builder.query<
      GetCalendarDataForMyFoodSchedulesResponse,
      GetCalendarDataForMyFoodSchedulesRequest
    >({
      query: (params) => ({
        url: `manager/plan/dates/restaurant/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    createAllFoodScheduleBulkDays: builder.mutation<
      CreateAllFoodScheduleBulkDaysResponse,
      CreateAllFoodScheduleBulkDaysRequest
    >({
      query: (body) => ({
        url: "/admin/plan/bulk/days/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createMyFoodScheduleBulkDays: builder.mutation<
      CreateMyFoodScheduleBulkDaysResponse,
      CreateMyFoodScheduleBulkDaysRequest
    >({
      query: (body) => ({
        url: "/manager/plan/bulk/days/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});
export const {
  useLazyGetAllFoodScheduleListQuery,
  useLazyGetMyFoodScheduleListQuery,
  useCreateNewAllFoodScheduleMutation,
  useCreateNewAllBulkFoodScheduleMutation,
  useCreateNewMyFoodScheduleMutation,
  useCreateNewMyBulkFoodScheduleMutation,
  useCreateAllFoodScheduleMutation,
  useCreateMyFoodScheduleMutation,
  useLazyGetAllFoodScheduleDetailQuery,
  useLazyGetMyFoodScheduleDetailQuery,
  useUpdateFoodScheduleMutation,
  useUpdateMyFoodScheduleMutation,
  useLazyGetAllRestaurantFoodScheduleListQuery,
  useLazyGetMyRestaurantFoodScheduleListQuery,
  useLazyGetFoodScheduleWithFilterQuery,
  useLazyGetMangerFoodScheduleWithFilterQuery,
  useLazyGetCalendarDataForAllFoodSchedulesQuery,
  useLazyGetCalendarDataForMyFoodSchedulesQuery,
  useCreateAllFoodScheduleBulkDaysMutation,
  useCreateMyFoodScheduleBulkDaysMutation,
} = foodScheduleApi;
