import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailAllSelfsFoodScheduleContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type AllFoodSchedulesTableAllTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type AllFoodSchedulesTableAllTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<AllFoodSchedulesTableAllTabAdvanceFilterFormType>;
};

export type AllFoodSchedulesTableAllTabRecordType = GetDetailAllSelfsFoodScheduleContent;

export type AllFoodSchedulesTableAllTabTableModelProps = {
  onView: (record: AllFoodSchedulesTableAllTabRecordType) => void;
  onEdit: (record: AllFoodSchedulesTableAllTabRecordType) => void;
  onCopy: (record: AllFoodSchedulesTableAllTabRecordType) => void;
  onDeActive: (record: AllFoodSchedulesTableAllTabRecordType) => void;
};
