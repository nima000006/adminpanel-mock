import { AiOutlineArrowLeft } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import { AdmissionStepsFinancialContentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/@types/@admissionStepsFinancialContent";
import AdmissionStepsFinancialForm from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/components/AdmissionStepsFinancialForm/AdmissionStepsFinancialForm";
import { resolveFinancialScheduleContext } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsFinancialContent/helper/util";

const AdmissionStepsFinancialContent = ({
  scheduling,
  onBack,
  onSaveDraft,
  onSubmitAndContinue,
}: AdmissionStepsFinancialContentProps) => {
  const { scheduleType, stayDateRange } = resolveFinancialScheduleContext(scheduling);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AdmissionStepsFinancialForm
      scheduleType={scheduleType}
      stayDateRange={stayDateRange}
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
            ثبت و ادامه
          </CustomButton>
        </div>
      }
    />
  );
};

export default AdmissionStepsFinancialContent;
