export type MyDoctorTestActionListResponseForManager = {
  id: number;
  username: string;
  userStaffId: null;
  surveyId: number;
  startDate: string;
  endDate: string;
  invoiceId: string;
  paymentPlanId: number;
  paymentStatus: number;
  startSurvey: string;
  firstName: string;
  lastName: string;
  foreignCode: null;
  branchName: string;
  nationalCode: string;
  mobileNumber: string;
  branchCode: number;
  levelName: string;
  fieldName: string;
  studentNumber: string;
  suicideStatus: number;
  suicideStatusType: number;
  minutesResponseTime: number;
  secondsResponseTime: number;
  score: number;
  followUpStatusTitle: string;
  followUpStatusId: number;
  lastFollowUpDate: null;
  modifiedByFirstName: null;
  modifiedByLastName: null;
  lastModifiedUsername: null;
  surveyStatusTitle: string;
  surveyStatusId: number;
};

export type GetMyDoctorTestActionListResponseForManager = {
  totalElements: number;
  isLast: boolean;
  content: MyDoctorTestActionListResponseForManager[];
};
export type GetMyDoctorTestActionListForManagerRequest = {
  pageNo: number;
  pageSize: number;
  statusId: number;
};
