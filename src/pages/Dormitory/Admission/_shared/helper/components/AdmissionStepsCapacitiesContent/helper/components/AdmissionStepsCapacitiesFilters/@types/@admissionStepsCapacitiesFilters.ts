import { FormInstance } from "antd";

import { AdmissionStepsCapacitiesFilterFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import { GetAllAdmissionProgramInfoResponse } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsProgramInfoContent/@types/@admissionStepsProgramInfoContent";

export type AdmissionStepsCapacitiesFiltersProps = {
  form: FormInstance<AdmissionStepsCapacitiesFilterFormType>;
  admissionInfo: GetAllAdmissionProgramInfoResponse | undefined;
};
