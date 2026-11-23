//! GENERAL
//! LAYOUT
//! API
export type User = {
  firstName: string;
  lastName: string;
  nationalCode: string;
  nationality: string;
  studentNumber: string;
  createDate: string;
  levelName: string;
  fieldName: string;
  enTerm: string;
  mobile: string;
};
export type getAllUserWithFirstLastNameResponse = {
  status: number;
  msg: string;
  data: {
    totalElement: number;
    totalPage: number;
    userAdvancedFilterDtos: User[];
  };
};
export type getAllUserWithFirstLastNameRequest = {
  firstName: string | null;
  lastName: string | null;
  mobileNo: string | null;
  nationalNo: string | null;
  pageNumber: number;
  pageSize: number;
  studentNo: string | null;
};
