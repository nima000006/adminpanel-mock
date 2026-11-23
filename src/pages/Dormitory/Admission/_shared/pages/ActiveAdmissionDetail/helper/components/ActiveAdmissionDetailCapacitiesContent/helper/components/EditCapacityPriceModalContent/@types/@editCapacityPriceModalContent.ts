import { FormInstance } from "antd";

import { ScheduleType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { AdmissionStepsCapacitiesModalTarget } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsCapacitiesContent/@types/@admissionStepsCapacitiesContent";
import { CapacitiesMode } from "@pages/Dormitory/Admission/_shared/util";

export type EditCapacityPriceModalContentProps = {
  form: FormInstance;
  mode: CapacitiesMode;
  target: AdmissionStepsCapacitiesModalTarget | null;
  hasFilter: boolean;
  filteredCount: number;
  scheduleType: ScheduleType;
};

export type EditCapacityPriceFormValues = {
  price: number;
  hasDeposit: boolean;
  deposit?: number | null;
};
