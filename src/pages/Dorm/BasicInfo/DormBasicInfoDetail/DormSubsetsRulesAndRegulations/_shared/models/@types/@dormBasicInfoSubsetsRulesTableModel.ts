import { DormRulesTypes } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/components/Building/BuildingCreateAndModify/@types/@buildingCreateAndModify";

//! LAYOUT
export type DormBasicInfoSubsetsRulesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormRulesTypes) => void;
};
