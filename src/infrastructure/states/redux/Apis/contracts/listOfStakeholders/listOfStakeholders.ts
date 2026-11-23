import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  GetStackHoldersListRequest,
  GetStackHoldersListResponse,
} from "@pages/Contract/ListOfStakeholders/ListOfStakeholders/helper/@types/@listOfStakeholdersTypes";
import { GetContractBeneficiaryDetailResponse } from "@pages/Contract/ListOfStakeholders/ListOfStakeholders/helper/drawers/ContractStakeholdersDetail/@types/@contractStakeholdersDetailDrawerContent";

import { businessApi } from "../../businessApi";

export const listOfStakeholdersApi = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    // لیست و فیلتر پیشرفته ذینفعان
    getStackHoldersList: builder.query<
      GetStackHoldersListResponse,
      GetStackHoldersListRequest
    >({
      query: (params) => ({
        url: `/rule-beneficiary/beneficiaries/advance-search${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    // شعبه
    getContractBranchType: builder.query<{ id: number; title: string }[], void>({
      query: () => ({
        url: "/branch/branch-types",
        method: "GET",
      }),
      providesTags: ["tag/contract"],
    }),

    // جزییات لیست ذینفعان
    getContractBeneficiaryDetail: builder.query<
      GetContractBeneficiaryDetailResponse,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/contract/beneficiary/${id}`,
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
  useLazyGetStackHoldersListQuery,
  useLazyGetContractBranchTypeQuery,
  useLazyGetContractBeneficiaryDetailQuery,
} = listOfStakeholdersApi;
