import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  CreateAllCancelledOrdersHolidayRequest,
  CreateAllCancelledOrdersHolidayResponse,
  GetAllCancelledOrdersAmountAnalyticsRequest,
  GetAllCancelledOrdersAmountAnalyticsResponse,
  GetAllCancelledOrdersFilterRequest,
  GetAllCancelledOrdersFilterResponse,
} from "@pages/Catering/Orders/CancelledOrders/AllCancelledOrders/AllCancelledOrdersList/@types/@allCancelledOrdersList";
import {
  CreateMyCancelledOrdersHolidayRequest,
  CreateMyCancelledOrdersHolidayResponse,
  GetMyCancelledOrdersAmountAnalyticsRequest,
  GetMyCancelledOrdersAmountAnalyticsResponse,
  GetMyCancelledOrdersFilterRequest,
  GetMyCancelledOrdersFilterResponse,
} from "@pages/Catering/Orders/CancelledOrders/MyCancelledOrders/MyCancelledOrdersList/@types/@myCancelledOrdersList";
import {
  AllBasketPlanFilterAnalyticsRequest,
  AllBasketPlanFilterAnalyticsResponse,
} from "@pages/Catering/Orders/VendorOrders/AllVendorOrders/@types/@allVendorOrdersList";
import {
  MyBasketPlanFilterAnalyticsRequest,
  MyBasketPlanFilterAnalyticsResponse,
} from "@pages/Catering/Orders/VendorOrders/MyVendorOrders/@types/@myVendorOrdersList";

import { cateringApi } from "../../cateringApi";

export const ordersApi = cateringApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCancelledOrdersFilter: builder.mutation<
      GetAllCancelledOrdersFilterResponse,
      GetAllCancelledOrdersFilterRequest
    >({
      query: ({ params, body }) => ({
        url: `/admin/basket-plan/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getMyCancelledOrdersFilter: builder.mutation<
      GetMyCancelledOrdersFilterResponse,
      GetMyCancelledOrdersFilterRequest
    >({
      query: ({ params, body }) => ({
        url: `/manager/basket-plan/filter${createQueryString(params)}`,
        method: "POST",
        body,
      }),
    }),

    getAllCancelledOrdersAmountAnalytics: builder.mutation<
      GetAllCancelledOrdersAmountAnalyticsResponse,
      GetAllCancelledOrdersAmountAnalyticsRequest
    >({
      query: (body) => ({
        url: "/admin/basket-plan/filter/amount-analytics",
        method: "POST",
        body,
      }),
    }),

    getMyCancelledOrdersAmountAnalytics: builder.mutation<
      GetMyCancelledOrdersAmountAnalyticsResponse,
      GetMyCancelledOrdersAmountAnalyticsRequest
    >({
      query: (body) => ({
        url: "/manager/basket-plan/filter/amount-analytics",
        method: "POST",
        body,
      }),
    }),

    allBasketPlanFilterAnalytics: builder.mutation<
      AllBasketPlanFilterAnalyticsResponse,
      AllBasketPlanFilterAnalyticsRequest
    >({
      query: (body) => ({
        url: "/admin/basket-plan/filter/analytics",
        method: "POST",
        body,
      }),
    }),

    myBasketPlanFilterAnalytics: builder.mutation<
      MyBasketPlanFilterAnalyticsResponse,
      MyBasketPlanFilterAnalyticsRequest
    >({
      query: (body) => ({
        url: "/manager/basket-plan/filter/analytics",
        method: "POST",
        body,
      }),
    }),

    createAllCancelledOrdersHoliday: builder.mutation<
      CreateAllCancelledOrdersHolidayResponse,
      CreateAllCancelledOrdersHolidayRequest
    >({
      query: (body) => ({
        url: "/admin/holiday/create",
        method: "POST",
        body,
      }),
    }),

    createMyCancelledOrdersHoliday: builder.mutation<
      CreateMyCancelledOrdersHolidayResponse,
      CreateMyCancelledOrdersHolidayRequest
    >({
      query: (body) => ({
        url: "/manager/holiday/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllCancelledOrdersFilterMutation,
  useGetMyCancelledOrdersFilterMutation,
  useGetAllCancelledOrdersAmountAnalyticsMutation,
  useGetMyCancelledOrdersAmountAnalyticsMutation,
  useAllBasketPlanFilterAnalyticsMutation,
  useMyBasketPlanFilterAnalyticsMutation,
  useCreateAllCancelledOrdersHolidayMutation,
  useCreateMyCancelledOrdersHolidayMutation,
} = ordersApi;
