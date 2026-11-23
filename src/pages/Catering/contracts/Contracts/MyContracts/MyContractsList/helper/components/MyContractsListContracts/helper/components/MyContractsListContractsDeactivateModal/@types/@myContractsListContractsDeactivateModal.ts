import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { MyContractsListContractsRecordType } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/@types/@myContractsListContracts";

export type MyContractsListContractsDeactivateModalFormType = {
  deActiveReason: SelectType<IdTitle>;
};

export type MyContractsListContractsDeactivateModalProps = {
  open: boolean;
  record: MyContractsListContractsRecordType | null;
  confirmLoading?: boolean;
  onCancel: () => void;
  onConfirm: (values: MyContractsListContractsDeactivateModalFormType) => void;
};
