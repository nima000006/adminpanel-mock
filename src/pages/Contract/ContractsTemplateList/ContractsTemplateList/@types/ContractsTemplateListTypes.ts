import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ContractTemplateListItem = {
  id: number;
  title: string;
  countConnectedContract: number;
  ecosystemTitle: string;
  status: IdTitleName;
  partiesTitle: string[];
  samimService: IdTitleName;
  categoriesTitle: string[];
  countBeneficiaryDynamicBeneficiary: number;
  countBeneficiary: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetContractTemplateListResponse = {
  content: ContractTemplateListItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type GetContractTemplateListRequest = {
  statuses?: string; // تمامی موارد این بخش باید به صورت [] باشند اما به دلیل مشکل در این api به این صورت تایپ دادیم.
  ecosystemIds?: number;
  services?: string;
  categoryIds?: string;
  parties?: string;
  page: number;
  pageSize: number;
};

export type ContractTemplateFilters = Partial<
  Omit<GetContractTemplateListRequest, "page" | "pageSize">
>;

export type PartiesItem = IdTitle;

export type GetContractPartiesResponse = {
  content: PartiesItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetContractPartiesRequest = {
  page: number;
  size: number;
};

//! LAYOUTs
export type ContractTemplateListAdvanceFilterFormTYpe = {
  ecosystemIds: SelectType<IdTitle>;
  statuses: SelectType<IdTitleName>[];
  services: SelectType<IdTitleName>[];
  categoryIds: SelectType<IdTitle>[];
  parties: SelectType<IdTitle>[];
};
