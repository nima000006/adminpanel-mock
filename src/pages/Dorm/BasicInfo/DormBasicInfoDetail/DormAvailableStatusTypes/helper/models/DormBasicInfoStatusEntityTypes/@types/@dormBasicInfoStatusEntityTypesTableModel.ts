import { StatusEntityTypeList } from "../../../../@types/@dormAvailableStatusTypes";

//! LAYOUT
export type DormBasicInfoStatusEntityTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: StatusEntityTypeList) => void;
};
