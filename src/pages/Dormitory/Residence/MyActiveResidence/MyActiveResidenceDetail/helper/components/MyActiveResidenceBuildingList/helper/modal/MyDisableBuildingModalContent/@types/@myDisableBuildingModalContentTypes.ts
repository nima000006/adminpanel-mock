import { FormInstance } from "antd";

import {
  MyActiveResidenceBuildingListFormType,
  getMyActiveResidenceBuildingListContent,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/@types/@myActiveResidenceBuildingListTypes";

export type MyDisableBuildingModalContentProps = {
  disableBuilding: boolean;
  data: getMyActiveResidenceBuildingListContent | undefined;
  form: FormInstance<MyActiveResidenceBuildingListFormType>;
};
