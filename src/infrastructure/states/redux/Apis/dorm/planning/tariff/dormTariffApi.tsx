import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { countTransformResponse } from "@infra/helpers/NetworkHelpers/CountResponseTransformer/CountResponseTransformer";
import { noContentResponseTransformer } from "@infra/helpers/NetworkHelpers/NoContentResponseTransformer/NoContentResponseTransformer";
import { transformObjectResponse } from "@infra/helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "@infra/helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { DORM_TAGS, invalidatesList } from "@infra/states/redux/config";
import {
  CountResponse,
  GetPricingStepCountRequest,
} from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";
import {
  GetTariffBasicInfoStepRequest,
  GetTariffBasicInfoStepResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/BasicInfoStep/@types/@basicInfoStepPropsType";
import {
  GetCreatePricingStepRequest,
  GetCreatePricingStepResponse,
  GetPricingStepRequest,
  GetPricingStepResponse,
  SendCreateTariffRequest,
  SendCreateTariffResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/components/TariffSteps/PricingStep/@types/@pricingStep";
import {
  GetAdmissionDrawerDetailBaseInfoRequest,
  GetAdmissionDrawerDetailBaseInfoResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/Drawers/ActiveAdmissionScheduleDrawerContent/@types/@activeAdmissionScheduleDrawerContent";
import {
  GetRequestDetailRequest,
  GetRequestDetailResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/helper/RequestDetailSection/@types/requestDetailSection";
import {
  getTariffAdmissionScheduleTabRequest,
  getTariffAdmissionScheduleTabResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailActiveTab/helpers/AdmissionScheduleTab/@types/@admissionScheduleTab";
import {
  GetTariffBasicInfoCopyDetailRequest,
  GetTariffBasicInfoCopyDetailResponse,
} from "@pages/Dorm/Planning/Tariff/TariffDetail/TariffDetailActiveTab/helpers/TariffBasicInfoTab/@types/@tariffBasicInfoTab";
import {
  CountDormResponse,
  GetTariffAdmissionScheduleTabCountRequest,
} from "@pages/Dorm/Planning/Tariff/TariffList/helper/components/ActiveTab/@types/@activeTab";

import { dormApi } from "../../../dormApi";

export const dormTariffApi = dormApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== TARIFF BASIC INFO ====================
    getTariffBasicInfoCopyDetail: builder.query<
      GetTariffBasicInfoCopyDetailResponse,
      GetTariffBasicInfoCopyDetailRequest
    >({
      query: (params) => {
        return {
          url: `/data/form/TariffViewBasicInformation${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.TARIFF, id: "BASIC_INFO" }],
      transformResponse: (response) => transformResponse(response),
    }),

    getTariffBasicInfoStep: builder.mutation<
      GetTariffBasicInfoStepResponse,
      GetTariffBasicInfoStepRequest
    >({
      query: ({ params, body }) => ({
        url: `/data/form/TariffViewBasicInformation/get${createQueryString(params)}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetTariffBasicInfoStepResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== PRICING ====================
    getPricingStep: builder.query<GetPricingStepResponse, GetPricingStepRequest>({
      query: (params) => {
        return {
          url: `/data/form/TaiffViewrPricing${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.PRICING, id: "LIST" }],
      transformResponse: (response) => transformResponse(response),
    }),

    getPricingStepCount: builder.query<CountResponse, GetPricingStepCountRequest>({
      query: (params) => {
        return {
          url: `/data/form/TaiffViewrPricing/count${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response: CountResponse) => countTransformResponse(response),
      providesTags: [{ type: DORM_TAGS.PRICING, id: "COUNT" }],
    }),

    getCreatePricingStep: builder.query<
      GetCreatePricingStepResponse,
      GetCreatePricingStepRequest
    >({
      query: (params) => {
        return {
          url: `/data/report/RoomTypesForTariff?${createQueryString(params)}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.PRICING, id: "CREATE" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== REQUEST DETAIL ====================
    getRequestDetail: builder.query<GetRequestDetailResponse, GetRequestDetailRequest>({
      query: (params) => ({
        url: `/data/form/ViewTariffRequestInformation${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.TARIFF, id: "REQUEST_DETAIL" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    // ==================== ADMISSION SCHEDULE ====================
    getTariffAdmissionScheduleTab: builder.query<
      getTariffAdmissionScheduleTabResponse,
      getTariffAdmissionScheduleTabRequest
    >({
      query: (params) => {
        return {
          url: `/data/form/DeliverPlanForTariff${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response) => transformResponse(response),
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "SCHEDULE_LIST" }],
    }),

    getTariffAdmissionScheduleTabCount: builder.query<
      CountDormResponse,
      GetTariffAdmissionScheduleTabCountRequest
    >({
      query: (params) => {
        return {
          url: `/data/form/DeliverPlanForTariff/count${createQueryString(params)}`,
          method: "GET",
        };
      },
      transformResponse: (response: CountDormResponse) =>
        countTransformResponse(response),
      providesTags: [{ type: DORM_TAGS.ADMISSION, id: "SCHEDULE_COUNT" }],
    }),

    getAdmissionDrawerDetailBaseInfo: builder.mutation<
      GetAdmissionDrawerDetailBaseInfoResponse,
      GetAdmissionDrawerDetailBaseInfoRequest
    >({
      query: ({ body, params }) => ({
        url: `/data/form/ViewDeliverPlan/get${createQueryString(params)}`,
        method: "POST",
        body,
      }),
      // Note: This is a mutation used for fetching - consider converting to query
      transformResponse: (response: GetAdmissionDrawerDetailBaseInfoResponse) => {
        return transformObjectResponse(response);
      },
    }),

    // ==================== CREATE TARIFF ====================
    sendCreateTariff: builder.mutation<SendCreateTariffResponse, SendCreateTariffRequest>(
      {
        query: (body) => ({
          url: "/data/form/CreatePriceList/start-process/CreatingPriceList",
          method: "POST",
          body,
        }),
        invalidatesTags: [
          ...invalidatesList(DORM_TAGS.TARIFF),
          ...invalidatesList(DORM_TAGS.PRICING),
          ...invalidatesList(DORM_TAGS.WORKSPACE_TARIFF),
        ],
        transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
          return noContentResponseTransformer(meta);
        },
      }
    ),
  }),
});
export const {
  useLazyGetTariffBasicInfoCopyDetailQuery,
  useGetTariffBasicInfoStepMutation,
  useLazyGetPricingStepQuery,
  useLazyGetPricingStepCountQuery,
  useLazyGetCreatePricingStepQuery,
  useLazyGetRequestDetailQuery,
  useLazyGetTariffAdmissionScheduleTabQuery,
  useLazyGetTariffAdmissionScheduleTabCountQuery,
  useGetAdmissionDrawerDetailBaseInfoMutation,
  useSendCreateTariffMutation,
} = dormTariffApi;
