import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  ReportListResponse,
  ReportDetailRequest,
  ReportDetailResponse,
  ReportExportRequest,
  ReportExportResponse,
  ReportListRequest,
} from "@pages/Reports/myReport/@types/@myReportTypes";
import {
  MyReportDetailsRequest,
  MyReportDetailsResponse,
  MyReportMainServiceDetailRequest,
  MyReportMainServiceDetailResponse,
  MyReportParamDetailRequest,
  MyReportParamDetailResponse,
} from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";

import { appVersion } from "../appVersion";

export const myReportApis = appVersion.injectEndpoints({
  endpoints: (builder) => ({
    myReportAll: builder.query<ReportListResponse, ReportListRequest>({
      query: (params) => ({
        url: `/admin/dashboard/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    myReportDetail: builder.mutation<ReportDetailResponse, ReportDetailRequest>({
      query: (body) => ({
        url: "/admin/dashboard/detail",
        method: "POST",
        body,
      }),
    }),
    myReportExport: builder.mutation<ReportExportResponse, ReportExportRequest>({
      query: (reportId) => ({
        url: `/admin/dashboard/report/export?reportId=${reportId}`,
        method: "POST",
        responseHandler: (response) => response.blob(),
      }),
    }),
    myReportMainServiceDetail: builder.mutation<
      MyReportMainServiceDetailResponse,
      MyReportMainServiceDetailRequest
    >({
      query: (body) => ({
        url: "/admin/dashboard/main-service/detail",
        method: "POST",
        body,
      }),
    }),
    myReportParamDetail: builder.mutation<
      MyReportParamDetailResponse,
      MyReportParamDetailRequest
    >({
      query: (body) => ({
        url: "/admin/dashboard/param/detail",
        method: "POST",
        body,
      }),
    }),
    myReportDetails: builder.mutation<MyReportDetailsResponse, MyReportDetailsRequest>({
      query: (body) => ({
        url: "/admin/dashboard/report/detail/id",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyMyReportAllQuery,
  useMyReportDetailMutation,
  useMyReportExportMutation,
  useMyReportMainServiceDetailMutation,
  useMyReportParamDetailMutation,
  useMyReportDetailsMutation,
} = myReportApis;
