//! LAYOUT
export type DataSource = {
  key: string;
  name: string;
  familyName: string;
  role: string;
  userNumber: string;
  mobile: string;
  presence: boolean;
};
export type GetSessionMeetingMembersRawResponse = [
  {
    AssociationAcademicPersonnel_personnelNumber: string;
    AssociationStudentInfo_personnelNumber: string;
    AssociationCulturalPersonnel_mobile: string;
    AssociationBosPersonnel_firstName: string;
    AssociationBosPersonnel_lastName: string;
    AssociationLegalPersonnel_personnelNumber: string;
    AssociationAcademicPersonnel_firstName: string;
    AssociationAcademicPersonnel_lastName: string;
    AssociationSectetaryPersonnel_personnelNumber: string;
    AssociationSectetaryPersonnel_mobile: string;
    AssociationAcademicPersonnel_mobile: string;
    AssociationCulturalPersonnel_firstName: string;
    AssociationCulturalPersonnel_lastName: string;
    AssociationLegalPersonnel_mobile: string;
    AssociationCulturalPersonnel_personnelNumber: string;
    AssociationBosPersonnel_mobile: string;
    AssociationStudentInfo_mobile: string;
    AssociationLegalPersonnel_firstName: string;
    AssociationLegalPersonnel_lastName: string;
    AssociationBosPersonnel_personnelNumber: string;
    AssociationSectetaryPersonnel_firstName: string;
    AssociationSectetaryPersonnel_lastName: string;
    AssociationStudentInfo_firstName: string;
    AssociationStudentInfo_lastName: string;
  },
];
