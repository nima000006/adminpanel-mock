import { DormManagementListTypes } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

//! LAYOUT
export type DormBasicInfoManagementTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormManagementListTypes) => void;
};
