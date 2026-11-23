import { GetContractTermsTypeListResponse } from "@pages/Contract/TemplateSettings/TemplateSettingsList/@types/@templateSettingsList";
import { CreateSystematicContractTermRequest } from "@pages/Contract/TemplateSettings/TemplateSettingsList/helper/drawer/TemplateSettingAddDrawerContent/@types/@templateSettingAddDrawerContentTypes";
import { GetContractTermsDetailResponse } from "@pages/Contract/TemplateSettings/TemplateSettingsList/helper/drawer/TemplateSettingShowMoreDrawerContent/@type/@templateSettingShowMoreDrawerContent";

import { businessApi } from "../../businessApi";

export const templateSettingsApi = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    getContractTermsTypeList: builder.query<GetContractTermsTypeListResponse, void>({
      query: () => ({
        url: "/contract/contract-term-types",
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),
    createSystematicContractTerm: builder.mutation<
      number,
      CreateSystematicContractTermRequest
    >({
      query: (body) => ({
        url: "/contract-term/systematic",
        method: "POST",
        body,
      }),
    }),
    getContractTermsDetail: builder.query<GetContractTermsDetailResponse, number>({
      query: (id) => ({
        url: `/contract-term/${id}`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),
  }),
});

export const {
  useLazyGetContractTermsTypeListQuery,
  useCreateSystematicContractTermMutation,
  useLazyGetContractTermsDetailQuery,
} = templateSettingsApi;
