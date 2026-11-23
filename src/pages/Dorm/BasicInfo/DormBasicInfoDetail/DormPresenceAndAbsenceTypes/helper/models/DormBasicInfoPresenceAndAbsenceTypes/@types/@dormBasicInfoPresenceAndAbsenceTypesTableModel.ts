import { DormPresenceAndAbsence } from "../../../../@types/@dormPresenceAndAbsenceTypes";

//! LAYOUT
export type DormBasicInfoPresenceAndAbsenceTypesTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: DormPresenceAndAbsence) => void;
};
