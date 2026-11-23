import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!API
export type CentralAccusationSendReferralModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      CentralReferralToCustody: boolean;
      CentralDescReferralToCustody: string;
      CentralReasonReferralToCustody: string;
      dateCentralSecurity?: string;
      CentralReferralToResearchAssistant?: boolean;
      CentralDescReferralToResearchAssistant?: string;
      CentralReasonReferralToResearchAssistant?: string;
      dateCentralResearchAssistant?: string;
      CentralReferralToEducAssistant?: boolean;
      CentralDescReferralToEducAssistant?: string;
      CentralReasonReferralToEducAssistant?: string;
      dateCentralEducationalAssistant?: string;
      CentralReferralToStudentVice?: boolean;
      CentralDescReferralToStudentVice?: string;
      CentralReasonReferralToStudentVice?: string;
      dateCentralStudentVice?: string;
    };
    id: number;
  }
>;
export type CentralAccusationSendReferralModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type getCentralAccusationReferralRemovalResponse = BPMS_API_RESPONSE<
  {
    AssociationReferral_CentralReferralToResearchAssistant: boolean;
    AssociationReferral_CentralReferralToCustody: boolean;
    AssociationReferral_CentralReferralToStudentVice: boolean;
    id: number;
    AssociationReferral_CentralReferralToEducAssistant: boolean;
  }[]
>;
export type CentralAccusationSendReferralRemovalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      CentralReferralToCustody: boolean;
      CentralReferralToResearchAssistant: boolean;
      CentralReferralToEducAssistant: boolean;
      CentralReferralToStudentVice: boolean;
    };
    id: number;
  }
>;
export type CentralAccusationSendReferralRemovalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type CentralAccusationSendMoveToClarificationCommitteeRequest = BPMS_API_REQUEST<
  string,
  {
    caseLatestState: number;
    statusCentralCommittee: string;
    id: number;
    AssociationStatusCentrulCommittee_title: null;
  }
>;
export type CentralAccusationSendMoveToClarificationCommitteeResponse =
  BPMS_API_RESPONSE<{
    id: number;
    caseLatestState: string;
    statusCentralCommittee: number;
  }>;
export type CentralAccusationSendMoveToReadyMeetingRequest = BPMS_API_REQUEST<
  string,
  {
    statusCentralCommittee: number;
    id: number;
    AssociationViolationStatus_title: null;
  }
>;
export type CentralAccusationSendMoveToReadyMeetingResponse = BPMS_API_RESPONSE<{
  statusCentralCommittee: number;
  id: number;
}>;
export type CentralAccusationSendSessionAllocationRequest = BPMS_API_REQUEST<
  string,
  {
    centrulNeedToBePresent: boolean;
    centrulMeeting: string;
    centrulReviewPeriod: string;
    centrulProvider: string;
    primaryNotificationType: number;
    primaryNotificationMessage: string;
    id: number;
  }
>;
export type CentralAccusationSendSessionAllocationResponse = BPMS_API_RESPONSE<{
  primaryNotificationType: number;
  centrulNeedToBePresent: boolean;
  centrulReviewPeriod: string;
  centrulProvider: string;
  id: number;
  primaryNotificationMessage: string;
  centrulMeeting: number;
}>;
export type CentralAccusationSendCancelMoveToReadyMeetingRequest = BPMS_API_REQUEST<
  string,
  {
    statusCentralCommittee: string;
    centrulMeeting: null;
    id: number;
  }
>;
export type CentralAccusationSendCancelMoveToReadyMeetingResponse = BPMS_API_RESPONSE<{
  id: number;
  statusCentralCommittee: number;
  centrulMeeting: null;
}>;
export type CentralAccusationSendRecordOpinionRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      secretaryCentralOpinion: string;
      dateRegistrationSecretaryCentral: string;
      secretaryCentralDesc: string;
    };
    id: number;
  }
>;
export type CentralAccusationSendRecordOpinionResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type CentralAccusationSendRegisterVoteRequest = BPMS_API_REQUEST<
  string,
  {
    centralVoteDesc: string;
    id: number;
    numberCentralPunishments: string;
    numberVotesFavorCentrul: string;
    AssociationCentralCommitteeRecords: {
      AssociationCentralPunish: {
        id: number;
        title: string;
      };
      AssociationCentralRulings: {
        id: number;
        title: string;
      };
    }[];
  }
>;
export type CentralAccusationSendRegisterVoteResponse = BPMS_API_RESPONSE<{ id: number }>;
