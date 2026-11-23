import {
  GetRegulationAttachmentsResponse,
  UploadFileRequest,
  UploadFileResponse,
} from "../../../../../../pages/Committee/BasicInfo/RulesAndLaws/NewRulesAndLaws/@types/@newRulesAndLaws";
import { transformAttachmentResponse } from "../../../../../helpers/NetworkHelpers/CustomBPMSAttachmentTransformer/CustomBPMSAttachmentTransformer";
import { transformObjectResponse } from "../../../../../helpers/NetworkHelpers/ResponseObjectTransformer/transformObjectResponse";
import { committeeApi } from "../../committeeApi";
import { BPMSUploadResponseObject } from "../../models/committeeModels/CommitteGeneral";

export const committeeGeneralApis = committeeApi.injectEndpoints({
  endpoints: (builder) => ({
    committeeUploadFiles: builder.mutation<UploadFileResponse, UploadFileRequest>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["tag/committee"],
      transformResponse: (response: UploadFileResponse) => {
        return transformObjectResponse(response);
      },
    }),
    getRegulationAttachments: builder.query<GetRegulationAttachmentsResponse, string>({
      query: (id) => ({
        url: `data/form/RegulationsAttached?maxResults=30&RegulationsId_EQ=${id}`,
        method: "GET",
      }),
      transformResponse: (response: BPMSUploadResponseObject[]) =>
        transformAttachmentResponse(response),
    }),
  }),
});
export const { useCommitteeUploadFilesMutation, useLazyGetRegulationAttachmentsQuery } =
  committeeGeneralApis;
