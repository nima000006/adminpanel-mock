import { foodInfoType } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleList/helper/drawer/AllMultiFoodMultiDayScheduleListDrawerContent/sections/MultiFoodMultiDayAllFoodScheduleLists/@types/@multiFoodMultiDayAllFoodScheduleLists";

export type AllMultiFoodMultiDayAllFoodScheduleProps = {
  deleteClickHandler: (id: string) => void;
  editClickHandler: (records: foodInfoType) => void;
};
