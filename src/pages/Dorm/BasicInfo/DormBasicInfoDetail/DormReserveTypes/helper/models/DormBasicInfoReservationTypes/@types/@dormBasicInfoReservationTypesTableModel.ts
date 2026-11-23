import { DormReservationListTypes } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

//! LAYOUT
export type DormBasicInfoReservationTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormReservationListTypes) => void;
};
