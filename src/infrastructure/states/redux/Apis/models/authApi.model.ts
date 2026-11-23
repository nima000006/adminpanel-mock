export type UserSearchInquiry = {
  birthDate: string;
  branchCode: string;
  branchName: string;
  eduStartCode: number;
  email: null;
  enFirstName: null;
  enLastName: null;
  fatherName: string;
  fieldCode: string;
  fieldName: string;
  firstName: string;
  genderName: string;
  issueNumber: string;
  lastName: string;
  levelName: string;
  marriedCode: null;
  mobile: string;
  msrtNativeCode: null;
  nationalCode: string;
  studentNumber: string;
  msrtVaziatCode: null;
  totalAverage: null;
  totalPassedUnits: null;
};

export type UserNationalCodeInquiryResponse = {
  status: number;
  msg: string;
  data: UserSearchInquiry[];
};

export type UserInquiryNationalCodeRecordType = {
  birthDate: string;
  branchCode: string;
  branchName: string;
  eduStartCode: number;
  email: string;
  enFirstName: null;
  enLastName: null;
  fatherName: string;
  fieldCode: string;
  fieldName: string;
  firstName: string;
  genderName: string;
  lastName: string;
  levelName: string;
  marriedCode: null;
  mobile: string;
  nationalCode: string;
  studentNumber: string;
  totalAverage: string;
  totalPassedUnits: string;
  genderCode: string;
  msrtLevelCode: null;
  eduStartDate: string;
  termCode: null;
  termName: null;
  isActive: null;
  levelCode: string;
};

export type UserInquiryNationalCodeResponse = UserInquiryNationalCodeRecordType[];

export type UserStudentNumberInquiryResponse = {
  status: number;
  msg: string;
  data: UserSearchInquiry[] | UserSearchInquiry;
};

export type UserInquiryStudentNumberResponse = {
  fieldName: string;
  totalAverage: string;
  totalPassedUnits: string;
  genderName: string;
  marriedName: null;
  eduStartCode: number;
  genderCode: string;
  msrtLevelCode: null;
  eduStartDate: string;
  termCode: null;
  termName: null;
  isActive: null;
  levelName: string;
  nationalCode: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
  birthDate: string;
  enLastName: null;
  enFirstName: null;
  marriedCode: null;
  branchName: string;
  fieldCode: string;
  mobile: string;
  branchCode: string;
  levelCode: string;
};

export type AdminUserData = {
  userName: string;
  firstName: string;
  lastName: string;
  password: null;
  mobile: string;
  businessId: null;
  userFlag: number;
  residencyName: null;
  sexStatus: null;
  studentNumber: string;
  subgroupCode: string;
  subgroupName: string;
  uniqueId: string;
  levelName: string;
  nationalCode: string;
  nationality: null;
  residencyCode: null;
  digitalCardQr: null;
  digitalCardSerialNumber: string;
  userPhoto: null;
  points: null;
  unitName: string;
  userRole: string;
  studentCardState: null;
  cardValidDate: null;
  receiveMethod: null;
  createDate: string;
  fieldName: string;
  branchCode: string;
  email: string;
  enTerm: null;
  fatherName: string;
  fieldCode: null;
  healthStatus: null;
};
export type GetUserWithTokenResponse = {
  status: number;
  msg: string;
  data: AdminUserData;
};
export type setLoginProps = {
  password: string;
  username: string;
};
export type setLoginResponse = {
  status: number;
  msg: string;
  data: null | {
    access_token: string;
    refresh_token?: string;
  };
};
export type getUserStatusResponse = {
  status: number;
  msg: string;
  data: boolean;
};
