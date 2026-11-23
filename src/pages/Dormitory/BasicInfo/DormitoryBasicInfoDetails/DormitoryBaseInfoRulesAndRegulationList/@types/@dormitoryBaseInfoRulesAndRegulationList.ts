import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type DormitoryBaseInfoRulesAndRegulationFormType = {
  title: string;
  typeOfRules: SelectType<IdTitleName>;
  typeOfDormitory: SelectType<IdTitleName>;
  description: string;
  checked: boolean;
};

// ! APIs
export type GetDormitoryBasicInfoRulesAndRegulationListRequest = {
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type DormitoryBasicInfoRulesAndRegulationType = {
  uuid: string;
  title: string;
  kind: IdTitleName;
  accommodationType: IdTitleName;
  visible: boolean;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetDormitoryBasicInfoRulesAndRegulationListResponse = {
  content: DormitoryBasicInfoRulesAndRegulationType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type DormitoryRegulationTypesListResponse = IdTitleName[];

export type CreateDormitoryRulesAndRegulationRequest = {
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
  kind: string;
  accommodationType: string;
  faDescription: string;
  enDescription?: string;
  arDescription?: string;
  visible: boolean;
};

export type CreateDormitoryRulesAndRegulationResponse = {
  uuid: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  faDescription: string;
  enDescription: string;
  arDescription: string;
  kind: IdTitleName;
  accommodationType: IdTitleName;
  visible: boolean;
  template: boolean;
};

export type DormitoryRulesAndRegulationDetailRequest = string;

export type DormitoryRulesAndRegulationDetailResponse = {
  uuid: string;
  title: string;
  kind: IdTitleName;
  accommodationType: IdTitleName;
  description: string;
  visible: boolean;
  template: boolean;
};

export type EditDormitoryRulesAndRegulationRequest = {
  id: string;
  body: {
    faDescription: string;
    enDescription?: string;
    arDescription?: string;
    visible: boolean;
  };
};

export type EditDormitoryRulesAndRegulationResponse = {
  uuid: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  faDescription: string;
  enDescription: string;
  arDescription: string;
  kind: IdTitleName;
  accommodationType: IdTitleName;
  visible: boolean;
  template: boolean;
};
