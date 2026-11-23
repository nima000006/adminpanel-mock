import { FormInstance } from "antd";

import { SelectType, IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type FacilityStepContentFormType = {
  amenityFilter: SelectType<IdTitle>[];
};

export type FacilityStepContentProps = {
  form: FormInstance;
  checkedPlaces: string[];
  setCheckedPlaces: React.Dispatch<React.SetStateAction<string[]>>;
};
