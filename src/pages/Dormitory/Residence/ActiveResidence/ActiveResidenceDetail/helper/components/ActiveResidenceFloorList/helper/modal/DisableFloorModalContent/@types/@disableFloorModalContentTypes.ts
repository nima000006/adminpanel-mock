import { FormInstance } from "antd";

import {
  ActiveResidenceFloorListFormType,
  getActiveResidenceFloorListContent,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/@types/@activeResidenceFloorListTypes";

export type DisableFloorModalContentProps = {
  disableFloor: boolean;
  data: getActiveResidenceFloorListContent | undefined;
  form: FormInstance<ActiveResidenceFloorListFormType>;
};

export type ActiveResidenceFloorDeactivateRequest = {
  uuid: string;
  params: {
    reasonUuid: string;
  };
};
