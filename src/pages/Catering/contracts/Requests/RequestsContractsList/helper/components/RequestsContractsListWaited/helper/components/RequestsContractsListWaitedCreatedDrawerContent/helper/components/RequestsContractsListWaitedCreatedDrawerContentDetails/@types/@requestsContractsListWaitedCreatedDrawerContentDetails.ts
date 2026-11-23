import { FormInstance } from "antd";

import { GetAllRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";
import { RequestsContractsListWaitedCreatedDrawerContentFormTypes } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/helper/components/RequestsContractsListWaitedCreatedDrawerContent/@types/@requestsContractsListWaitedCreatedDrawerContent";

export type RequestsContractsListWaitedCreatedDrawerContentDetailsProps = {
  form: FormInstance<RequestsContractsListWaitedCreatedDrawerContentFormTypes>;
  data?: GetAllRequestContractsViewResponse;
};
