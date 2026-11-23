//! GENERAL
//! LAYOUT
//! API
export type GetPrimaryCommitteeInfoTab = {
  AssociationCulturalPersonnel_title: string;
  AssociationBosPersonnel_title: string;
  AssociationAcademicPersonnel_title: string;
  AssociationVotingType_title: string;
  id: number;
  AssociationLegalPersonnel_title: string;
  AssociationSectetaryPersonnel_title: string;
  AssociationStudentInfo_title: string;
  uniId: number;
  createDate: string;
};
export type GetPrimaryCommitteeInfoTabResponse = {
  data: GetPrimaryCommitteeInfoTab[];
  msg: string;
  status: number;
};
