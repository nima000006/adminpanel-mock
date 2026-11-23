import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { GetManagementSamimServicesResponse } from "@pages/management/_shared/@types/@managementServicesTypes";
import {
  EstelamAmozeshyarListRequest,
  EstelamAmozeshyarListResponse,
  GetAllAmozeshyarListAdvanceFilterRequest,
} from "@pages/management/Requests/EstelamAmozeshyar/@types/@estelamAmozeshyarList";
import { EstelamAmozeshyarDetailResponse } from "@pages/management/Requests/EstelamAmozeshyar/AllEstelamAmozeshyar/AllEstelamAmozeshyarDetail/@types/@allEstelamAmozeshyarDetail";
import { AllAcceptRejectAmozeshyarRequestRequest } from "@pages/management/Requests/EstelamAmozeshyar/AllEstelamAmozeshyar/AllEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailWaitingReview/@types/@estelamAmozeshyarDetailWaitingReview";
import { GetEstelamAmozeshyarRejectReasonsResponse } from "@pages/management/Requests/EstelamAmozeshyar/AllEstelamAmozeshyar/AllEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailWaitingReview/helper/drawers/EstelamAmozeshyarReject/@types/@estelamAmozeshyarRejectDrawerContent";
import { MyEstelamAmozeshyarDetailResponse } from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/@types/@myEstelamAmozeshyarDetail";
import { MyAcceptRejectAmozeshyarRequestRequest } from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailWaitingReview/@types/@estelamAmozeshyarDetailWaitingReview";
import { GetMyEstelamAmozeshyarRejectReasonsResponse } from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarDetail/helper/components/EstelamAmozeshyarDetailWaitingReview/helper/drawers/EstelamAmozeshyarReject/@types/@myEstelamAmozeshyarRejectDrawerContent";
import {
  EstelamMyAmozeshyarListRequest,
  EstelamMyAmozeshyarListResponse,
  GetMyAmozeshyarListAdvanceFilterRequest,
} from "@pages/management/Requests/EstelamAmozeshyar/MyEstelamAmozeshyar/MyEstelamAmozeshyarList/helper/components/EstelamAmozeshyarWaitingReviewList/@types/@estelamAmozeshyarWaitingReviewListTab";
import {
  EstelamSajedBannerResponse,
  EstelamSajedDetailResponse,
} from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/@types/@estelamSajedDetailTypes";
import { EstelamSajedModalRequest } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/helper/components/EstelamSajedDetailInfo/@types/@estelamSajedDetailInfoTypes";
import { AcceptRejectSajedRequest } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedDetail/helper/components/EstelamSajedDetailWaitingReview/@types/@estelamSajedDetailWaitingReviewTypes";
import {
  EstelamSajedListAdvanceFilterRequest,
  EstelamSajedListRequest,
  EstelamSajedListResponse,
} from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/@types/@estelamSajedListTypes";
import {
  MyEstelamSajedBannerResponse,
  MyEstelamSajedDetailResponse,
} from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/@types/@myEstelamSajedDetailTypes";
import { MyEstelamSajedModalRequest } from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/helper/components/MyEstelamSajedDetailInfo/@types/@estelamSajedDetailInfoTypes";
import { MyAcceptRejectSajedRequest } from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedDetail/helper/components/MyEstelamSajedDetailWaitingReview/@types/@myEstelamSajedDetailWaitingReviewTypes";
import {
  MyEstelamSajedListAdvanceFilterRequest,
  MyEstelamSajedListRequest,
  MyEstelamSajedListResponse,
} from "@pages/management/Requests/EstelamSajed/MyEstelamSajed/MyEstelamSajedList/@types/@myEstelamSajedListTypes";
import { AllForeignDetailResponse } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/@types/@allForeignNationalsRegistrationDetailTypes";
import { RejectAllForeignRequest } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationDetail/helper/components/AllForeignNationalsRegistrationDetailWaitingReview/@types/@allForeignNationalsRegistrationDetailWaitingReviewTypes";
import {
  AllForeignListRequest,
  AllForeignListResponse,
  ForeignBannerRequests,
  ForeignBannerResponse,
} from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/@types/@allForeignNationalsRegistrationListTypes";
import { GetManagementRoleRequestDetailResponse } from "@pages/management/Requests/RoleRequest/AllRoleRequest/AllRoleRequestDetail/@types/@allRoleRequestDetail";
import { ManagementRoleAccessRequestBody } from "@pages/management/Requests/RoleRequest/AllRoleRequest/AllRoleRequestDetail/helper/components/AllRoleRequestDetailWaitingReview/helper/drawers/AllRoleRequestConfirmed/@types/@allRoleRequestConfirmedDrawerContent";
import {
  ManagementRoleRequestAdvancedSearchRequest,
  ManagementRoleRequestAdvancedSearchResponse,
  ManagementRoleRequestResponse,
} from "@pages/management/Requests/RoleRequest/AllRoleRequest/AllRoleRequestList/@types/@allRoleRequestList";
import { GetManagementMyRoleRequestDetailResponse } from "@pages/management/Requests/RoleRequest/MyRoleRequest/MyRoleRequestDetail/@types/@myRoleRequestDetail";
import { ManagementMyRoleAccessRequestBody } from "@pages/management/Requests/RoleRequest/MyRoleRequest/MyRoleRequestDetail/helper/components/MyRoleRequestDetailWaitingReview/helper/drawers/MyRoleRequestConfirmed/@types/@myRoleRequestConfirmedDrawerContent";
import {
  MyManagementRoleRequestAdvancedSearchRequest,
  MyManagementRoleRequestAdvancedSearchResponse,
  MyManagementRoleRequestResponse,
} from "@pages/management/Requests/RoleRequest/MyRoleRequest/MyRoleRequestList/@types/@myRoleRequestList";

