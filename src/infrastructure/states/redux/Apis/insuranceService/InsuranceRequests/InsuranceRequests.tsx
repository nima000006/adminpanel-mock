import { GetFinancialStatusResponse } from "@pages/Insurance/InsuranceRequests/InsuranceRequestsDetail/helper/components/RequestsFinancialStatus/@types/requestsFinancialStatus";
import { GetPaymentDetailsDrawerDataResponse } from "@pages/Insurance/InsuranceRequests/InsuranceRequestsDetail/helper/components/RequestsFinancialStatus/InsuranceDetailThirdTabComponents/Drawer/@types/@drawer";
import { GetInsuranceInformationDetailsWithInsuredIdResponse } from "@pages/Insurance/InsuranceRequests/InsuranceRequestsDetail/helper/components/RequestsInsuranceDetail/@types/@requestsInsuranceDetail";
import {
  GetInsuredDetailResponse,
  GetInsuredRoleListResponse,
} from "@pages/Insurance/InsuranceRequests/InsuranceRequestsDetail/helper/components/RequestsInsuredDetail/@types/requestsInsuredDetail";

import {
  getAllInsuranceRequestsListRequest,
  getInsuranceRequestsListWithStatusRequest,
  getInsuranceRequestsListWithStatusResponse,
} from "../../../../../../pages/Insurance/InsuranceRequests/InsuranceRequestsList/@types/@InsuranceRequestsList";
import { insuranceApi } from "../../insurance";

export const insuranceRequestApi = insuranceApi.injectEndpoints({
  endpoints: (builder) => ({
    getInsuranceRequestsListWithStatus: builder.mutation<
      getInsuranceRequestsListWithStatusResponse,
      getInsuranceRequestsListWithStatusRequest
    >({
      query: (body) => ({
        url: "/admin/getInsuredInsuranceInformationListWithStatus",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["tag/insurance", "requests"],
    }),
    getInsuranceInformationDetailsWithInsuredId: builder.query<
      GetInsuranceInformationDetailsWithInsuredIdResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/getInsuredInsuranceDetailListWithInsuredInsuranceInformationIdForAdmin?insuranceInformationId=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/insurance", "requests"],
    }),
    getAllInsuranceRequestsList: builder.mutation<
      getInsuranceRequestsListWithStatusResponse,
      getAllInsuranceRequestsListRequest
    >({
      query: (body) => ({
        url: "/admin/getAllInsuredInsuranceInformation",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["tag/insurance", "requests"],
    }),
    getFinancialStatus: builder.query<GetFinancialStatusResponse, number>({
      query: (id) => ({
        url: `/admin/financialStatus?insuredInsuranceInformationId=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getPaymentDetailsDrawerData: builder.query<
      GetPaymentDetailsDrawerDataResponse,
      number
    >({
      query: (id) => ({
        url: `/admin/installmentDetail?instalmentId=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getInsuredDetail: builder.query<GetInsuredDetailResponse, number>({
      query: (id) => ({
        url: `/admin/getInsuredDetailWithInsuredInformationIdForAdmin?insuredInformationId=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getInsuredRoleList: builder.query<GetInsuredRoleListResponse, string>({
      query: (id) => ({
        url: `/admin/getLastInsuredInsuranceWithLabelListForAdmin?InsuranceInformationId=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});
export const {
  useGetInsuranceRequestsListWithStatusMutation,
  useGetAllInsuranceRequestsListMutation,
  useLazyGetInsuranceInformationDetailsWithInsuredIdQuery,
  useLazyGetFinancialStatusQuery,
  useLazyGetPaymentDetailsDrawerDataQuery,
  useLazyGetInsuredDetailQuery,
  useLazyGetInsuredRoleListQuery,
} = insuranceRequestApi;
