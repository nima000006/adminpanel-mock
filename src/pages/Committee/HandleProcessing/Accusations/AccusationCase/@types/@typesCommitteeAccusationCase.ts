import { FormInstance } from "antd";

import { ReferralModalFormData } from "@components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/@types/@accusationCaseReferralModal";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type ReferralItemProps = {
  defaultChecked: boolean;
  title: string;
  reasonList: { id: number; title: string }[];
  sectionName: string;
  form: FormInstance<ReferralModalFormData>;
  reasonReferralLoading: boolean;
};
export type RejectionDataType = {
  rejectReportReason: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
  rejectReportDescription: string;
};
export type RegisterCommentType = {
  registerComment: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
  registerDescription: string;
};
export type WardingRegisterCommentType = {
  rejectReason: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
  rejectDescription: string;
};
export type AccusedInfoPropsType = {
  nationalCode: string;
  studentNumber: string;
  studentName: string;
  studentPhoneNumber: string;
  id: number;
  studentFamily: string;
};
//! API
export type GetAccusedUserByIdResponse = BPMS_API_RESPONSE<
  [
    {
      nationalCode: string;
      studentNumber: string;
      studentName: string;
      studentPhoneNumber: string;
      id: number;
      studentFamily: string;
    },
  ]
>;
export type GetAccusedUserByIdRequest = {
  maxResults: number | string;
  id: number | string;
};
export type GetRegisterCommentResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type RecordOpinionSecretaryPreliminaryRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      secretaryPrimaryOpinion: string;
      dateRegistrationSecretaryPrimary: string;
      secretaryPrimaryDesc: string;
      id: number;
    };
  }
>;
export type RecordOpinionSecretaryPreliminaryResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAccusationWardingRegisterCommentModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      registerComment: string;
      dateResponseSecurity: string;
      descSecurity: string;
    };
    id: number;
  }
>;
export type SendAccusationWardingRegisterCommentModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAccusationResearchChancellorRegisterCommentModalRequest =
  BPMS_API_REQUEST<
    string,
    {
      AssociationReferral: {
        registerCommentResrchAssis: string;
        CommentRegistrResrchAssis: string;
        dateResponseResearchAssistant: string;
      };
      id: number;
    }
  >;

export type SendAccusationResearchChancellorRegisterCommentModalResponse =
  BPMS_API_RESPONSE<void>;
export type SendReportStudentChancellorRegisterCommentModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      registerCommentStudentVice: string;
      dateResponseStudentVice: string;
      CommentRegistrStudentVice: string;
    };
    id: number;
  }
>;
export type SendReportStudentChancellorRegisterCommentModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAccusationEducationChancellorConfirmModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAccusationEducationChancellorConfirmModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      registerCommentEduAssistant: string;
      dateResponseEducationalAssistant: string;
      CommentRegistrEduAssistant: string;
    };
    id: number;
  }
>;
export type CancelMoveToReadyMeetingRequest = BPMS_API_REQUEST<
  string,
  {
    violationStatus: string;
    id: number;
    AssociationViolationStatus_title: null;
  }
>;
export type MoveToReadyMeetingRequest = BPMS_API_REQUEST<
  string,
  {
    violationStatus: string;
    id: number;
    AssociationViolationStatus_title: null;
  }
>;
export type moveToClarificationCommitteeRequest = BPMS_API_REQUEST<
  string,
  {
    caseLatestState: number;
    violationStatus: string;
    id: number;
    AssociationViolationStatus_title: null;
  }
>;
export type ReferralRemovalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      sentToSecurity: boolean;
      sentToResearchAssistant: boolean;
      sentToEducationalAssistant: boolean;
      sentToStudentVice: boolean;
    };
    id: number;
  }
>;
export type GetReasonsRejectChargeResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type ReasonsRejectionChargeRequest = BPMS_API_REQUEST<
  string,
  {
    reasonRejectingCharge: string;
    descRejectingCharge: string;
    id: number;
  }
>;
export type ReasonsRejectionChargeResponse = BPMS_API_RESPONSE<{ id: number }>;

//! UTILS
export type ReferralHandlerValuesType = {
  CentralReferralToCustody: boolean;
  description: string;
  reason: { children: string };
};

export type sessionAllocationValuesType = {
  needToBePresent: boolean;
  notificationMessage: string;
  notificationType: number;
  selectSession: {
    value: string;
  };
  reviewPeriod: {
    children: string;
  };
  provider: {
    children: string;
  };
};
export type AccusationCaseSessionAllocationModalProps = {
  selectSessionReason: { id: number; topicMeeting: string; meetingDate: string }[];
  durationReason: { id: number; time: string }[];
  presentationReason: { id: number; title: string }[];
  radioType: { id: number; title: string }[];
  form: FormInstance<sessionAllocationValuesType>;
  selectionSetter: React.Dispatch<React.SetStateAction<number | undefined>>;
  otherFiles: any;
  loading: boolean;
};
export type PunishmentProps = {
  count: number;
  form: FormInstance<any>;
};
export type CentralAccusationGetMeetingDateResponse = BPMS_API_RESPONSE<
  {
    AssociationCentrulMeeting_meetingDate: null;
    AssociationCentrulMeeting_meetingNumber: null;
    id: number;
    dateLastStatusChange: string;
  }[]
>;
