//! APIs
export type UserListByAdvanceFilterContentType = {
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

export type UserListByAdvanceFilterResponse = {
  content: UserListByAdvanceFilterContentType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type UserListByAdvanceFilterRequest = {
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
