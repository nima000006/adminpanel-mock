// ! APIs
export type GetBasicInfoDeactivationReasonsRequest = {
  kind?: "REJECT" | "RETURN" | "DEACTIVATION" | "ADDITION" | "DEDUCTION" | "DISCOUNT";
  title?: string;
  module?: "ACCOMMODATION";
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

export type DormitoryDeactivationReasonType = {
  uuid: string;
  title: string;
  module: {
    id: number;
    name: string;
    title: string;
  };
  visible: boolean;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetBasicInfoDeactivationReasonsResponse = {
  content: DormitoryDeactivationReasonType[];
  pageNumber: number;
  pageSize: number;
  first: null;
  last: null;
  totalElements: number;
  totalPages: number;
  size: null;
};

export type EditDormitoryDeactivationReasonRequest = {
  id: string;
  body: {
    faDescription: string;
    visible: boolean;
  };
};
