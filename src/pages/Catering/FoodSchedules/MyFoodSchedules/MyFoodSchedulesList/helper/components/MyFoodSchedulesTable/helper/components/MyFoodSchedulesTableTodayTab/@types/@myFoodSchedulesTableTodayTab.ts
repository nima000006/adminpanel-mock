import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailMySelfsFoodScheduleContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyFoodSchedulesTableTodayTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type MyFoodSchedulesTableTodayTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyFoodSchedulesTableTodayTabAdvanceFilterFormType>;
};

export type MyFoodSchedulesTableTodayTabRecordType = GetDetailMySelfsFoodScheduleContent;

export type MyFoodSchedulesTableTodayTabTableModelProps = {
  onView: (record: MyFoodSchedulesTableTodayTabRecordType) => void;
  onEdit: (record: MyFoodSchedulesTableTodayTabRecordType) => void;
  onCopy: (record: MyFoodSchedulesTableTodayTabRecordType) => void;
  onDeActive: (record: MyFoodSchedulesTableTodayTabRecordType) => void;
};
