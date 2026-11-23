import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { shopApi } from "@infra/states/redux/Apis/shop";
import {
  ConfirmShipOrdersRequest,
  ConfirmShipOrdersResponse,
  ConfirmShopOrdersRequest,
  ConfirmShopOrdersResponse,
  GetShopAllOrdersDetailRequest,
  GetShopAllOrdersDetailResponse,
  RejectUserOrdersRequest,
  RejectUserOrdersResponse,
} from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/@types/@shopAllOrdersDetail";
import {
  GetPrOrdersProductDetailRequest,
  GetPrOrdersProductDetailResponse,
} from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/drawer/ShopAllOrdersDetailItemDrawerContent/@types/@shopAllOrdersDetailItemDrawerContent";
import { GetRejectReasonsListResponse } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailRejectModalContent/@types/@shopAllOrdersDetailRejectModalContent";
import {
  GetShopAllOrdersListCountRequest,
  GetShopAllOrdersListCountResponse,
  GetShopAllOrdersListRequest,
  GetShopAllOrdersListResponse,
} from "@pages/Shop/Orders/AllOrders/ShopAllOrdersList/@types/@shopAllOrdersList";

export const ordersApi = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getShopAllOrdersListCount: builder.query<
      GetShopAllOrdersListCountResponse,
      GetShopAllOrdersListCountRequest
    >({
      query: (params) => ({
        url: `/admin/supplier-orders/status-counts${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getShopAllOrdersList: builder.query<
      GetShopAllOrdersListResponse,
      GetShopAllOrdersListRequest
    >({
      query: (params) => ({
        url: `/admin/supplier-orders${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getShopAllOrdersDetail: builder.query<
      GetShopAllOrdersDetailResponse,
      GetShopAllOrdersDetailRequest
    >({
      query: ({ uuid }) => ({
        url: `/admin/supplier-orders/${uuid}`,
        method: "GET",
      }),
    }),
    rejectUserOrders: builder.mutation<RejectUserOrdersResponse, RejectUserOrdersRequest>(
      {
        query: ({ uuid, body }) => ({
          url: `/admin/purchase-order-items/${uuid}/reject`,
          method: "PUT",
          body,
        }),
      }
    ),
    getRejectReasonsList: builder.query<GetRejectReasonsListResponse, void>({
      query: () => ({
        url: "/enums/purchase-order-item-reject-reasons",
        method: "GET",
      }),
    }),
    getPrOrdersProductDetail: builder.query<
      GetPrOrdersProductDetailResponse,
      GetPrOrdersProductDetailRequest
    >({
      query: ({ uuid }) => ({
        url: `/admin/purchase-order-items/${uuid}`,
        method: "GET",
      }),
    }),
    confirmShopOrders: builder.mutation<
      ConfirmShopOrdersResponse,
      ConfirmShopOrdersRequest
    >({
      query: ({ uuid }) => ({
        url: `/admin/supplier-orders/${uuid}/approve`,
        method: "PUT",
      }),
    }),
    confirmShipOrders: builder.mutation<
      ConfirmShipOrdersResponse,
      ConfirmShipOrdersRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/supplier-orders/${uuid}/ship`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetShopAllOrdersListCountQuery,
  useLazyGetShopAllOrdersListQuery,
  useLazyGetShopAllOrdersDetailQuery,
  useRejectUserOrdersMutation,
  useGetRejectReasonsListQuery,
  useLazyGetPrOrdersProductDetailQuery,
  useConfirmShopOrdersMutation,
  useConfirmShipOrdersMutation,
} = ordersApi;
