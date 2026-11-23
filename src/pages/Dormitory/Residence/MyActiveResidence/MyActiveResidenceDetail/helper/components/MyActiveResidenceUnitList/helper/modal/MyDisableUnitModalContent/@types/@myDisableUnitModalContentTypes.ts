import { FormInstance } from "antd";

import {
  MyActiveResidenceUnitListFormType,
  getMyActiveResidenceUnitListContent,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/@types/@myActiveResidenceUnitListType";

export type MyDisableUnitModalContentProps = {
  disableUnit: boolean;
  data: getMyActiveResidenceUnitListContent | undefined;
  form: FormInstance<MyActiveResidenceUnitListFormType>;
};
