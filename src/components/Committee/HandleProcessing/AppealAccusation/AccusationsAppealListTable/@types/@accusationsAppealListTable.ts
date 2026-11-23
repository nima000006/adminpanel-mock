import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type AccusationAppealList = {
  nationalCode: string;
  AssociationReferral_appealReferralToCustody: boolean;
  AssociationTblPriiority_title: string;
  AssociationMeetingAppealsCommittee_meetingDate: string;
  studentNumber: string;
  AssociationReferral_appealReferralToResearchAssistant: true;
  appealTypeUnderstanding: null;
  AssociationMeetingAppealsCommittee_meetingNumber: string;
  AssociationReferral_appealReferralToEducAssistant: true;
  studentName: string;
  AssociationInfractions_title: string;
  AssociationInfractionType_title: string;
  AssociationPlaintiffType_title: string;
  id: number;
  AssociationStatusAppealsCommittee_id: number;
  AssociationStatusAppealsCommittee_title: string;
  AssociationMeetingAppealsCommittee_meetingTime: null;
  AssociationReferral_appealReferralToStudentVice: boolean;
  studentFamily: string;
  createDate: string;
  dateLastStatusChange: string;
};
export type GetAccusationAppealListResponse = BPMS_API_RESPONSE<AccusationAppealList[]>;
