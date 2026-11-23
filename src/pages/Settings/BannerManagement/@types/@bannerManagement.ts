type IdNameTitleDesc = {
  id: number;
  name: string;
  faTitle: string;
  description: string;
};

export type BannerManageMentBranchType = {
  id: number;
  title: string;
  description: string;
  imageURL: string;
  imageLink: string;
  bannerSectionType: IdNameTitleDesc;
  active: boolean;
  all: boolean;
};

export type BannerDetailData = {
  id: number;
  imageURL: string;
  imageLink: string;
  description: string;
  imageURLTitle: string;
  title: string;
  active: boolean;
  branches: number[];
  samimService: IdNameTitleDesc;
  sectionType: IdNameTitleDesc;
  staffType: IdNameTitleDesc;
  isAll: boolean;
  createdDate: string;
  modifiedDate: string;
  modifiedBy: string;
};

export type ServiceManagementBannerSelectedItemsType = {
  staff: { id: null | number; title: null | string };
  branch: { id: null | number; title: null | string };
};

// @API
export type GetBannersActiveBranchesRequest = {
  serviceId: number;
  staffType: number;
  bannerTypeId: number;
};

export type GetBannersActiveBranchesResponse = BannerManageMentBranchType[];

export type GetActiveBannersDetailResponse = BannerDetailData;

export type CreateBannerActiveBranchesRequest = {
  serviceId: number;
  active: boolean;
  branchIds: number[];
  description: string;
  imageLink: string;
  imageURL: string;
  sectionId: number;
  title: string;
  isAll: boolean;
  staffTypeId: number;
};
export type CreateBannerActiveBranchesResponse = number;

export type UpdateBannerActiveBranchesRequest = {
  serviceId: number;
  active: boolean;
  branchIds: number[];
  description: string;
  imageLink: string;
  imageURL: string;
  sectionId: number;
  title: string;
  id: number;
  isAll: boolean;
  staffTypeId: number;
};
export type UpdateBannerActiveBranchesResponse = number;

export type AppBannerTableModelProps = {
  onVisitClickHandler: (id: number) => void;
  onEditClickHandler: (id: number) => void;
};

export type BannerTableInfoProps = {
  seIsEditBannerDrawerOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
  setIsVisitBannerDrawerOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
  selectedItems: ServiceManagementBannerSelectedItemsType;
};
