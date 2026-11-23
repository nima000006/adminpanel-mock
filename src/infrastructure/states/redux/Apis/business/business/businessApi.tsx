import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import { getFromLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  GetAllBranchesResponse,
  IdTitle,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AccountingGetAllBusinessResponse,
  AccountingGetBranchResponse,
} from "@pages/Finance/Accountants/_shared/@types/@accountantsType";
import {
  BranchBusinessRequestInformationDetailsRequest,
  BranchBusinessRequestInformationDetailsResponse,
  BusinessRequestInformationDetailsRequest,
  BusinessRequestInformationDetailsResponse,
  GetBusinessRequestOwnerInfoRequest,
  GetBusinessRequestOwnerInfoResponse,
  GetTopChartFilesRequest,
  GetTopChartFilesResponse,
} from "@pages/Organization/_shared/@types/@organizationTypes";
import {
  GetAllBusinessListResponse,
  GetBusinessListRequest,
  GetBusinessListResponse,
} from "@pages/Organization/Business/BusinessList/@types/@businessList";
import {
  CreateBranchInBusinessRequest,
  CreateBranchInBusinessResponse,
} from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/CreateBranchStep/@types/@createBranchStepTypes";
import {
  CreateBusinessGenuineStepRequest,
  CreateBusinessGenuineStepResponse,
} from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/CreateBusinessStep/components/BusinessInfoGenuine/@types/@businessInfoGenuineProps";
import {
  CreateBusinessLegalStepRequest,
  CreateBusinessLegalStepResponse,
} from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/CreateBusinessStep/components/BusinessInfoLegal/@types/@businessInfoLegalTypes";
import { BusinessUploadFileResponse } from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/DescAndDocumentsSection/@types/@descAndDocumentsSection";
import { CreateIdentityInBusinessRequest } from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/IdentitiesStep/@types/@identitiesStepType";
import { CreateUploadFileInBusinessRequest } from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/UploadDocumentsStep/@type/@uploadDocumentsStepType";
import {
  GetContractTemplateRequest,
  GetContractTemplateResponse,
  GetServiceAndBeneficiaryTemplateRequest,
  GetServiceAndBeneficiaryTemplateResponse,
} from "@pages/Shop/Vendors/AllVendors/ShopAllVendorsDetail/helper/components/ShopAllVendorsDetailContract/@types/@shopAllVendorsDetailContract";

import { businessApi } from "../../businessApi";

