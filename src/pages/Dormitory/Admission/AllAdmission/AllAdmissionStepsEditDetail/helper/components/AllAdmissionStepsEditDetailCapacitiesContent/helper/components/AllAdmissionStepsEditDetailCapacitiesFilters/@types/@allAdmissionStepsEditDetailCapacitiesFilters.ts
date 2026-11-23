import { FormInstance } from "antd";

import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  CapacitiesEditMode,
  CapacitiesFilterFormType,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailCapacitiesContent/@types/@allAdmissionStepsEditDetailCapacitiesContent";

export type AllAdmissionStepsEditDetailCapacitiesFiltersProps = {
  mode: CapacitiesEditMode;
  form: FormInstance<CapacitiesFilterFormType>;
  options: {
    building: IdTitle[];
    floor?: IdTitle[];
    unitTitle?: IdTitle[];
    unitType?: IdTitle[];
    qualityGrade: IdTitle[];
    bedCountInUnit?: IdTitle[];
    bedType?: IdTitle[];
  };
};
