import { FormInstance } from "antd";

import { SelectType, IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyFacilityStepContentFormType = {
  amenityFilter: SelectType<IdTitle>[];
};

export type MyFacilityStepContentProps = {
  form: FormInstance;
  checkedPlaces: string[];
  setCheckedPlaces: React.Dispatch<React.SetStateAction<string[]>>;
};
