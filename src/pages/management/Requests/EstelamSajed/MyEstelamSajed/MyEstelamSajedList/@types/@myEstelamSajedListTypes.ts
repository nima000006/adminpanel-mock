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

export type UseMyEstelamSajedAdvanceFilterFormType = {
  branch: SelectTypes;
  date: string[];
};

export type MyEstelamSajedListItemType = {
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
  organizationTitle: string;
  positionTitle: string;
  branchId: number;
};

export type MyEstelamSajedListResponse = {
  content: MyEstelamSajedListItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyEstelamSajedListRequest = {
  params: { pageNo: number; pageSize: number };
  statusId: number;
};

export type MyEstelamSajedListAdvanceFilterRequest = {
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
export type MyEstelamSajedAdvanceFilterRequest = {
  username?: string;
  mobileNumber?: string;
  employeeCode?: string;
  branchIds?: number[];
  requestDateFrom?: string;
  requestDateTo?: string;
  firstName?: string;
  lastName?: string;
};
