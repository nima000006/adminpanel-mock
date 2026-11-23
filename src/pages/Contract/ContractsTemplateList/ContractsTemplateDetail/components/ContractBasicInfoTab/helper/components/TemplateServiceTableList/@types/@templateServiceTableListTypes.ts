import { BeneficiaryBannerItem } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/@types/@contractsTemplateDetail";

export type DeActiveTableStatusRequest = {
  contractId: number;
  categoryId: number;
  reason: string;
  description: string;
};
export type ActiveTableStatusRequest = {
  contractId: number;
  categoryId: number;
};
export type DeleteTemplateRequest = {
  contractId: number;
  categoryId: number;
};

export type TemplateServiceTableListProps = {
  data: BeneficiaryBannerItem[] | undefined;
  onRefresh: (() => void) | undefined;
  isArchive: boolean | undefined;
};
