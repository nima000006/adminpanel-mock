import { RelationTypeData } from "../../../../@types/@dormRelationTypes";

//! LAYOUT
export type DormBasicInfoRelationTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: RelationTypeData) => void;
};
