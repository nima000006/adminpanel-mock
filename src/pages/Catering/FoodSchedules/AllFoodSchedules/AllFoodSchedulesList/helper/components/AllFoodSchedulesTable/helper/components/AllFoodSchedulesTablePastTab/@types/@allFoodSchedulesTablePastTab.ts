import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailAllSelfsFoodScheduleContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type AllFoodSchedulesTablePastTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type AllFoodSchedulesTablePastTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllFoodSchedulesTablePastTabAdvanceFilterFormType>;
};

export type AllFoodSchedulesTablePastTabRecordType = GetDetailAllSelfsFoodScheduleContent;

export type AllFoodSchedulesTablePastTabTableModelProps = {
  onView: (record: AllFoodSchedulesTablePastTabRecordType) => void;
  onCopy: (record: AllFoodSchedulesTablePastTabRecordType) => void;
};
