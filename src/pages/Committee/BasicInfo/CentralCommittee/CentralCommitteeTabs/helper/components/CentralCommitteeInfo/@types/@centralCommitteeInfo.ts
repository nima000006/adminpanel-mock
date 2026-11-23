//! GENERAL
//! LAYOUT
//! API
export type CentralCommitteeInfoTab = {
  AssociationHeadSamaOrganization_title: string;
  AssociationCulturalBoss_title: string;
  AssociationDirectorGeneralStudent_title: string;
  AssociationVotingType_title: string;
  AssociationCleric_title: string;
  id: number;
  AssociationEducationAssistant_title: string;
  AssociationSecretary_title: string;
  AssociationDirectorGeneralLegal_title: string;
  AssociationResearchAssistant_title: string;
  AssociationGeneralManagerSelection_title: string;
  createDate: string;
};
export type GetCentralCommitteeInfoTabResponse = {
  data: CentralCommitteeInfoTab[];
  msg: string;
  status: number;
};
export type GetCentralCommitteeInfoTabRequest = {
  maxResults: number;
};
