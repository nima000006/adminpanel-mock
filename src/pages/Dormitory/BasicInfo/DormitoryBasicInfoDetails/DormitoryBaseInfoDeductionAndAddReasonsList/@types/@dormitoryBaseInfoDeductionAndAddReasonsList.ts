import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type DormitoryBaseInfoDeductionAndAddReasonsFormType = {
  reasonType: string;
  title: string;
  description: string;
  checked: boolean;
};

// ! APIs
export type GetDormitoryBaseInfoDeductionAndAddReasonsListRequest = {
  title?: string;
  kind?: string;
  visible?: boolean;
  createdBy?: string;
  createdDateFrom?: string;
  createdDateTo?: string;
  modifiedBy?: string;
  modifiedDateFrom?: string;
  modifiedDateTo?: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type GetDormitoryBaseInfoDeductionAndAddReasonsListItemType = {
  uuid: string;
  kind: IdTitleName;
  title: string;
  description?: string;
  visible: boolean;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetDormitoryBaseInfoDeductionAndAddReasonsListResponse = {
  content: GetDormitoryBaseInfoDeductionAndAddReasonsListItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type EditDormitoryBaseInfoDeductionAndAddReasonsRequest = {
  uuid: string;
  faDescription?: string;
  enDescription?: string;
  arDescription?: string;
  visible: boolean;
};

export type EditDormitoryBaseInfoDeductionAndAddReasonsResponse = string;
