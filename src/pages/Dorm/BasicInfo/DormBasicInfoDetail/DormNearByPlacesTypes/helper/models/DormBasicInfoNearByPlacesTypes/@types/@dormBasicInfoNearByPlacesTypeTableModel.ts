import { PlacesAroundDormitoryType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

export type DormBasicInfoNearByPlacesTypeTableModelProps = {
  switchHandler: (id: number, isActive: boolean) => void;
  onEditClickHandler: (value: PlacesAroundDormitoryType) => void;
};
