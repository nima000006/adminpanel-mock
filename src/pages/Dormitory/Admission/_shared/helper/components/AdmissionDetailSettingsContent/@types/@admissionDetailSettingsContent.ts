import { To } from "react-router";

import {
  AdmissionDetailMockData,
  AdmissionDetailStatus,
  AdmissionRenewalSourceItem,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type AdmissionDetailSettingsVariant = "all" | "my" | "active";

export type AdmissionDetailSettingsContentProps = {
  variant: AdmissionDetailSettingsVariant;
  data: AdmissionDetailMockData;
  editTo?: To;
  status?: AdmissionDetailStatus;
};

export type AdmissionDetailSettingsFinancialModalProps = {
  open: boolean;
  record: AdmissionRenewalSourceItem | null;
  currentProgramTitle: string;
  onCancel: () => void;
};
