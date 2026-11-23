import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllResidenceWaitingListAdvanceFilterFormType = {
  business: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  residence: SelectType<IdTitleName>[];
  residenceType: SelectType<IdTitleName>[];
  requestKind: SelectType<IdTitleName>[];
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  quality: SelectType<{ uuid: string; title: string }>[];
  viewStatusToUser: SelectType<IdTitleName>[];
};

export type AllResidenceListSearchContent = {
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

export type AllResidenceListSearchRequest = {
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

export type AllResidenceListSearchResponse = {
  content: AllResidenceListSearchContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetResidenceRequestTypeResponse = IdTitleName[];

export type GetResidenceDropDownListRequest = {
  pageSize?: number;
  pageNumber?: number;
  title?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type GetResidenceDropDownListContent = {
  uuid: string;
  title: string;
};

export type GetResidenceDropDownListResponse = {
  content: GetResidenceDropDownListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
