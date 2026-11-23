import { transformResponse } from "@infra/helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { makeQueryParams } from "@infra/helpers/utils";
import { DORM_TAGS } from "@infra/states/redux/config";
import {
  CountResponse,
  DormBaseInfoResponse,
} from "@pages/Dorm/BasicInfo/DormBasicInfoList/@types/@dormBasicInfoListTypes";

import { dormApi } from "../../dormApi";

type DormUploadFileResponse = {
  originalName: string;
  uid: string;
  extension: string;
  size: number;
  serverUrl: string;
  name: string;
  deleteUrl: string;
  relativeUrl: string;
  url: string;
  fileType: string;
};
export type DormCreateUploadFileResponse = {
  originalName: string;
  tenant_id: null;
  uid: string;
  extension: string;
  size: 31123;
  createTime: string;
  name: string;
  id: 145;
  relativeUrl: string;
  fileType: string;
};
type DormCreateUploadFileRequest = {
  table: string;
  data: {
    originalName: string;
    uid: string;
    extension: string;
    size: number;
    serverUrl: string;
    name: string;
    deleteUrl: string;
    relativeUrl: string;
    url: string;
    fileType: string;
    baseUrl: string;
    tenant_id: string;
  };
};

export const dormBaseApi = dormApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== FILE UPLOAD ====================
    dormUploadFile: builder.mutation<DormUploadFileResponse, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),

    dormCreateUploadFile: builder.mutation<
      DormCreateUploadFileResponse,
      DormCreateUploadFileRequest
    >({
      query: (body) => ({
        url: "/data/table/UploadFile/create",
        method: "POST",
        body: body,
      }),
    }),

    // ==================== BASIC INFO FORM ====================
    basicInformationForm: builder.query<
      DormBaseInfoResponse,
      { pageSize: number; pageNo: number; name: string }
    >({
      query: ({ pageSize, pageNo, name }) => ({
        url: `/data/form/BasicInformationForm?maxResults=${pageSize}&firstResult=${pageNo * pageSize}${name ? `&title_LIKE=${name}` : ""}`,
        method: "GET",
      }),
      providesTags: [{ type: DORM_TAGS.BASIC_INFO, id: "LIST" }],
      transformResponse: (response) => {
        return transformResponse(response);
      },
    }),

    basicInformationFormCount: builder.query<CountResponse, { name?: string }>({
      query: ({ name }) => {
        const par = makeQueryParams({ name });
        return {
          url: `/data/form/BasicInformationForm/count?${par}${name ? `&title_LIKE=${name}` : ""}`,
          method: "GET",
        };
      },
      providesTags: [{ type: DORM_TAGS.BASIC_INFO, id: "COUNT" }],
    }),
  }),
});

export const {
  useDormCreateUploadFileMutation,
  useDormUploadFileMutation,
  useLazyBasicInformationFormQuery,
  useLazyBasicInformationFormCountQuery,
} = dormBaseApi;
