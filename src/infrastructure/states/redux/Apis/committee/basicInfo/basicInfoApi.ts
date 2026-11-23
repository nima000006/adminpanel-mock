import {
  GetAccusationDetailRequest,
  GetAccusationDetailResponse,
} from "@pages/Committee/BasicInfo/AccusationCategories/DetailsAccusationCategories/helper/components/CategoriesInfo/@types/@categoriesInfo";
import { getAccusationAndViolationDetailResponse } from "@pages/Committee/BasicInfo/AccusationDetails/AccusationAndViolationsDetailsInfo/helper/components/AccusationAndViolationsDetailsInfoContent/@types/@accusationAndViolationsDetailsInfoContent";
import { GetAggravationDetailResponse } from "@pages/Committee/BasicInfo/AggravationCause/AggravationCauseTabs/helper/components/AggravationCauseInfo/@types/@aggravationCauseInfo";
import { GetGeneralPunishmentDetailResponse } from "@pages/Committee/BasicInfo/GeneralPunishment/GeneralPunishmentTabs/helper/components/GeneralPunishmentInfo/@types/@generalPunishmentInfo";
import { GetTimingInfoDetailResponse } from "@pages/Committee/BasicInfo/TimingInfo/TimingInfoTabs/helper/components/TimingInfo/@types/@timingInfo";

import {
  CountResponse,
  FirstMaxRequest,
  GetAccusationsListResponse,
} from "../../../../../../pages/Committee/BasicInfo/Accusation/AccusationAndViolations/@types/@accusationAndViolations";
import {
  getDetailsAccusationAndViolationsRequest,
  getDetailsAccusationAndViolationsResponse,
} from "../../../../../../pages/Committee/BasicInfo/Accusation/DetailsAccusationAndViolations/@types/@detailsAccusationAndViolations";
import {
  CreateOrEditRulesAndRegulationsResponse,
  CreateOrEditViolationsRequest,
  GetAllowedPunishmentTableResponse,
} from "../../../../../../pages/Committee/BasicInfo/Accusation/NewAccusationAndViolations/@types/@newAccusationAndViolations";
import { GetAccusationCategoriesListResponse } from "../../../../../../pages/Committee/BasicInfo/AccusationCategories/AccusationCategories/@types/@accusationCategories";
import {
  CreateOrEditAccusationCategoriesRequest,
  CreateOrEditAccusationCategoriesResponse,
  GetListOfRegulationTableResponse,
} from "../../../../../../pages/Committee/BasicInfo/AccusationCategories/NewAccusationCategories/@types/@newAccusationCategories";
import { GetAccusationAndViolationsDetailsListResponse } from "../../../../../../pages/Committee/BasicInfo/AccusationDetails/AccusationAndViolationsDetails/@types/@accusationAndViolationsDetails";
import {
  CreateOrEditRecordAndEditDetailsViolationsRequest,
  CreateOrEditRecordAndEditDetailsViolationsResponse,
  GetAllAccusationListResponse,
} from "../../../../../../pages/Committee/BasicInfo/AccusationDetails/NewAccusationAndViolationsDetails/@types/@newAccusationAndViolationsDetails";
import { GetReportsAdditionalPunishmentResponse } from "../../../../../../pages/Committee/BasicInfo/AggravationCause/AggravationCauseList/@types/@aggravationCauseList";
import {
  CreateOrEditAggravationCauseRequest,
  CreateOrEditAggravationCauseResponse,
} from "../../../../../../pages/Committee/BasicInfo/AggravationCause/NewAggravationCause/@types/@newAggravationCause";
import { GetGeneralPunishmentListResponse } from "../../../../../../pages/Committee/BasicInfo/GeneralPunishment/GeneralPunishment/@types/@generalPunishment";
import {
  CreateOrEditGeneralPunishmentRequest,
  CreateOrEditGeneralPunishmentResponse,
} from "../../../../../../pages/Committee/BasicInfo/GeneralPunishment/NewGeneralPunishment/@types/@newGeneralPunishment";
import {
  CreateRulesAndRegulationsRequest,
  CreateRulesAndRegulationsResponse,
  GetRulesAndRegulationDetailResponse,
} from "../../../../../../pages/Committee/BasicInfo/RulesAndLaws/NewRulesAndLaws/@types/@newRulesAndLaws";
import { GetRulesAndRegulationsResponse } from "../../../../../../pages/Committee/BasicInfo/RulesAndLaws/RulesAndLaws/@types/@rulesAndLaws";
import {
  CreateOrEditSupplementaryPunishmentRequest,
  CreateOrEditSupplementaryPunishmentResponse,
  GetReportAdditionalPunishmentDetailResponse,
} from "../../../../../../pages/Committee/BasicInfo/SupplementaryPunishment/NewSupplementaryPunishment/@types/@newSupplementaryPunishment";
import {
  CreateOrEditTimingInfoRequest,
  CreateOrEditTimingInfoResponse,
} from "../../../../../../pages/Committee/BasicInfo/TimingInfo/NewTimingInfo/@types/@newTimingInfo";
import { GetTimingInfosListResponse } from "../../../../../../pages/Committee/BasicInfo/TimingInfo/TimingInfoList/@types/@timingInfoList";
import { countTransformResponse } from "../../../../../helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { transformCreateResponse } from "../../../../../helpers/NetworkHelpers/CreateResponseTransformer/transformCreateResponse";
import { transformObjectResponse } from "../../../../../helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "../../../../../helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { committeeApi } from "../../committeeApi";
import {
  CreateAccusationRequest,
  // GetRejectionReasonsResponse,
} from "../../models/committeeApi.model";

