import { FormInstance } from "antd";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

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
      title: string;
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
export type SendStudentChancellorReferralModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationSecondReferral: {
      reasonRefToOfficeStudentVice: string;
      dateRefToOfficeStudentVice: string;
      descRefToOfficeStudentVice: string;
      refToOfficeStudentVice: true;
    };
    id: number;
  }
>;
export type SendStudentChancellorReferralModalResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
