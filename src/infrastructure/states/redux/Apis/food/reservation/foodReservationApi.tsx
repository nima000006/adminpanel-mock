import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetAllHolidaysListRequest,
  GetAllHolidaysListResponse,
} from "@pages/Food/Reservation/AllCancelled/helper/components/AllCanceledDaysTab/@types/@allCanceledDaysTab";
import {
  GetAllCancelledFoodListByHolidayAndRestaurantRequest,
  GetAllCancelledFoodListByHolidayAndRestaurantResponse,
  GetAllRestaurantListByHolidayIdResponse,
} from "@pages/Food/Reservation/AllCancelled/helper/components/AllCanceledDaysTab/helper/drawers/CanceledDaysDetail/@types/@canceledDaysDetailDrawerContent";
import {
  GetAllCancelledFoodListRequest,
  GetAllCancelledFoodListResponse,
} from "@pages/Food/Reservation/AllCancelled/helper/components/AllFoodScheduleTab/@types/@allFoodScheduleTab";
import {
  CreateHolidaysRequest,
  CreateHolidaysResponse,
  FilterAdminReservationsRequest,
  FilterAdminReservationsResponse,
  GetAdminAllBasketDataRequest,
  GetAdminAllBasketDataResponse,
  GetFoodsByRestaurantIdMealIdAndDateRequest,
  GetFoodsByRestaurantIdMealIdAndDateResponse,
  GetRestaurantByBranchIdResponse,
} from "@pages/Food/Reservation/AllReservation/AllReservationOrderResultList/@types/@allReservationOrderResultList";
import {
  GetMyHolidaysListRequest,
  GetMyHolidaysListResponse,
} from "@pages/Food/Reservation/MyCancelled/helper/components/MyCanceledDaysTab/@types/@myCanceledDaysTab";
import {
  GetMyCancelledFoodListByHolidayAndRestaurantRequest,
  GetMyCancelledFoodListByHolidayAndRestaurantResponse,
  GetMyRestaurantListByHolidayIdResponse,
} from "@pages/Food/Reservation/MyCancelled/helper/components/MyCanceledDaysTab/helper/drawers/MyCanceledDaysDetail/@types/@myCanceledDaysDetailDrawerContent";
import {
  GetMyCancelledFoodListRequest,
  GetMyCancelledFoodListResponse,
} from "@pages/Food/Reservation/MyCancelled/helper/components/MyFoodScheduleTab/@types/@myFoodScheduleTab";
import {
  CreateMyHolidaysRequest,
  CreateMyHolidaysResponse,
  GetMyFoodsByRestaurantIdMealIdAndDateRequest,
  GetMyFoodsByRestaurantIdMealIdAndDateResponse,
} from "@pages/Food/Reservation/MyReservation/@types/@myReservationOrderResultList";
import {
  GetMyBasketFilterPlanByDateAndIdAndMealRequest,
  GetMyBasketFilterPlanByDateAndIdAndMealResponse,
  GetMyBasketPlanByDateAndIdAndMealRequest,
  GetMyBasketPlanByDateAndIdAndMealResponse,
  GetMyRestaurantsResponse,
  MyChangeStatusToDeliveredRequest,
} from "@pages/Food/Reservation/MyReservation/MyReservationOrderSearch/@types/@myReservationOrderSearch";
import {
  DeliverUserPlanByIdRequest,
  DeliverUserPlanByIdResponse,
  GetBasketPlanByUsernameRequest,
  GetBasketPlanByUsernameResponse,
} from "@pages/Food/Reservation/OrderDelivery/@types/@orderDelivery";
import {
  GetPendingPaymentAndReturnedMoneyListRequest,
  GetPendingPaymentAndReturnedMoneyListResponse,
} from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/@types/@pendingPayment";
import {
  GetPendingPaymentDetailResponse,
  SendRemovePendingPaymentItemRequest,
  SendRemovePendingPaymentItemResponse,
} from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";
import {
  GetAllBankResponse,
  SendFoodSettleRequest,
  SendFoodSettleResponse,
} from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentSettlement/@types/@foodPendingPaymentSettlementDrawerContent";
import {
  GetPendingReturnedMoneyListRequest,
  GetPendingReturnedMoneyListResponse,
} from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/@types/@foodPendingReturnedMoney";
import {
  GetFoodReturnedMoneyTotalAmountResponse,
  SendTransferToPendingPaymentListRequest,
  SendTransferToPendingPaymentListResponse,
} from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/helper/drawers/FoodTransformRequests/@types/@foodTransformRequestsDrawerContent";
import {
  GetManagerDeliverableFoodRequest,
  GetManagerDeliverableFoodResponse,
  GetPersonReturnMoneyDetailResponse,
} from "@pages/Food/Reservation/ReturnedMoney/helper/components/PersonsReturnedMoney/helper/drawers/FoodReturnedMoney/@types/@foodReturnedMoneyDrawerContent";

