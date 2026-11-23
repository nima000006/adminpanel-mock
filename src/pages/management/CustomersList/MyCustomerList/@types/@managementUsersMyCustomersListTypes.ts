export type ManagementMyCustomerListData = {
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

export type ManagementMyCustomerListDataResponse = {
  content: ManagementMyCustomerListData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
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

export type UseMyCustomerListAdvanceFilterFormType = {
  regionsId: SelectTypes[];
  fromCreatedDate: string;
  toCreatedDate: string;
};

export type MyUserListByAdvanceFilterResponse = {
  content: ManagementMyCustomerListData[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyUserListByAdvanceFilterRequest = {
  firstName?: string;
  lastName?: string;
  username?: string;
  regionsId?: number[];
  fromCreatedDate?: string;
  toCreatedDate?: string;
  pageSize: number;
  pageNumber: number;
  mobileNumber?: string;
  email?: string;
};
