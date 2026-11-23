import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type DormitoryBasicInfoQualityListFormType = {
  title: string;
  displayOrder: number;
  dormitoryType: SelectType<IdTitle>;
  checked: boolean;
};

// ! APIs
export type GetDormitoryBasicInfoQualityGradeListRequest = {
  title?: string;
  accommodationType?: string;
  visible?: boolean;
  createdBy?: string;
  createdDateFrom?: string;
  createdDateTo?: string;
  modifiedBy?: string;
  modifiedDateFrom?: string;
  modifiedDateTo?: string;
  pageSize: number;
  pageNumber: number;
  sort?: string;
  sortDirection?: "ASC" | "DESC";
};

export type DormitoryBasicInfoQualityGradeType = {
  uuid: string;
  title: string;
  accommodationType: {
    id: number;
    name: string;
    title: string;
  };
  displayOrder: number;
  visible: boolean;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetDormitoryBasicInfoQualityGradeListResponse = {
  content: DormitoryBasicInfoQualityGradeType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type DormitoryTypesListResponse = IdTitleName[];

export type CreateDormitoryQualityGradeRequest = {
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
  accommodationType: string;
  displayOrder: number;
  visible: boolean;
};

export type CreateDormitoryQualityGradeResponse = {
  uuid: string;
  title: string;
  accommodationType: IdTitleName;
  displayOrder: number;
  visible: boolean;
};

export type EditDormitoryQualityGradeRequest = {
  id: string;
  body: {
    displayOrder: number;
    visible: boolean;
  };
};

export type EditDormitoryQualityGradeResponse = {
  uuid: string;
  title: string;
  accommodationType: IdTitleName;
  displayOrder: number;
  visible: boolean;
};