import {
  ChangeStatusToDeliveredRequest,
  GetAllRestaurantsResponse,
  GetBasketFilterPlanByDateAndIdAndMealRequest,
  GetBasketFilterPlanByDateAndIdAndMealResponse,
  GetBasketPlanByDateAndIdAndMealRequest,
  GetBasketPlanByDateAndIdAndMealResponse,
} from "../../../../../../pages/Food/Reservation/AllReservation/AllReservationOrderSearch/@types/@reservationOrderSearch";
import { foodApi } from "../../foodApi";

export const foodReservationApi = foodApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRestaurants: builder.query<GetAllRestaurantsResponse, { isDeleted: boolean }>({
      query: (params) => ({
        url: `/admin/restaurant/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    getMyRestaurants: builder.query<GetMyRestaurantsResponse, void>({
      query: () => ({
        url: "/manager/restaurant/all",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    //! deprecated
    getBasketPlanByDateAndIdAndMeal: builder.query<
      GetBasketPlanByDateAndIdAndMealResponse,
      GetBasketPlanByDateAndIdAndMealRequest
    >({
      query: (params) => ({
        url: `/admin/basketplans/restaurant/date/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getBasketFilterPlanByDateAndIdAndMeal: builder.query<
      GetBasketFilterPlanByDateAndIdAndMealResponse,
      GetBasketFilterPlanByDateAndIdAndMealRequest
    >({
      query: (params) => ({
        url: `/admin/basketplans/restaurant/date/username/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getMyBasketPlanByDateAndIdAndMeal: builder.query<
      GetMyBasketPlanByDateAndIdAndMealResponse,
      GetMyBasketPlanByDateAndIdAndMealRequest
    >({
      query: (params) => ({
        url: `/manager/basketplans/restaurant/date/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getMyBasketFilterPlanByDateAndIdAndMeal: builder.query<
      GetMyBasketFilterPlanByDateAndIdAndMealResponse,
      GetMyBasketFilterPlanByDateAndIdAndMealRequest
    >({
      query: (params) => ({
        url: `/manager/basketplans/restaurant/date/username/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    changeStatusToDelivered: builder.mutation<
      GetBasketPlanByDateAndIdAndMealResponse,
      ChangeStatusToDeliveredRequest
    >({
      query: (params) => ({
        url: `/admin/basket/plans/delivery/id${createQueryString(params)}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/food"],
    }),
    myChangeStatusToDelivered: builder.mutation<
      GetMyBasketPlanByDateAndIdAndMealResponse,
      MyChangeStatusToDeliveredRequest
    >({
      query: (params) => ({
        url: `/manager/basket/plans/delivery/id${createQueryString(params)}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/food"],
    }),

    //! [saman] : new version
    //ADMIN ALL BASKETS
    getAdminAllBasketData: builder.query<
      GetAdminAllBasketDataResponse,
      GetAdminAllBasketDataRequest
    >({
      query: (params) => ({
        url: `/admin/basketplans/all/${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    //MANAGER ALL BASKETS // data models should get separated from admin
    getManagerAllBasketData: builder.query<
      GetAdminAllBasketDataResponse,
      GetAdminAllBasketDataRequest
    >({
      query: (params) => ({
        url: `/manager/basketplans/all/${createQueryString(params)}`,
        method: "GET",
      }),
      // keepUnusedDataFor: 300,
      // providesTags(result) {
      //   return result?.data?.basketPlansDtos
      //     ? [
      //         ...result.data.basketPlansDtos.map((item) => ({
      //           type: "tag/food" as const,
      //           id: item?.id?.toString(),
      //         })),
      //       ]
      //     : ["tag/food"];
      // },
    }),
    // ON GET BASKET PLAN BY ID
    getBasketPlanByUsername: builder.query<
      GetBasketPlanByUsernameResponse,
      GetBasketPlanByUsernameRequest
    >({
      query: ({ query }) => ({
        url: `/delivery/basketplans/username${query}`,
        method: "GET",
      }),
    }),
    // ON DELIVER USER PLAN BY ID
    deliverUserPlanById: builder.mutation<
      DeliverUserPlanByIdResponse,
      DeliverUserPlanByIdRequest
    >({
      query: (params) => ({
        url: `/delivery/basket/plans/delivery/id${createQueryString(params)}`,
        method: "POST",
      }),
    }),
    // ON FILTER FOOD RESERVATION ADMIN
    filterAdminReservations: builder.query<
      FilterAdminReservationsResponse,
      FilterAdminReservationsRequest
    >({
      query: ({ queryString }) => ({
        url: `/admin/basketplans/filter/${queryString}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // ON FILTER FOOD RESERVATION MANAGER
    filterMangerReservations: builder.query<
      FilterAdminReservationsResponse,
      FilterAdminReservationsRequest
    >({
      query: ({ queryString }) => ({
        url: `/manager/basketplans/filter/${queryString}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getRestaurantByBranchId: builder.query<
      GetRestaurantByBranchIdResponse,
      { branchId: number }
    >({
      query: (params) => ({
        url: `/admin/restaurant/branch${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getFoodsByRestaurantIdMealIdAndDate: builder.query<
      GetFoodsByRestaurantIdMealIdAndDateResponse,
      GetFoodsByRestaurantIdMealIdAndDateRequest
    >({
      query: (params) => ({
        url: `/admin/plan/dates/restaurant/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createHolidays: builder.mutation<CreateHolidaysResponse, CreateHolidaysRequest>({
      query: (body) => ({
        url: "/admin/holidays/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    getMyFoodsByRestaurantIdMealIdAndDate: builder.query<
      GetMyFoodsByRestaurantIdMealIdAndDateResponse,
      GetMyFoodsByRestaurantIdMealIdAndDateRequest
    >({
      query: (params) => ({
        url: `/manager/plan/dates/restaurant/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createMyHolidays: builder.mutation<CreateMyHolidaysResponse, CreateMyHolidaysRequest>(
      {
        query: (body) => ({
          url: "/manager/holidays/create",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["tag/food"],
      }
    ),
    getAllCancelledFoodList: builder.query<
      GetAllCancelledFoodListResponse,
      GetAllCancelledFoodListRequest
    >({
      query: (params) => ({
        url: `/admin/plan/cancelled/all${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getMyCancelledFoodList: builder.query<
      GetMyCancelledFoodListResponse,
      GetMyCancelledFoodListRequest
    >({
      query: (params) => ({
        url: `/manager/plan/cancelled/all${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getAllHolidaysList: builder.mutation<
      GetAllHolidaysListResponse,
      GetAllHolidaysListRequest
    >({
      query: (params) => ({
        url: `/admin/holidays/all${createQueryString(params)}`,
        method: "POST",
      }),
    }),
    getMyHolidaysList: builder.mutation<
      GetMyHolidaysListResponse,
      GetMyHolidaysListRequest
    >({
      query: (params) => ({
        url: `/manager/holidays/all${createQueryString(params)}`,
        method: "POST",
      }),
    }),
    getAllRestaurantListByHolidayId: builder.query<
      GetAllRestaurantListByHolidayIdResponse,
      { holidayId: number }
    >({
      query: (params) => ({
        url: `/admin/restaurant/cancelled/holiday${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getMyRestaurantListByHolidayId: builder.query<
      GetMyRestaurantListByHolidayIdResponse,
      { holidayId: number }
    >({
      query: (params) => ({
        url: `/manager/restaurant/cancelled/holiday${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getAllCancelledFoodListByHolidayAndRestaurant: builder.query<
      GetAllCancelledFoodListByHolidayAndRestaurantResponse,
      GetAllCancelledFoodListByHolidayAndRestaurantRequest
    >({
      query: (params) => ({
        url: `/admin/plan/cancelled/holiday${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getMyCancelledFoodListByHolidayAndRestaurant: builder.query<
      GetMyCancelledFoodListByHolidayAndRestaurantResponse,
      GetMyCancelledFoodListByHolidayAndRestaurantRequest
    >({
      query: (params) => ({
        url: `/manager/plan/cancelled/holiday${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),

    // RETURN MONEY
    getPendingReturnedMoneyList: builder.query<
      GetPendingReturnedMoneyListResponse,
      GetPendingReturnedMoneyListRequest
    >({
      query: (params) => ({
        url: `/admin/cancel/requests${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getPendingPaymentAndPersonReturnedMoneyList: builder.query<
      GetPendingPaymentAndReturnedMoneyListResponse,
      GetPendingPaymentAndReturnedMoneyListRequest
    >({
      query: (params) => ({
        url: `/admin/documents/all/status${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getFoodReturnedMoneyTotalAmount: builder.mutation<
      GetFoodReturnedMoneyTotalAmountResponse,
      number[]
    >({
      query: (body) => ({
        url: "admin/requests/totalAmount",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: ["tag/food"],
    }),
    sendTransferToPendingPaymentList: builder.mutation<
      SendTransferToPendingPaymentListResponse,
      SendTransferToPendingPaymentListRequest
    >({
      query: (body) => ({
        url: "/admin/documents/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    getPendingPaymentDetail: builder.query<
      GetPendingPaymentDetailResponse,
      { documentId: number }
    >({
      query: (params) => ({
        url: `/admin/documents/detail/id${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getAllBank: builder.query<GetAllBankResponse, null>({
      query: () => ({
        url: "/admin/baseInfo/banks/all",
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    sendRemovePendingPaymentItem: builder.mutation<
      SendRemovePendingPaymentItemResponse,
      SendRemovePendingPaymentItemRequest
    >({
      query: (body) => ({
        url: "/admin/documents/unsettled/remove",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    sendFoodSettle: builder.mutation<SendFoodSettleResponse, SendFoodSettleRequest>({
      query: (body) => ({
        url: "/admin/document/settle",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/food"],
    }),
    getPersonReturnMoneyDetail: builder.query<
      GetPersonReturnMoneyDetailResponse,
      { requestId: number }
    >({
      query: (params) => ({
        url: `admin/settled/requests/detail${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    // GET
    getManagerDeliverableFood: builder.query<
      GetManagerDeliverableFoodResponse,
      Partial<GetManagerDeliverableFoodRequest>
    >({
      query: (body) => ({
        url: "/delivery/filter",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useLazyGetAllRestaurantsQuery,
  useLazyGetMyRestaurantsQuery,
  useLazyGetBasketPlanByDateAndIdAndMealQuery,
  useLazyGetMyBasketPlanByDateAndIdAndMealQuery,
  useChangeStatusToDeliveredMutation,
  useMyChangeStatusToDeliveredMutation,
  useLazyGetBasketFilterPlanByDateAndIdAndMealQuery,
  useLazyGetMyBasketFilterPlanByDateAndIdAndMealQuery,
  useLazyGetAdminAllBasketDataQuery,
  useLazyGetManagerAllBasketDataQuery,
  useLazyGetBasketPlanByUsernameQuery,
  useDeliverUserPlanByIdMutation,
  useLazyFilterAdminReservationsQuery,
  useLazyFilterMangerReservationsQuery,
  useLazyGetRestaurantByBranchIdQuery,
  useLazyGetFoodsByRestaurantIdMealIdAndDateQuery,
  useCreateHolidaysMutation,
  useLazyGetMyFoodsByRestaurantIdMealIdAndDateQuery,
  useCreateMyHolidaysMutation,
  useLazyGetPendingReturnedMoneyListQuery,
  useLazyGetAllCancelledFoodListQuery,
  useLazyGetMyCancelledFoodListQuery,
  useGetAllHolidaysListMutation,
  useGetMyHolidaysListMutation,
  useLazyGetAllRestaurantListByHolidayIdQuery,
  useLazyGetMyRestaurantListByHolidayIdQuery,
  useLazyGetAllCancelledFoodListByHolidayAndRestaurantQuery,
  useLazyGetMyCancelledFoodListByHolidayAndRestaurantQuery,
  useLazyGetPendingPaymentAndPersonReturnedMoneyListQuery,
  useGetFoodReturnedMoneyTotalAmountMutation,
  useSendTransferToPendingPaymentListMutation,
  useLazyGetPendingPaymentDetailQuery,
  useLazyGetAllBankQuery,
  useSendRemovePendingPaymentItemMutation,
  useSendFoodSettleMutation,
  useLazyGetPersonReturnMoneyDetailQuery,
  useLazyGetManagerDeliverableFoodQuery,
} = foodReservationApi;
