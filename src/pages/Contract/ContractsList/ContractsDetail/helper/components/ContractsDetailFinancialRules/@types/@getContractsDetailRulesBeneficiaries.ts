import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetContractsDetailRulesBeneficiariesRequest = {
  queries: {
    pageSize: number;
    pageNumber: number;
  };
  contractId: number;
  categoryId: number;
};

export type GetContractsDetailRulesBeneficiariesBusinessType = IdTitleName;

export type GetContractsDetailRulesBeneficiariesBranchType = IdTitleName;

export type GetContractsDetailRulesBeneficiariesService = IdTitleName;

export type GetContractsDetailRulesBeneficiariesContentItem = {
  id: number;
  beneficiary: string;
  nationalCode?: string;
  business: string;
  businessType: GetContractsDetailRulesBeneficiariesBusinessType;
  branchType: GetContractsDetailRulesBeneficiariesBranchType;
  branchId: number;
  branchName: string;
  supportId: number;
  supportTitle: string;
  partitionCoefficient: number;
  ecosystemTitle: string;
  service: GetContractsDetailRulesBeneficiariesService;
  partitionCoefficientType: string;
  beneficiaryRuleType?: GetContractsDetailRulesBeneficiariesBusinessType;
  status: GetContractsDetailRulesBeneficiariesBusinessType;
  supplier: boolean;
  isMain: boolean;
};

export type GetContractsDetailRulesBeneficiariesResponse = {
  content: GetContractsDetailRulesBeneficiariesContentItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
