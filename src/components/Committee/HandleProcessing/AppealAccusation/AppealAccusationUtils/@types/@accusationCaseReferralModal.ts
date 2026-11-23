import { FormInstance } from "antd";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type ReferralModalFormData = {
  toBePresent_security: boolean;
  toBePresent_research: boolean;
  toBePresent_education: boolean;
  toBePresent_student: boolean;
  reason_security: {
    children: string;
  };
  description_security: string;
  reason_research: {
    children: string;
  };
  description_research: string;
  reason_education: {
    children: string;
  };
  description_education: string;
  reason_student: {
    children: string;
  };
  description_student: string;
};
export type ReferralItemProps = {
  defaultChecked: boolean;
  title: string;
  reasonList: { id: number; title: string }[];
  sectionName: string;
  form: FormInstance<ReferralModalFormData>;
  reasonReferralLoading: boolean;
};
export type AccusationCaseReferralModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
};
//!API
export type SendAccusationReferralAppealResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAccusationReferralAppealRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      appealReferralToCustody: boolean;
      descReferralToCustody: string | null;
      reasonReferralToCustody: string | null;
      dateAppealSecurity: string | null;
      appealReferralToResearchAssistant: boolean;
      appealDescReferralToResearchAssistant: string | null;
      appealReasonReferralToResearchAssistant: string | null;
      dateAppealResearchAssistant: string | null;
      appealReferralToEducAssistant: boolean;
      appealDescReferralToEducAssistant: string | null;
      appealReasonReferralToEducAssistant: string | null;
      dateAppealEducationalAssistant: string | null;
      appealReferralToStudentVice: boolean;
      appealDescReferralToStudentVice: string | null;
      appealReasonReferralToStudentVice: string | null;
      dateAppealStudentVice: string | null;
    };
    id: number;
  }
>;
