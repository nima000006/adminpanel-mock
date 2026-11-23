import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailMySelfsFoodScheduleContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyFoodSchedulesTableTomorrowTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type MyFoodSchedulesTableTomorrowTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyFoodSchedulesTableTomorrowTabAdvanceFilterFormType>;
};

export type MyFoodSchedulesTableTomorrowTabRecordType =
  GetDetailMySelfsFoodScheduleContent;

export type MyFoodSchedulesTableTomorrowTabTableModelProps = {
  onView: (record: MyFoodSchedulesTableTomorrowTabRecordType) => void;
  onEdit: (record: MyFoodSchedulesTableTomorrowTabRecordType) => void;
  onCopy: (record: MyFoodSchedulesTableTomorrowTabRecordType) => void;
  onDeActive: (record: MyFoodSchedulesTableTomorrowTabRecordType) => void;
};
