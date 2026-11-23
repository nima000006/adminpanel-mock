export type UserResponseDto = {
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

export type ManagementUserWithStudentInfo = {
  userResponseDto: UserResponseDto;
  id: number;
  studentNumber: string;
  studyFieldId: number;
  studyFieldName: string;
  degreeId: number;
  degreeName: string;
  branchId: number;
  branchName: number;
  recordStatus: number;
  admissionYear: string;
  nationalCode: string;
  birthDate: string;
};

export type ManagementStudentDataResponse = {
  content: ManagementUserWithStudentInfo[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type MyStudentListByAdvanceFilterRequest = {
  firstName?: string;
  lastName?: string;
  username?: string;
  studentNumber?: string;
  regionId?: number;
  degreeId?: number;
  fieldId?: number;
  branchId?: number;
  statusId?: number;
  pageSize: number;
  pageNumber: number;
  email?: string;
  mobileNumber?: string;
};
export type MyStudentListByAdvanceFilterResponse = {
  content: ManagementUserWithStudentInfo[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
