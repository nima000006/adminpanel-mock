export type AdvancedFilterRequest = {
  entranceYear: string[];
  facilityCode: string[];
  fieldCode: string[];
  groupCode: string[];
  levelCode: string[];
  universityCode: string;
  requestStatus: number;
  requestType: number;
};
export type BulkStudentUpdateRequest = {
  statusId: number;
  studentCardIds: number[];
  comment?: string;
};
export type GetAllBranchType = {
  branchCode: number;
  branchName: string;
  lat: number;
  lon: number;
};
export type GetAllBranchResponse = {
  data: GetAllBranchType[];
  msg: string;
  status: number;
};
export type BulkStudentUpdateResponse = {
  status: number;
  msg: string;
  data: null;
};

export type GetAllFieldByLevelCodeResponse = {
  data: {
    fieldCode: number;
    fieldName: string;
    levelCode: number;
  }[];
  msg: string;
  status: number;
};
export type GetAllLevelResponse = {
  data: {
    levelName: string;
    levelCode: number;
  }[];
  msg: string;
  status: number;
};
export type StudentRequestStatus = {
  id: number;
  name: string;
};
export type GetAllRequestStatusResponse = {
  status: number;
  msg: string;
  data: StudentRequestStatus[];
};
