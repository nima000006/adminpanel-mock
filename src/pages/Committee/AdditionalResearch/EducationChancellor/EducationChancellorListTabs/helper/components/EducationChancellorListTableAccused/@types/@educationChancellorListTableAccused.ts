import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//!API
export type GetAdditionalResearchEducationListData = {
  charge: boolean | null;
  studentNumber: string;
  AssociationEducationalAssistantStatus_id: number;
  studentName: string;
  eventReport: string;
  AssociationStudentViceStatus_id: number;
  AssociationSecurityStatus_id: number;
  id: number;
  AssociationResearchAssistantStatus_id: number;
  studentFamily: string;
  AssociationSecurityStatus_title: string;
  createDate: string;
};
export type GetAdditionalResearchEducationListResponse = BPMS_API_RESPONSE<
  GetAdditionalResearchEducationListData[]
>;

export type GetAdditionalResearchEducationListRequest = {
  firstResult: number;
  maxResults: number;
  type: 1 | 2 | 3 | 4 | 5 | 6 | "1,2,3,4,5,6";
};
