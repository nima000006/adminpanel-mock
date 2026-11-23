import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
//! API

export type GetCentralCommitteeCreateChangeRequest = {
  _data_: {
    id: string;
  };
};
export type GetCentralCommitteeCreateChangeResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  cleric: number;
  AssociationDirectorGeneralStudent: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  AssociationCleric: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  votingType: number;
  generalManagerSelection: number;
  AssociationResearchAssistant: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  directorGeneralStudent: number;
  educationalAssistant: number;
  AssociationCulturalBoss: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  CommitteeId: number;
  secretary: number;
  AssociationDirectorGeneralLegal: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  researchAssistant: number;
  AssociationEducationAssistant: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  AssociationHeadSamaOrganization: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  AssociationGeneralManagerSelection: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  centralBoss: number;
  directorGeneralLegal: number;
  id: number;
  headSamaOrganization: number;
  AssociationVotingType: {
    tenant_id: null;
    id: number;
    title: string;
  };
  createDate: string;
}>;
export type sendCentralCommitteeRequest = {
  form: "ListSelectionMembersCentralCommittee";
  id: "e3a090c5c77847f79868519812f5869e";
  _data_: {
    CommitteeId?: number;
    studentCouncil: number;
    directorGeneralLegal: number;
    headSamaOrganization: number;
    educationalAssistant: number;
    generalManagerSelection: number;
    cleric: number;
    // votingType: number;
    researchAssistant: number;
    directorGeneralStudent: number;
    // secretary: null;
    // tenant_id: null;
    id: number;
    createDate: string;
  };
};
export type sendCentralCommitteeResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  cleric: number;
  votingType: number;
  generalManagerSelection: number;
  directorGeneralStudent: number;
  educationalAssistant: number;
  CommitteeId: number;
  secretary: null;
  researchAssistant: number;
  centralBoss: number;
  directorGeneralLegal: number;
  id: number;
  headSamaOrganization: number;
  createDate: string;
}>;
