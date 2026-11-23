import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  addNewContractBeneficiaryRequest,
  getAllPartitionCoefficientTypeByContractIdRequest,
  getAllPartitionCoefficientTypeByContractIdResponse,
  getAllBeneficiarySupportResponse,
  getContractBranchIdRequest,
  getContractBranchIdResponse,
  getContractBranchTypeRequest,
  getContractBranchTypeResponse,
  NewContractCategoryListRequest,
  NewContractCategoryListResponse,
  addContractConfirmRequest,
  editNewContractBeneficiaryRequest,
  deleteBeneficiaryConfirmRequest,
} from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateFinanceCondition/@types/@contractTemplateFinanceCondition";
import {
  CreateContractTemplateBasicInfoRequest,
  CreateContractTemplateBasicInfoResponse,
  UpdateContractTemplateBasicInfoRequest,
} from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateInfo/@types/@contractsTemplateInfoStep";
import { AddContractFileRequest } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateRulesDescAttachment/@types/@ContractsTemplateRulesDescAttachmentModalContentProps";
import { deleteContractFileRequest } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateRulesDescAttachment/@types/@deleteContractFileRequest";
import {
  AddRequiredTermsToContractRequest,
  GetContractDefaultTermListResponse,
} from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateRulesDescMandatory/@types/@contractsTemplateRulesDescMandatoryProps";
import {
  CreateContractTermRequest,
  CreateContractTermResponse,
  GetContractTermListByContractTypeResponse,
} from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateRulesDescMandatory/helper/ContractSection/@types/@contractSectionTypes";
import { AddOtherTermsToContractRequest } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateRulesDescOther/@types/@contractsTemplateRulesDescOtherProps";

import { businessApi } from "../../businessApi";

