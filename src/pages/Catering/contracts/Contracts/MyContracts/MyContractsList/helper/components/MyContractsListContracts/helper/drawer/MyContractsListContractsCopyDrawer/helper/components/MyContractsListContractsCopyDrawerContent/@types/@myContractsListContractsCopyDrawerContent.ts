import { GetMyRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/@types/@requestMyContractsListWaited";
import { GetDetailMySelfsProductsContent } from "@pages/Catering/Selfs/MySelfs/MySelfDetail/helper/components/CateringMySelfsFoodSchedule/@types/@cateringMySelfsFoodSchedule";

export type MyContractsListContractsCopyDrawerStep = 0 | 1; //steps

export type MyContractsListContractsCopyDrawerContentFormType = {
  contractTitle: string;
  contractNo: string;
  contractDateRange: [string, string];
  contractDescription?: string;
  firstImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type MyContractsListContractsCopyDrawerContentProps = {
  contractId: number;
  data?: GetMyRequestContractsViewResponse;
  isLoading?: boolean;
  onCloseDrawer: () => void;
  onSuccess: () => void;
  foodsRefreshKey: number;
  onOpenAddFood: (contractId: number) => void;
  onOpenEditFood: (product: GetDetailMySelfsProductsContent) => void;
  onContractCopied: (contractId: number) => void;
  initialStep?: MyContractsListContractsCopyDrawerStep;
};
