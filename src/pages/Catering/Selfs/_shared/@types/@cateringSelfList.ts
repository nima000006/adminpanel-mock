import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringSelfBranchDto = {
  branchCode: number;
  branchName: string;
};

export type CateringSelfStatusTypeDto = {
  id: number;
  title: string;
  faTitle: string;
};

export type CateringSelfRecordType = {
  id: number;
  title: string;
  description: string;
  rules: string;
  ownerBranchCodeBranchCode: number;
  ownerBranchCodeBranchName: string;
  genderType: number;
  logoName: string;
  coverName: string | null;
  logoTitle: string | null;
  coverTitle: string | null;
  phone: string;
  managerUserName: string | null;
  managerFirstName: string;
  managerLastName: string;
  managerUserId: number | null;
  latitude: number;
  longitude: number;
  score: number | null;
  modifiedDate: string | null;
  createdDate: string | null;
  statusType: CateringSelfStatusTypeDto | null;
  capacity: number;
  branchDtos: CateringSelfBranchDto[];
  restaurantPhone: string;
  restaurantPhone2: string | null;
  provinceName: string | null;
  provinceId: number;
  cityName: string | null;
  cityId: number | null;
  address: string;
  postalCode: string;
  modifiedByUsername: string | null;
  modifiedBy: string | null;
  private: boolean;
};

export type GetCateringSelfsListResponse = {
  content: CateringSelfRecordType[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetCateringSelfsListRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
  };
  body: {
    title?: string;
    ownerBranchCode?: number;
    genderType?: number;
    statusType?: number[];
    provinceIds?: number[];
    cityIds?: number[];
  };
};

export type CateringSelfListAdvanceFilterFormType = {
  branch?: SelectType<IdTitle>;
  province?: SelectType<IdTitle>[];
  city?: SelectType<IdTitle>[];
  gender?: SelectType<IdTitle>;
};

export type GetCateringMySelfsListRequest = GetCateringSelfsListRequest;
export type GetCateringMySelfsListResponse = GetCateringSelfsListResponse;

export type CateringSelfAccessMode = "all" | "my";
