import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AllContractsListContractsRecordType } from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/@types/@allContractsListContracts";

export type AllContractsListContractsDeactivateModalFormType = {
  deActiveReason: SelectType<IdTitle>;
};

export type AllContractsListContractsDeactivateModalProps = {
  open: boolean;
  record: AllContractsListContractsRecordType | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: (values: AllContractsListContractsDeactivateModalFormType) => void;
};
