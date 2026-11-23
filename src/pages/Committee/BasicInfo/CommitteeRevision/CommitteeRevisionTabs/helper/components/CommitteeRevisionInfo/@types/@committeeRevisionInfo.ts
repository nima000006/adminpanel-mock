//! GENERAL
//! LAYOUT
//! API
export type CommitteeRevisionInfoTab = {
  AssociationSectetaryPersonnell_title: string;
  AssociationVotingType_title: string;
  AssociationFacultyMember_title: string;
  AssociationStudentRepresentative_title: string;
  AssociationPresidentStudentCouncil_title: string;
  id: number;
  provinceId: number;
  AssociationBossCommitte_title: string;
  AssociationLeadershipBody_title: string;
  createDate: string;
};
export type GetCommitteeRevisionInfoTabResponse = {
  data: CommitteeRevisionInfoTab[];
  msg: string;
  status: number;
};
export type GetCommitteeRevisionInfoTabRequest = {
  maxResults: number;
};
