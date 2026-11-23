import { SpecialStatusTypes } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

//! LAYOUT
export type DormBasicInfoSpecialConditionsTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: SpecialStatusTypes) => void;
};
