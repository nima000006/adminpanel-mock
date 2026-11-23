import { GetAllRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";

export type AllContractsDetailContractProps = {
  contractDetail?: GetAllRequestContractsViewResponse;
  isLoading?: boolean;
  onRefetch: () => void;
};
