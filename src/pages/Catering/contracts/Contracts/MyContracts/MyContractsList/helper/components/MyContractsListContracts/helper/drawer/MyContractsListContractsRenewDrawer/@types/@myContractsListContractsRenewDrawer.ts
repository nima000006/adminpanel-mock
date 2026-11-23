import { MyContractsListContractsRecordType } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/@types/@myContractsListContracts";
import { MyContractsListContractsRenewDrawerStep } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/helper/drawer/MyContractsListContractsRenewDrawer/helper/components/MyContractsListContractsRenewDrawerContent/@types/@myContractsListContractsRenewDrawerContent";

export type MyContractsListContractsRenewDrawerProps = {
  open: boolean;
  record: MyContractsListContractsRecordType | null;
  onClose: () => void;
  onSuccess: () => void;
  initialStep?: MyContractsListContractsRenewDrawerStep;
};
