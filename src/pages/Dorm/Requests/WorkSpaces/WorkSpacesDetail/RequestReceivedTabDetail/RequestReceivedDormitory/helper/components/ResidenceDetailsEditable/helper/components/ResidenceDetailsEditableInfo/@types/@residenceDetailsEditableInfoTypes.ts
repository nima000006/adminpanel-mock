import { FormInstance } from "antd";

import { useLazyGetPlacesAroundDormitoryQuery } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { PlacesAroundDormitoryType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";

export type residenceDetailsEditableInfoTypes = {
  setPlaceData: React.Dispatch<React.SetStateAction<PlacesAroundDormitoryType[]>>;
  form: FormInstance;
  getPlacesAroundDormitory: ReturnType<typeof useLazyGetPlacesAroundDormitoryQuery>[0];
};
