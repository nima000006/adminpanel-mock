import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { GetContractTemplateDetailResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/@types/@contractsTemplateDetail";
import {
  addNewServiceRequest,
  CopyToDraftContractRequest,
  deActiveTemplateContractRequest,
} from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/components/ContractBasicInfoTab/@types/@contractBasicInfoTabTypes";
import {
  ActiveTableStatusRequest,
  DeActiveTableStatusRequest,
  DeleteTemplateRequest,
} from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/components/ContractBasicInfoTab/helper/components/TemplateServiceTableList/@types/@templateServiceTableListTypes";
import { GetInfoServiceResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/components/ContractBasicInfoTab/helper/modal/AddServiceModalContent/@types/@addServiceModalContentTypes";
import { GetReasonChangeStatusResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/components/ContractBasicInfoTab/helper/modal/ChangeStatusModalContent/@types/@changeStatusModalContentTypes";
import {
  getContractBeneficiaryAndFinancialRulesRequest,
  getContractBeneficiaryAndFinancialRulesResponse,
  getContractCategoriesIdTitleResponse,
} from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/components/FinancialLawsTab/@types/@financialLawsTabProps";
import {
  GetContractPartiesRequest,
  GetContractPartiesResponse,
  GetContractTemplateListRequest,
  GetContractTemplateListResponse,
} from "@pages/Contract/ContractsTemplateList/ContractsTemplateList/@types/ContractsTemplateListTypes";
import {
  GetUndeterminedRuleBeneficiaryListRequest,
  GetUndeterminedRuleBeneficiaryListResponse,
} from "@pages/Contract/ContractsTemplateList/LegalVariablesList/@types/@legalVariablesList";

import { businessApi } from "../../businessApi";

export const contractsTemplateListApi = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    // لیست و فیلتر پیشرفته
    getContractTemplateList: builder.query<
      GetContractTemplateListResponse,
      GetContractTemplateListRequest
    >({
      query: (params) => ({
        url: `/contract/template${createQueryString(params)}`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
    }),

    // طرفین
    getContractParties: builder.query<
      GetContractPartiesResponse,
      GetContractPartiesRequest
    >({
      query: (params) => {
        return {
          url: `/admin/business${createQueryString(params)}`,
          method: "GET",
          headers: {
            "accept-language": "fa",
          },
        };
      },
    }),

    // جزییات
    getContractTemplateDetail: builder.query<GetContractTemplateDetailResponse, number>({
      query: (id) => ({
        url: `/contract/${id}`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
    }),

    // خدمت
    getContractCategoriesIdTitle: builder.query<
      getContractCategoriesIdTitleResponse,
      number
    >({
      query: (contractId) => ({
        url: `/contract/${contractId}/categories/id-title`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),

    // table tab 3
    getContractBeneficiaryAndFinancialRules: builder.query<
      getContractBeneficiaryAndFinancialRulesResponse,
      getContractBeneficiaryAndFinancialRulesRequest
    >({
      query: ({ categoryId, contractId }) => ({
        url: `/rule-beneficiary/category/${categoryId}/contract/${contractId}/template`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),

    deleteContractTemplate: builder.mutation<void, { templateId: number }>({
      query: ({ templateId }) => ({
        url: `/contract/${templateId}`,
        method: "DELETE",
      }),
    }),

    // copy to draft
    copyToDraftContract: builder.mutation<number, CopyToDraftContractRequest>({
      query: ({ body, contractId }) => ({
        url: `/contract/${contractId}/copy`,
        method: "POST",
        body,
      }),
    }),
    //reason change status
    getReasonChangeStatus: builder.query<GetReasonChangeStatusResponse, void>({
      query: () => ({
        url: "/rule-beneficiary/deactivation-rule-reason",
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),
    // دریافت اطلاعات خدمات
    getInfoService: builder.query<GetInfoServiceResponse, number>({
      query: (id) => ({
        url: `/contract/${id}/available-category`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
    }),
    // افزودن خدمت
    addNewService: builder.mutation<number, addNewServiceRequest>({
      query: ({ contractId, categoryId }) => ({
        url: `/contract/${contractId}/category/${categoryId}/add`,
        method: "PUT",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // غیرفعال کردن قالب
    deActiveTemplateContract: builder.mutation<number, deActiveTemplateContractRequest>({
      query: ({ id, reason, description }) => ({
        url: `/contract/deactivate/${id}`,
        method: "PATCH",
        params: {
          reason,
          description,
        },
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // غیر فعال کردن در جدول
    deActiveTableStatus: builder.mutation<number, DeActiveTableStatusRequest>({
      query: ({ contractId, categoryId, reason, description }) => ({
        url: `/contract/${contractId}/category/${categoryId}/status/deactivate`,
        method: "PATCH",
        params: {
          reason,
          description,
        },
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //  فعال کردن در جدول
    activeTableStatus: builder.mutation<number, ActiveTableStatusRequest>({
      query: ({ contractId, categoryId }) => ({
        url: `/contract/${contractId}/category/${categoryId}/status/active`,
        method: "PATCH",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // حذف
    deleteTemplate: builder.mutation<void, DeleteTemplateRequest>({
      query: ({ contractId, categoryId }) => ({
        url: `/contract/${contractId}/category/${categoryId}`,
        method: "DELETE",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    getUndeterminedRuleBeneficiaryList: builder.query<
      GetUndeterminedRuleBeneficiaryListResponse,
      GetUndeterminedRuleBeneficiaryListRequest
    >({
      query: (params) => ({
        url: `rule-beneficiary/template${createQueryString(params)}`,
        method: "GET",
        headers: {
          "accept-language": "fa",
        },
      }),
    }),
  }),
});
export const {
  useLazyGetContractTemplateListQuery,
  useLazyGetContractPartiesQuery,
  useLazyGetContractTemplateDetailQuery,
  useLazyGetContractCategoriesIdTitleQuery,
  useLazyGetContractBeneficiaryAndFinancialRulesQuery,
  useDeleteContractTemplateMutation,
  useCopyToDraftContractMutation,
  useLazyGetReasonChangeStatusQuery,
  useLazyGetInfoServiceQuery,
  useAddNewServiceMutation,
  useDeActiveTemplateContractMutation,
  useDeActiveTableStatusMutation,
  useActiveTableStatusMutation,
  useDeleteTemplateMutation,
  useLazyGetUndeterminedRuleBeneficiaryListQuery,
} = contractsTemplateListApi;
