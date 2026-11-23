import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import { GetInternationalAdmissionDetailBasicInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailBasicInfo/@types/@admissionProgramDetailBasicInfo";
import { GetInternationalAdmissionDetailConditionInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailConditions/@types/@admissionProgramDetailConditions";
import { GetInternationalAdmissionDetailCostInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailCosts/@types/@admissionProgramDetailCosts";
import { GetInternationalAdmissionDetailFieldsInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailFields/@types/@admissionProgramDetailFields";
import { GetInternationalAdmissionDetailTimingInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailTiming/@types/@admissionProgramDetailTiming";
import {
  GetInternationalAdmissionListRequest,
  GetInternationalAdmissionListResponse,
} from "@pages/International/BasicInfo/AdmissionProgram/List/helper/components/InternationalAdmission/@types/@internationalAdmissionTab";
import {
  GetAllCoursesByAdvanceFilterRequest,
  GetAllCoursesByAdvanceFilterResponse,
  GetAllFieldsWithDegreesAndGroupIdRequest,
  GetAllFieldsWithDegreesAndGroupIdResponse,
  GetAllFieldsWithDegreesResponse,
  GetBranchStudyGroupWithDegreesAndFieldsRequest,
  GetBranchStudyGroupWithDegreesAndFieldsResponse,
  GetInternationalDegreesByGroupIdResponse,
} from "@pages/International/BasicInfo/AdmissionProgram/List/helper/components/InternationalHasAdmissionFields/@types/@internationalHasAdmissionFieldsTab";
import {
  CreateInternationalAdmissionRequest,
  CreateInternationalAdmissionResponse,
  GetInternationalDegreesResponse,
} from "@pages/International/BasicInfo/AdmissionProgram/Modify/@types/@admissionProgramModify";
import {
  CreateInternationalAdmissionBasicInformationRequest,
  GetInternationalAllActiveSemestersResponse,
  GetInternationalAllCountriesResponse,
  GetInternationalAllGenderResponse,
  GetInternationalAllResidencesResponse,
  GetInternationalAllTrainingResponse,
  GetInternationalAllTrainingTypesResponse,
} from "@pages/International/BasicInfo/AdmissionProgram/Modify/helper/components/ModifyBasicInfo/@types/@admissionProgramModifyBasicInfo";
import {
  CreateInternationalAdmissionConditionsInformationRequest,
  GetInternationalAllLanguagesResponse,
} from "@pages/International/BasicInfo/AdmissionProgram/Modify/helper/components/ModifyConditions/@types/@admissionProgramModifyConditions";
import {
  CreateInternationalAdmissionFeesInformationRequest,
  GetInternationalAllCurrenciesResponse,
  GetInternationalAllPrServiceResponse,
  GetInternationalAllServiceTypesResponse,
} from "@pages/International/BasicInfo/AdmissionProgram/Modify/helper/components/ModifyCosts/@types/@admissionProgramModifyCosts";
import {
  GetAllBranchesByAdvanceFilterRequest,
  GetAllBranchesByAdvanceFilterResponse,
} from "@pages/International/BasicInfo/AdmissionProgram/Modify/helper/components/ModifyFields/@types/@admissionProgramModifyFields";
import { CreateInternationalAdmissionBranchInformationRequest } from "@pages/International/BasicInfo/AdmissionProgram/Modify/helper/components/ModifyFields/helper/components/CreateField/@types/@admissionProgramCreateField";
import { CreateInternationalAdmissionDateInformationRequest } from "@pages/International/BasicInfo/AdmissionProgram/Modify/helper/components/ModifyTiming/@types/@admissionProgramModifyTiming";

import { internationalApi } from "../../internationalApi";

export const requestApi = internationalApi.injectEndpoints({
  endpoints: (builder) => ({
    getInternationalAdmissionList: builder.query<
      GetInternationalAdmissionListResponse,
      GetInternationalAdmissionListRequest
    >({
      query: ({ requestStatus, pageNumber, pageSize }) => ({
        url: `/admin/rule/list/${requestStatus}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAdmissionDetailBasicInfo: builder.query<
      GetInternationalAdmissionDetailBasicInfoResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/rule${id}/detail/basic-info`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAdmissionDetailFieldsIfo: builder.query<
      GetInternationalAdmissionDetailFieldsInfoResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/rule${id}/detail/branch-fields`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAdmissionDetailTimingIfo: builder.query<
      GetInternationalAdmissionDetailTimingInfoResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/rule/${id}/detail/schedules`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAdmissionDetailConditionIfo: builder.query<
      GetInternationalAdmissionDetailConditionInfoResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/rule/${id}/detail/conditions`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAdmissionDetailCostIfo: builder.query<
      GetInternationalAdmissionDetailCostInfoResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/service-rule/cost/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalDegreesByGroupId: builder.query<
      GetInternationalDegreesByGroupIdResponse,
      string
    >({
      query: (id) => ({
        url: `/course/degreesByGroupId?studyGroupIdList=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalDegrees: builder.query<GetInternationalDegreesResponse, void>({
      query: () => ({
        url: "/basicInformation/allDegrees",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getAllFieldsWithDegreesAndGroupId: builder.mutation<
      GetAllFieldsWithDegreesAndGroupIdResponse,
      GetAllFieldsWithDegreesAndGroupIdRequest
    >({
      query: (body) => ({
        url: "/course/getAllFieldsWithDegreesAndGroupId",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/international"],
    }),
    getAllFieldsWithDegrees: builder.query<GetAllFieldsWithDegreesResponse, number[]>({
      query: (idList) => ({
        url: `/course/fields-by-degrees?${idList.map((id, index, arr) => {
          if (index < arr.length - 1) {
            return `degrees=${id}&`;
          } else {
            return `degrees=${id}`;
          }
        })}`,
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getBranchStudyGroupWithDegreesAndFields: builder.mutation<
      GetBranchStudyGroupWithDegreesAndFieldsResponse,
      GetBranchStudyGroupWithDegreesAndFieldsRequest
    >({
      query: (body) => ({
        url: "/branch/branchStudyGroupWithDegrees&fields",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/international"],
    }),
    getAllCoursesByAdvanceFilter: builder.mutation<
      GetAllCoursesByAdvanceFilterResponse,
      GetAllCoursesByAdvanceFilterRequest
    >({
      query: (body) => ({
        url: "/admin/courses/advanced-filter",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),
    getInternationalAllActiveSemesters: builder.query<
      GetInternationalAllActiveSemestersResponse,
      void
    >({
      query: () => ({
        url: "/course/allActiveSemesters",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAllCountries: builder.query<
      GetInternationalAllCountriesResponse,
      void
    >({
      query: () => ({
        url: "/basicInformation/countries",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAllGender: builder.query<GetInternationalAllGenderResponse, void>({
      query: () => ({
        url: "/basicInformation/genders",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAllResidences: builder.query<
      GetInternationalAllResidencesResponse,
      void
    >({
      query: () => ({
        url: "/basicInformation/residences",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAllTraining: builder.query<GetInternationalAllTrainingResponse, void>(
      {
        query: () => ({
          url: "/basicInformation/trainings",
          method: "GET",
        }),
        providesTags: ["tag/international"],
      }
    ),
    getInternationalAllTrainingTypes: builder.query<
      GetInternationalAllTrainingTypesResponse,
      void
    >({
      query: () => ({
        url: "/basicInformation/trainingTypes",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAllCurrencies: builder.query<
      GetInternationalAllCurrenciesResponse,
      void
    >({
      query: () => ({
        url: "/basicInformation/currencies",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getAllBranchesByAdvanceFilter: builder.mutation<
      GetAllBranchesByAdvanceFilterResponse,
      GetAllBranchesByAdvanceFilterRequest
    >({
      query: (body) => ({
        url: "/admin/branch-fields/advanced-filter",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),
    createInternationalAdmission: builder.mutation<
      CreateInternationalAdmissionResponse,
      CreateInternationalAdmissionRequest
    >({
      query: (body) => ({
        url: "/admin/createBulkCourse",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),
    internationalAdmissionActiveStatus: builder.mutation<string, number>({
      query: (id) => ({
        url: `/admin/rules/${id}/record-status/activation`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),

      invalidatesTags: ["tag/international"],
    }),
    createInternationalAdmissionBasicInformation: builder.mutation<
      number,
      CreateInternationalAdmissionBasicInformationRequest
    >({
      query: (body) => ({
        url: "/admin/rules/basic-information",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),
    createInternationalAdmissionDateInformation: builder.mutation<
      null,
      CreateInternationalAdmissionDateInformationRequest
    >({
      query: (body) => ({
        url: "/admin/rules/dates-information",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),

      invalidatesTags: ["tag/international"],
    }),
    createInternationalAdmissionConditionsInformation: builder.mutation<
      null,
      CreateInternationalAdmissionConditionsInformationRequest
    >({
      query: (body) => ({
        url: "/admin/rule/conditions",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),

      invalidatesTags: ["tag/international"],
    }),
    createInternationalAdmissionFeesInformation: builder.mutation<
      null,
      CreateInternationalAdmissionFeesInformationRequest
    >({
      query: (body) => ({
        url: "/admin/rule/fees",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),

      invalidatesTags: ["tag/international"],
    }),
    getInternationalAllLanguages: builder.query<
      GetInternationalAllLanguagesResponse,
      void
    >({
      query: () => ({
        url: "/basicInformation/languages",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAllServiceTypes: builder.query<
      GetInternationalAllServiceTypesResponse,
      void
    >({
      query: () => ({
        url: "/basicInformation/service-types",
        method: "GET",
      }),
      providesTags: ["tag/international"],
    }),
    getInternationalAllPrService: builder.query<
      GetInternationalAllPrServiceResponse,
      void
    >({
      query: () => ({
        url: "/admin/pr-services",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["tag/international"],
    }),
    createInternationalAdmissionBranchInformation: builder.mutation<
      number,
      CreateInternationalAdmissionBranchInformationRequest
    >({
      query: (body) => ({
        url: "/admin/course/bulk",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["tag/international"],
    }),
  }),
});

export const {
  useLazyGetInternationalAdmissionListQuery,
  useLazyGetInternationalAdmissionDetailBasicInfoQuery,
  useLazyGetInternationalAdmissionDetailFieldsIfoQuery,
  useLazyGetInternationalAdmissionDetailTimingIfoQuery,
  useLazyGetInternationalAdmissionDetailConditionIfoQuery,
  useLazyGetInternationalAdmissionDetailCostIfoQuery,
  useLazyGetInternationalDegreesByGroupIdQuery,
  useLazyGetInternationalDegreesQuery,
  useGetAllFieldsWithDegreesAndGroupIdMutation,
  useLazyGetAllFieldsWithDegreesQuery,
  useGetBranchStudyGroupWithDegreesAndFieldsMutation,
  useGetAllCoursesByAdvanceFilterMutation,
  useLazyGetInternationalAllActiveSemestersQuery,
  useLazyGetInternationalAllCountriesQuery,
  useLazyGetInternationalAllGenderQuery,
  useLazyGetInternationalAllResidencesQuery,
  useLazyGetInternationalAllTrainingQuery,
  useLazyGetInternationalAllTrainingTypesQuery,
  useGetAllBranchesByAdvanceFilterMutation,
  useCreateInternationalAdmissionMutation,
  useLazyGetInternationalAllCurrenciesQuery,
  useInternationalAdmissionActiveStatusMutation,
  useCreateInternationalAdmissionBasicInformationMutation,
  useCreateInternationalAdmissionDateInformationMutation,
  useCreateInternationalAdmissionConditionsInformationMutation,
  useCreateInternationalAdmissionFeesInformationMutation,
  useLazyGetInternationalAllLanguagesQuery,
  useLazyGetInternationalAllServiceTypesQuery,
  useLazyGetInternationalAllPrServiceQuery,
  useCreateInternationalAdmissionBranchInformationMutation,
} = requestApi;
