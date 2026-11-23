import { DormBedListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Bed/BedCreateAndModify/@types/@bedCreateAndModify";

//! LAYOUT
export type DormBasicInfoBedTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormBedListTypes) => void;
};
