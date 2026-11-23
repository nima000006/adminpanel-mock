import { FormInstance } from "antd";

import {
  ActiveResidenceBedListFormType,
  getActiveResidenceBedDetailResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/@types/@activeResidenceBedListType";

export type DisableBedModalContentProps = {
  disableBed: boolean;
  data?: getActiveResidenceBedDetailResponse;
  form: FormInstance<ActiveResidenceBedListFormType>;
};
