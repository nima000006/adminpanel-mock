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
export type GetMyDoctorTestListResponseForManager = {
  content: MyDoctorTestList[];
  isLast: boolean;
  totalElements: number;
};

export type GetMyDoctorTestListForManagerRequest = {
  pageNo: number;
  pageSize: number;
  statusId: string;
};

export type GetMyDoctorTestFilterListForManagerResponse = {
  content: MyDoctorTestList[];
  isLast: boolean;
  totalElements: number;
};

export type GetMyDoctorTestFilterListForManagerRequest = {
  pageNo: number;
  pageSize: number;
  body: {
    firstName?: string;
    suicideRisk?: number;
    lastName?: string;
    studentNumber?: string;
    surveyStatusType: number;
    username?: string;
    from?: string;
    to?: string;
  };
};
