import { FormInstance } from "antd";

import {
  ActiveResidenceBuildingListFormType,
  getActiveResidenceBuildingListContent,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/@types/@activeResidenceBuildingListTypes";

export type DisableBuildingModalContentProps = {
  disableBuilding: boolean;
  data: getActiveResidenceBuildingListContent | undefined;
  form: FormInstance<ActiveResidenceBuildingListFormType>;
};
