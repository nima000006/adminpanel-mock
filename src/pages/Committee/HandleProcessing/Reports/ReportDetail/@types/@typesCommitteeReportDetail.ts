import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type RejectionDataType = {
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
export type ReporterInfoProps = {
  reporterName?: string;
  reporterFamily?: string;
  reporterNationalcode?: string;
  reporterNumber?: string;
  reporterPhoneNumber?: string;
};
//!API
export type GetReportDetailResponse = BPMS_API_RESPONSE<
  {
    id: number;
    eventReport: string;
    eventLocation: string;
    nationalCode: string;
    studentName: string;
    studentFamily: string;
    studentNumber: string;
    studentPhoneNumber: string;
    reporterNationalcode: string;
    reporterName: string;
    reporterFamily: string;
    reporterNumber: string;
    reporterPhoneNumber: string;
    eventDate: string;
  }[]
>;
export type GetReportDetailRequest = { id: number };
export type GetRemovalReportReferenceResponse = BPMS_API_RESPONSE<{
  id: number;
  AssociationReferral: {
    sendToEducAssistant: boolean;
    sendToReporter: boolean;
    sendToConsultant: boolean;
    sendToProtection: boolean;
    sendToResearchAssistant: boolean;
    sendToStudentPresident: boolean;
  };
}>;
export type GetRemovalReportReferenceRequest = {
  _data_: {
    id: string;
  };
};
export type SendRemovalReportReferenceResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendRemovalReportReferenceRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      sendToReporter: boolean;
      sendToProtection: boolean;
      sendToResearchAssistant: boolean;
      sendToEducAssistant: boolean;
      sendToStudentPresident: boolean;
      sendToConsultant: boolean;
      reasonSendReporter?: null;
      reasonSendProtection?: null;
      reasonSendResearchAssistant?: null;
      reasonSendEducAssistant?: null;
      reasonSendStudentPresident?: null;
      reasonSendToConsultant?: null;
      descSendEducAssistant?: null;
      descSendReporter?: null;
      descSendToConsultant?: null;
      descSendProtection?: null;
      descSendStudentPresident?: null;
      descSendResearchAssistant?: null;
    };
    id: number;
  }
>;
export type GetReasonsRejectionChargeResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type SendRejectingChargeResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendRejectingChargeRequest = BPMS_API_REQUEST<
  string,
  {
    reasonRejectingCharge: string;
    descRejectingCharge: string;
    id: number;
  }
>;
export type SendRejectingWardingResponse = BPMS_API_RESPONSE<{ id: number }>;
export type SendRejectingWardingRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      reasonClosingSecurity: string;
      dateClosingSecurity: string;
      descClosingSecurity: string;
    };
    id: number;
  }
>;
export type SendRejectingResearchChancellorResponse = BPMS_API_RESPONSE<void>;
export type SendRejectingResearchChancellorRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      reasonClosingResearchAssistant: string;
      descClosingResearchAssistant: string;
      dateClosingResearchAssistant: string;
    };
    id: number;
  }
>;
export type SendRejectingStudentChancellorResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendRejectingStudentChancellorRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      reasonClosingStudentVice: string;
      dateClosingStudentVice: string;
      descClosingStudentVice: string;
    };
    id: number;
  }
>;
export type SendRejectingEducationChancellorRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      reasonClosingEducationalAssistant: string;
      dateClosingEducationalAssistant: string;
      descClosingEducationalAssistant: string;
    };
    id: number;
  }
>;
export type SendRejectingEducationChancellorResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendRegisteringOpinionReportSecretaryResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendRegisteringOpinionReportSecretaryRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      recordOpinionSecretary: string;
      dateResponseSecretary: string;
      descSecretary: string;
    };
    id: number;
  }
>;
export type SendReportWardingRegisterCommentModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendReportWardingRegisterCommentModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      reportCommentSecurity: string;
      reportDateResponseSecurity: string;
      reportDescSecurity: string;
    };
    id: number;
  }
>;
export type SendReportResearchChancellorRegisterCommentModalResponse =
  BPMS_API_RESPONSE<void>;
export type SendReportResearchChancellorRegisterCommentModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      reportCommentResearchAssistant: string;
      reportDescResearchAssistant: string;
      reportDateResponseResearchAssistant: string;
    };
    id: number;
  }
>;

export type SendReportEducationChancellorRegisterCommentModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      reportCommentStudentVice: string;
      reportDateResponseStudentVice: string;
      reportDescStudentVice: string;
    };
    id: number;
  }
>;
export type SendReportEducationChancellorRegisterCommentModalResponse =
  BPMS_API_RESPONSE<{
    id: number;
  }>;
export type SendConfirmModalResponse = BPMS_API_RESPONSE<{
  securityStatus: number;
  id: number;
}>;
export type SendConfirmModalRequest = BPMS_API_REQUEST<
  string,
  {
    securityStatus: number;
    id: number;
  }
>;
export type SendResearchChancellorConfirmModalResponse = BPMS_API_RESPONSE<{
  researchAssistantStatus: number;
  id: number;
}>;
export type SendResearchChancellorConfirmModalRequest = BPMS_API_REQUEST<
  string,
  {
    researchAssistantStatus: number;
    id: number;
  }
>;
export type SendStudentChancellorConfirmModalRequest = BPMS_API_REQUEST<
  string,
  {
    studentViceStatus: "3";
    id: number;
  }
>;
export type SendStudentChancellorConfirmModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendEducationChancellorConfirmModalRequest = BPMS_API_REQUEST<
  string,
  {
    educationalAssistantStatus: "3";
    id: number;
  }
>;
export type SendEducationChancellorConfirmModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
