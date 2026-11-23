import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

import { countTransformResponse } from "@infra/helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { noContentResponseTransformer } from "@infra/helpers/NetworkHelpers/NoContentResponseTransformer/NoContentResponseTransformer";
import { transformObjectResponse } from "@infra/helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "@infra/helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { DORM_TAGS, invalidatesList } from "@infra/states/redux/config";
import { CountResponse } from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";
import {
  GetAdmissionDetailBaseInfoRequest,
  GetAdmissionDetailBaseInfoResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";
import { GetRequestDetailsResponse } from "@pages/Dorm/Planning/Admission/AdmissionDetail/helpers/RequestInfo/@types/@admissionDetailRequestInfo";
import {
  GetAbilityDisableDeliveryPlanResponse,
  GetApplicationReviewDeadlineResponse,
  GetPaymentDeadlineResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/helpers/AdmissionModifyBasicInfoStep/@types/@admissionModifyBasicInfoStep";
import {
  GetApplicableTariffsCountRequest,
  GetApplicableTariffsRequest,
  GetApplicableTariffsResponse,
  sendCancellationDeliveryPlanRequest,
  sendCancellationDeliveryPlanResponse,
  SendCreateAdmissionRequest,
  SendCreateAdmissionResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/helpers/AdmissionModifyTariffInfoStep/@types/@admissionModifyTariffInfoStep";

import { dormApi } from "../../../dormApi";

export const dormBaseApi = dormApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== ADMISSION DETAIL ====================
    getAdmissionDetailBaseInfo: builder.mutation<
      GetAdmissionDetailBaseInfoResponse,
      GetAdmissionDetailBaseInfoRequest
    >({
      query: (body) => ({
        url: "/data/form/ViewDeliverPlan/get?relation=83184a68c448431983520dd0af80b29c",
        method: "POST",
        body,
      }),
      transformResponse: (response: GetAdmissionDetailBaseInfoResponse) => {
        return transformObjectResponse(response);
      },
      // Note: This is a mutation used for fetching - consider converting to query
    }),

    getRequestDetails: builder.query<GetRequestDetailsResponse, number>({
      query: (id) => ({
        url: `/data/form/ViewDeliveryPlanRequestInformation?maxResults=2000&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: DORM_TAGS.ADMISSION, id }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== APPLICABLE TARIFFS ====================
    getApplicableTariffs: builder.query<
      GetApplicableTariffsResponse,
      GetApplicableTariffsRequest
    >({
      query: ({ firstResult, maxResults, dormitoryId, schedulingId }) => ({
        url: `/data/form/ApplicableTariffs?maxResults=${maxResults}&firstResult=${firstResult}&dormitoryId=${dormitoryId}&schedulingId=${schedulingId}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.TARIFF, id: "APPLICABLE_LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getApplicableTariffsCount: builder.query<
      CountResponse,
      GetApplicableTariffsCountRequest
    >({
      query: ({ dormitoryId, schedulingId }) => ({
        url: `/data/form/ApplicableTariffs/count?dormitoryId=${dormitoryId}&schedulingId=${schedulingId}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.TARIFF, id: "APPLICABLE_COUNT" }],
      transformResponse: (response: CountResponse) => {
        return countTransformResponse(response);
      },
    }),

    // ==================== DEADLINES ====================
    getPaymentDeadline: builder.query<GetPaymentDeadlineResponse, void>({
      query: () => ({
        url: "/data/form/PaymentDeadline?maxResults=2000&firstResult=0",
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "PAYMENT_DEADLINE" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getApplicationReviewDeadline: builder.query<
      GetApplicationReviewDeadlineResponse,
      void
    >({
      query: () => ({
        url: "/data/form/RequestDeadline?maxResults=2000&firstResult=0",
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "REVIEW_DEADLINE" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    getAbilityDisableDeliveryPlan: builder.query<
      GetAbilityDisableDeliveryPlanResponse,
      number
    >({
      query: (id) => ({
        url: `/data/form/AbilityDisableDeliveryPlan?maxResults=2000&firstResult=0&deliverPlanId_EQ=${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: DORM_TAGS.ADMISSION, id: `DISABLE_${id}` },
      ],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== CREATE/CANCEL ADMISSION ====================
    sendCreateAdmission: builder.mutation<
      SendCreateAdmissionResponse,
      SendCreateAdmissionRequest
    >({
      query: (body) => ({
        url: "/data/form/CreateDeliverPlan/start-process/DevelopmentDeliveryPlan",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.ADMISSION),
        ...invalidatesList(DORM_TAGS.WORKSPACE_ADMISSION),
      ],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),

    sendCancellationDeliveryPlan: builder.mutation<
      sendCancellationDeliveryPlanResponse,
      sendCancellationDeliveryPlanRequest
    >({
      query: (body) => ({
        url: "/data/form/DisableDeliverPlan/start-process/DeactivateDeliveryPla",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        ...invalidatesList(DORM_TAGS.ADMISSION),
        ...invalidatesList(DORM_TAGS.WORKSPACE_ADMISSION),
      ],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),
  }),
});

export const {
  useGetAdmissionDetailBaseInfoMutation,
  useLazyGetRequestDetailsQuery,
  useLazyGetAbilityDisableDeliveryPlanQuery,
  useLazyGetApplicableTariffsQuery,
  useLazyGetApplicableTariffsCountQuery,
  useLazyGetPaymentDeadlineQuery,
  useLazyGetApplicationReviewDeadlineQuery,
  useSendCreateAdmissionMutation,
  useSendCancellationDeliveryPlanMutation,
} = dormBaseApi;
