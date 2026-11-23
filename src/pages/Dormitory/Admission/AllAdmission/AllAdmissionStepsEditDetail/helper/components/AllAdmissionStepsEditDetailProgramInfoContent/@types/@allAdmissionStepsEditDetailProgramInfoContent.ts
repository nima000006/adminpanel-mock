import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ReservableCapacityType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type AllAdmissionStepsEditDetailProgramInfoFormType = {
  programTitle: SelectType<IdTitle>;
  managementType: SelectType<IdTitle>;
  reservableCapacity: ReservableCapacityType;
  /** Bound via CustomSwitch `valuePropName="checked"` */
  checked: boolean;
};