import { authenticationApi } from "../../authenticationApi";

export const managementRequestApis = authenticationApi.injectEndpoints({
  endpoints: (builder) => ({
    ManagementRoleRequest: builder.query<
      ManagementRoleRequestResponse,
      { statusId: number; params: { pageNo: number; pageSize: number } }
    >({
      query: ({ statusId, params }) => ({
        url: `/admin/admin-access-requests/status/${statusId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getManagementRoleRequestDetail: builder.query<
      GetManagementRoleRequestDetailResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/admin-access-requests/${id}`,
        method: "GET",
      }),
    }),

    ManagementMyRoleRequest: builder.query<
      MyManagementRoleRequestResponse,
      { statusId: number; params: { pageNo: number; pageSize: number } }
    >({
      query: ({ statusId, params }) => ({
        url: `/manager/admin-access-requests/status/${statusId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getManagementMyRoleRequestDetail: builder.query<
      GetManagementMyRoleRequestDetailResponse,
      string
    >({
      query: (id) => ({
        url: `/manager/admin-access-requests/${id}`,
        method: "GET",
      }),
    }),
    ManagementRoleAccessRequest: builder.mutation<void, ManagementRoleAccessRequestBody>({
      query: (body) => ({
        url: `/admin/admin-access-requests`,
        method: "PUT",
        body,
      }),
    }),
    ManagementMyRoleAccessRequest: builder.mutation<
      void,
      ManagementMyRoleAccessRequestBody
    >({
      query: (body) => ({
        url: `/manager/admin-access-requests`,
        method: "PUT",
        body,
      }),
    }),
    getAllManagementSamimServices: builder.query<
      GetManagementSamimServicesResponse,
      void
    >({
      query: () => ({
        url: "/admin/samim-services",
        method: "GET",
      }),
    }),
    getMyManagementSamimServices: builder.query<GetManagementSamimServicesResponse, void>(
      {
        query: () => ({
          url: "/manager/samim-services",
          method: "GET",
        }),
      }
    ),
    getAllEstelamAmozeshyarList: builder.query<
      EstelamAmozeshyarListResponse,
      EstelamAmozeshyarListRequest
    >({
      query: ({ params, status }) => ({
        url: `/admin/requests-student/status/${status}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAllEstelamAmozeshyarDetail: builder.query<EstelamAmozeshyarDetailResponse, string>(
      {
        query: (id) => ({
          url: `/admin/request/${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }
    ),
    getAllAmozeshyarListAdvanceFilter: builder.mutation<
      EstelamAmozeshyarListResponse,
      GetAllAmozeshyarListAdvanceFilterRequest
    >({
      query: (body) => ({
        url: `/admin/requests-student/advance-filter`,
        method: "POST",
        body,
      }),
    }),
    allAcceptRejectAmozeshyarRequest: builder.mutation<
      void,
      AllAcceptRejectAmozeshyarRequestRequest
    >({
      query: (body) => ({
        url: "/admin/request/student",
        method: "PUT",
        body,
      }),
    }),
    getMyEstelamAmozeshyarList: builder.query<
      EstelamMyAmozeshyarListResponse,
      EstelamMyAmozeshyarListRequest
    >({
      query: ({ params, status }) => ({
        url: `/manager/requests-student/status/${status}${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyEstelamAmozeshyarDetail: builder.query<
      MyEstelamAmozeshyarDetailResponse,
      string
    >({
      query: (id) => ({
        url: `/manager/request/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getEstelamAmozeshyarRejectReasons: builder.query<
      GetEstelamAmozeshyarRejectReasonsResponse,
      void
    >({
      query: () => ({
        url: "/admin/admin-access-request/reject-reason",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept-language": "fa",
        },
      }),
    }),
    getMyEstelamAmozeshyarRejectReasons: builder.query<
      GetMyEstelamAmozeshyarRejectReasonsResponse,
      void
    >({
      query: () => ({
        url: "/manager/admin-access-request/reject-reason",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept-language": "fa",
        },
      }),
    }),
    getMyAmozeshyarListAdvanceFilter: builder.mutation<
      EstelamMyAmozeshyarListResponse,
      GetMyAmozeshyarListAdvanceFilterRequest
    >({
      query: (body) => ({
        url: `/manager/requests-student/advance-filter`,
        method: "POST",
        body,
      }),
    }),
    myAcceptRejectAmozeshyarRequest: builder.mutation<
      void,
      MyAcceptRejectAmozeshyarRequestRequest
    >({
      query: (body) => ({
        url: "/manager/request/student",
        method: "PUT",
        body,
      }),
    }),
    getManagementRoleRequestAdvancedSearch: builder.query<
      ManagementRoleRequestAdvancedSearchResponse,
      ManagementRoleRequestAdvancedSearchRequest
    >({
      query: (params) => ({
        url: `/admin/access-requests/advanced-search${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getMyManagementRoleRequestAdvancedSearch: builder.query<
      MyManagementRoleRequestAdvancedSearchResponse,
      MyManagementRoleRequestAdvancedSearchRequest
    >({
      query: (params) => ({
        url: `/manager/access-requests/advanced-search${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // sajed list
    getAllEstelamSajedList: builder.query<
      EstelamSajedListResponse,
      EstelamSajedListRequest
    >({
      query: ({ params, statusId }) => ({
        url: `/admin/requests-employee/status/${statusId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    getMyEstelamSajedList: builder.query<
      MyEstelamSajedListResponse,
      MyEstelamSajedListRequest
    >({
      query: ({ params, statusId }) => ({
        url: `/manager/requests-employee/status/${statusId}${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // sajed advance filter
    estelamSajedListAdvanceFilter: builder.mutation<
      EstelamSajedListResponse,
      EstelamSajedListAdvanceFilterRequest
    >({
      query: (body) => ({
        url: `/admin/requests-Employee/advance-filter`,
        method: "POST",
        body,
      }),
    }),
    myEstelamSajedListAdvanceFilter: builder.mutation<
      MyEstelamSajedListResponse,
      MyEstelamSajedListAdvanceFilterRequest
    >({
      query: (body) => ({
        url: `/manager/requests-Employee/advance-filter`,
        method: "POST",
        body,
      }),
    }),

    // get sajed detail
    getSajedDetail: builder.query<EstelamSajedDetailResponse, string>({
      query: (id) => ({
        url: `/admin/request/employee/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMySajedDetail: builder.query<MyEstelamSajedDetailResponse, string>({
      query: (id) => ({
        url: `/manager/request/employee/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // sajed banner
    getEstelamSajedBanner: builder.query<EstelamSajedBannerResponse, void>({
      query: () => ({
        url: "/admin/requests-Employee/banner",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getMyEstelamSajedBanner: builder.query<MyEstelamSajedBannerResponse, void>({
      query: () => ({
        url: "/manager/requests-employee/banner",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // ACCEPT AND REJECT ESTELAM SAJED
    AcceptRejectSajedRequest: builder.mutation<void, AcceptRejectSajedRequest>({
      query: (body) => ({
        url: "/admin/request/employee",
        method: "PUT",
        body,
      }),
    }),
    MyAcceptRejectSajedRequest: builder.mutation<void, MyAcceptRejectSajedRequest>({
      query: (body) => ({
        url: "/manager/request/employee",
        method: "PUT",
        body,
      }),
    }),

    // estelam sajed modal
    EstelamSajedModal: builder.mutation<number, EstelamSajedModalRequest>({
      query: (params) => ({
        url: `/admin/user/re-inquiry${createQueryString(params)}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    MyEstelamSajedModal: builder.mutation<number, MyEstelamSajedModalRequest>({
      query: (params) => ({
        url: `/manager/user/re-inquiry${createQueryString(params)}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // foreign banner
    getForeignBanner: builder.query<ForeignBannerResponse, ForeignBannerRequests>({
      query: (params) => ({
        url: `/admin/user-requests/banner${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // foreign list
    getAllForeignList: builder.query<AllForeignListResponse, AllForeignListRequest>({
      query: (params) => ({
        url: `/admin/user-requests/advance-filter${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // get foreign detail
    getAllForeignDetail: builder.query<AllForeignDetailResponse, string>({
      query: (id) => ({
        url: `/admin/user-requests/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // accept foreign modal
    AcceptAllForeignRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/user-requests/${id}/accept`,
        method: "PUT",
      }),
    }),

    // reject foreign drawer
    RejectAllForeignRequests: builder.mutation<void, RejectAllForeignRequest>({
      query: ({ id, params }) => ({
        url: `/admin/user-requests/${id}/reject${createQueryString(params)}`,
        method: "PUT",
      }),
    }),
  }),
});
export const {
  useLazyManagementRoleRequestQuery,
  useLazyGetManagementRoleRequestDetailQuery,
  useLazyManagementMyRoleRequestQuery,
  useLazyGetManagementMyRoleRequestDetailQuery,
  useManagementRoleAccessRequestMutation,
  useLazyGetAllManagementSamimServicesQuery,
  useLazyGetMyManagementSamimServicesQuery,
  useManagementMyRoleAccessRequestMutation,
  useLazyGetAllEstelamAmozeshyarListQuery,
  useLazyGetAllEstelamAmozeshyarDetailQuery,
  useGetAllAmozeshyarListAdvanceFilterMutation,
  useAllAcceptRejectAmozeshyarRequestMutation,
  useLazyGetMyEstelamAmozeshyarListQuery,
  useLazyGetMyEstelamAmozeshyarDetailQuery,
  useGetMyAmozeshyarListAdvanceFilterMutation,
  useMyAcceptRejectAmozeshyarRequestMutation,
  useGetEstelamAmozeshyarRejectReasonsQuery,
  useGetMyEstelamAmozeshyarRejectReasonsQuery,
  useLazyGetManagementRoleRequestAdvancedSearchQuery,
  useLazyGetMyManagementRoleRequestAdvancedSearchQuery,
  useLazyGetAllEstelamSajedListQuery,
  useLazyGetMyEstelamSajedListQuery,
  useEstelamSajedListAdvanceFilterMutation,
  useMyEstelamSajedListAdvanceFilterMutation,
  useLazyGetSajedDetailQuery,
  useLazyGetMySajedDetailQuery,
  useLazyGetEstelamSajedBannerQuery,
  useLazyGetMyEstelamSajedBannerQuery,
  useAcceptRejectSajedRequestMutation,
  useMyAcceptRejectSajedRequestMutation,
  useEstelamSajedModalMutation,
  useMyEstelamSajedModalMutation,
  useLazyGetForeignBannerQuery,
  useLazyGetAllForeignListQuery,
  useLazyGetAllForeignDetailQuery,
  useAcceptAllForeignRequestMutation,
  useRejectAllForeignRequestsMutation,
} = managementRequestApis;
