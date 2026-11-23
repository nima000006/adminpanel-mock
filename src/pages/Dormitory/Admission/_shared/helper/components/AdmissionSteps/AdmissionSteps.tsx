import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import { AdmissionStepsProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionSteps/@types/@admissionSteps";
import { ADMISSION_STEPS } from "@pages/Dormitory/Admission/_shared/util";

const AdmissionSteps = ({ current, className }: AdmissionStepsProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomSteps
      current={current}
      className={className}
      items={ADMISSION_STEPS.map((step, index) => ({
        status: stepStatusCreator(current, index),
        title: step.title,
      }))}
    />
  );
};

export default AdmissionSteps;
