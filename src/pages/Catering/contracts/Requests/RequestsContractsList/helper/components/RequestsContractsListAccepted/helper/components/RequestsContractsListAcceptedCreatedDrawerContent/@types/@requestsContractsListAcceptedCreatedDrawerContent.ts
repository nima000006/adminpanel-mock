import { GetAllRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";

export type RequestsContractsListAcceptedCreatedDrawerContentProps = {
  onClose: () => void;
  data?: GetAllRequestContractsViewResponse;
  isLoading?: boolean;
};
