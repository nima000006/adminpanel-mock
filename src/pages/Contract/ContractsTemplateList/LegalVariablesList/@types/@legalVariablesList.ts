import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! APIs
export type GetUndeterminedRuleBeneficiaryListRequest = {
  templateId: string;
  pageNumber: number;
  pageSize: number;
};

export type UndeterminedRuleBeneficiaryContent = {
  id: number;
  businessName: string;
  branchName: string;
  economicNumberLegal: string;
  beneficiaryFullName: null;
  naturalCode: null;
  status: IdTitleName;
  startDate: IdTitleName;
  endDate: IdTitleName;
};

export type GetUndeterminedRuleBeneficiaryListResponse = {
  contractTitle: string;
  categoryTitle: string;
  ruleType: IdTitleName;
  service: IdTitleName;
  branchType: IdTitleName;
  personalityGroupType: IdTitleName;
  partitionCoefficient: number;
  beneficiaries: {
    content: UndeterminedRuleBeneficiaryContent[];
    pageNumber: number;
    pageSize: number;
    first: boolean;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
  };
  beneficiarySupport: {
    id: number;
    title: IdTitleName;
  };
  isSupplier: boolean;
};
