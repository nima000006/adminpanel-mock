import { DormSchedulingType } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

//! LAYOUT
export type DormBasicInfoScheduleTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormSchedulingType) => void;
};
