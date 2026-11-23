import { FormInstance } from "antd";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type AccusationCaseReferralModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
};
export type ReferralItemProps = {
  defaultChecked: boolean;
  reasonReferralLoading: boolean;
  title: string;
  reasonList: { id: number; title: string }[];
  sectionName: string;
  form: FormInstance<{
    toBePresent_research: boolean;
    reason_research: {
      key: string;
      value: string;
      children: string;
      name: string;
      code: number;
      item: {
        id: number;
        title: string;
      };
    };
    description_research: string;
  }>;
};
//!API
export type TitleReferralModal = {
  number: number;
  id: number;
  title: string;
};
export type getTitleReferralModalResponse = {
  data: TitleReferralModal[];
  msg: string;
  status: number;
};
export type GetReasonsReferralResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type SendReferralRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationReferral: {
      sentToSecurity: boolean;
      descProtection: string | null;
      reasonSecurity: string | null;
      dateSentToSecurity: string | null;
      sentToResearchAssistant: boolean;
      descResearchAsistant: string | null;
      reasonResearchAssistant: string | null;
      dateSentToResearchAssistant: string | null;
      sentToEducationalAssistant: boolean;
      descEducAssistant: string | null;
      reasonEducAssistant: string | null;
      dateSentToEducationalAssistant: string | null;
      sentToStudentVice: boolean;
      descStudentPresident: string | null;
      reasonStudentPresident: string | null;
      dateSentToStudentVice: string | null;
    };
    id: number;
  }
>;

export type SendReferralResponse = BPMS_API_RESPONSE<{ id: number }>;
