import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

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
export type ReferralModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
};
export type SendReferralReportResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type ReferralItemProps = {
  defaultChecked: boolean;
  title: string;
  reasonList: { id: number; title: string }[];
  sectionName: string;
  form: FormInstance<ReferralModalFormData>;
  reasonReferralLoading: boolean;
};
