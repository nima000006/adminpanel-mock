import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailMySelfsFoodScheduleContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyFoodSchedulesTableInactiveTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type MyFoodSchedulesTableInactiveTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyFoodSchedulesTableInactiveTabAdvanceFilterFormType>;
};

export type MyFoodSchedulesTableInactiveTabRecordType =
  GetDetailMySelfsFoodScheduleContent;

export type MyFoodSchedulesTableInactiveTabTableModelProps = {
  onView: (record: MyFoodSchedulesTableInactiveTabRecordType) => void;
  onCopy: (record: MyFoodSchedulesTableInactiveTabRecordType) => void;
};
