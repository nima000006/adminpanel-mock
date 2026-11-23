import { FormInstance } from "antd";

import {
  EvacuationFinancialFormValues,
  EvacuationFinancialMock,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";

export type NewResidenceFinancialLawCardProps = {
  form: FormInstance<EvacuationFinancialFormValues>;
  data: EvacuationFinancialMock;
};
