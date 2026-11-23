import { DormFacilitiesType } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

//! lAYOUT
export type DormResidenceFacilitiesTableModelTypes = {
  onEditHandler: (value: DormFacilitiesType) => void;
  onDeleteHandler: (value: string) => void;
};

export type DormFacilityType = {
  id: number;
  title: string;
};
