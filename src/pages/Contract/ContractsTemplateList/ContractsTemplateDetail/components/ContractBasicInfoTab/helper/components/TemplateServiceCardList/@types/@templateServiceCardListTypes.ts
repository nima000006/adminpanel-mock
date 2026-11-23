import { BeneficiaryBannerItem } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/@types/@contractsTemplateDetail";

export type TemplateServiceCardListProps = {
  data: BeneficiaryBannerItem[] | undefined[] | undefined;
  onRefresh: (() => void) | undefined;
  isArchive: boolean | undefined;
};
