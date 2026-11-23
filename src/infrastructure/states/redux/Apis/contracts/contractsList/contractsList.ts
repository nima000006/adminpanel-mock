import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetContractsListRequest,
  GetContractsListResponse,
} from "@pages/Contract/ContractsList/ContractsList/@types/@contractListTypes";

import { businessApi } from "../../businessApi";

export const contractsListApi = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    getContractsList: builder.query<GetContractsListResponse, GetContractsListRequest>({
      query: (params) => ({
        url: `/contract${createQueryString(params)}`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),
  }),
});

export const { useLazyGetContractsListQuery } = contractsListApi;
