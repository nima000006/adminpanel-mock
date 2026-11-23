import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ContractStackHoldersListItem = {
  id: number;
  beneficiaryName: string;
  status: IdTitleName;
  contractId: number;
  partitionCoefficient: number;
  beneficiaryRuleType: IdTitleName;
  personalityType: IdTitleName;
  isMain: boolean;
  ecosystem: string;
  supplierName: string;
  businessName: string;
  samimService: IdTitleName;
  category: string;
  branchType: IdTitleName;
  startDate: string;
  endDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetStackHoldersListResponse = {
  content: ContractStackHoldersListItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type GetStackHoldersListRequest = {
  ecosystemIds?: string;
  status?: string;
  categoryIds?: string;
  ruleTypes?: string;
  branchTypes?: string;
  services?: string;
  from?: string;
  to?: string;
  pageSize: number;
  pageNumber: number;
};

export type StakeholderFilters = Partial<
  Omit<GetStackHoldersListRequest, "pageNumber" | "pageSize">
>;
