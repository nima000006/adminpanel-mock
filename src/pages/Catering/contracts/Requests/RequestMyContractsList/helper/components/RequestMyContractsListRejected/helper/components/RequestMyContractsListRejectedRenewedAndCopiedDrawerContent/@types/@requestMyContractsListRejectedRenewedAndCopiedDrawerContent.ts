import { GetMyRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/@types/@requestMyContractsListWaited";

export type RequestMyContractsListRejectedRenewedAndCopiedDrawerContentProps = {
  onClose: () => void;
  data?: GetMyRequestContractsViewResponse;
  isLoading?: boolean;
};
