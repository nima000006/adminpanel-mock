import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  getContractsDetailDescriptionRequest,
  GetContractsDetailDescriptionResponse,
} from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailDescription/@types/@getContractsDetailDescriptionTypes";
import {
  GetContractsDetailRulesBeneficiariesRequest,
  GetContractsDetailRulesBeneficiariesResponse,
} from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/@types/@getContractsDetailRulesBeneficiaries";
import {
  GetContractsDetailBaseInfoRequest,
  GetContractsDetailBaseInfoResponse,
} from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailInfo/@types/@getContractsDetailBaseInfo";

import { businessApi } from "../../businessApi";

export const contractsDetailApi = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    // first tab
    getContractsDetailBaseInfo: builder.query<
      GetContractsDetailBaseInfoResponse,
      GetContractsDetailBaseInfoRequest
    >({
      query: ({ contractId }) => ({
        url: `/contract/${contractId}/banner`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),
    // second tab
    getContractsDetailDescription: builder.query<
      GetContractsDetailDescriptionResponse,
      getContractsDetailDescriptionRequest
    >({
      query: ({ id }) => ({
        url: `/contract/content/${id}`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),

    getContractsDetailRulesBeneficiaries: builder.query<
      GetContractsDetailRulesBeneficiariesResponse,
      GetContractsDetailRulesBeneficiariesRequest
    >({
      query: ({ contractId, categoryId, queries }) => ({
        url: `/contract/${contractId}/categories/${categoryId}/template/beneficiaries${createQueryString(queries)}`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),
  }),
});

export const {
  useLazyGetContractsDetailBaseInfoQuery,
  useLazyGetContractsDetailDescriptionQuery,
  useLazyGetContractsDetailRulesBeneficiariesQuery,
} = contractsDetailApi;
