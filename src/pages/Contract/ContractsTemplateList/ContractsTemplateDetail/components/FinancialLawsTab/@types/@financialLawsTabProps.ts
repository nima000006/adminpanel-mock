import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { GetContractTemplateDetailResponse } from "../../../@types/@contractsTemplateDetail";

export type FinancialLawsTabProps = {
  data: GetContractTemplateDetailResponse | undefined;
  tempId?: string;
};

export type getContractCategoriesIdTitleResponse = IdTitle[];

export type getContractBeneficiaryAndFinancialRulesItems = {
  id: number;
  beneficiaryName: string;
  businessName: string;
  businessType: IdTitleName;
  branchType: IdTitleName;
  percentage: number;
  beneficiaryRuleType: string;
  isSupplier: boolean;
  // groupsType: number; // این کلید رو خودم اضافه کرم و نیاز است که از سمت بک اند اضافه شود
  beneficiarySupport: IdTitleName;
  userId: number;
  username: string;
  branchId: number;
};

export type getContractBeneficiaryAndFinancialRulesResponse =
  getContractBeneficiaryAndFinancialRulesItems[];

export type getContractBeneficiaryAndFinancialRulesRequest = {
  categoryId: number;
  contractId: number;
};
