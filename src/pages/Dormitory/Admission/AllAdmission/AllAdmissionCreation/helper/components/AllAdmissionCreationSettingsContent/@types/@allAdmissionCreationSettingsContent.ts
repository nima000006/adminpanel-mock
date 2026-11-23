import { AdmissionStepsProgramInfoFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsProgramInfoContent/@types/@admissionStepsProgramInfoContent";
import { AdmissionStepsSchedulingFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSchedulingContent/@types/@admissionStepsSchedulingContent";
import { AdmissionStepsSettingsFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/@types/@admissionStepsSettingsContent";

export type AllAdmissionCreationSettingsContentProps = {
  scheduling?: AdmissionStepsSchedulingFormType | null;
  programInfo?: AdmissionStepsProgramInfoFormType | null;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmitAndContinue: (values: AdmissionStepsSettingsFormType) => void;
};
