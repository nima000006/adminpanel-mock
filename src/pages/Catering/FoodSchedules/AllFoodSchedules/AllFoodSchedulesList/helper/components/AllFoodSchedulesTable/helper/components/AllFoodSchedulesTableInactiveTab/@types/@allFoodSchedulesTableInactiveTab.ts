import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailAllSelfsFoodScheduleContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type AllFoodSchedulesTableInactiveTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type AllFoodSchedulesTableInactiveTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllFoodSchedulesTableInactiveTabAdvanceFilterFormType>;
};

export type AllFoodSchedulesTableInactiveTabRecordType =
  GetDetailAllSelfsFoodScheduleContent;

export type AllFoodSchedulesTableInactiveTabTableModelProps = {
  onView: (record: AllFoodSchedulesTableInactiveTabRecordType) => void;
  onCopy: (record: AllFoodSchedulesTableInactiveTabRecordType) => void;
};
