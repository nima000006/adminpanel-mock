import { DormFeedbackType } from "../../../../@types/@dormFeedbackTypes";

//! LAYOUT
export type DormBasicInfoFeedbackTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormFeedbackType) => void;
};
