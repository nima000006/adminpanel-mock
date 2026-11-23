import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { shopApi } from "@infra/states/redux/Apis/shop";
import {
  GetAllCategoriesSettingsListCountRequest,
  GetAllCategoriesSettingsListCountResponse,
  GetAllCategoriesSettingsListRequest,
  GetAllCategoriesSettingsListResponse,
  GetCategoryLevelsRequest,
  GetCategoryLevelsResponse,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";
import {
  CreateCategoryLevel1Request,
  CreateCategoryLevel1Response,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/ShopAllCategorySettingsLayer1DefineModal/@types/@shopAllCategorySettingsLayer1DefineModal";
import {
  CreateCategoryLevel2Request,
  CreateCategoryLevel2Response,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/ShopAllCategorySettingsLayer2DefineModal/@types/@shopAllCategorySettingsLayer2DefineModal";
import {
  CreateCategoryLevel3Request,
  CreateCategoryLevel3Response,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/ShopAllCategorySettingsLayer3DefineModal/@types/@shopAllCategorySettingsLayer3DefineModal";
import {
  CreateAllSendingSettingsRequest,
  CreateAllSendingSettingsResponse,
  GetAllSendingSettingsListRequest,
  GetAllSendingSettingsListResponse,
} from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/@types/@shopAllSendingSettingsList";
import {
  GetAdminSuppliersRequest,
  GetAdminSuppliersResponse,
  UpdateAllSendingSettingsRequest,
  UpdateAllSendingSettingsResponse,
} from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/helper/modals/ShopAllSendingSettingsDefineModal/@types/@shopAllSendingSettingsDefineModal";

export const basicInfoApi = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSendingSettingsList: builder.query<
      GetAllSendingSettingsListResponse,
      GetAllSendingSettingsListRequest
    >({
      query: (params) => ({
        url: `/admin/supplier-shipping-settings${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    createAllSendingSettings: builder.mutation<
      CreateAllSendingSettingsResponse,
      CreateAllSendingSettingsRequest
    >({
      query: (body) => ({
        url: "/admin/supplier-shipping-settings",
        method: "POST",
        body,
      }),
    }),
    getAdminSuppliers: builder.query<GetAdminSuppliersResponse, GetAdminSuppliersRequest>(
      {
        query: (params) => ({
          url: `/admin/suppliers${createQueryString(params)}`,
          method: "GET",
        }),
      }
    ),
    updateAllSendingSettings: builder.mutation<
      UpdateAllSendingSettingsResponse,
      UpdateAllSendingSettingsRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/supplier-shipping-settings/${uuid}`,
        method: "PUT",
        body,
      }),
    }),
    getAllCategoriesSettingsListCount: builder.query<
      GetAllCategoriesSettingsListCountResponse,
      GetAllCategoriesSettingsListCountRequest
    >({
      query: () => ({
        url: "/admin/categories/level-counts",
        method: "GET",
      }),
    }),
    getAllCategoriesSettingsList: builder.query<
      GetAllCategoriesSettingsListResponse,
      GetAllCategoriesSettingsListRequest
    >({
      query: (params) => ({
        url: `/admin/categories${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getCategoryLevels: builder.query<GetCategoryLevelsResponse, GetCategoryLevelsRequest>(
      {
        query: () => ({
          url: "/enums/category-levels",
          method: "GET",
        }),
      }
    ),
    createCategoryLevel1: builder.mutation<
      CreateCategoryLevel1Response,
      CreateCategoryLevel1Request
    >({
      query: (body) => ({
        url: "/admin/categories/level-1",
        method: "POST",
        body,
      }),
    }),
    createCategoryLevel2: builder.mutation<
      CreateCategoryLevel2Response,
      CreateCategoryLevel2Request
    >({
      query: (body) => ({
        url: "/admin/categories/level-2",
        method: "POST",
        body,
      }),
    }),
    createCategoryLevel3: builder.mutation<
      CreateCategoryLevel3Response,
      CreateCategoryLevel3Request
    >({
      query: (body) => ({
        url: "/admin/categories/level-3",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllSendingSettingsListQuery,
  useCreateAllSendingSettingsMutation,
  useGetAdminSuppliersQuery,
  useUpdateAllSendingSettingsMutation,
  useGetAllCategoriesSettingsListCountQuery,
  useGetAllCategoriesSettingsListQuery,
  useGetCategoryLevelsQuery,
  useCreateCategoryLevel1Mutation,
  useCreateCategoryLevel2Mutation,
  useCreateCategoryLevel3Mutation,
} = basicInfoApi;
