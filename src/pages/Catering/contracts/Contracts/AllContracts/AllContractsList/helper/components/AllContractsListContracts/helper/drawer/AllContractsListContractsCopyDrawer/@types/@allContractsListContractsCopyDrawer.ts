import { AllContractsListContractsRecordType } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/@types/@allContractsListContracts";
import { AllContractsListContractsCopyDrawerStep } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/helper/drawer/AllContractsListContractsCopyDrawer/helper/components/AllContractsListContractsCopyDrawerContent/@types/@allContractsListContractsCopyDrawerContent";

export type AllContractsListContractsCopyDrawerProps = {
  open: boolean;
  record: AllContractsListContractsRecordType | null;
  onClose: () => void;
  onSuccess: () => void;
  initialStep?: AllContractsListContractsCopyDrawerStep;
};
