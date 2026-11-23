import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetMyVendorListBranchDto = {
  branchCode: number;
  branchName: string;
  businessId?: number;
};

export type GetMyVendorListStatusTypeDto = {
  id: number;
  title: string;
  faTitle: string;
};

export type GetMyVendorListParentVendorDto = {
  id: number;
  parentVendor: string;
  title: string;
  description: string;
  branches: GetMyVendorListBranchDto[];
  latitude: number;
  longitude: number;
  economicNom: string;
  score: number;
  commentsCounts: number;
  orderCounts: number;
  leastOrder: number;
  commissionType: number;
  commissionName: string;
  address: string;
  privatePhone: string;
  status: string;
  statusId: number;
  statusType: string;
  deActiveReason: string;
  managerFirstName: string;
  managerLastName: string;
  managerUserName: string;
  managerUserId: number;
  managerMobile: string;
  logoName: string;
  coverName: string;
  phone1: string;
  phone2: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  userId: string;
  nationalNom: string;
  postalCode: string;
  businessId: number;
  branchId: number;
  customerId: number;
  provinceId: number;
  cityId: number;
  provinceTitle: string;
  cityTitle: string;
  iban: string;
  mainBranch: boolean;
  vip: boolean;
};

export type GetMyVendorListContent = {
  id: number;
  parentVendor: GetMyVendorListParentVendorDto;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  score: number;
  commentsCounts: number;
  orderCounts: number;
  leastOrder: number;
  address: string;
  privatePhone: string;
  status: string;
  statusId: number;
  statusType: GetMyVendorListStatusTypeDto;
  deActiveReason: GetMyVendorListStatusTypeDto;
  managerFirstName: string;
  managerLastName: string;
  managerUserName: string;
  managerUserId: number;
  logoName: string;
  logoUrl: string;
  coverName: string;
  logoTitle: string;
  coverTitle: string;
  phone1: string;
  phone2: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  userId: string;
  managerMobile: string;
  nationalNom: string;
  economicNom: string;
  postalCode: string;
  provinceId: number;
  cityId: number;
  provinceTitle: string;
  cityTitle: string;
  branches: GetMyVendorListBranchDto[];
  iban: string;
  mainBranch: boolean;
  vip: boolean;
};

export type GetMyVendorListResponse = {
  content: GetMyVendorListContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetMyVendorListRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
  };
  body: {
    title?: string;
    nationalNom?: string;
    economicNom?: string;
    managerFirstName?: string;
    managerLastName?: string;
    managerUserName?: string;
    branchIds?: number[];
    statusType?: number[];
    provinceIds?: number[];
    cityIds?: number[];
  };
};

export type CateringMyVendorListRecordType = GetMyVendorListContent;

export type CateringMyVendorListAdvanceFilterFormType = {
  province?: SelectType<IdTitle>[];
  city?: SelectType<IdTitle>[];
};

export type CreateMyVendorRequest = {
  parentVendorId?: number;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  address: string;
  statusType: string;
  managerFirstName?: string;
  managerLastName?: string;
  managerUserName?: string;
  managerMobile?: string;
  branches: number[];
  logoName?: string;
  coverName?: string;
  phone1: string;
  phone2?: string;
  cityId: number;
  economicNom: string;
  nationalNom: string;
  postalCode: string;
  iban: string;
};

export type CreateMyVendorResponse = number;

export type UpdateMyVendorRequest = {
  id: number;
  parentVendorId?: number;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  address: string;
  statusType: string;
  managerFirstName?: string;
  managerLastName?: string;
  managerUserName?: string;
  managerMobile?: string;
  logoName?: string;
  coverName?: string;
  phone1: string;
  phone2?: string;
  branches: number[];
  cityId: number;
  economicNom: string;
  nationalNom: string;
  postalCode: string;
  modifiedDate?: string;
  iban: string;
};

export type UpdateMyVendorResponse = number;

export type GetMyVendorViewRequest = {
  id: number;
};

export type GetMyVendorViewResponse = GetMyVendorListContent;

export type DeactiveMyVendorRequest = {
  id: number;
  statusType: number;
  deActiveReason?: number;
};

export type DeactiveMyVendorResponse = void;