export const basicInfoApi = committeeApi.injectEndpoints({
  endpoints: (builder) => ({
    getRulesAndRegulations: builder.query<
      GetRulesAndRegulationsResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/Regulations?firstResult=${firstResult}&maxResults=${maxResults}`,
        method: "GET",
        // redirect: "follow",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRulesAndRegulationsResponse) => {
        return transformResponse(response);
      },
    }),
    getRulesAndRegulationsCount: builder.query<CountResponse, void>({
      query: () => ({
        url: "/data/form/Regulations/count",
        method: "GET",
        // redirect: "follow",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response) => {
        return countTransformResponse(response);
      },
    }),
    getRulesAndRegulationDetail: builder.query<
      GetRulesAndRegulationDetailResponse,
      string
    >({
      query: (id) => ({
        url: `/data/form/Regulations?maxResults=1&id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetRulesAndRegulationDetailResponse) => {
        return transformResponse(response);
      },
    }),
    //todo[ati]:not used
    // getRejectionReasons: builder.query<GetRejectionReasonsResponse, any>({
    //   query: () => ({
    //     url: "/data/table/ReasonsRejection?maxResults=1000",
    //     method: "GET",
    //   }),
    //   providesTags: ["tag/committee"],
    //   transformResponse: (response: GetRejectionReasonsResponse) => {
    //     return transformResponse(response);
    //   },
    // }),
    getReportsAdditionalPunishment: builder.query<
      GetReportsAdditionalPunishmentResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/RegistrationAndEditingAdditionalPunishments?firstResult=${firstResult}&maxResults=${maxResults}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),
    getReportsAdditionalPunishmentCount: builder.query<CountResponse, any>({
      query: () => ({
        url: "/data/form/RegistrationAndEditingAdditionalPunishments/count",
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response) => {
        return countTransformResponse(response);
      },
    }),
    getReportAdditionalPunishmentDetail: builder.query<
      GetReportAdditionalPunishmentDetailResponse,
      string
    >({
      query: (id) => ({
        url: `/data/form/AdditionalPunishments?maxResults=1&id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetReportAdditionalPunishmentDetailResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationsList: builder.query<GetAccusationsListResponse, FirstMaxRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/ListInfractions?&firstResult=${firstResult}&maxResults=${maxResults}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAccusationsListResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationsListCount: builder.query<CountResponse, any>({
      query: () => ({
        url: "/data/form/ListInfractions/count",
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),
    getAccusationDetail: builder.mutation<
      GetAccusationDetailResponse,
      GetAccusationDetailRequest
    >({
      query: (body) => ({
        url: "data/form/ListTypesViolations/get?relation=71ee6fe0ac804701af49438c2a812877",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: GetAccusationDetailResponse) => {
        return transformObjectResponse(response);
      },
    }),
    //Todo[atefeh]: continue, it does not use
    createAccusation: builder.mutation<any, CreateAccusationRequest>({
      query: (data) => ({
        url: "/form/ListTypesViolations/save",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/committee"],
    }),
    //
    getAccusationAndViolationsDetailsList: builder.query<
      GetAccusationAndViolationsDetailsListResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/ListDetailInfractions?&firstResult=${firstResult}&maxResults=${maxResults}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAccusationAndViolationsDetailsListResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationAndViolationsDetailsListCount: builder.query<CountResponse, any>({
      query: () => ({
        url: "/data/form/ListDetailInfractions/count",
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),
    getGeneralPunishmentList: builder.query<
      GetGeneralPunishmentListResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/RecordAndEditPunishments?&firstResult=${firstResult}&maxResults=${maxResults}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetGeneralPunishmentListResponse) => {
        return transformResponse(response);
      },
    }),
    getGeneralPunishmentCount: builder.query<CountResponse, any>({
      query: () => ({
        url: "/data/form/RecordAndEditPunishments/count",
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),
    getGeneralPunishmentDetail: builder.query<GetGeneralPunishmentDetailResponse, string>(
      {
        query: (id) => ({
          url: `/data/form/ListDefinitionPunishments?maxResults=1&id_EQ=${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        providesTags: ["tag/committee"],
        transformResponse: (response: GetGeneralPunishmentDetailResponse) => {
          return transformResponse(response);
        },
      }
    ),
    createRulesAndRegulations: builder.mutation<
      CreateRulesAndRegulationsResponse,
      CreateRulesAndRegulationsRequest
    >({
      query: (data) => ({
        url: "/data/form/Regulations/b0816ad9188949ed8b6e24b430f7adcb/save",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return transformCreateResponse(response);
      },
    }),
    getAggravationCause: builder.query<
      GetReportsAdditionalPunishmentResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/AggravatingFactors?firstResult=${firstResult}&maxResults=${maxResults}`,
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),
    getAggravationCauseCount: builder.query<CountResponse, any>({
      query: () => ({
        url: "/data/form/AggravatingFactors/count",
        method: "GET",
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response) => {
        return countTransformResponse(response);
      },
    }),
    getAggravationCauseDetail: builder.query<GetAggravationDetailResponse, string>({
      query: (id) => ({
        url: `/data/form/AggravatingFactors?maxResults=1&id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetAggravationDetailResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationCategoriesList: builder.query<
      GetAccusationCategoriesListResponse,
      FirstMaxRequest
    >({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/table/InfractionsType?firstResult=${firstResult}&maxResults=${maxResults}`,
        method: "GET",
      }),
      transformResponse: (response: GetAccusationCategoriesListResponse) => {
        return transformResponse(response);
      },
    }),
    getAccusationCategoriesListCount: builder.query<CountResponse, any>({
      query: () => ({
        url: "/data/table/InfractionsType/count",
        method: "GET",
      }),
      transformResponse: (response: GetAccusationCategoriesListResponse) => {
        return countTransformResponse(response);
      },
    }),
    getTimingInfosList: builder.query<GetTimingInfosListResponse, FirstMaxRequest>({
      query: ({ firstResult, maxResults }) => ({
        url: `/data/form/PeriodTime?firstResult=${firstResult}&maxResults=${maxResults}`,
        method: "GET",
      }),
      transformResponse: (response: GetTimingInfosListResponse) => {
        return transformResponse(response);
      },
    }),
    getTimingInfosListCount: builder.query<CountResponse, any>({
      query: () => ({
        url: "/data/form/PeriodTime/count",
        method: "GET",
      }),
      transformResponse: (response: GetTimingInfosListResponse) => {
        return countTransformResponse(response);
      },
    }),
    getTimingInfoDetail: builder.query<GetTimingInfoDetailResponse, string>({
      query: (id) => ({
        url: `/data/form/PeriodTime?maxResults=1&id_EQ=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/committee"],
      transformResponse: (response: GetTimingInfoDetailResponse) => {
        return transformResponse(response);
      },
    }),
    getDetailsAccusationAndViolations: builder.mutation<
      getDetailsAccusationAndViolationsResponse,
      getDetailsAccusationAndViolationsRequest
    >({
      query: (body) => ({
        url: "/data/form/RecordAndEditViolations/get?relation=b53049fdb92641f399298d604e9e0cc9",
        method: "POST",
        body,
      }),
      transformResponse(baseQueryReturnValue: getDetailsAccusationAndViolationsResponse) {
        return transformObjectResponse(baseQueryReturnValue);
      },
    }),
    getAllowedPunishmentTable: builder.query<GetAllowedPunishmentTableResponse, any>({
      query: () => ({
        url: "/data/form/TablePunishments?maxResults=500&firstResult=0",
        method: "GET",
      }),
      transformResponse: (response: GetAllowedPunishmentTableResponse) => {
        return transformResponse(response);
      },
    }),
    getAllowedSupplementaryPunishmentTable: builder.query<
      GetAllowedPunishmentTableResponse,
      any
    >({
      query: () => ({
        url: "/data/form/TableSupplementaryPunishments?maxResults=500&firstResult=0",
        method: "GET",
      }),
      transformResponse: (response: GetAllowedPunishmentTableResponse) => {
        return transformResponse(response);
      },
    }),
    getListOfRegulationTable: builder.query<GetListOfRegulationTableResponse, any>({
      query: () => ({
        url: "/data/form/RegulationsTable?maxResults=100&firstResult=0",
        method: "GET",
      }),
      transformResponse: (response: GetListOfRegulationTableResponse) => {
        return transformResponse(response);
      },
    }),
    getListTableTypesViolations: builder.query<GetListOfRegulationTableResponse, any>({
      query: () => ({
        url: "/data/form/TableTypesViolations?maxResults=50&firstResult=0",
        method: "GET",
      }),
      transformResponse: (response: GetListOfRegulationTableResponse) => {
        return transformResponse(response);
      },
    }),
    createOrEditViolations: builder.mutation<
      CreateOrEditRulesAndRegulationsResponse,
      CreateOrEditViolationsRequest
    >({
      query: (data) => ({
        url: "data/form/RecordAndEditViolations/b53049fdb92641f399298d604e9e0cc9/save",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return transformObjectResponse(response);
      },
    }),
    getAccusationAndViolationDetail: builder.mutation<
      getAccusationAndViolationDetailResponse,
      getDetailsAccusationAndViolationsRequest
    >({
      query: (body) => ({
        url: "/data/form/RecordAndEditDetailsViolations/get?relation=52307b0d1a92452fac89f0a3fe9ad3c3",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return transformObjectResponse(response);
      },
    }),
    createOrEditRecordAndEditDetailsViolations: builder.mutation<
      CreateOrEditRecordAndEditDetailsViolationsResponse,
      CreateOrEditRecordAndEditDetailsViolationsRequest
    >({
      query: (body) => ({
        url: "/data/form/RecordAndEditDetailsViolations/52307b0d1a92452fac89f0a3fe9ad3c3/save",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return transformCreateResponse(response);
      },
    }),
    getAllAccusationList: builder.query<GetAllAccusationListResponse, any>({
      query: () => ({
        url: "/data/form/ListInfractions?maxResults=100&firstResult=0",
        method: "GET",
      }),
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),
    createOrEditTimingInfo: builder.mutation<
      CreateOrEditTimingInfoResponse,
      CreateOrEditTimingInfoRequest
    >({
      query: (body) => ({
        url: "data/form/PeriodTime/35082389fcff40f8802f6b3555a55d4c/save",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return transformCreateResponse(response);
      },
    }),
    createOrEditAccusationCategories: builder.mutation<
      CreateOrEditAccusationCategoriesResponse,
      CreateOrEditAccusationCategoriesRequest
    >({
      query: (body) => ({
        url: "/data/form/ListTypesViolations/71ee6fe0ac804701af49438c2a812877/save",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return transformCreateResponse(response);
      },
    }),
    createOrEditSupplementaryPunishment: builder.mutation<
      CreateOrEditSupplementaryPunishmentResponse,
      CreateOrEditSupplementaryPunishmentRequest
    >({
      query: (body) => ({
        url: "/data/form/AdditionalPunishments/a6d658790079440b944e94d195b2e79f/save",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return transformCreateResponse(response);
      },
    }),
    createOrEditGeneralPunishment: builder.mutation<
      CreateOrEditGeneralPunishmentResponse,
      CreateOrEditGeneralPunishmentRequest
    >({
      query: (body) => ({
        url: "/data/form/ListDefinitionPunishments/b8703f3fdda8488ab27a80b0a7d6afc9/save",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return transformCreateResponse(response);
      },
    }),
    createOrEditAggravationCause: builder.mutation<
      CreateOrEditAggravationCauseResponse,
      CreateOrEditAggravationCauseRequest
    >({
      query: (body) => ({
        url: "/data/form/AggravatingFactors/4539ebc818d54f82b7fb134e68ed2d6b/save",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return transformCreateResponse(response);
      },
    }),
  }),
});
export const {
  useLazyGetRulesAndRegulationsQuery,
  useGetRulesAndRegulationsCountQuery,
  useLazyGetRulesAndRegulationDetailQuery,
  // useLazyGetRejectionReasonsQuery,
  useLazyGetReportsAdditionalPunishmentQuery,
  useLazyGetReportsAdditionalPunishmentCountQuery,
  useLazyGetReportAdditionalPunishmentDetailQuery,
  useLazyGetAccusationsListQuery,
  useGetAccusationsListCountQuery,
  useLazyGetAccusationAndViolationsDetailsListQuery,
  useGetAccusationAndViolationsDetailsListCountQuery,
  useLazyGetGeneralPunishmentListQuery,
  useGetGeneralPunishmentCountQuery,
  useLazyGetGeneralPunishmentDetailQuery,
  useCreateRulesAndRegulationsMutation,
  useLazyGetAggravationCauseQuery,
  useGetAggravationCauseCountQuery,
  useLazyGetAggravationCauseDetailQuery,
  useLazyGetAccusationCategoriesListQuery,
  useGetAccusationCategoriesListCountQuery,
  useLazyGetTimingInfosListQuery,
  useLazyGetTimingInfosListCountQuery,
  useLazyGetTimingInfoDetailQuery,
  useGetDetailsAccusationAndViolationsMutation,
  useGetAllowedPunishmentTableQuery,
  useGetListOfRegulationTableQuery,
  useGetListTableTypesViolationsQuery,
  useGetAllowedSupplementaryPunishmentTableQuery,
  useCreateOrEditViolationsMutation,
  useGetAccusationAndViolationDetailMutation,
  useCreateOrEditRecordAndEditDetailsViolationsMutation,
  useGetAllAccusationListQuery,
  useCreateOrEditTimingInfoMutation,
  useCreateOrEditAccusationCategoriesMutation,
  useCreateOrEditSupplementaryPunishmentMutation,
  useCreateOrEditGeneralPunishmentMutation,
  useCreateOrEditAggravationCauseMutation,
  useGetAccusationDetailMutation,
} = basicInfoApi;
