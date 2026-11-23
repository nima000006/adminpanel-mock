import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { myDoctorV2Api } from "@infra/states/redux/Apis/myDoctorV2Api";
import {
  myDoctorSurveyDetailFirstTabRequest,
  myDoctorSurveyDetailFirstTabResponse,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailGeneralProfile/@types/@geneticsParticipantsDetailGeneralProfile";
import {
  myDoctorSurveyDetailQuestionSecondTabRequest,
  myDoctorSurveyDetailQuestionSecondTabResponse,
  myDoctorSurveyDetailSecondTabRequest,
  myDoctorSurveyDetailSecondTabResponse,
  myDoctorSurveyDetailStatusGroupSecondTabRequest,
  myDoctorSurveyDetailStatusGroupSecondTabResponse,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailQuestions/@types/@geneticsParticipantsDetailQuestions";
import {
  myDoctorSurveyDetailFourthTabRequest,
  myDoctorSurveyDetailFourthTabResponse,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/@types/@geneticsParticipantsDetailReviewStatus";
import {
  myDoctorSurveyDetailFourthTabChangeStatusRequest,
  myDoctorSurveyDetailFourthTabTestStatusRequest,
  myDoctorSurveyDetailFourthTabTestStatusResponse,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusConsultation/helper/component/GeneticsParticipantsDetailReviewStatusConsultationDrawerContent/@types/@geneticsParticipantsDetailReviewStatusConsultationDrawerContent";
import {
  myDoctorGetHistoryIdRequest,
  myDoctorSurveyDetailFourthTabFilesRequest,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent/@types/@geneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent";
import { myDoctorSurveyDetailFourthTabAddFileRequest } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailModal/@types/@geneticsParticipantsDetailReviewStatusTestResultDetailModal";
import {
  myDoctorSurveyDetailFourthTabTestStatusCodeRequest,
  myDoctorSurveyDetailFourthTabTestStatusCodeResponse,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDrawerContent/@types/@geneticsParticipantsDetailReviewStatusTestResultDrawerContent";
import {
  myDoctorSurveyDetailFourthTabHistoryRequest,
  myDoctorSurveyDetailFourthTabHistoryResponse,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestViewDrawerContent/@types/@geneticsParticipantsDetailReviewStatusTestViewDrawerContent";
import {
  myDoctorSurveyDetailThirdTabRequest,
  myDoctorSurveyDetailThirdTabResponse,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailUserInformation/@types/@geneticsParticipantsDetailUserInformation";
import {
  myDoctorSurveyAllAdvanceFilterResponse,
  myDoctorSurveyAllAdvanceFilterRequest,
  myDoctorSurveyAllResponse,
  myDoctorSurveyAllRequest,
  myDoctorGetGroupsBySurveyIdResponse,
  myDoctorGetGroupsBySurveyIdRequest,
  myDoctorGetGroupsStatusResponse,
  myDoctorGetGroupsStatusIdRequest,
} from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsList/@types/@geneticsParticipantsList";
import {
  myDoctorGeneticAllTypesRequest,
  myDoctorGeneticAllTypesResponse,
} from "@pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/@types/@geneticsRequestsList";
import {
  myDoctorLabsListAdvanceFilterRequest,
  myDoctorLabsListAdvanceFilterResponse,
} from "@pages/MyDoctor/Genetics/Labs/LabsList/@types/@labsList";
import {
  GetDetailLabsResponse,
  GetTestGeneticResponse,
  myDoctorLabsCreateRequest,
  myDoctorLabsUpdateRequest,
} from "@pages/MyDoctor/Genetics/Labs/LabsList/helper/drawer/LabsModifyDrawerContent/@types/@labsModifyDrawerContent";

export const genericApi = myDoctorV2Api.injectEndpoints({
  endpoints: (builder) => ({
    myDoctorSurveyAll: builder.query<myDoctorSurveyAllResponse, myDoctorSurveyAllRequest>(
      {
        query: (params) => ({
          url: `admin/survey/all${createQueryString(params)}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        providesTags: ["tag/myDoctorV2"],
      }
    ),
    myDoctorSurveyAllAdvanceFilter: builder.mutation<
      myDoctorSurveyAllAdvanceFilterResponse,
      myDoctorSurveyAllAdvanceFilterRequest
    >({
      query: ({ body, params }) => ({
        url: `admin/survey-cycle/advance-filter${createQueryString(params)}`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
        invalidatesTags: ["tag/myDoctorV2"],
      }),
    }),
    myDoctorGetGroupsBySurveyId: builder.query<
      myDoctorGetGroupsBySurveyIdResponse,
      myDoctorGetGroupsBySurveyIdRequest
    >({
      query: ({ surveyId }) => ({
        url: `admin/group/master/${surveyId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorGetGroupsStatus: builder.query<
      myDoctorGetGroupsStatusResponse,
      myDoctorGetGroupsStatusIdRequest
    >({
      query: (params) => ({
        url: `admin/status/group-status${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailFirstTab: builder.query<
      myDoctorSurveyDetailFirstTabResponse,
      myDoctorSurveyDetailFirstTabRequest
    >({
      query: ({ "survey-cycle-id": id }) => ({
        url: `admin/group/result/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailSecondTab: builder.query<
      myDoctorSurveyDetailSecondTabResponse,
      myDoctorSurveyDetailSecondTabRequest
    >({
      query: ({ "survey-id": id }) => ({
        url: `admin/group/master/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailStatusGroupSecondTab: builder.query<
      myDoctorSurveyDetailStatusGroupSecondTabResponse,
      myDoctorSurveyDetailStatusGroupSecondTabRequest
    >({
      query: (params) => ({
        url: `admin/group/result/master-group${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailQuestionSecondTab: builder.query<
      myDoctorSurveyDetailQuestionSecondTabResponse,
      myDoctorSurveyDetailQuestionSecondTabRequest
    >({
      query: (params) => ({
        url: `admin/survey-responses/questions${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailThirdTab: builder.query<
      myDoctorSurveyDetailThirdTabResponse,
      myDoctorSurveyDetailThirdTabRequest
    >({
      query: ({ "survey-cycle-id": id }) => ({
        url: `admin/survey-cycle/base-data/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // LABS LIST
    myDoctorLabsListAdvanceFilter: builder.query<
      myDoctorLabsListAdvanceFilterResponse,
      myDoctorLabsListAdvanceFilterRequest
    >({
      query: ({ body, params }) => ({
        url: `center/advance-filter${createQueryString(params)}`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2/labs"],
    }),

    // LABS CREATE
    myDoctorLabsCreate: builder.mutation<void, myDoctorLabsCreateRequest>({
      query: (body) => ({
        url: "center/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctorV2/labs"],
    }),

    // GET TEST
    getTestGenetic: builder.query<GetTestGeneticResponse, { surveyId: string }>({
      query: (params) => ({
        url: `admin/test/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),

    // GET DETAIL LABS
    getDetailLabs: builder.query<GetDetailLabsResponse, string>({
      query: (id) => ({
        url: `center/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2/labs"],
    }),

    // LABS UPDATE
    myDoctorLabsUpdate: builder.mutation<void, myDoctorLabsUpdateRequest>({
      query: (body) => ({
        url: "center/update",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctorV2/labs"],
    }),

    // DEACTIVATE
    myDoctorLabsDeActive: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `center/deactive${createQueryString({ id })}`,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      invalidatesTags: ["tag/myDoctorV2/labs"],
    }),
    myDoctorSurveyDetailFourthTab: builder.query<
      myDoctorSurveyDetailFourthTabResponse,
      myDoctorSurveyDetailFourthTabRequest
    >({
      query: ({ params, body }) => ({
        url: `admin/test-request/advance-filter${createQueryString(params)}`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailFourthTabChangeStatus: builder.mutation<
      void,
      myDoctorSurveyDetailFourthTabChangeStatusRequest
    >({
      query: (body) => ({
        url: `admin/test-request/change-status`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailFourthTabTestStatus: builder.query<
      myDoctorSurveyDetailFourthTabTestStatusResponse,
      myDoctorSurveyDetailFourthTabTestStatusRequest
    >({
      query: (params) => ({
        url: `admin/status/test-status${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailFourthTabTestStatusCode: builder.query<
      myDoctorSurveyDetailFourthTabTestStatusCodeResponse,
      myDoctorSurveyDetailFourthTabTestStatusCodeRequest
    >({
      query: (params) => ({
        url: `admin/status/test-status/code${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailFourthTabHistory: builder.query<
      myDoctorSurveyDetailFourthTabHistoryResponse,
      myDoctorSurveyDetailFourthTabHistoryRequest
    >({
      query: (params) => ({
        url: `admin/test-request/history${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2"],
    }),
    myDoctorSurveyDetailFourthTabAddFile: builder.mutation<
      void,
      myDoctorSurveyDetailFourthTabAddFileRequest
    >({
      query: (body) => ({
        url: `admin/test-request/add-file`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctorV2/testRequestFiles"],
    }),
    myDoctorSurveyDetailFourthTabFiles: builder.query<
      string[],
      myDoctorSurveyDetailFourthTabFilesRequest
    >({
      query: (params) => ({
        url: `admin/test-request/files${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/myDoctorV2/testRequestFiles"],
    }),
    myDoctorGeneticAllTypes: builder.query<
      myDoctorGeneticAllTypesResponse,
      myDoctorGeneticAllTypesRequest
    >({
      query: (params) => ({
        url: `admin/test/all/type${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    myDoctorGetHistoryId: builder.query<number, myDoctorGetHistoryIdRequest>({
      query: (params) => ({
        url: `admin/test-request/history/file/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useMyDoctorSurveyAllQuery,
  useMyDoctorSurveyAllAdvanceFilterMutation,
  useMyDoctorGetGroupsBySurveyIdQuery,
  useMyDoctorGetGroupsStatusQuery,
  useMyDoctorSurveyDetailFirstTabQuery,
  useMyDoctorSurveyDetailSecondTabQuery,
  useMyDoctorSurveyDetailStatusGroupSecondTabQuery,
  useMyDoctorSurveyDetailQuestionSecondTabQuery,
  useMyDoctorSurveyDetailThirdTabQuery,
  useMyDoctorLabsListAdvanceFilterQuery,
  useLazyMyDoctorLabsListAdvanceFilterQuery,
  useMyDoctorLabsCreateMutation,
  useLazyGetTestGeneticQuery,
  useLazyGetDetailLabsQuery,
  useMyDoctorLabsUpdateMutation,
  useMyDoctorLabsDeActiveMutation,
  useMyDoctorSurveyDetailFourthTabQuery,
  useMyDoctorSurveyDetailFourthTabChangeStatusMutation,
  useMyDoctorSurveyDetailFourthTabTestStatusQuery,
  useMyDoctorSurveyDetailFourthTabTestStatusCodeQuery,
  useMyDoctorSurveyDetailFourthTabHistoryQuery,
  useMyDoctorSurveyDetailFourthTabAddFileMutation,
  useMyDoctorSurveyDetailFourthTabFilesQuery,
  useMyDoctorGeneticAllTypesQuery,
  useMyDoctorGetHistoryIdQuery,
} = genericApi;
