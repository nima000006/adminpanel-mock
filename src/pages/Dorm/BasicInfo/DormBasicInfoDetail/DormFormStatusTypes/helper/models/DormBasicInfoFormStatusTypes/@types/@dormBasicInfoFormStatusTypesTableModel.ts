import { DormStatusTypes } from "../../../../@types/@dormFormStatusTypes";

//! LAYOUT
export type DormBasicInfoFormStatusTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormStatusTypes) => void;
};
