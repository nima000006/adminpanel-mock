import { ShortcutListResponse } from "@pages/Reports/myReport/@types/@myReportTypes";
import {
  CreateBannerActiveBranchesRequest,
  CreateBannerActiveBranchesResponse,
  GetActiveBannersDetailResponse,
  GetBannersActiveBranchesRequest,
  GetBannersActiveBranchesResponse,
  UpdateBannerActiveBranchesRequest,
  UpdateBannerActiveBranchesResponse,
} from "@pages/Settings/BannerManagement/@types/@bannerManagement";
import {
  CreateFaqRequest,
  CreateFaqResponse,
  DeleteFaqResponse,
  GetFaqDetailResponse,
  GetFaqListResponse,
} from "@pages/Settings/FaqManagement/@types/@faqManagement";
import {
  CreateServiceActiveBranchesRequest,
  CreateServiceActiveBranchesResponse,
  GetBasicInfoBranchServiceResponse,
  GetBasicInfoStaffTypeResponse,
  GetBranchActiveServicesRequest,
  GetBranchActiveServicesResponse,
  UpdateServiceActiveBranchesRequest,
  UpdateServiceActiveBranchesResponse,
} from "@pages/Settings/ServiceManagement/@types/@servicesManagement";

import { appVersion } from "../../appVersion";

export const appVersionApi = appVersion.injectEndpoints({
  endpoints: (builder) => ({
    // Services Endpoints
    getBranchActiveServices: builder.mutation<
      GetBranchActiveServicesResponse,
      GetBranchActiveServicesRequest
    >({
      query: (body) => ({
        url: "/admin/branchservices/service/all",
        method: "POST",
        body,
      }),
    }),
    createServiceActiveBranches: builder.mutation<
      CreateServiceActiveBranchesResponse,
      CreateServiceActiveBranchesRequest
    >({
      query: (body) => ({
        url: "/admin/branchservices/create",
        method: "POST",
        body,
      }),
    }),
    updateServiceActiveBranches: builder.mutation<
      UpdateServiceActiveBranchesResponse,
      UpdateServiceActiveBranchesRequest
    >({
      query: (body) => ({
        url: "/admin/branchservices/update",
        method: "POST",
        body,
      }),
    }),
    // Banner Endpoints
    getBranchActiveBanners: builder.mutation<
      GetBannersActiveBranchesResponse,
      GetBannersActiveBranchesRequest
    >({
      query: (body) => ({
        url: "/admin/banner/service/all",
        method: "POST",
        body,
      }),
    }),
    getActiveBannersDetail: builder.query<GetActiveBannersDetailResponse, string>({
      query: (id) => ({
        url: `admin/banner/detail/id?bannerId=${id}`,
        method: "GET",
      }),
    }),
    createBannerActiveBranches: builder.mutation<
      CreateBannerActiveBranchesResponse,
      CreateBannerActiveBranchesRequest
    >({
      query: (body) => ({
        url: "/admin/banner/create",
        method: "POST",
        body,
      }),
    }),
    updateBannerActiveBranches: builder.mutation<
      UpdateBannerActiveBranchesResponse,
      UpdateBannerActiveBranchesRequest
    >({
      query: (body) => ({
        url: "/admin/banner/update",
        method: "POST",
        body,
      }),
    }),
    //Upload File
    uploadFileToAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "/admin/upload",
        method: "POST",
        body,
      }),
    }),
    getBasicInfoStaffType: builder.query<GetBasicInfoStaffTypeResponse, void>({
      query: () => ({
        url: "admin/base-info/staff-type",
        method: "GET",
      }),
    }),
    getBasicInfoBranchService: builder.query<GetBasicInfoBranchServiceResponse, void>({
      query: () => ({
        url: "admin/base-info/branch-service-type",
        method: "GET",
      }),
    }),
    getBasicInfoBannerBranchService: builder.query<
      GetBasicInfoBranchServiceResponse,
      void
    >({
      query: () => ({
        url: "admin/base-info/banner-section-type",
        method: "GET",
      }),
    }),
    shortcutRewrite: builder.mutation<
      boolean,
      { key: string | undefined; title: string }
    >({
      query: ({ key, title }) => ({
        url: `admin/shortcut/rewrite?menuItem=${key}&faTitle=${title}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "tag/appVersion", id: "shortcuts" }],
    }),
    shortcutList: builder.query<ShortcutListResponse, void>({
      query: () => ({
        url: "/admin/shortcut/all",
        method: "GET",
        extraHeaders: {
          "accept-language": "fa",
        },
      }),
      providesTags: [{ type: "tag/appVersion", id: "shortcuts" }],
    }),
    getFaqList: builder.query<GetFaqListResponse, { serviceId: number }>({
      query: ({ serviceId }) => ({
        url: `admin/faq/${serviceId}/all`,
        method: "GET",
        extraHeaders: {
          "accept-language": "fa",
        },
      }),
    }),
    getFaqDetail: builder.query<GetFaqDetailResponse, number>({
      query: (id) => ({
        url: `admin/faq/${id}/detail`,
        method: "GET",
        extraHeaders: {
          "accept-language": "fa",
        },
      }),
    }),
    deleteFaq: builder.mutation<DeleteFaqResponse, number>({
      query: (id) => ({
        url: `/admin/faq/${id}`,
        method: "DELETE",
        extraHeaders: {
          "accept-language": "fa",
        },
      }),
    }),
    createFaq: builder.mutation<CreateFaqResponse, CreateFaqRequest>({
      query: (body) => ({
        url: "/admin/faq/add",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetBranchActiveServicesMutation,
  useCreateServiceActiveBranchesMutation,
  useUpdateServiceActiveBranchesMutation,
  useUploadFileToAdminMutation,
  useUpdateBannerActiveBranchesMutation,
  useCreateBannerActiveBranchesMutation,
  useGetBranchActiveBannersMutation,
  useLazyGetActiveBannersDetailQuery,
  useLazyGetBasicInfoStaffTypeQuery,
  useLazyGetBasicInfoBranchServiceQuery,
  useLazyGetBasicInfoBannerBranchServiceQuery,
  useShortcutRewriteMutation,
  useShortcutListQuery,
  useLazyShortcutListQuery,
  useLazyGetFaqListQuery,
  useLazyGetFaqDetailQuery,
  useDeleteFaqMutation,
  useCreateFaqMutation,
} = appVersionApi;
