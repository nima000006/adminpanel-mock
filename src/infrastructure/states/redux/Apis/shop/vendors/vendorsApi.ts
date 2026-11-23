import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { shopApi } from "@infra/states/redux/Apis/shop";
import {
  EditShippingSettingsRequest,
  EditShippingSettingsResponse,
  GetVendorProfileDetailRequest,
  GetVendorProfileDetailResponse,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailBaseInfo/@types/@shopAllVendorsDetailBaseInfo";
import {
  CreateAndChangeVendorContractRequest,
  CreateAndChangeVendorContractResponse,
  GetVendorContractListRequest,
  GetVendorContractListResponse,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/@types/@shopAllVendorsDetailContract";
import {
  GetCountOrdersRequest,
  GetCountOrdersResponse,
  GetVendorOrdersListRequest,
  GetVendorOrdersListResponse,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailOrders/@types/@shopAllVendorsDetailOrders";
import {
  GetVendorProductsDetailRequest,
  GetVendorProductsDetailResponse,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailVendorProducts/@types/@shopAllVendorsDetailVendorProducts";
import {
  GetAllVendorsListRequest,
  GetAllVendorsListResponse,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/@types/@shopAllVendorsListTypes";
import {
  CreateVendorBasicInfoStepRequest,
  CreateVendorBasicInfoStepResponse,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsList/helper/drawer/ShopAllVendorsListAddDrawerContent/@types/@shopAllVendorsListAddDrawerContent";

export const vendorsApi = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    // list
    getAllVendorsList: builder.query<GetAllVendorsListResponse, GetAllVendorsListRequest>(
      {
        query: (params) => ({
          url: `/admin/suppliers${createQueryString(params)}`,
          method: "GET",
        }),
      }
    ),

    // add vendor — basic info step
    createVendorBasicInfoStep: builder.mutation<
      CreateVendorBasicInfoStepResponse,
      CreateVendorBasicInfoStepRequest
    >({
      query: (body) => ({
        url: "/admin/suppliers",
        method: "POST",
        body,
      }),
    }),

    // basic info tab
    getVendorProfileDetail: builder.query<
      GetVendorProfileDetailResponse,
      GetVendorProfileDetailRequest
    >({
      query: (params) => ({
        url: `/admin/suppliers/profile${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    editShippingSettings: builder.mutation<
      EditShippingSettingsResponse,
      EditShippingSettingsRequest
    >({
      query: ({ uuid, ...body }) => ({
        url: `/admin/supplier-shipping-settings/${uuid}`,
        method: "PUT",
        body,
      }),
    }),

    // vendor products tab
    getVendorProductsDetail: builder.query<
      GetVendorProductsDetailResponse,
      GetVendorProductsDetailRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/books/${uuid}/supplier-books${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // orders tab — status counts
    getCountOrders: builder.query<GetCountOrdersResponse, GetCountOrdersRequest>({
      query: (params) => ({
        url: `/admin/supplier-orders/status-counts${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // orders tab — list
    getVendorOrdersList: builder.query<
      GetVendorOrdersListResponse,
      GetVendorOrdersListRequest
    >({
      query: (params) => ({
        url: `/admin/supplier-orders${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // contract tab
    getVendorContractList: builder.query<
      GetVendorContractListResponse,
      GetVendorContractListRequest
    >({
      query: (params) => ({
        url: `/admin/suppliers/share${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    createAndChangeVendorContract: builder.mutation<
      CreateAndChangeVendorContractResponse,
      CreateAndChangeVendorContractRequest
    >({
      query: ({ uuid, ...body }) => ({
        url: `/admin/suppliers/${uuid}/rule-beneficiaries`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetAllVendorsListQuery,
  useCreateVendorBasicInfoStepMutation,
  useLazyGetVendorProfileDetailQuery,
  useEditShippingSettingsMutation,
  useLazyGetVendorProductsDetailQuery,
  useLazyGetCountOrdersQuery,
  useLazyGetVendorOrdersListQuery,
  useLazyGetVendorContractListQuery,
  useCreateAndChangeVendorContractMutation,
} = vendorsApi;
