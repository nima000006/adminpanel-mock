import { FormInstance } from "antd";

import {
  MyActiveResidenceFloorListFormType,
  getMyActiveResidenceFloorListContent,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/@types/@myActiveResidenceFloorListTypes";

export type MyDisableFloorModalContentProps = {
  disableFloor: boolean;
  data: getMyActiveResidenceFloorListContent | undefined;
  form: FormInstance<MyActiveResidenceFloorListFormType>;
};

export type MyActiveResidenceFloorDeactivateRequest = {
  uuid: string;
  params: {
    reasonUuid: string;
  };
};
