import { ReactNode } from "react";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AdmissionRenewalFinancialSettingType,
  AdmissionRenewalSourceItem,
  ScheduleType,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { AdmissionStepsSchedulingFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";

export type AdmissionStepsSettingsFormType = {
  hasRenewal?: boolean;
  sourcePrograms?: SelectType<IdTitle>[] | (string | number)[];
};

export type AdmissionStepsSettingsProgramInfo = {
  programTitle?: string;
  reservableCapacity?: string;
};

export type AdmissionStepsSettingsFinancialFormType = {
  financialSettingType: AdmissionRenewalFinancialSettingType;
  warehousingFee?: number | null;
  extraStayDailyPercent?: number | null;
};

export type AdmissionStepsSettingsFinancialModalProps = {
  open: boolean;
  record: AdmissionRenewalSourceItem | null;
  currentProgramTitle: string;
  onCancel: () => void;
  onConfirm: (values: AdmissionStepsSettingsFinancialFormType) => void;
};

export type RenewalCapacitySegment = "renewable" | "nonRenewable";

export type AdmissionStepsSettingsRenewalCapacityDrawerProps = {
  open: boolean;
  record: AdmissionRenewalSourceItem | null;
  capacityType: string;
  onClose: () => void;
};

export type AdmissionStepsSettingsFormProps = {
  scheduleType?: ScheduleType;
  reservableCapacity?: string;
  programTitle?: string;
  renewalAllowedFrom?: string;
  renewalAllowedTo?: string;
  hasRenewal?: boolean;
  renewalSources?: AdmissionRenewalSourceItem[];
  formClassName?: string;
  onFinish: (values: AdmissionStepsSettingsFormType) => void;
  footer: ReactNode;
};

export type AdmissionStepsSettingsContentProps = {
  scheduling?: AdmissionStepsSchedulingFormType | null;
  programInfo?: AdmissionStepsSettingsProgramInfo | null;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmitAndContinue: (values: AdmissionStepsSettingsFormType) => void;
};
