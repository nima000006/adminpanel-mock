import { ResidenceType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

//! LAYOUT
export type DormBasicInfoResidenceTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: ResidenceType) => void;
};
