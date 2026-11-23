import { GeneralSelectResponse } from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

//! LAYOUT
export type DormBasicInfoPaymentMethodTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: GeneralSelectResponse) => void;
};
