import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
import {
  DormFinancialSituationType,
  ModalFormType,
} from "@pages/Dorm/Habitants/Evacuation/@types/@evacuationType";

export type GetDormCheckingExcessDebtResponse = BPMS_API_RESPONSE<
  { tenant_id: null; excessFactor: number; id: number; dormitoryRequestId: number }[]
>;

export type GetDormCheckingExcessDebtRequest = {
  maxResults: number;
  firstResult: number;
  dormitoryRequestId_EQ: number;
};

export type HabitantExcessDebtModalContentProps = {
  form: FormInstance<ModalFormType>;
  data: DormFinancialSituationType | null;
};
