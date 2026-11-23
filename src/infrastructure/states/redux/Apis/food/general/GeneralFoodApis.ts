import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  AdminContractUpdateRequest,
  AdminContractUpdateResponse,
} from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/AllContractDetail/@types/@allContractDetailTab";
import {
  FoodUploadFileResponse,
  GetCancelReasonsAllResponse,
  GetCityResponse,
  GetMealAllResponse,
  GetProvinceResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

import { foodApi } from "../../foodApi";

export const generalFoodApi = foodApi.injectEndpoints({
  endpoints: (builder) => ({
    getProvince: builder.query<GetProvinceResponse, void>({
      query: () => ({
        url: "/admin/states/all",
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getCity: builder.query<GetCityResponse, { stateId: string }>({
      query: (params) => ({
        url: `/admin/province/all/id${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    foodUploadFile: builder.mutation<FoodUploadFileResponse, any>({
      query: (formData) => ({
        url: "/admin/upload",
        method: "POST",
        body: formData,
      }),
      // providesTags: ["tag/food"],
      // transformResponse: (response: UploadFileResponse) => {
      //   return transformObjectResponse(response);
      // },
    }),
    adminContractUpdate: builder.mutation<
      AdminContractUpdateResponse,
      AdminContractUpdateRequest
    >({
      query: (body) => ({
        url: "/admin/contract/update",
        method: "POST",
        body,
      }),
    }),
    getMealAll: builder.query<GetMealAllResponse, void>({
      query: () => ({
        url: "/user/meal/all",
        method: "GET",
      }),
    }),
    getCancelReasonsAll: builder.query<GetCancelReasonsAllResponse, void>({
      query: () => ({
        url: "/admin/baseInfo/cancelReasons/all",
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
  }),
});
export const {
  useGetProvinceQuery,
  useLazyGetCityQuery,
  useFoodUploadFileMutation,
  useAdminContractUpdateMutation,
  useGetMealAllQuery,
  useLazyGetMealAllQuery,
  useLazyGetCancelReasonsAllQuery,
} = generalFoodApi;
