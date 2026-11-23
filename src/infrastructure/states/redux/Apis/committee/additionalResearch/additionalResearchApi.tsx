import {
  GetAdditionalResearchEducationListRequest,
  GetAdditionalResearchEducationListResponse,
} from "@pages/Committee/AdditionalResearch/EducationChancellor/EducationChancellorListTabs/helper/components/EducationChancellorListTableAccused/@types/@educationChancellorListTableAccused";
import { CountResponse } from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";

import {
  GetAdditionalResearchWardingListRequest,
  GetAdditionalResearchWardingListResponse,
} from "../../../../../../components/Committee/Committee/AdditionalResearch/ResearchChancellor/ResearchChancellorListTableAccused/@types/@researchChancellorListTableAccused";
import {
  GetAdditionalStudentListRequest,
  GetAdditionalStudentListResponse,
} from "../../../../../../components/Committee/Committee/AdditionalResearch/StudentChancellor/StudentChancellorListTableAccused/@types/@studentChancellorListTableAccused";
import { countTransformResponse } from "../../../../../helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { transformResponse } from "../../../../../helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { committeeApi } from "../../committeeApi";

export const additionalResearchApi = committeeApi.injectEndpoints({
  endpoints: (builder) => ({
    //!warding
    getAdditionalResearchWardingList: builder.query<
      GetAdditionalResearchWardingListResponse,
      GetAdditionalResearchWardingListRequest
    >({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/AdditionalResearchFiles?maxResults=${maxResults}&firstResult=${firstResult}${`&AssociationSecurityStatus_id_IN=${type}`}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAdditionalResearchWardingListResponse) => {
        return transformResponse(response);
      },
    }),
    getAdditionalResearchWardingCount: builder.query<
      CountResponse,
      { type: 1 | 2 | 3 | 4 | 5 | 6 | "1,2,3,4,5,6" }
    >({
      query: ({ type }) => ({
        url: `/data/form/AdditionalResearchFiles/count${`?AssociationSecurityStatus_id_IN=${type}`}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),
    //! research chancellor
    getResearchChancellorList: builder.query<
      GetAdditionalResearchWardingListResponse,
      GetAdditionalResearchWardingListRequest
    >({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/AdditionalResearchFiles?maxResults=${maxResults}&firstResult=${firstResult}${`&AssociationResearchAssistantStatus_id_IN=${type}`}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAdditionalResearchWardingListResponse) => {
        return transformResponse(response);
      },
    }),
    getResearchChancellorCount: builder.query<
      CountResponse,
      { type: 1 | 2 | 3 | 4 | 5 | 6 | "1,2,3,4,5,6" }
    >({
      query: ({ type }) => ({
        url: `/data/form/AdditionalResearchFiles/count${`?AssociationResearchAssistantStatus_id_IN=${type}`}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),
    //! student chancellor
    getStudentChancellorList: builder.query<
      GetAdditionalStudentListResponse,
      GetAdditionalStudentListRequest
    >({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/AdditionalResearchFiles?maxResults=${maxResults}&firstResult=${firstResult}&AssociationStudentViceStatus_id_IN=${type}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAdditionalStudentListResponse) => {
        return transformResponse(response);
      },
    }),
    getStudentChancellorCount: builder.query<
      CountResponse,
      { type: 1 | 2 | 3 | 4 | 5 | 6 | "1,2,3,4,5,6" }
    >({
      query: ({ type }) => ({
        url: `/data/form/AdditionalResearchFiles/count?AssociationStudentViceStatus_id_IN=${type}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),
    //! education chancellor
    getAdditionalResearchEducationList: builder.query<
      GetAdditionalResearchEducationListResponse,
      GetAdditionalResearchEducationListRequest
    >({
      query: ({ firstResult, maxResults, type }) => ({
        url: `/data/form/AdditionalResearchFiles?maxResults=${maxResults}&firstResult=${firstResult}${`&AssociationEducationalAssistantStatus_id_IN=${type}`}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAdditionalResearchEducationListResponse) => {
        return transformResponse(response);
      },
    }),
    getAdditionalResearchEducationCount: builder.query<
      CountResponse,
      { type: 1 | 2 | 3 | 4 | 5 | 6 | "1,2,3,4,5,6" }
    >({
      query: ({ type }) => ({
        url: `/data/form/AdditionalResearchFiles/count?AssociationEducationalAssistantStatus_id_IN=${type}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),
  }),
});
export const {
  useLazyGetAdditionalResearchWardingListQuery,
  useLazyGetAdditionalResearchWardingCountQuery,
  useLazyGetResearchChancellorListQuery,
  useLazyGetResearchChancellorCountQuery,
  useLazyGetStudentChancellorListQuery,
  useLazyGetStudentChancellorCountQuery,
  useLazyGetAdditionalResearchEducationListQuery,
  useLazyGetAdditionalResearchEducationCountQuery,
} = additionalResearchApi;
