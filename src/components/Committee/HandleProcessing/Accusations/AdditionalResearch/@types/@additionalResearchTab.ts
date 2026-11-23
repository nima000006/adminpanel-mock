import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!
type SECURITY = "SECURITY";
type EDUCATIONAL = "EDUCATIONAL";
type RESEARCH = "RESEARCH";
type STUDENT = "STUDENT";
export type ResearchFilter = SECURITY | EDUCATIONAL | RESEARCH | STUDENT | undefined;
export type StepDataType = {
  date: string;
  generalDate: string;
  comment: string;
  desc: string;
  section: string;
  label: string;
};
//!API
export type MaxResultAndIdType = {
  maxResults: number | string;
  id: number | string;
};
export type GetSecurityDataInResearchSectionResponse = BPMS_API_RESPONSE<
  {
    date: string;
    generalDate: string;
    comment: string;
    desc: string;
    section: string;
    label: string;
  }[]
>;
export type GetTotalDataInResearchSectionRawResponse = [
  {
    AssociationReferral_dateResponseCentralResearchAssistant: string;
    AssociationReferral_appealResearchAssistantOpinion: string;
    AssociationReferral_dateAppealSecurity: string;
    AssociationReferral_dateResponseStudentVice: string;
    AssociationReferral_dateResponseAppealSecurity: string;
    AssociationReferral_appealSecurityDesc: string;
    AssociationReferral_CommentRegistrEduAssistant: string;
    AssociationReferral_dateResponseEducationalAssistant: string;
    AssociationReferral_dateCentralEducationalAssistant: string;
    id: number;
    AssociationReferral_appealResearchAssistantDesc: string;
    AssociationReferral_dateSentToStudentVice: string;
    AssociationReferral_dateResponseCentralSecurity: string;
    AssociationReferral_appealStudentViceDesc: string;
    AssociationReferral_appealEducAssistantOpinion: string;
    AssociationReferral_appealEducAssistantDesc: string;
    AssociationReferral_dateCentralStudentVice: string;
    AssociationReferral_dateResponseAppealEducationalAssistant: string;
    AssociationReferral_registerComment: string;
    AssociationReferral_dateAppealEducationalAssistant: string;
    AssociationReferral_dateResponseAppealStudentVice: string;
    AssociationReferral_CommentRegistrStudentVice: string;
    AssociationReferral_appealStudentViceOpinion: string;
    AssociationReferral_dateSentToEducationalAssistant: string;
    AssociationReferral_CommentRegistrResrchAssis: string;
    AssociationReferral_CentralSecurityOpinion: string;
    AssociationReferral_appealSecurityOpinion: string;
    AssociationReferral_CentralResearchAssistantDesc: string;
    AssociationReferral_dateResponseCentralStudentVice: string;
    AssociationReferral_dateCentralSecurity: string;
    AssociationReferral_CentralStudentViceDesc: string;
    AssociationReferral_CentralEducAssistantDesc: string;
    AssociationReferral_descSecurity: string;
    AssociationReferral_dateSentToSecurity: string;
    AssociationReferral_dateCentralResearchAssistant: string;
    AssociationReferral_dateResponseAppealResearchAssistant: string;
    AssociationReferral_CentralSecurityDesc: string;
    AssociationReferral_CentralStudentViceOpinion: string;
    AssociationReferral_registerCommentResrchAssis: string;
    AssociationReferral_registerCommentStudentVice: string;
    AssociationReferral_dateResponseCentralEducationalAssistant: string;
    AssociationReferral_registerCommentEduAssistant: string;
    AssociationReferral_dateSentToResearchAssistant: string;
    AssociationReferral_dateResponseSecurity: string;
    AssociationReferral_CentralEducAssistantOpinion: string;
    AssociationReferral_CentralResearchAssistantOpinion: string;
    AssociationReferral_dateAppealResearchAssistant: string;
    AssociationReferral_dateResponseResearchAssistant: string;
    AssociationReferral_dateAppealStudentVice: string;
  },
];
