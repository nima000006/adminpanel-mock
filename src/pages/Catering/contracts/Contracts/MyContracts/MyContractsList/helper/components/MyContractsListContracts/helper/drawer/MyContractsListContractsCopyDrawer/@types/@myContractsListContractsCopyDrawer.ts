import { MyContractsListContractsRecordType } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/@types/@myContractsListContracts";
import { MyContractsListContractsCopyDrawerStep } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsCopyDrawer/helper/components/MyContractsListContractsCopyDrawerContent/@types/@myContractsListContractsCopyDrawerContent";

export type MyContractsListContractsCopyDrawerProps = {
  open: boolean;
  record: MyContractsListContractsRecordType | null;
  onClose: () => void;
  onSuccess: () => void;
  initialStep?: MyContractsListContractsCopyDrawerStep;
};
