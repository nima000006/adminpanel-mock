import { DormResidenceFacilityListTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/helper/components/DormResidenceFacilities/@types/@dormResidenceFacilities";

//! LAYOUT
export type DormBasicInfoFacilitiesTabTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormResidenceFacilityListTypes) => void;
};
