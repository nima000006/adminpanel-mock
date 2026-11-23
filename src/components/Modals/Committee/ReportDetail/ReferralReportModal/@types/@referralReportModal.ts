import { FormInstance } from "antd";

import { ReferralModalFormData } from "@components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/@types/@accusationCaseReferralModal";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type ReferralReportModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
};
export type ReferralItemProps = {
  defaultChecked: boolean;
  title: string;
  reasonList: { id: number; title: string }[];
  sectionName: string;
  form: FormInstance<ReferralModalFormData>;
  reasonReferralLoading: boolean;
};

//! API
export type SendReferralReportResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendReferralReportRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      sendToReporter: boolean;
      descSendReporter: string | null;
      reasonSendReporter: string | null;
      dateReportSentToReporter: string | null;
      sendToProtection: boolean;
      descSendProtection: string | null;
      reasonSendProtection: string | null;
      dateSentToSecurity: string | null;
      sendToResearchAssistant: boolean;
      descSendResearchAssistant: string | null;
      reasonSendResearchAssistant: string | null;
      dateReportSentToResearchAssistant: string | null;
      sendToEducAssistant: boolean;
      descSendEducAssistant: string | null;
      reasonSendEducAssistant: string | null;
      dateReportSentToEducationalAssistant: string | null;
      sendToStudentPresident: boolean;
      descSendStudentPresident: string | null;
      reasonSendStudentPresident: string | null;
      dateReportSentToStudentVice: string | null;
      sendToConsultant: boolean;
      reasonSendToConsultant: string | null;
      dateReportSendToConsultant: string | null;
      descSendToConsultant: string | null;
    };
    id: number;
  }
>;
