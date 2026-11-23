import { GetMyRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/@types/@requestMyContractsListWaited";

export type RequestMyContractsListAcceptedRenewedAndCopiedDrawerContentProps = {
  onClose: () => void;
  data?: GetMyRequestContractsViewResponse;
  isLoading?: boolean;
};
