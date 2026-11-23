import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { GetAllVendorContractListResponse } from "@pages/Food/Vendors/AllVendors/AllVendorDetail/helper/components/AllVendorContractTabContent/@types/@allVendorContracts";
import { GetVendorByIdResponse } from "@pages/Food/Vendors/AllVendors/AllVendorDetail/helper/components/AllVendorDetailTabContent/@types/@allVendorDetailTabContent";
import {
  EditAllVendorRequest,
  EditAllVendorResponse,
} from "@pages/Food/Vendors/AllVendors/AllVendorDetail/helper/drawer/AllVendorDrawerContent/@types/@allVendorDrawerContent";
import { GetMyVendorContractListResponse } from "@pages/Food/Vendors/MyVendors/MyVendorsDetail/helper/components/MyVendorContractTab/@types/@myVendorContract";
import {
  EditMyVendorRequest,
  EditMyVendorResponse,
  GetMyVendorByIdResponse,
} from "@pages/Food/Vendors/MyVendors/MyVendorsDetail/helper/components/MyVendorDetailTabContent/@types/@myVendorDetailTabContent";

import {
  CreateAllVendorRequest,
  CreateAllVendorResponse,
  GetVendorAllResponse,
} from "../../../../../../pages/Food/Vendors/AllVendors/AllVendorList/@types/@allVendorList";
import {
  CreateMyVendorRequest,
  CreateMyVendorResponse,
  GetVendorMyResponse,
} from "../../../../../../pages/Food/Vendors/MyVendors/MyVendorsList/@types/@myVendorsList";
import { foodApi } from "../../foodApi";

export const vendorApi = foodApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendorList: builder.query<GetVendorAllResponse, { isDeleted: boolean }>({
      query: (params) => ({
        url: `/admin/vendor/all${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getMyVendorList: builder.query<GetVendorMyResponse, void>({
      query: () => ({
        url: "/manager/vendor/all",
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    createAllVendor: builder.mutation<CreateAllVendorResponse, CreateAllVendorRequest>({
      query: (body) => ({
        url: "/admin/vendor/create",
        method: "POST",
        body,
      }),
    }),
    createMyVendor: builder.mutation<CreateMyVendorResponse, CreateMyVendorRequest>({
      query: (body) => ({
        url: "/manager/vendor/create",
        method: "POST",
        body,
      }),
    }),
    getAllVendorById: builder.query<GetVendorByIdResponse, { vendorId: string }>({
      query: (params) => ({
        url: `/admin/vendor/id${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyVendorById: builder.query<GetMyVendorByIdResponse, { vendorId: string }>({
      query: (params) => ({
        url: `/manager/vendor/id${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    editMyVendor: builder.mutation<EditMyVendorResponse, EditMyVendorRequest>({
      query: (body) => ({
        url: "/manager/vendor/update",
        method: "POST",
        body,
      }),
    }),
    editAllVendor: builder.mutation<EditAllVendorResponse, EditAllVendorRequest>({
      query: (body) => ({
        url: "/admin/vendor/update",
        method: "POST",
        body,
      }),
    }),
    getAllVendorContractList: builder.query<
      GetAllVendorContractListResponse,
      { vendorId: number }
    >({
      query: (params) => ({
        url: `/admin/contract/vendor/all${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),
    getMyVendorContractList: builder.query<
      GetMyVendorContractListResponse,
      { vendorId: number }
    >({
      query: (params) => ({
        url: `/manager/contract/vendor/all${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["tag/food"],
    }),

    // Delete VENDOR WITH ID
    deleteVendorWithId: builder.query<any, { vendorId: string }>({
      query: (params) => ({
        url: `admin/vendor/delete${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    // DELETE SELF WITH ID
    deleteSelfWithId: builder.query<any, { restaurantId: string }>({
      query: (params) => ({
        url: `admin/restaurant/delete${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLazyGetAllVendorListQuery,
  useLazyGetMyVendorListQuery,
  useCreateAllVendorMutation,
  useCreateMyVendorMutation,
  useLazyGetAllVendorByIdQuery,
  useLazyGetMyVendorByIdQuery,
  useEditMyVendorMutation,
  useEditAllVendorMutation,
  useLazyGetAllVendorContractListQuery,
  useLazyGetMyVendorContractListQuery,
  useLazyDeleteVendorWithIdQuery,
  useLazyDeleteSelfWithIdQuery,
} = vendorApi;
