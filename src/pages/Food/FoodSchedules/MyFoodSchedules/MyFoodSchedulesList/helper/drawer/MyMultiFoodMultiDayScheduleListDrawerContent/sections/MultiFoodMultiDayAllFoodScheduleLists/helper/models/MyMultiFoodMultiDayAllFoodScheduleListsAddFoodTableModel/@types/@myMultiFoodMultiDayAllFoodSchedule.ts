import { MyFoodInfoType } from "../../../../@types/@myMultiFoodMultiDayAllFoodScheduleLists";

export type MyMultiFoodMultiDayAllFoodScheduleProps = {
  deleteClickHandler: (id: string) => void;
  editClickHandler: (foodData: MyFoodInfoType) => void;
};
