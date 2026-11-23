import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetContractBeneficiaryRuleResponse,
  GetContractCategoriesResponse,
  GetContractsEcosystemsResponse,
  GetContractServiceResponse,
  GetContractStatusResponse,
} from "@pages/Contract/_shared/@generalContractTypes";
import { getCategoryByServiceListResponse } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateInfo/@types/@contractsTemplateInfoStep";

import { businessApi } from "../../businessApi";

export const contractGeneralApis = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    // اکوسیستم
    getContractEcosystem: builder.query<GetContractsEcosystemsResponse, void>({
      query: () => ({
        url: "/ecosystem",
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),

    // وضعیت
    getContractStatus: builder.query<GetContractStatusResponse, void>({
      query: () => ({
        url: "/contract/contract-status",
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),

    // ذینفع
    getContractRuleType: builder.query<GetContractBeneficiaryRuleResponse, void>({
      query: () => ({
        url: "/contract/beneficiary-rule-types",
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),

    // سرویس
    getContractService: builder.query<GetContractServiceResponse, void>({
      query: () => ({
        url: "/contract/service",
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),

    // خدمت
    getContractCategories: builder.query<GetContractCategoriesResponse, string>({
      query: (contractId) => ({
        url: `/contract/${contractId}/categories`,
        method: "GET",
      }),
      providesTags: ["tag/contract"],
    }),

    getCategoryByServiceList: builder.query<getCategoryByServiceListResponse, string[]>({
      query: (services) => ({
        url: `/category/service${createQueryString({ services })}`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),

    getPartitionCoefficientTypeList: builder.query<
      { id: number; name: string; title: string }[],
      void
    >({
      query: () => ({
        url: "/contract/partition-coefficient-type",
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
  useLazyGetContractEcosystemQuery,
  useLazyGetContractStatusQuery,
  useLazyGetContractRuleTypeQuery,
  useLazyGetContractServiceQuery,
  useLazyGetContractCategoriesQuery,
  useLazyGetCategoryByServiceListQuery,
  useLazyGetPartitionCoefficientTypeListQuery,
} = contractGeneralApis;
