import { FormInstance } from "antd";

import {
  MyActiveResidenceBedListFormType,
  getMyActiveResidenceBedDetailResponse,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";

export type MyDisableBedModalContentProps = {
  disableBed: boolean;
  data?: getMyActiveResidenceBedDetailResponse;
  form: FormInstance<MyActiveResidenceBedListFormType>;
};
