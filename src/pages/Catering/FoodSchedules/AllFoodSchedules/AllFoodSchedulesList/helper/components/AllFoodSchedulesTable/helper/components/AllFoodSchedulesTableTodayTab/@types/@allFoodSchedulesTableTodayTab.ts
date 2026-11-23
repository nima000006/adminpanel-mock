import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailAllSelfsFoodScheduleContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type AllFoodSchedulesTableTodayTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type AllFoodSchedulesTableTodayTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllFoodSchedulesTableTodayTabAdvanceFilterFormType>;
};

export type AllFoodSchedulesTableTodayTabRecordType =
  GetDetailAllSelfsFoodScheduleContent;

export type AllFoodSchedulesTableTodayTabTableModelProps = {
  onView: (record: AllFoodSchedulesTableTodayTabRecordType) => void;
  onEdit: (record: AllFoodSchedulesTableTodayTabRecordType) => void;
  onCopy: (record: AllFoodSchedulesTableTodayTabRecordType) => void;
  onDeActive: (record: AllFoodSchedulesTableTodayTabRecordType) => void;
};
