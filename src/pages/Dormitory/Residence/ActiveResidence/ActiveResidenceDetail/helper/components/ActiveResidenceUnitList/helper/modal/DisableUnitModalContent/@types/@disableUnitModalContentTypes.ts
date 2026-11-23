import { FormInstance } from "antd";

import {
  ActiveResidenceUnitListFormType,
  getActiveResidenceUnitListContent,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/@types/@activeResidenceUnitListType";

export type DisableUnitModalContentProps = {
  disableUnit: boolean;
  data: getActiveResidenceUnitListContent | undefined;
  form: FormInstance<ActiveResidenceUnitListFormType>;
};
