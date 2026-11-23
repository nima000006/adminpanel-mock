import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyResidenceListAdvanceFilterFormType = {
  branch: SelectType<IdTitleName>[];
  residence: SelectType<IdTitleName>[];
  residenceType: SelectType<IdTitleName>[];
  requestKind: SelectType<IdTitleName>[];
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  quality: SelectType<{ uuid: string; title: string }>[];
  viewStatusToUser: SelectType<IdTitleName>[];
};

export type MyResidenceWaitingListAdvanceFilterFormType =
  MyResidenceListAdvanceFilterFormType;

export type MyResidenceListSearchContent = {
  uuid: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  requestNumber: string;
  requestKind: IdTitleName;
  accommodationType: IdTitleName;
  status: IdTitleName;
  qualityGrade: string;
  visible: boolean;
  provinceId: number;
  provinceTitle: string;
  cityId: number;
  cityTitle: string;
  nominalCapacity: number;
  dayCount: number;
  businessName: string;
  businessId: number;
  branchName: string;
  branchId: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type MyResidenceListSearchRequest = {
  statuses?: string[];
  businessIds?: number[];
  branchIds?: number[];
  uuids?: string[];
  accommodationTypes?: string[];
  requestKinds?: string[];
  provinceIds?: number[];
  cityIds?: number[];
  qualityGradeUuids?: string[];
  visible?: boolean;
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  sortDirection?: string;
};

export type MyResidenceListSearchResponse = {
  content: MyResidenceListSearchContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetMyResidenceDropDownListRequest = {
  pageSize?: number;
  pageNumber?: number;
  title?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type GetMyResidenceDropDownListContent = {
  uuid: string;
  title: string;
};

export type GetMyResidenceDropDownListResponse = {
  content: GetMyResidenceDropDownListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
