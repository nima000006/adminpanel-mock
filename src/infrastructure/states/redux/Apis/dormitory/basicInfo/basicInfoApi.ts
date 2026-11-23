import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  DormitoryCitizenListResponse,
  DormitoryDegreeListResponse,
  DormitoryGenderListResponse,
  DormitoryUserGroupListResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/@types/@admissionStepsRulesAdmissionConditions";
import {
  GetDormitoryRegulationTemplateListRequest,
  GetDormitoryRegulationTemplateListResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesRegulations/@types/@admissionStepsRulesRegulations";
import {
  GetDormitoryAcademicTermsRequest,
  GetDormitoryAcademicTermsResponse,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import {
  DormitoryUploadFileWithTextRequest,
  DormitoryUploadFileWithTextResponse,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";
import {
  MyDormitoryUploadFileWithTextRequest,
  MyDormitoryUploadFileWithTextResponse,
} from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionCreation/@types/@myAdmissionCreation";
import {
  EditDormitoryDeactivationReasonRequest,
  GetBasicInfoDeactivationReasonsRequest,
  GetBasicInfoDeactivationReasonsResponse,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeActivationReasonsList/@types/@dormitoryBaseInfoDeActivationReasonsList";
import {
  EditDormitoryBaseInfoDeductionAndAddReasonsRequest,
  EditDormitoryBaseInfoDeductionAndAddReasonsResponse,
  GetDormitoryBaseInfoDeductionAndAddReasonsListRequest,
  GetDormitoryBaseInfoDeductionAndAddReasonsListResponse,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoDeductionAndAddReasonsList/@types/@dormitoryBaseInfoDeductionAndAddReasonsList";
import {
  CreateDormitoryFacilityRequest,
  CreateDormitoryFacilityResponse,
  DormitoryFacilitiesListRequest,
  DormitoryFacilitiesListResponse,
  DormitoryUnitOfLevelListResponse,
  DormitoryUnitOfMeasureListResponse,
  EditDormitoryFacilityRequest,
  EditDormitoryFacilityResponse,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoFacilitiesList/@types/@dormitoryBaseInfoFacilitiesList";
import {
  CreateDormitoryRulesAndRegulationRequest,
  CreateDormitoryRulesAndRegulationResponse,
  DormitoryRegulationTypesListResponse,
  DormitoryRulesAndRegulationDetailRequest,
  DormitoryRulesAndRegulationDetailResponse,
  EditDormitoryRulesAndRegulationRequest,
  EditDormitoryRulesAndRegulationResponse,
  GetDormitoryBasicInfoRulesAndRegulationListRequest,
  GetDormitoryBasicInfoRulesAndRegulationListResponse,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoRulesAndRegulationList/@types/@dormitoryBaseInfoRulesAndRegulationList";
import {
  DormitoryCourseListRequest,
  DormitoryCourseListResponse,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoCourseList/@types/@dormitoryBasicInfoCourseList";
import {
  CreateDormitoryQualityGradeRequest,
  CreateDormitoryQualityGradeResponse,
  DormitoryTypesListResponse,
  EditDormitoryQualityGradeRequest,
  EditDormitoryQualityGradeResponse,
  GetDormitoryBasicInfoQualityGradeListRequest,
  GetDormitoryBasicInfoQualityGradeListResponse,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoQualityList/@types/@dormitoryBasicInfoQualityList";
import {
  EditDormitoryReasonReturnAndRefuseRequest,
  EditDormitoryReasonReturnAndRefuseResponse,
  GetDormitoryReasonReturnAndRefuseListRequest,
  GetDormitoryReasonReturnAndRefuseListResponse,
  GetViewDormitoryReasonReturnAndRefuseListRequest,
  GetViewDormitoryReasonReturnAndRefuseListResponse,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryReasonReturnAndRefuseList/@types/@dormitoryReasonReturnAndRefuseList";
import { GetBasicInfoListResponse } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoList/@types/@dormitoryBasicInfoList";
import {
  GetAmenityTemplateListRequest,
  GetAmenityTemplateListResponse,
  GetQualityGradeListRequest,
  GetQualityGradeListResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";
import {
  ReasonsRejectAndReturnRequestsRequest,
  ReasonsRejectAndReturnRequestsResponse,
} from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/@types/@allResidenceDetail";
import { GetNearbyPlaceTemplatesDormitoryResponse } from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/drawer/CreateResidenceDrawerContent/helper/components/PlacesAroundResidenceStepContent/@types/@placesAroundResidenceStepContent";
import { GetResidenceRequestTypeResponse } from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceWaitingList/@types/@allResidenceWaitingList";

import { dormitoryApi } from "../../dormitoryApi";

export const basicInfoApi = dormitoryApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasicInfoList: builder.query<GetBasicInfoListResponse, void>({
      query: () => ({
        url: "basic-information/counts",
        method: "GET",
      }),
    }),
    getBasicInfoDeactivationReasons: builder.query<
      GetBasicInfoDeactivationReasonsResponse,
      GetBasicInfoDeactivationReasonsRequest
    >({
      query: (params) => ({
        url: `/basic-information/deactivation-reasons${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getDormitoryBasicInfoQualityGradeList: builder.query<
      GetDormitoryBasicInfoQualityGradeListResponse,
      GetDormitoryBasicInfoQualityGradeListRequest
    >({
      query: (params) => ({
        url: `/basic-information/quality-grades${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    createDormitoryQualityGrade: builder.mutation<
      CreateDormitoryQualityGradeResponse,
      CreateDormitoryQualityGradeRequest
    >({
      query: (body) => ({
        url: "/admin/quality-grades",
        method: "POST",
        body,
      }),
    }),
    editDormitoryQualityGrade: builder.mutation<
      EditDormitoryQualityGradeResponse,
      EditDormitoryQualityGradeRequest
    >({
      query: ({ id, body }) => ({
        url: `/admin/quality-grades/${id}`,
        method: "PUT",
        body,
      }),
    }),
    getDormitoryBasicInfoRulesAndRegulationList: builder.query<
      GetDormitoryBasicInfoRulesAndRegulationListResponse,
      GetDormitoryBasicInfoRulesAndRegulationListRequest
    >({
      query: (params) => ({
        url: `/basic-information/regulation-templates${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getDormitoryRegulationTemplateList: builder.query<
      GetDormitoryRegulationTemplateListResponse,
      GetDormitoryRegulationTemplateListRequest
    >({
      query: (params) => ({
        url: `/basic-information/regulation-templates/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    dormitoryRulesAndRegulationDetail: builder.query<
      DormitoryRulesAndRegulationDetailResponse,
      DormitoryRulesAndRegulationDetailRequest
    >({
      query: (uuid) => ({
        url: `/basic-information/regulation-templates/${uuid}`,
        method: "GET",
      }),
    }),
    createDormitoryRulesAndRegulation: builder.mutation<
      CreateDormitoryRulesAndRegulationResponse,
      CreateDormitoryRulesAndRegulationRequest
    >({
      query: (body) => ({
        url: "/admin/regulation-templates",
        method: "POST",
        body,
      }),
    }),
    editDormitoryRulesAndRegulation: builder.mutation<
      EditDormitoryRulesAndRegulationResponse,
      EditDormitoryRulesAndRegulationRequest
    >({
      query: ({ id, body }) => ({
        url: `/admin/regulation-templates/${id}`,
        method: "PUT",
        body,
      }),
    }),
    dormitoryTypesList: builder.query<DormitoryTypesListResponse, void>({
      query: () => ({
        url: "/enums/accommodation-types",
        method: "GET",
      }),
    }),
    dormitoryRegulationTypesList: builder.query<
      DormitoryRegulationTypesListResponse,
      void
    >({
      query: () => ({
        url: "/enums/regulation-kinds",
        method: "GET",
      }),
    }),
    dormitoryGenderList: builder.query<DormitoryGenderListResponse, void>({
      query: () => ({
        url: "/enums/plan-genders",
        method: "GET",
      }),
    }),
    dormitoryUserGroupList: builder.query<DormitoryUserGroupListResponse, void>({
      query: () => ({
        url: "/enums/user-group-types",
        method: "GET",
      }),
    }),
    dormitoryDegreeList: builder.query<DormitoryDegreeListResponse, void>({
      query: () => ({
        url: "/enums/academic-degrees",
        method: "GET",
      }),
    }),
    dormitoryCitizenList: builder.query<DormitoryCitizenListResponse, void>({
      query: () => ({
        url: "/enums/citizens-types",
        method: "GET",
      }),
    }),
    dormitoryUploadFileWithText: builder.mutation<
      DormitoryUploadFileWithTextResponse,
      DormitoryUploadFileWithTextRequest
    >({
      query: (body) => ({
        url: "/admin/named-files",
        method: "POST",
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    myDormitoryUploadFileWithText: builder.mutation<
      MyDormitoryUploadFileWithTextResponse,
      MyDormitoryUploadFileWithTextRequest
    >({
      query: (body) => ({
        url: "/manager/named-files",
        method: "POST",
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    editDormitoryDeactivationReason: builder.mutation<
      void,
      EditDormitoryDeactivationReasonRequest
    >({
      query: ({ id, body }) => ({
        url: `/admin/deactivation-reasons/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
    getQualityGradeList: builder.query<
      GetQualityGradeListResponse,
      GetQualityGradeListRequest
    >({
      query: (params) => ({
        url: `/basic-information/quality-grades/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getAmenityTemplateList: builder.query<
      GetAmenityTemplateListResponse,
      GetAmenityTemplateListRequest
    >({
      query: (params) => ({
        url: `/basic-information/amenity-templates${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    dormitoryFacilitiesList: builder.query<
      DormitoryFacilitiesListResponse,
      DormitoryFacilitiesListRequest
    >({
      query: (params) => ({
        url: `/basic-information/amenities${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    dormitoryUnitOfMeasureList: builder.query<DormitoryUnitOfMeasureListResponse, void>({
      query: () => ({
        url: "/enums/units-of-measure",
        method: "GET",
      }),
    }),
    dormitoryUnitOfLevelList: builder.query<DormitoryUnitOfLevelListResponse, void>({
      query: () => ({
        url: "/enums/unit-levels",
        method: "GET",
      }),
    }),
    createDormitoryFacility: builder.mutation<
      CreateDormitoryFacilityResponse,
      CreateDormitoryFacilityRequest
    >({
      query: (body) => ({
        url: "/admin/amenities",
        method: "POST",
        body,
      }),
    }),
    editDormitoryFacility: builder.mutation<
      EditDormitoryFacilityResponse,
      EditDormitoryFacilityRequest
    >({
      query: ({ id, body }) => ({
        url: `/admin/amenities/${id}`,
        method: "PUT",
        body,
      }),
    }),
    getResidenceRequestType: builder.query<GetResidenceRequestTypeResponse, void>({
      query: () => ({
        url: "/enums/request-kinds",
        method: "GET",
      }),
    }),
    dormitoryCourseList: builder.query<
      DormitoryCourseListResponse,
      DormitoryCourseListRequest
    >({
      query: (params) => ({
        url: `/basic-information/academic-terms${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getDormitoryAcademicTerms: builder.query<
      GetDormitoryAcademicTermsResponse,
      GetDormitoryAcademicTermsRequest
    >({
      query: (params) => ({
        url: `/basic-information/academic-terms/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getDormitoryReasonReturnAndRefuseList: builder.query<
      GetDormitoryReasonReturnAndRefuseListResponse,
      GetDormitoryReasonReturnAndRefuseListRequest
    >({
      query: (params) => ({
        url: `/basic-information/rejection-return-reasons${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    reasonsRejectAndReturnRequests: builder.query<
      ReasonsRejectAndReturnRequestsResponse,
      ReasonsRejectAndReturnRequestsRequest
    >({
      query: (params) => ({
        url: `/basic-information/rejection-return-reasons/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getNearbyPlaceTemplatesDormitory: builder.query<
      GetNearbyPlaceTemplatesDormitoryResponse,
      void
    >({
      query: () => ({
        url: "/basic-information/nearby-place-templates",
        method: "GET",
      }),
    }),
    editDormitoryReasonReturnAndRefuse: builder.mutation<
      EditDormitoryReasonReturnAndRefuseResponse,
      EditDormitoryReasonReturnAndRefuseRequest
    >({
      query: ({ uuid, ...body }) => ({
        url: `/admin/rejection-return-reasons/${uuid}`,
        method: "PUT",
        body,
      }),
    }),
    getViewDormitoryReasonReturnAndRefuseList: builder.query<
      GetViewDormitoryReasonReturnAndRefuseListResponse,
      GetViewDormitoryReasonReturnAndRefuseListRequest
    >({
      query: ({ uuid, visibility }) => ({
        url: `/basic-information/reasons/${uuid}${createQueryString({ visibility })}`,
        method: "GET",
      }),
    }),
    getDormitoryBaseInfoDeductionAndAddReasonsList: builder.query<
      GetDormitoryBaseInfoDeductionAndAddReasonsListResponse,
      GetDormitoryBaseInfoDeductionAndAddReasonsListRequest
    >({
      query: (params) => ({
        url: `/basic-information/adjustment-reasons${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    editDormitoryBaseInfoDeductionAndAddReasons: builder.mutation<
      EditDormitoryBaseInfoDeductionAndAddReasonsResponse,
      EditDormitoryBaseInfoDeductionAndAddReasonsRequest
    >({
      query: ({ uuid, ...body }) => ({
        url: `/admin/adjustment-reasons/${uuid}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});
export const {
  useGetBasicInfoListQuery,
  useLazyGetBasicInfoDeactivationReasonsQuery,
  useLazyGetDormitoryBasicInfoQualityGradeListQuery,
  useLazyGetDormitoryBasicInfoRulesAndRegulationListQuery,
  useLazyGetDormitoryRegulationTemplateListQuery,
  useLazyDormitoryRulesAndRegulationDetailQuery,
  useLazyDormitoryTypesListQuery,
  useLazyDormitoryRegulationTypesListQuery,
  useLazyDormitoryGenderListQuery,
  useLazyDormitoryUserGroupListQuery,
  useLazyDormitoryDegreeListQuery,
  useLazyDormitoryCitizenListQuery,
  useDormitoryUploadFileWithTextMutation,
  useMyDormitoryUploadFileWithTextMutation,
  useLazyDormitoryFacilitiesListQuery,
  useLazyDormitoryUnitOfMeasureListQuery,
  useLazyDormitoryUnitOfLevelListQuery,
  useCreateDormitoryQualityGradeMutation,
  useCreateDormitoryRulesAndRegulationMutation,
  useCreateDormitoryFacilityMutation,
  useEditDormitoryFacilityMutation,
  useEditDormitoryRulesAndRegulationMutation,
  useEditDormitoryQualityGradeMutation,
  useEditDormitoryDeactivationReasonMutation,
  useLazyGetQualityGradeListQuery,
  useLazyGetAmenityTemplateListQuery,
  useLazyGetResidenceRequestTypeQuery,
  useLazyDormitoryCourseListQuery,
  useLazyGetDormitoryAcademicTermsQuery,
  useLazyGetDormitoryReasonReturnAndRefuseListQuery,
  useLazyReasonsRejectAndReturnRequestsQuery,
  useLazyGetNearbyPlaceTemplatesDormitoryQuery,
  useEditDormitoryReasonReturnAndRefuseMutation,
  useLazyGetViewDormitoryReasonReturnAndRefuseListQuery,
  useLazyGetDormitoryBaseInfoDeductionAndAddReasonsListQuery,
  useEditDormitoryBaseInfoDeductionAndAddReasonsMutation,
} = basicInfoApi;
