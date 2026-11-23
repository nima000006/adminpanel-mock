import { GetAllRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";

export type RequestsContractsListAcceptedRenewedAndCopiedDrawerContentProps = {
  onClose: () => void;
  data?: GetAllRequestContractsViewResponse;
  isLoading?: boolean;
};
