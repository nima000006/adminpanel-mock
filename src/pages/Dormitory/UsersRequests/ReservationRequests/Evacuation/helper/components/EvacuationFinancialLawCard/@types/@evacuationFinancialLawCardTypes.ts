import { FormInstance } from "antd";

import {
  EvacuationFinancialFormValues,
  EvacuationFinancialMock,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";

export type EvacuationFinancialLawCardProps = {
  form: FormInstance<EvacuationFinancialFormValues>;
  data: EvacuationFinancialMock;
};
