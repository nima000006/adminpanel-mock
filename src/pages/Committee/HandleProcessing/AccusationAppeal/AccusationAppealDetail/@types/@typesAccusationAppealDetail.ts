import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!API
export type RecordOpinionSecretaryAppealResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type RecordOpinionSecretaryAppealRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      dateRegistrationSecretaryAppeal: string;
      secretaryAppealDesc: string;
      secretaryAppealOpinion: string;
    };
    id: number;
  }
>;
export type SendAppealCancelMoveToReadyMeetingResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAppealCancelMoveToReadyMeetingRequest = BPMS_API_REQUEST<
  string,
  {
    appealMeeting: null;
    id: number;
    statusAppealsCommittee: "5";
  }
>;
export type MoveToReadyMeetingAppealCommitteeResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type MoveToReadyMeetingAppealCommitteeRequest = BPMS_API_REQUEST<
  string,
  {
    statusAppealsCommittee: 5;
    id: number;
  }
>;
export type MoveToClarificationCommitteeAppealResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type MoveToClarificationCommitteeAppealRequest = BPMS_API_REQUEST<
  string,
  {
    caseLatestState: number;
    appealTypeUnderstanding: string;
    id: number;
  }
>;
export type GetAppealReferralRemovalResponse = BPMS_API_RESPONSE<
  {
    AssociationReferral_appealReferralToCustody: boolean;
    AssociationReferral_appealReferralToEducAssistant: boolean;
    AssociationReferral_appealReferralToResearchAssistant: boolean;
    AssociationReferral_appealReferralToStudentVice: boolean;
  }[]
>;
export type SendAppealReferralRemovalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAppealReferralRemovalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      appealReferralToCustody: boolean;
      appealReferralToEducAssistant: boolean;
      appealReferralToResearchAssistant: boolean;
      appealReferralToStudentVice: boolean;
    };
    id: number;
  }
>;
export type RegisterCommentModalFormData = {
  registerComment: { children: string };
  registerDescription: string;
};
//!UTILS
