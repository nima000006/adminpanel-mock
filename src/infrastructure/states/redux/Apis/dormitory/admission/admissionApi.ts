import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetAllAdmissionDetailProgramInfoRequest,
  GetAllAdmissionDetailProgramInfoResponse,
  GetMyAdmissionDetailProgramInfoRequest,
  GetMyAdmissionDetailProgramInfoResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailProgramInfoContent/@types/@admissionDetailProgramInfoContent";
import {
  GetAdmissionBedsListCountRequest,
  GetAdmissionBedsListCountResponse,
  GetAdmissionBedsListRequest,
  GetAdmissionBedsListResponse,
  GetAdmissionBuildingsListCountRequest,
  GetAdmissionBuildingsListCountResponse,
  GetAdmissionBuildingsListRequest,
  GetAdmissionBuildingsListResponse,
  GetAdmissionUnitListCountRequest,
  GetAdmissionUnitListCountResponse,
  GetAdmissionUnitListRequest,
  GetAdmissionUnitListResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import {
  AdmissionReservationUnitResponse,
  GetAllAdmissionProgramInfoRequest,
  GetAllAdmissionProgramInfoResponse,
  GetDormitoryManagementTypesResponse,
  GetMyAdmissionProgramInfoRequest,
  GetMyAdmissionProgramInfoResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsProgramInfoContent/@types/@admissionStepsProgramInfoContent";
import {
  GetAllAdmissionRulesRequest,
  GetAllAdmissionRulesResponse,
  GetMyAdmissionRulesRequest,
  GetMyAdmissionRulesResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/@types/@admissionStepsRulesAdmissionConditions";
import {
  DormitoryScheduleTypeResponse,
  GetAllAdmissionSchedulingRequest,
  GetAllAdmissionSchedulingResponse,
  GetMyAdmissionSchedulingRequest,
  GetMyAdmissionSchedulingResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import {
  CreateAllAdmissionProgramInfoRequest,
  CreateAllAdmissionProgramInfoResponse,
  CreateAllAdmissionRulesRequest,
  CreateAllAdmissionRulesResponse,
  CreateAllAdmissionSchedulingRequest,
  CreateAllAdmissionSchedulingResponse,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import {
  AllAdmissionDetailRejectRequestRequest,
  AllAdmissionDetailRejectRequestResponse,
  AllAdmissionDetailReturnRequestRequest,
  AllAdmissionDetailReturnRequestResponse,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/@types/@allAdmissionDetail";
import {
  GetAllAdmissionDetailStatisticsPriceRequest,
  GetAllAdmissionDetailStatisticsPriceResponse,
  GetAllAdmissionDetailStatisticsTabRequest,
  GetAllAdmissionDetailStatisticsTabResponse,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionDetail/helper/components/AllAdmissionDetailStatisticsContent/@types/@allAdmissionDetailStatisticsContent";
import {
  CreateMyAdmissionProgramInfoRequest,
  CreateMyAdmissionProgramInfoResponse,
  CreateMyAdmissionRulesRequest,
  CreateMyAdmissionRulesResponse,
  CreateMyAdmissionSchedulingRequest,
  CreateMyAdmissionSchedulingResponse,
} from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionCreation/@types/@myAdmissionCreation";

import { dormitoryApi } from "../../dormitoryApi";

export const admissionApi = dormitoryApi.injectEndpoints({
  endpoints: (builder) => ({
    getDormitoryManagementTypes: builder.query<GetDormitoryManagementTypesResponse, void>(
      {
        query: () => ({
          url: "/enums/management-types",
          method: "GET",
        }),
      }
    ),
    admissionReservationUnit: builder.query<AdmissionReservationUnitResponse, void>({
      query: () => ({
        url: "/enums/unit-levels",
        method: "GET",
      }),
    }),
    dormitoryScheduleType: builder.query<DormitoryScheduleTypeResponse, void>({
      query: () => ({
        url: "/enums/period-types",
        method: "GET",
      }),
    }),
    createAllAdmissionProgramInfo: builder.mutation<
      CreateAllAdmissionProgramInfoResponse,
      CreateAllAdmissionProgramInfoRequest
    >({
      query: (body) => ({
        url: "/admin/admission-plans",
        method: "POST",
        body,
      }),
    }),
    createMyAdmissionProgramInfo: builder.mutation<
      CreateMyAdmissionProgramInfoResponse,
      CreateMyAdmissionProgramInfoRequest
    >({
      query: (body) => ({
        url: "/manager/admission-plans",
        method: "POST",
        body,
      }),
    }),
    getAllAdmissionProgramInfo: builder.query<
      GetAllAdmissionProgramInfoResponse,
      GetAllAdmissionProgramInfoRequest
    >({
      query: (uuid) => ({
        url: `/admin/admission-plans/${uuid}`,
        method: "GET",
      }),
    }),
    getMyAdmissionProgramInfo: builder.query<
      GetMyAdmissionProgramInfoResponse,
      GetMyAdmissionProgramInfoRequest
    >({
      query: (uuid) => ({
        url: `/manager/admission-plans/${uuid}`,
        method: "GET",
      }),
    }),
    getAllAdmissionScheduling: builder.query<
      GetAllAdmissionSchedulingResponse,
      GetAllAdmissionSchedulingRequest
    >({
      query: (uuid) => ({
        url: `/admin/admission-plans/${uuid}/scheduling`,
        method: "GET",
      }),
    }),
    getMyAdmissionScheduling: builder.query<
      GetMyAdmissionSchedulingResponse,
      GetMyAdmissionSchedulingRequest
    >({
      query: (uuid) => ({
        url: `/manager/admission-plans/${uuid}/scheduling`,
        method: "GET",
      }),
    }),
    createAllAdmissionScheduling: builder.mutation<
      CreateAllAdmissionSchedulingResponse,
      CreateAllAdmissionSchedulingRequest
    >({
      query: ({ uuid, ...body }) => ({
        url: `/admin/admission-plans/${uuid}/scheduling`,
        method: "POST",
        body,
      }),
    }),
    createMyAdmissionScheduling: builder.mutation<
      CreateMyAdmissionSchedulingResponse,
      CreateMyAdmissionSchedulingRequest
    >({
      query: ({ uuid, ...body }) => ({
        url: `/manager/admission-plans/${uuid}/scheduling`,
        method: "POST",
        body,
      }),
    }),
    getAllAdmissionRules: builder.query<
      GetAllAdmissionRulesResponse,
      GetAllAdmissionRulesRequest
    >({
      query: (uuid) => ({
        url: `/admin/admission-plans/${uuid}/admission-rules`,
        method: "GET",
      }),
    }),
    getMyAdmissionRules: builder.query<
      GetMyAdmissionRulesResponse,
      GetMyAdmissionRulesRequest
    >({
      query: (uuid) => ({
        url: `/manager/admission-plans/${uuid}/admission-rules`,
        method: "GET",
      }),
    }),
    createAllAdmissionRules: builder.mutation<
      CreateAllAdmissionRulesResponse,
      CreateAllAdmissionRulesRequest
    >({
      query: ({ uuid, ...body }) => ({
        url: `/admin/admission-plans/${uuid}/rules`,
        method: "POST",
        body,
      }),
    }),
    createMyAdmissionRules: builder.mutation<
      CreateMyAdmissionRulesResponse,
      CreateMyAdmissionRulesRequest
    >({
      query: ({ uuid, ...body }) => ({
        url: `/manager/admission-plans/${uuid}/rules`,
        method: "POST",
        body,
      }),
    }),
    getAllAdmissionDetailStatisticsTab: builder.query<
      GetAllAdmissionDetailStatisticsTabResponse,
      GetAllAdmissionDetailStatisticsTabRequest
    >({
      query: (uuid) => ({
        url: `/admin/admission-plans/${uuid}/request-statistics`,
        method: "GET",
      }),
    }),
    getAllAdmissionDetailStatisticsPrice: builder.query<
      GetAllAdmissionDetailStatisticsPriceResponse,
      GetAllAdmissionDetailStatisticsPriceRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/admission-plans/${uuid}/prices${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAllAdmissionDetailProgramInfo: builder.query<
      GetAllAdmissionDetailProgramInfoResponse,
      GetAllAdmissionDetailProgramInfoRequest
    >({
      query: (uuid) => ({
        url: `/admin/admission-plans/${uuid}/program`,
        method: "GET",
      }),
    }),
    getMyAdmissionDetailProgramInfo: builder.query<
      GetMyAdmissionDetailProgramInfoResponse,
      GetMyAdmissionDetailProgramInfoRequest
    >({
      query: (uuid) => ({
        url: `/manager/admission-plans/${uuid}/program`,
        method: "GET",
      }),
    }),
    allAdmissionDetailRejectRequest: builder.mutation<
      AllAdmissionDetailRejectRequestResponse,
      AllAdmissionDetailRejectRequestRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/admission-plans/${uuid}/reject`,
        method: "PUT",
        body,
      }),
    }),
    allAdmissionDetailReturnRequest: builder.mutation<
      AllAdmissionDetailReturnRequestResponse,
      AllAdmissionDetailReturnRequestRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/admission-plans/${uuid}/return`,
        method: "PUT",
        body,
      }),
    }),
    getAdmissionBedsList: builder.query<
      GetAdmissionBedsListResponse,
      GetAdmissionBedsListRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/admission-plans/${uuid}/beds${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAdmissionBedsListCount: builder.query<
      GetAdmissionBedsListCountResponse,
      GetAdmissionBedsListCountRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/admission-plans/${uuid}/beds/counts${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAdmissionBuildingsList: builder.query<
      GetAdmissionBuildingsListResponse,
      GetAdmissionBuildingsListRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/admission-plans/${uuid}/buildings${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAdmissionBuildingsListCount: builder.query<
      GetAdmissionBuildingsListCountResponse,
      GetAdmissionBuildingsListCountRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/admission-plans/${uuid}/buildings/counts${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAdmissionUnitList: builder.query<
      GetAdmissionUnitListResponse,
      GetAdmissionUnitListRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/admission-plans/${uuid}/rooms${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAdmissionUnitListCount: builder.query<
      GetAdmissionUnitListCountResponse,
      GetAdmissionUnitListCountRequest
    >({
      query: ({ uuid, ...params }) => ({
        url: `/admin/admission-plans/${uuid}/rooms/counts${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetDormitoryManagementTypesQuery,
  useLazyAdmissionReservationUnitQuery,
  useLazyDormitoryScheduleTypeQuery,
  useCreateAllAdmissionProgramInfoMutation,
  useCreateMyAdmissionProgramInfoMutation,
  useLazyGetAllAdmissionProgramInfoQuery,
  useLazyGetMyAdmissionProgramInfoQuery,
  useLazyGetAllAdmissionSchedulingQuery,
  useLazyGetMyAdmissionSchedulingQuery,
  useCreateAllAdmissionSchedulingMutation,
  useCreateMyAdmissionSchedulingMutation,
  useLazyGetAllAdmissionRulesQuery,
  useLazyGetMyAdmissionRulesQuery,
  useCreateAllAdmissionRulesMutation,
  useCreateMyAdmissionRulesMutation,
  useLazyGetAllAdmissionDetailStatisticsTabQuery,
  useLazyGetAllAdmissionDetailStatisticsPriceQuery,
  useLazyGetAllAdmissionDetailProgramInfoQuery,
  useLazyGetMyAdmissionDetailProgramInfoQuery,
  useAllAdmissionDetailRejectRequestMutation,
  useAllAdmissionDetailReturnRequestMutation,
  useLazyGetAdmissionBedsListQuery,
  useLazyGetAdmissionBedsListCountQuery,
  useLazyGetAdmissionBuildingsListQuery,
  useLazyGetAdmissionBuildingsListCountQuery,
  useLazyGetAdmissionUnitListQuery,
  useLazyGetAdmissionUnitListCountQuery,
} = admissionApi;
