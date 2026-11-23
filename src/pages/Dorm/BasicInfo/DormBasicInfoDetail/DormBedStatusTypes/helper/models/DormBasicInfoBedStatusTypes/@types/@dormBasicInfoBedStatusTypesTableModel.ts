import { BedStatusTypeList } from "../../../../@types/@dormBedStatusTypes";

//! LAYOUT
export type DormBasicInfoBedStatusTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: BedStatusTypeList) => void;
};
