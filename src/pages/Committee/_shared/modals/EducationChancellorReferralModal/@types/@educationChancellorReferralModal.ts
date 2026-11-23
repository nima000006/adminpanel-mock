import { FormInstance } from "antd";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";

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
  sectionName: string;
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
//!LAYOUT
export type SendEducationChancellorReferralModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationSecondReferral: {
      reasonRefToOfficeEducAssis: string;
      dateRefToOfficeEducAssis: string;
      descRefeToOfficeEducAssis: string;
      refToOfficeEducAssis: boolean;
    };
    id: number;
  }
>;
export type SendEducationChancellorReferralModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
