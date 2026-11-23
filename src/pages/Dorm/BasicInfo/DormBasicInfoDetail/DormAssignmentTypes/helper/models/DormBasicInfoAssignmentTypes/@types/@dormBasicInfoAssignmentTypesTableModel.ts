import { AssignmentListType } from "../../../../@types/@dormAssignmentTypes";

//! LAYOUT
export type DormBasicInfoAssignmentTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: AssignmentListType) => void;
};
