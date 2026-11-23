import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { GetContractDetailResponse } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/AllContractDetail/@types/@allContractDetailTab";
import { GetContractFoodsResponse } from "@pages/Food/Contracts/AllContracts/AllContractDetail/helpers/components/Foods/@types/@foodsTab";
import {
  CreateNewContractRequest,
  CreateNewContractResponse,
} from "@pages/Food/Contracts/AllContracts/AllContractList/helpers/components/DrawerContent/@types/@allContractListDrawerContent";
import { GetMyContractFoodsResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/@types/@foodsTab";
import { GetMyContractDetailResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/MyContractDetail/@types/@myContractDetailTab";
import {
  CreateNewMyContractRequest,
  CreateNewMyContractResponse,
} from "@pages/Food/Contracts/MyContracts/MyContractsList/helpers/components/MyContractListDrawerContent/@types/@myContractListDrawerContent";

import {
  CreateCopyContractResponse,
  GetAllContractsListRequest,
  GetAllContractsListResponse,
} from "../../../../../../pages/Food/Contracts/AllContracts/AllContractList/@types/@allContractList";
import {
  GetMyContractsListRequest,
  GetMyContractsListResponse,
  GetMyContractsListWithFilterRequestType,
} from "../../../../../../pages/Food/Contracts/MyContracts/MyContractsList/@types/@myContractsList";
import { foodApi } from "../../foodApi";

export const contractApi = foodApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContractsList: builder.query<
      GetAllContractsListResponse,
      GetAllContractsListRequest
    >({
      query: (params) => ({
        url: `/admin/contract/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    getMyContractsList: builder.query<
      GetMyContractsListResponse,
      GetMyContractsListRequest
    >({
      query: (params) => ({
        url: `/manager/contract/all${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    getContractDetail: builder.query<GetContractDetailResponse, { contractId: string }>({
      query: (params) => ({
        url: `/admin/contract/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    getContractFoods: builder.query<GetContractFoodsResponse, { contractId: string }>({
      query: (params) => ({
        url: `/admin/product/contract${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/food"],
    }),
    getMyContractFoods: builder.query<GetMyContractFoodsResponse, { contractId: string }>(
      {
        query: (params) => ({
          url: `/manager/product/contract${createQueryString(params)}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        // providesTags: ["tag/food"],
      }
    ),
    createNewContract: builder.mutation<
      CreateNewContractResponse,
      CreateNewContractRequest
    >({
      query: (body) => ({
        url: "/admin/contract/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    copyContract: builder.mutation<CreateCopyContractResponse, string>({
      query: (id) => ({
        url: `/admin/contract/copy/create?contractId=${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createNewMyContract: builder.mutation<
      CreateNewMyContractResponse,
      CreateNewMyContractRequest
    >({
      query: (body) => ({
        url: "/manager/contract/create",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyContractDetail: builder.query<
      GetMyContractDetailResponse,
      { contractId: string }
    >({
      query: (params) => ({
        url: `/manager/contract/id${createQueryString(params)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["tag/food"],
    }),
    // get my contract list with filter
    getMyContactListWithFilter: builder.query<
      GetMyContractsListResponse,
      Omit<GetMyContractsListWithFilterRequestType, "branchCode">
    >({
      query: (params) => ({
        url: `/manager/contract/filter/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    // get all contract list with filter
    getAllContactListWithFilter: builder.query<
      GetMyContractsListResponse,
      GetMyContractsListWithFilterRequestType
    >({
      query: (params) => ({
        url: `/admin/contract/filter/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLazyGetAllContractsListQuery,
  useLazyGetMyContractsListQuery,
  useLazyGetContractDetailQuery,
  useLazyGetContractFoodsQuery,
  useLazyGetMyContractFoodsQuery,
  useCreateNewContractMutation,
  useLazyGetMyContractDetailQuery,
  useCreateNewMyContractMutation,
  useCopyContractMutation,
  useLazyGetMyContactListWithFilterQuery,
  useLazyGetAllContactListWithFilterQuery,
} = contractApi;
