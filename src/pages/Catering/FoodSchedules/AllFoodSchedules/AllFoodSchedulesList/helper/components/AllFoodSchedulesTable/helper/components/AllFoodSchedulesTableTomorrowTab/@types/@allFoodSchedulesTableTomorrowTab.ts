import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailAllSelfsFoodScheduleContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type AllFoodSchedulesTableTomorrowTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type AllFoodSchedulesTableTomorrowTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllFoodSchedulesTableTomorrowTabAdvanceFilterFormType>;
};

export type AllFoodSchedulesTableTomorrowTabRecordType =
  GetDetailAllSelfsFoodScheduleContent;

export type AllFoodSchedulesTableTomorrowTabTableModelProps = {
  onView: (record: AllFoodSchedulesTableTomorrowTabRecordType) => void;
  onEdit: (record: AllFoodSchedulesTableTomorrowTabRecordType) => void;
  onCopy: (record: AllFoodSchedulesTableTomorrowTabRecordType) => void;
  onDeActive: (record: AllFoodSchedulesTableTomorrowTabRecordType) => void;
};
