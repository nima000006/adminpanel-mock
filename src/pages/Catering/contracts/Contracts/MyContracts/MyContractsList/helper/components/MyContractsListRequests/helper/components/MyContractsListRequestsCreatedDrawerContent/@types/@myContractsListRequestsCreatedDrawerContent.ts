import { GetMyRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/@types/@requestMyContractsListWaited";

export type MyContractsListRequestsCreatedDrawerContentProps = {
  onClose: () => void;
  data?: GetMyRequestContractsViewResponse;
  isLoading?: boolean;
};
