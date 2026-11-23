import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ContractStakeholdersDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number;
};

export type GetContractBeneficiaryDetailResponse = {
  categoryTitle: string;
  beneficiaryName: string;
  beneficiaryRuleType: IdTitleName;
  username: string;
  contractId: number;
  startDate: string;
  endDate: string;
  modifiedBy: string;
  modifiedDate: string;
  isMain?: boolean;
  isSupplier?: boolean;
  partitionCoefficient: number;
  beneficiarySupport: IdTitle;
  status: IdTitleName;
  templateId: number;
  createdDate: string;
  branchType: IdTitleName;
  deactivationReason: string;
};
