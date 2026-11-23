import { GetAllRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";

export type RequestsContractsListRejectedRenewedAndCopiedDrawerContentProps = {
  onClose: () => void;
  data?: GetAllRequestContractsViewResponse;
  isLoading?: boolean;
};
