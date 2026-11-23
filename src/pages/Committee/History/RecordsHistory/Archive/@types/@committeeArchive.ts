import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetArchiveListResponse = BPMS_API_RESPONSE<
  {
    studentName: string;
    violationStatus: number;
    AssociationPlaintiffType_title: string;
    id: number;
    reporterName: string;
    reporterFamily: string;
    studentFamily: string;
    recordsStage: string;
    dateLastStatusChange: string;
  }[]
>;
export type GetArchiveListRequest = {
  maxResults: number;
  firstResult: number;
};
