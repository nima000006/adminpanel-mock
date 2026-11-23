import { foodInfoType } from "../../../../@types/@multiFoodMultiDayAllFoodScheduleLists";

export type AllMultiFoodMultiDayAllFoodScheduleProps = {
  deleteClickHandler: (id: string) => void;
  editClickHandler: (records: foodInfoType) => void;
};
