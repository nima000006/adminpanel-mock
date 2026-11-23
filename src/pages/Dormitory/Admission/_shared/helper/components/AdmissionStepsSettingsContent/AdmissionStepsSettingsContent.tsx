import { AiOutlineArrowLeft } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import { AdmissionStepsSettingsContentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/@types/@admissionStepsSettingsContent";
import AdmissionStepsSettingsForm from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/components/AdmissionStepsSettingsForm/AdmissionStepsSettingsForm";
import { resolveSettingsContext } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsSettingsContent/helper/util";

const AdmissionStepsSettingsContent = ({
  scheduling,
  programInfo,
  onBack,
  onSaveDraft,
  onSubmitAndContinue,
}: AdmissionStepsSettingsContentProps) => {
  const {
    scheduleType,
    programTitle,
    reservableCapacity,
    renewalAllowedFrom,
    renewalAllowedTo,
  } = resolveSettingsContext(scheduling, programInfo);

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
            ثبت و ارسال درخواست
          </CustomButton>
        </div>
      }
    />
  );
};

export default AdmissionStepsSettingsContent;
