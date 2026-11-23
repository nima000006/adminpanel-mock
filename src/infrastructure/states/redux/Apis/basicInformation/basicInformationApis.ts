import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { getToken } from "@infra/services/AuthProvider/helper/authUtil";
import { GetBasicInformationStudyFieldsResponse } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/@types/@admissionStepsRulesAdmissionConditions";
import {
  GetBasicInfoCityBasedMultipleProvinceResponse,
  GetBasicInfoProvinceAndCityResponse,
} from "@pages/Organization/_shared/components/LocationInfoSection/@types/@locationInfoSectionType";
import { GetTaxTypeResponse } from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/CreateBusinessStep/components/BusinessInfoGenuine/@types/@businessInfoGenuineProps";
import { GetPersonalityTypeResponse } from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/CreateBusinessStep/components/BusinessInfoLegal/@types/@businessInfoLegalTypes";
import { GetGenderTypeResponse } from "@pages/Organization/Business/CreateBusiness/CreateBusiness/helper/components/IdentitiesStep/helper/components/IdentitiesPersonalInfo/@types/@identitiesPersonalInfo";

import { basicInformationApi } from "../basicInformationApi";

export const basicInformation = basicInformationApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaxType: builder.query<GetTaxTypeResponse, null>({
      query: () => ({
        url: "/basic-info/tax-type",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getBasicInfoProvinceAndCity: builder.query<
      GetBasicInfoProvinceAndCityResponse,
      number
    >({
      query: (id) => ({
        url: `/basic-info/region/${id}/child`,
        method: "GET",
      }),
    }),
    getBasicInfoCityBasedMultipleProvince: builder.query<
      GetBasicInfoCityBasedMultipleProvinceResponse,
      { ids: string }
    >({
      query: (params) => ({
        url: `/basic-info/region/child${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    getPersonalityType: builder.query<GetPersonalityTypeResponse, null>({
      query: () => ({
        url: "/basic-info/personality-type",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getGenderType: builder.query<GetGenderTypeResponse, null>({
      query: () => ({
        url: "/basic-info/gender",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getBasicInformationStudyFields: builder.query<
      GetBasicInformationStudyFieldsResponse,
      void
    >({
      query: () => ({
        url: "/basic-info/study-field",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLazyGetTaxTypeQuery,
  useLazyGetBasicInfoProvinceAndCityQuery,
  useLazyGetPersonalityTypeQuery,
  useLazyGetGenderTypeQuery,
  useLazyGetBasicInfoCityBasedMultipleProvinceQuery,
  useLazyGetBasicInformationStudyFieldsQuery,
} = basicInformation;
