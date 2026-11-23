// api/businessRequestApis.ts
import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  AcceptBusinessRequestParams,
  AcceptBusinessRequestResponse,
  rejectOrReturnBusinessRequestParams,
  rejectOrReturnBusinessResponse,
} from "@pages/Business/BusinessRequests/BusinessRequestsDetail/helper/components/tabs/BusinessRequestsDetailAnswerRequestInfo/@types/@actionType";
import {
  BusinessRequestBranchInformationDetailsParams,
  BusinessRequestBranchInformationDetailsResponse,
} from "@pages/Business/BusinessRequests/BusinessRequestsDetail/helper/components/tabs/BusinessRequestsDetailBranchInfo/@types/@businessRequestsDetailBranchInfo";
import {
  BusinessRequestInformationDetailsParams,
  BusinessRequestInformationDetailsResponse,
} from "@pages/Business/BusinessRequests/BusinessRequestsDetail/helper/components/tabs/BusinessRequestsDetailBusinessInfo/@types/@businessRequestsDetailBusinessInfoTypes";
import {
  BusinessRequestSpecificationDetailsParams,
  BusinessRequestSpecificationDetailsResponse,
} from "@pages/Business/BusinessRequests/BusinessRequestsDetail/helper/components/tabs/BusinessRequestsDetailInfo/@types/@businessRequestsDetailInfo";
import {
  BusinessRequestAdminInformationDetailsResponse,
  GetBusinessRequestAdminInformationDetailsParams,
} from "@pages/Business/BusinessRequests/BusinessRequestsDetail/helper/components/tabs/BusinessRequestsDetailKeyIdentitiesInfo/helper/components/tabs/BusinessRequestsDetailAdmin/@types/@businessRequestsDetailAdmin";
import {
  BusinessRequestOwnerInformationDetailsResponse,
  GetBusinessRequestOwnerInformationDetailsParams,
} from "@pages/Business/BusinessRequests/BusinessRequestsDetail/helper/components/tabs/BusinessRequestsDetailKeyIdentitiesInfo/helper/components/tabs/BusinessRequestsDetailSeniorManager/@types/@businessRequestsDetailSeniorManager";
import {
  BusinessRequestTopChartParams,
  BusinessRequestTopChartResponse,
} from "@pages/Business/BusinessRequests/BusinessRequestsDetail/helper/components/tabs/BusinessRequestsDetailTopChartInfo/@types/@topChartUnit ";
import {
  GetAllBusinessRequestsParams,
  GetAllBusinessRequestsResponse,
} from "@pages/Business/BusinessRequests/BusinessRequestsList/@types/@businessRequestListType";

import { businessApi } from "../../businessApi";

export const businessRequestApis = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinessRequests: builder.query<
      GetAllBusinessRequestsResponse,
      GetAllBusinessRequestsParams
    >({
      query: ({ pageNumber, pageSize }) => ({
        url: `/admin/getAllBusinessRequests?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),

    getBusinessRequestAdminInformationDetails: builder.query<
      BusinessRequestAdminInformationDetailsResponse,
      GetBusinessRequestAdminInformationDetailsParams
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getBusinessRequestAdminInformationDetails/${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    getBusinessRequestOwnerInformationDetails: builder.query<
      BusinessRequestOwnerInformationDetailsResponse,
      GetBusinessRequestOwnerInformationDetailsParams
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getBusinessRequestOwnerInformationDetails/${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    getBusinessRequestInformationDetails: builder.query<
      BusinessRequestInformationDetailsResponse,
      BusinessRequestInformationDetailsParams
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getBusinessRequestInformationDetails/${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    getCentralBranchBusinessRequestInformationDetails: builder.query<
      BusinessRequestBranchInformationDetailsResponse,
      BusinessRequestBranchInformationDetailsParams
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getCentralBranchBusinessRequestInformationDetails?businessTempHistoryId=${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    getGeneralBusinessRequestSpecificationDetails: builder.query<
      BusinessRequestSpecificationDetailsResponse,
      BusinessRequestSpecificationDetailsParams
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getGeneralBusinessRequestSpecificationDetails/${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    getGeneralBusinessTopChartDetails: builder.query<
      BusinessRequestTopChartResponse,
      BusinessRequestTopChartParams
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getTopChartFiles/${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    acceptBusinessRequest: builder.mutation<
      AcceptBusinessRequestResponse,
      AcceptBusinessRequestParams
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/businessAcceptRequest/${businessTempHistoryId}`,
        method: "PUT",
      }),
    }),
    rejectOrReturnBusinessRequest: builder.mutation<
      rejectOrReturnBusinessResponse,
      rejectOrReturnBusinessRequestParams
    >({
      query: ({ businessTempHistoryId, statusId }) => ({
        url: `/admin/businessRejectOrReturnRequest/${businessTempHistoryId}/${statusId}`,
        method: "PUT",
      }),
    }),
    getActiveBusinessList: builder.query<{ id: number; title: string }[], void>({
      query: () => ({
        url: "/business/active/all",
        method: "GET",
      }),
    }),
    getBranchListByProvinceCityBusiness: builder.query<
      { id: number; title: string }[],
      { businessIds?: string | number[]; provinceIds?: string; cityIds?: string } | void
    >({
      query: (params) => ({
        url: `branch/search${params ? createQueryString(params) : ""}`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
  }),
});

export const {
  useGetAllBusinessRequestsQuery,
  useGetBusinessRequestAdminInformationDetailsQuery,
  useGetBusinessRequestOwnerInformationDetailsQuery,
  useGetBusinessRequestInformationDetailsQuery,
  useGetCentralBranchBusinessRequestInformationDetailsQuery,
  useGetGeneralBusinessRequestSpecificationDetailsQuery,
  useGetGeneralBusinessTopChartDetailsQuery,
  useAcceptBusinessRequestMutation,
  useRejectOrReturnBusinessRequestMutation,
  useLazyGetActiveBusinessListQuery,
  useLazyGetBranchListByProvinceCityBusinessQuery,
} = businessRequestApis;
