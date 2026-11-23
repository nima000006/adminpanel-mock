import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailMySelfsFoodScheduleContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyFoodSchedulesTablePastTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type MyFoodSchedulesTablePastTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyFoodSchedulesTablePastTabAdvanceFilterFormType>;
};

export type MyFoodSchedulesTablePastTabRecordType = GetDetailMySelfsFoodScheduleContent;

export type MyFoodSchedulesTablePastTabTableModelProps = {
  onView: (record: MyFoodSchedulesTablePastTabRecordType) => void;
  onCopy: (record: MyFoodSchedulesTablePastTabRecordType) => void;
};
