import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetDetailMySelfsFoodScheduleContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyFoodSchedulesTableAllTabAdvanceFilterFormType = {
  self: SelectType<IdTitle>[];
  food: SelectType<IdTitle>[];
  meal: SelectType<IdTitle>[];
  foodProgramType: SelectType<IdTitle>[];
  hasSideDishes: SelectType<IdTitle>;
};

export type MyFoodSchedulesTableAllTabAdvanceFilterParams = {
  advanceModalOpen: boolean;
  form: FormInstance<MyFoodSchedulesTableAllTabAdvanceFilterFormType>;
};

export type MyFoodSchedulesTableAllTabRecordType = GetDetailMySelfsFoodScheduleContent;

export type MyFoodSchedulesTableAllTabTableModelProps = {
  onView: (record: MyFoodSchedulesTableAllTabRecordType) => void;
  onEdit: (record: MyFoodSchedulesTableAllTabRecordType) => void;
  onCopy: (record: MyFoodSchedulesTableAllTabRecordType) => void;
  onDeActive: (record: MyFoodSchedulesTableAllTabRecordType) => void;
};
