//!API
export type AdditionalResearchWardingList = {
  AssociationSecondReferral_nameReferencedUnit: null;
  charge: null;
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
  userId: number;
  reporterName: string;
  reporterFamily: string;
  reporterUni: null;
  referrer: null;
  AssociationRequestType_title: string;
  createDate: string;
  dateLastStatusChange: null;
};
export type GetAdditionalResearchWardingListResponse = {
  data: AdditionalResearchWardingList[];
  msg: string;
  status: number;
};
export type GetAdditionalResearchWardingListRequest = {
  firstResult: number;
  maxResults: number;
  type: 1 | 2 | 3 | 4 | 5 | 6 | "1,2,3,4,5,6";
};
