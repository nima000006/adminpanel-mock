import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type DormitoryBaseInfoReasonReturnAndRefuseFormType = {
  reasonType: string;
  description: string;
  checked: boolean;
};

// ! APIs
export type GetDormitoryReasonReturnAndRefuseListRequest = {
  title?: string;
  module?: string;
  kind?: string;
  visible?: boolean;
  createdBy?: string;
  createdDateFrom?: string;
  createdDateTo?: string;
  modifiedBy?: string;
  modifiedDateFrom?: string;
  modifiedDateTo?: string;
  pageNumber: number;
  pageSize: number;
  sort?: string;
  sortDirection?: "ASC" | "DESC";
};

export type GetDormitoryReasonReturnAndRefuseListItemType = {
  uuid: string;
  title: string;
  module: IdTitleName;
  kind: IdTitleName;
  description?: string;
  visible: boolean;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetDormitoryReasonReturnAndRefuseListResponse = {
  content: GetDormitoryReasonReturnAndRefuseListItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type EditDormitoryReasonReturnAndRefuseRequest = {
  uuid: string;
  faTitle?: string;
  enTitle?: string;
  arTitle?: string;
  faDescription?: string;
  enDescription?: string;
  arDescription?: string;
  visible: boolean;
};

export type EditDormitoryReasonReturnAndRefuseResponse = {
  uuid: string;
  module: IdTitleName;
  kind: IdTitleName;
  title: string;
  description: string;
  visible: boolean;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetViewDormitoryReasonReturnAndRefuseListRequest = {
  uuid: string;
  visibility: boolean;
};

export type GetViewDormitoryReasonReturnAndRefuseListResponse = {
  uuid: string;
  kind: IdTitleName;
  module: IdTitleName;
  title: string;
  description: string;
  visible: boolean;
};
