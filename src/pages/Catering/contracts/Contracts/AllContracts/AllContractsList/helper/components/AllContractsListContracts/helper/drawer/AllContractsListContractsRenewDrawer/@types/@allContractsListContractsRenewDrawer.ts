import { AllContractsListContractsRecordType } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/@types/@allContractsListContracts";
import { AllContractsListContractsRenewDrawerStep } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsRenewDrawer/helper/components/AllContractsListContractsRenewDrawerContent/@types/@allContractsListContractsRenewDrawerContent";

export type AllContractsListContractsRenewDrawerProps = {
  open: boolean;
  record: AllContractsListContractsRecordType | null;
  onClose: () => void;
  onSuccess: () => void;
  initialStep?: AllContractsListContractsRenewDrawerStep;
};
