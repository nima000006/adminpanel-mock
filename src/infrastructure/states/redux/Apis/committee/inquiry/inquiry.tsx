import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";

import {
  GetLetterInformationResponse,
  SendLetterInformationRequest,
  SendLetterInformationResponse,
} from "../../../../../../components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/EnvelopeInformationStep/@types/@envelopeInformationStep";
import {
  EditInquiryAccusationListRequest,
  EditInquiryAccusationListResponse,
  GetInquiryAccusationListResponse,
} from "../../../../../../components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/SelectAccusationStep/@types/@selectAccusationStep";
import { noContentResponseTransformer } from "../../../../../helpers/NetworkHelpers/NoContentResponseTransformer/NoContentResponseTransformer";
import { transformObjectResponse } from "../../../../../helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { transformResponse } from "../../../../../helpers/NetworkHelpers/ResponseTransformer/ResponseTransformer";
import { committeeApi } from "../../committeeApi";

export const committeeInquiryApis = committeeApi.injectEndpoints({
  endpoints: (builder) => ({
    getInquiryAccusationList: builder.query<GetInquiryAccusationListResponse, string>({
      query: (nationalCode) => ({
        url: `/data/form/ViewInquiryInformation?maxResults=50&firstResult=0&nationalCode_EQ=${nationalCode}`,
        method: "GET",
      }),
      transformResponse: (response: GetInquiryAccusationListResponse) =>
        transformResponse(response),
    }),
    editInquiryAccusationList: builder.mutation<
      EditInquiryAccusationListResponse,
      EditInquiryAccusationListRequest
    >({
      query: (formData) => ({
        url: "/data/form/QuerySelection/bulk-update",
        // Todo[saman]: OLD VERSION //url: "/data/form/QuerySelection/update-all",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (_, meta: FetchBaseQueryMeta | undefined) => {
        return noContentResponseTransformer(meta);
      },
    }),
    sendLetterInformation: builder.mutation<
      SendLetterInformationResponse,
      SendLetterInformationRequest
    >({
      query: (formData) => ({
        url: "/data/form/LetterInformation/create",
        // Todo[saman]: OLD VERSION //url: "/data/form/LetterInformation/e5b539681efd4ec283648721bea5867b/save",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: SendLetterInformationResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getLetterInformation: builder.query<GetLetterInformationResponse, string>({
      query: (id) => ({
        url: `/data/form/LetterInformation?maxResults=50&firstResult=0&id_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: GetLetterInformationResponse) =>
        transformResponse(response),
    }),
  }),
});
export const {
  useLazyGetInquiryAccusationListQuery,
  useEditInquiryAccusationListMutation,
  useSendLetterInformationMutation,
  useLazyGetLetterInformationQuery,
} = committeeInquiryApis;
