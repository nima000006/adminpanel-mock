import { FormInstance } from "antd";

import {
  foodInfoType,
  StepTwoAddAndEditFormType,
} from "../../../../@types/@multiFoodMultiDayAllFoodScheduleLists";

export type MultiFoodMultiDayAllFoodScheduleListsEditFoodModalContentProps = {
  form: FormInstance<StepTwoAddAndEditFormType>;
  contractId: number;
  foodInfo: foodInfoType | null;
};
