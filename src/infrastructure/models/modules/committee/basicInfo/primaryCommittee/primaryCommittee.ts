export type BasicInfoPrimaryCommitteeCreateChangeSubmitType = {
  system: number;
  chairman: {
    code: number;
  };
  generalManager: {
    code: number;
  };
  legal: {
    code: number;
  };
  counseling: {
    code: number;
  };
  studentMember: {
    code: number;
  };
  secretary: {
    code: number;
  };
};
export type BasicInfoPrimaryCommitteeStepItemType = {
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
