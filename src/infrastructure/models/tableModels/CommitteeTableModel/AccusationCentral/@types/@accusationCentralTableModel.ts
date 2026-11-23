export type ResponsibleUnitType = {
  AssociationReferral_CentralReferralToCustody: boolean;
  AssociationReferral_CentralReferralToEducAssistant: boolean;
  AssociationReferral_CentralReferralToStudentVice: boolean;
  AssociationReferral_CentralReferralToResearchAssistant: boolean;
};
export type AccusationCentralTableModelPropsType = {
  checkClickHandler: (value: number) => void;
  rejectMeetingHandler: (value: number) => void;
  allocationMeetingHandler: (value: number) => void;
  changeSessionHandler: (value: number) => void;
  type?: "1,2,3,4,5,7,8,9" | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9;
};
