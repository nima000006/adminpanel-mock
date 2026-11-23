export type DormitoryBasicInfoCourseListFormType = {
  title: string;
  checked: boolean;
};

// ! APIs
export type DormitoryCourseListRequest = {
  title?: string;
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

export type DormitoryCourseListItemType = {
  uuid: string;
  title: string;
  visible: boolean;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type DormitoryCourseListResponse = {
  content: DormitoryCourseListItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type CreateDormitoryCourseRequest = {
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
  visible: boolean;
};

export type CreateDormitoryCourseResponse = {
  uuid: string;
  title: string;
  visible: boolean;
};

export type EditDormitoryCourseRequest = {
  uuid: string;
  visible: boolean;
};

export type EditDormitoryCourseResponse = {
  uuid: string;
  title: string;
  visible: boolean;
};
