type IdNameType = {
  id: number;
  name: string;
  title: string;
};

type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};

export type UseEstelamSajedAdvanceFilterFormType = {
  branch: SelectTypes;
  date: string[];
};

export type EstelamSajedListItemType = {
  id: number;
  accessRequestsStatus: IdNameType;
  employeeCode: string;
  branchName: string;
  files: string[];
  description: string;
  user: {
    id: number;
    firstName: string;
    enFirstName: string;
    lastName: string;
    enLastName: string;
    username: string;
    mobileNumber: string;
    regionId: number;
    region: string;
    email: string;
    createdDateTime: string;
  };
  createdDate: string;
  modifiedDate: string;
  modifierFirstname: string;
  modifierLastname: string;
  rejectReason: IdNameType;
  rejectReasonDescription: string;
  waitingSeconds: number;
  modifyBy: string;
  positionTitle: string;
};

export type EstelamSajedListResponse = {
  content: EstelamSajedListItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type EstelamSajedListRequest = {
  params: { pageNo: number; pageSize: number };
  statusId: number;
};

export type EstelamSajedListAdvanceFilterRequest = {
  statusId: number;
  username?: string;
  mobileNumber?: string;
  employeeCode?: string;
  branchIds?: number[];
  requestDateFrom?: string;
  requestDateTo?: string;
  firstName?: string;
  lastName?: string;
  pageNumber: number;
  pageSize: number;
};
export type EstelamSajedAdvanceFilterRequest = {
  username?: string;
  mobileNumber?: string;
  employeeCode?: string;
  branchIds?: number[];
  requestDateFrom?: string;
  requestDateTo?: string;
  firstName?: string;
  lastName?: string;
};
