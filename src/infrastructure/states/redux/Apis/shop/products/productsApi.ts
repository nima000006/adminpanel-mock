import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { shopApi } from "@infra/states/redux/Apis/shop";
import {
  CreateShopAllProductRequest,
  CreateShopAllProductResponse,
  GetShopAllProductsPublishersRequest,
  GetShopAllProductsPublishersResponse,
  UploadShopAllProductFileRequest,
  UploadShopAllProductFileResponse,
} from "@pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsAdd/@types/@shopAllProductsAdd";
import {
  GetShopAllProductsDetailRequest,
  GetShopAllProductsDetailResponse,
  GetShopAllProductsDetailSupplierBooksRequest,
  GetShopAllProductsDetailSupplierBooksResponse,
  HideShopAllProductsDetailRequest,
  HideShopAllProductsDetailResponse,
  HideShopAllProductsDetailSupplierBookRequest,
  HideShopAllProductsDetailSupplierBookResponse,
  UpdateShopAllProductsDetailRequest,
  UpdateShopAllProductsDetailResponse,
} from "@pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsDetail/@types/@shopAllProductsDetail";
import {
  CreateShopAllProductsDetailSupplierBookRequest,
  CreateShopAllProductsDetailSupplierBookResponse,
} from "@pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsDetail/helper/modals/ShopAllProductsDetailAddSellerModal/@types/@shopAllProductsDetailAddSellerModal";
import {
  GetShopAllProductsListRequest,
  GetShopAllProductsListResponse,
} from "@pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsList/@types/@shopAllProductsList";
import {
  AcceptShopAllProductsRequestRequest,
  AcceptShopAllProductsRequestResponse,
  RejectShopAllProductsRequestRequest,
  RejectShopAllProductsRequestResponse,
} from "@pages/Shop/Products/ProductsRequests/AllProductsRequests/ShopAllProductsRequestDetail/@types/@shopAllProductsRequestDetail";
import { GetShopAllProductsRequestRejectReasonsResponse } from "@pages/Shop/Products/ProductsRequests/AllProductsRequests/ShopAllProductsRequestDetail/helper/modals/ShopAllProductsRequestDetailRejectModalContent/@types/@shopAllProductsRequestDetailRejectModalContent";

export const productsApi = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getShopAllProductsList: builder.query<
      GetShopAllProductsListResponse,
      GetShopAllProductsListRequest
    >({
      query: (params) => ({
        url: `/admin/books${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getShopAllProductsDetail: builder.query<
      GetShopAllProductsDetailResponse,
      GetShopAllProductsDetailRequest
    >({
      query: ({ uuid }) => ({
        url: `/admin/books/${uuid}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getShopAllProductsDetailSupplierBooks: builder.query<
      GetShopAllProductsDetailSupplierBooksResponse,
      GetShopAllProductsDetailSupplierBooksRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/books/${uuid}/supplier-books${createQueryString(params)}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    hideShopAllProductsDetail: builder.mutation<
      HideShopAllProductsDetailResponse,
      HideShopAllProductsDetailRequest
    >({
      query: ({ uuid }) => ({
        url: `/admin/books/${uuid}/hide`,
        method: "PUT",
      }),
    }),
    hideShopAllProductsDetailSupplierBook: builder.mutation<
      HideShopAllProductsDetailSupplierBookResponse,
      HideShopAllProductsDetailSupplierBookRequest
    >({
      query: ({ uuid }) => ({
        url: `/admin/supplier-books/${uuid}/hide`,
        method: "PUT",
      }),
    }),
    updateShopAllProductsDetail: builder.mutation<
      UpdateShopAllProductsDetailResponse,
      UpdateShopAllProductsDetailRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/books/${uuid}`,
        method: "PUT",
        body,
      }),
    }),
    createShopAllProductsDetailSupplierBook: builder.mutation<
      CreateShopAllProductsDetailSupplierBookResponse,
      CreateShopAllProductsDetailSupplierBookRequest
    >({
      query: (body) => ({
        url: "/admin/supplier-books",
        method: "POST",
        body,
      }),
    }),
    createShopAllProduct: builder.mutation<
      CreateShopAllProductResponse,
      CreateShopAllProductRequest
    >({
      query: (body) => ({
        url: "/admin/books/requests",
        method: "POST",
        body,
      }),
    }),
    getShopAllProductsPublishers: builder.query<
      GetShopAllProductsPublishersResponse,
      GetShopAllProductsPublishersRequest
    >({
      query: (params) => ({
        url: `/user/publishers${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    uploadShopAllProductFile: builder.mutation<
      UploadShopAllProductFileResponse,
      UploadShopAllProductFileRequest
    >({
      query: (formData) => ({
        url: "/admin/files",
        method: "POST",
        body: formData,
      }),
    }),
    rejectShopAllProductsRequest: builder.mutation<
      RejectShopAllProductsRequestResponse,
      RejectShopAllProductsRequestRequest
    >({
      query: ({ uuid, rejectReason, rejectDescription }) => ({
        url: `/admin/books/${uuid}/reject`,
        method: "PUT",
        body: {
          rejectReason,
          rejectDescription,
        },
      }),
    }),
    acceptShopAllProductsRequest: builder.mutation<
      AcceptShopAllProductsRequestResponse,
      AcceptShopAllProductsRequestRequest
    >({
      query: ({ uuid, productId }) => ({
        url: `/admin/books/${uuid}/accept${createQueryString({ productId })}`,
        method: "PUT",
      }),
    }),
    getShopAllProductsRequestRejectReasons: builder.query<
      GetShopAllProductsRequestRejectReasonsResponse,
      void
    >({
      query: () => ({
        url: "/enums/book-reject-reasons",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetShopAllProductsListQuery,
  useGetShopAllProductsDetailQuery,
  useGetShopAllProductsDetailSupplierBooksQuery,
  useHideShopAllProductsDetailMutation,
  useHideShopAllProductsDetailSupplierBookMutation,
  useUpdateShopAllProductsDetailMutation,
  useCreateShopAllProductsDetailSupplierBookMutation,
  useCreateShopAllProductMutation,
  useGetShopAllProductsPublishersQuery,
  useUploadShopAllProductFileMutation,
  useRejectShopAllProductsRequestMutation,
  useAcceptShopAllProductsRequestMutation,
  useGetShopAllProductsRequestRejectReasonsQuery,
} = productsApi;
