import { DormRequestType } from "../../../../@types/@dormRequestTypes";

//! LAYOUT
export type DormBasicInfoRequestTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormRequestType) => void;
};
