import { FormInstance } from "antd";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
export type ReferralModalForm = {
  toBePresent_research: true;
  reason_research: {
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
  description_research: string;
};

//!LAYOUT
export type ReferralReportModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
};
export type ReferralReportItemProps = {
  defaultChecked: boolean;
  title: string;
  reasonList: { id: number; title: string }[];

  form: FormInstance<{
    toBePresent_research: boolean;
    reason_research: {
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
    description_research: string;
  }>;
};
//!API
export type sendChancellorReferralModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationSecondReferral: {
      reasonRefToOfficeResearchAssis: string;
      dateRefToOfficeResearchAssis: string;
      descRefeToOfficeResearchAssis: string;
      refToOfficeResearchAssis: boolean;
    };
    id: number;
  }
>;
export type sendChancellorReferralModalResponse = BPMS_API_RESPONSE<{ id: number }>;
