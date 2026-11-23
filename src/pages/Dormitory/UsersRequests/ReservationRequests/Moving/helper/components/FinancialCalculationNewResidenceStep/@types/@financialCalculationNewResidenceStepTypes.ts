import { FormInstance } from "antd";

import { EvacuationFinancialMock } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";

export type FinancialCalculationNewResidenceStepProps = {
  form: FormInstance<any>;
  data: EvacuationFinancialMock;
};
