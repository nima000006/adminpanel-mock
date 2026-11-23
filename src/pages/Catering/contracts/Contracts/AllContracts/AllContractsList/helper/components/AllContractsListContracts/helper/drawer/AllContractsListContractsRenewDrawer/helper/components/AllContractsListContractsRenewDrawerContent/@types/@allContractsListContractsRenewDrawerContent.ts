import { GetAllRequestContractsViewResponse } from "@pages/Catering/contracts/Requests/RequestsContractsList/helper/components/RequestsContractsListWaited/@types/@requestsContractsListWaited";
import { GetDetailAllSelfsProductsContent } from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

export type AllContractsListContractsRenewDrawerStep = 0 | 1;

export type AllContractsListContractsRenewDrawerContentFormType = {
  contractTitle: string;
  contractNo: string;
  contractDateRange: [string, string];
  contractDescription?: string;
  firstImage?: string;
  secondImage?: string;
  thirdImage?: string;
  fourthImage?: string;
};

export type AllContractsListContractsRenewDrawerContentProps = {
  contractId: number;
  data?: GetAllRequestContractsViewResponse;
  isLoading?: boolean;
  onCloseDrawer: () => void;
  onSuccess: () => void;
  foodsRefreshKey: number;
  onOpenAddFood: (contractId: number) => void;
  onOpenAddSideDish: (contractId: number) => void;
  onOpenEditFood: (product: GetDetailAllSelfsProductsContent) => void;
  onContractExtended: (contractId: number) => void;
  initialStep?: AllContractsListContractsRenewDrawerStep;
};
