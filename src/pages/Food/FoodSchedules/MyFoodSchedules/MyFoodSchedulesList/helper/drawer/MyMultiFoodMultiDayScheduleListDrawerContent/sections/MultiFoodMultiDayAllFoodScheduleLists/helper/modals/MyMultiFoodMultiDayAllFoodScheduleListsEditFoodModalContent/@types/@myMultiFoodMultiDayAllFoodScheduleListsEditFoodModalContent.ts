import { FormInstance } from "antd";

import {
  MyFoodInfoType,
  MyStepTwoAddAndEditFormType,
} from "../../../../@types/@myMultiFoodMultiDayAllFoodScheduleLists";

//! LAYOUT
export type MyMultiFoodMultiDayAllFoodScheduleListsEditFoodModalContentProps = {
  form: FormInstance<MyStepTwoAddAndEditFormType>;
  contractId: number;
  foodInfo: MyFoodInfoType | null;
};