export const business = businessApi.injectEndpoints({
  endpoints: (builder) => ({
    // create business step1
    createBusinessGenuineStep: builder.mutation<
      CreateBusinessGenuineStepResponse,
      CreateBusinessGenuineStepRequest
    >({
      query: (body) => ({
        url: "/business/createBusinessForNaturalPerson",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/business"],
    }),
    businessUploadFile: builder.mutation<BusinessUploadFileResponse, any>({
      query: (formData) => ({
        url: "/business/uploadFile",
        method: "POST",
        body: formData,
      }),
    }),
    // create business step1
    createBusinessLegalStep: builder.mutation<
      CreateBusinessLegalStepResponse,
      CreateBusinessLegalStepRequest
    >({
      query: (body) => ({
        url: "/business/createBusinessForLegalPersonality",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/business"],
    }),
    // create business step2
    createBranchInBusiness: builder.mutation<
      CreateBranchInBusinessResponse,
      CreateBranchInBusinessRequest
    >({
      query: (body) => ({
        url: "business/updateBusinessTempWithCentralBranchInfo",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["tag/business"],
    }),
    // create step3
    createUploadFileInBusiness: builder.mutation<
      number,
      CreateUploadFileInBusinessRequest
    >({
      query: (body) => ({
        url: "business/addBusinessTempOrganizationChartFiles",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["tag/business"],
    }),
    createIdentityInBusiness: builder.mutation<number, CreateIdentityInBusinessRequest>({
      query: (body) => ({
        url: "business/updateBusinessTempWithBusinessClerksInfo",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["tag/business"],
    }),
    getBusinessList: builder.query<GetBusinessListResponse, GetBusinessListRequest>({
      query: ({ pageNo, pageSize }) => ({
        url: `/admin/getAllBusinessRequests?pageNumber=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      // providesTags: ["tag/business"],
    }),
    accountingGetAllBusiness: builder.query<AccountingGetAllBusinessResponse, void>({
      query: () => {
        return {
          url: "/admin/business",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "accept-language": "fa",
          },
        };
      },
    }),

    accountingGetBranches: builder.query<
      AccountingGetBranchResponse,
      { businessId: number; page?: number; size?: number }
    >({
      query: ({ businessId, page = 0, size = 2000 }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", String(page));
        queryParams.append("size", String(size));

        return {
          url: `/admin/business/${businessId}/branch?${queryParams.toString()}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": "fa",
          },
        };
      },
    }),
    // business list
    getAllBusinessList: builder.query<
      GetAllBusinessListResponse,
      { pageNo: number; pageSize: number }
    >({
      query: ({ pageNo, pageSize }) => ({
        url: `/admin/getAllBusinessRequests?pageNumber=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),

    //get data for create page in the edit mode
    getBusinessRequestInformationDetails: builder.query<
      BusinessRequestInformationDetailsResponse,
      BusinessRequestInformationDetailsRequest
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getBusinessRequestInformationDetails/${businessTempHistoryId}`,
        method: "GET",
      }),
    }),

    getBranchBusinessRequestInformationDetails: builder.query<
      BranchBusinessRequestInformationDetailsResponse,
      BranchBusinessRequestInformationDetailsRequest
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getCentralBranchBusinessRequestInformationDetails?businessTempHistoryId=${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    getTopChartFiles: builder.query<GetTopChartFilesResponse, GetTopChartFilesRequest>({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getTopChartFiles/${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    getBusinessRequestOwnerInfoDetails: builder.query<
      GetBusinessRequestOwnerInfoResponse,
      GetBusinessRequestOwnerInfoRequest
    >({
      query: ({ businessTempHistoryId }) => ({
        url: `/admin/getBusinessRequestOwnerInformationDetails/${businessTempHistoryId}`,
        method: "GET",
      }),
    }),
    getAllBranches: builder.query<GetAllBranchesResponse, void>({
      query: () => ({
        url: "/branch",
        method: "GET",
        headers: {
          "Accept-Language": "fa",
          ...(getToken()
            ? { Authorization: `Bearer ${getToken()}` }
            : { Authorization: `Bearer ${getFromLocalStorage("mainToken")}` }),
        },
      }),
    }),
    getBranchByBusiness: builder.query<IdTitle[], { businessIds: number[] | string }>({
      query: (params) => ({
        url: `/branch/by-business-ids${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    //my business accounting branches api
    getMyBusinessAccountingBranch: builder.query<IdTitle[], void>({
      query: () => ({
        url: `admin/user/branches`,
        method: "GET",
      }),
    }),

    // shop vendor contract templates
    getContractTemplate: builder.query<
      GetContractTemplateResponse,
      GetContractTemplateRequest
    >({
      query: (params) => ({
        url: `/contract/active-by-service${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    // shop vendor contract services & beneficiaries
    getServiceAndBeneficiaryTemplate: builder.query<
      GetServiceAndBeneficiaryTemplateResponse,
      GetServiceAndBeneficiaryTemplateRequest
    >({
      query: ({ contractId }) => ({
        url: `/rule-beneficiary/contract/${contractId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBusinessGenuineStepMutation,
  useBusinessUploadFileMutation,
  useCreateBusinessLegalStepMutation,
  useCreateBranchInBusinessMutation,
  useCreateUploadFileInBusinessMutation,
  useCreateIdentityInBusinessMutation,
  useLazyGetBusinessListQuery,
  useLazyAccountingGetAllBusinessQuery,
  useLazyAccountingGetBranchesQuery,
  useLazyGetAllBusinessListQuery,
  useLazyGetBusinessRequestInformationDetailsQuery,
  useLazyGetBranchBusinessRequestInformationDetailsQuery,
  useLazyGetTopChartFilesQuery,
  useLazyGetBusinessRequestOwnerInfoDetailsQuery,
  useLazyGetAllBranchesQuery,
  useLazyGetBranchByBusinessQuery,
  useLazyGetMyBusinessAccountingBranchQuery,
  useLazyGetContractTemplateQuery,
  useLazyGetServiceAndBeneficiaryTemplateQuery,
} = business;
