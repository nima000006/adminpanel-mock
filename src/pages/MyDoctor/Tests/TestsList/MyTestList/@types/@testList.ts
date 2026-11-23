export type MyDoctorTestList = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  studentNumber: string;
  totalScore: number;
  fieldName: string;
  branchName: string;
  timerTime: string;
  startDate: string;
  //todo[shirin]: این سه تا کلید رو خودم گذاشتم فعلا, بک اند باید کلید درست را به ما بدهد
  statusLastAction: number;
  statusLastActionDate: string;
  lastReviewer: string;
};
export type GetMyDoctorTestListResponse = {
  content: MyDoctorTestList[];
  isLast: boolean;
  totalElements: number;
};
export type GetMyDoctorTestListRequest = {
  pageNo: number;
  pageSize: number;
  body: {
    statusId: number;
    branchCodes: number[];
  };
};