export const addNewContractTemplateApi = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    getContractPersonalityTypeList: builder.query<
      {
        id: number;
        title: string;
      }[],
      {
        personalityType: "PERSONAL" | "LEGAL";
      }
    >({
      query: (queries) => ({
        url: `/business/business-list-by-personality-type${createQueryString(queries)}`,
        method: "GET",
      }),
      providesTags: ["tag/contract"],
    }),
    createContractTemplateBasicInfo: builder.mutation<
      CreateContractTemplateBasicInfoResponse,
      CreateContractTemplateBasicInfoRequest
    >({
      query: (body) => ({
        url: "/contract",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/contract"],
    }),
    updateContractTemplateBasicInfo: builder.mutation<
      void,
      UpdateContractTemplateBasicInfoRequest
    >({
      query: ({ contractId, body }) => ({
        url: `/contract/${contractId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["tag/contract"],
    }),

    getContractDefaultTermList: builder.query<GetContractDefaultTermListResponse, void>({
      query: () => ({
        url: "/contract-term/defaults",
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
      // providesTags: ["tag/contract"],
    }),
    getContractTermListByContractType: builder.query<
      GetContractTermListByContractTypeResponse,
      { contractType: string }
    >({
      query: (queries) => ({
        url: `/contract-term${createQueryString(queries)}`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
      providesTags: ["tag/contract"],
    }),
    createContractTerm: builder.mutation<
      CreateContractTermResponse,
      CreateContractTermRequest
    >({
      query: (body) => ({
        url: "/contract-term",
        method: "POST",
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
      invalidatesTags: ["tag/contract"],
    }),
    addRequiredTermsToContract: builder.mutation<
      number,
      AddRequiredTermsToContractRequest
    >({
      query: ({ body, id }) => ({
        url: `contract/${id}/contract-terms`,
        method: "PUT",
        body,
      }),
    }),
    updateContractTerm: builder.mutation<
      number,
      { body: CreateContractTermRequest; id: number }
    >({
      query: ({ body, id }) => ({
        url: `/contract-term/${id}`,
        method: "PUT",
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    addOtherTermsToContract: builder.mutation<number, AddOtherTermsToContractRequest>({
      query: ({ body, id }) => ({
        url: `/contract/${id}/other-contract-terms`,
        method: "PUT",
        body,
      }),
    }),
    addContractFile: builder.mutation<number, AddContractFileRequest>({
      query: ({ body, id, title }) => ({
        url: `/contract/files/${id}?title=${title}`,
        method: "POST",
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    //step 5
    newContractCategoryList: builder.query<
      NewContractCategoryListResponse,
      NewContractCategoryListRequest
    >({
      query: ({ contractId }) => ({
        url: `/contract/${contractId}/categories`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    getAllPartitionCoefficientTypeByContractId: builder.query<
      getAllPartitionCoefficientTypeByContractIdResponse,
      getAllPartitionCoefficientTypeByContractIdRequest
    >({
      query: ({ contractId }) => ({
        url: `/contract/${contractId}/partition-coefficient-type`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    getAllBeneficiarySupport: builder.query<getAllBeneficiarySupportResponse, void>({
      query: () => ({
        url: `/beneficiary-support`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),

    getContractBranchType: builder.query<
      getContractBranchTypeResponse,
      getContractBranchTypeRequest
    >({
      query: ({ businessId }) => ({
        url: `/branch/type/business/${businessId}`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    getContractBranchId: builder.query<
      getContractBranchIdResponse,
      getContractBranchIdRequest
    >({
      query: ({ businessId, type }) => ({
        url: `/branch/business/${businessId}/type/${type}`,
        method: "GET",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    addNewContractBeneficiary: builder.mutation<number, addNewContractBeneficiaryRequest>(
      {
        query: ({ contractId, categoryId, body }) => ({
          url: `/contract/${contractId}/categories/${categoryId}`,
          method: "POST",
          body,
          headers: {
            "Accept-Language": "fa",
          },
        }),
      }
    ),
    editNewContractBeneficiary: builder.mutation<
      number,
      editNewContractBeneficiaryRequest
    >({
      query: ({ ruleBeneficiaryId, body }) => ({
        url: `/rule-beneficiary/${ruleBeneficiaryId}`,
        method: "PUT",
        body,
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    addContractConfirm: builder.mutation<number, addContractConfirmRequest>({
      query: ({ contractId }) => ({
        url: `/contract/confirm/${contractId}`,
        method: "PATCH",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    deleteBeneficiaryConfirm: builder.mutation<void, deleteBeneficiaryConfirmRequest>({
      query: ({ id }) => ({
        url: `/rule-beneficiary/${id}`,
        method: "DELETE",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
    // dete file on step 4
    deleteContractFileOnStepFour: builder.mutation<void, deleteContractFileRequest>({
      query: ({ contractId, uploadFileId, params }) => ({
        url: `/contract/files/${contractId}/${uploadFileId}${createQueryString(params)}`,
        method: "DELETE",
        headers: {
          "Accept-Language": "fa",
        },
      }),
    }),
  }),
});

export const {
  useLazyGetContractPersonalityTypeListQuery,
  useCreateContractTemplateBasicInfoMutation,
  useUpdateContractTemplateBasicInfoMutation,
  useLazyGetContractDefaultTermListQuery,
  useLazyGetContractTermListByContractTypeQuery,
  useCreateContractTermMutation,
  useAddRequiredTermsToContractMutation,
  useUpdateContractTermMutation,
  useAddOtherTermsToContractMutation,
  useAddNewContractBeneficiaryMutation,
  useEditNewContractBeneficiaryMutation,
  useDeleteBeneficiaryConfirmMutation,
  useDeleteContractFileOnStepFourMutation,
  useAddContractFileMutation,
  useAddContractConfirmMutation,
  useLazyNewContractCategoryListQuery,
  useLazyGetAllPartitionCoefficientTypeByContractIdQuery,
  useLazyGetAllBeneficiarySupportQuery,
  useLazyGetContractBranchTypeQuery,
  useLazyGetContractBranchIdQuery,
} = addNewContractTemplateApi;
