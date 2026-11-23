//! LAYOUTs

import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ContractsListFilterFormType = {
  ecosystemIds: SelectType<IdTitle>[];
  parties: SelectType<IdTitle>[];
  services: SelectType<IdTitleName>;
  categoryIds: SelectType<IdTitle>[];
  ruleBeneficiariesUsernames: SelectType<IdTitleName>;
  date: string[];
};

export type ContractListFilterItemsType = {
  ecosystemIds?: string;
  services?: string;
  categoryIds?: string;
  ruleBeneficiariesBranchIds?: string;
  partiesIds?: string;
  from?: string;
  to?: string;
  // Todo[Atefeh]: uncomment when api got ready
  // templateIds?: string;
};

//! APIs
// Request type for getContractsList
export type GetContractsListRequest = {
  ecosystemIds?: string;
  statuses?: string;
  services?: string;
  categoryIds?: string;
  ruleBeneficiariesUsernames?: string;
  ruleBeneficiariesBranchIds?: string;
  templateIds?: string;
  partiesIds?: string;
  from?: string;
  to?: string;
  page: number;
  pageSize: number;
};

// Nested types for response content
export type ContractsRuleStatus = IdTitleName;

export type GetContractsListContent = {
  id: number;
  toEnd: number;
  contractId: number;
  templateId: number;
  status: ContractsRuleStatus;
  ruleBeneficiariesTitles: string[];
  ecosystemTitle: string;
  partiesTitles: string[];
  samimService: string;
  categoryTitle: string;
  countBeneficiaryDynamicBeneficiary: number;
  countBeneficiary: number;
  startDate: string;
  endDate: string;
  createdDate: string;
  createdBy: string;
  modifiedBy: string;
  modifiedDate: string;
};

// Response type for getContractsList
export type GetContractsListResponse = {
  content: GetContractsListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
