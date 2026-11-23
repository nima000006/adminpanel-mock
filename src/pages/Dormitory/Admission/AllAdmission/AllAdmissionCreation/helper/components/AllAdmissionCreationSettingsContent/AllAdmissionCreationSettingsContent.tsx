import { AiOutlineArrowLeft } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import AdmissionStepsSettingsForm from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/components/AdmissionStepsSettingsForm/AdmissionStepsSettingsForm";
import { resolveSettingsContext } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/util";
import { AllAdmissionCreationSettingsContentProps } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/helper/components/AllAdmissionCreationSettingsContent/@types/@allAdmissionCreationSettingsContent";

const AllAdmissionCreationSettingsContent = ({
  scheduling,
  programInfo,
  onBack,
  onSaveDraft,
  onSubmitAndContinue,
}: AllAdmissionCreationSettingsContentProps) => {
  const {
    scheduleType,
    programTitle,
    reservableCapacity,
    renewalAllowedFrom,
    renewalAllowedTo,
  } = resolveSettingsContext(scheduling, {
    programTitle: programInfo?.programTitle,
    reservableCapacity: programInfo?.reservableCapacity,
  });

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AdmissionStepsSettingsForm
      scheduleType={scheduleType}
      programTitle={programTitle}
      reservableCapacity={reservableCapacity}
      renewalAllowedFrom={renewalAllowedFrom}
      renewalAllowedTo={renewalAllowedTo}
      onFinish={onSubmitAndContinue}
      footer={
        <div className="mt-auto flex items-center justify-end gap-4 self-end">
          <CustomButton htmlType="button" onClick={onBack}>
            بازگشت
          </CustomButton>
          <CustomButton htmlType="button" onClick={onSaveDraft}>
            ثبت پیش‌نویس
          </CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            icon={<AiOutlineArrowLeft />}
            iconPlacement="end"
          >
            ثبت و تخصیص قرارداد
          </CustomButton>
        </div>
      }
    />
  );
};

export default AllAdmissionCreationSettingsContent;
