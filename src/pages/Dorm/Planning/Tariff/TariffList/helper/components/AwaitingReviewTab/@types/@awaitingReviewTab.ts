//! GENERAL
//! LAYOUT
//! API
export type getTariffListAwaitingReviewRequest = {
  maxResults: number;
  firstResult: number;
  statusId_EQ: number;
  branchId_IN?: string;
  dormitoryId_IN?: string;
  requestTypeId_IN?: string;
  waitingTimeId?: { queryParam: string; value: string };
  title_LIKE?: string;
  AssociationDormitory_title_LIKE?: string;
  AssociationBranchid_AssociationCategoryRegion_parentId_IN?: string;
  AssociationBranchid_regionId_IN?: string;
  sortings?: string | undefined;
};

export type getTariffListAwaitingReviewCountRequest = {
  statusId_EQ: number;
  branchId_IN?: string;
  dormitoryId_IN?: string;
  requestTypeId_IN?: string;
  waitingTimeId?: { queryParam: string; value: string };
  createDate?: string;
  AssociationBranchid_AssociationCategoryRegion_parentId_IN?: string;
  AssociationBranchid_regionId_IN?: string;
  title_LIKE?: string;
  AssociationDormitory_title_LIKE?: string;
  sortings?: string | undefined;
};
