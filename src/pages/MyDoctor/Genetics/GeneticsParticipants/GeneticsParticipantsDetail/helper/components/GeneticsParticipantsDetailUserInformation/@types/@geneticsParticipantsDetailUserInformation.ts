export type GeneticsParticipantsDetailUserInformationProps = {
  data: myDoctorSurveyDetailThirdTabResponse | undefined;
  loading: boolean;
};

export type myDoctorSurveyDetailThirdTabResponse = {
  id: number;
  username: string;
  gender: number;
  userStaffId: number;
  surveyId: number;
  surveyTitle: string;
  startDate: string;
  endDate: string;
  invoiceId: string;
  paymentPlanId: number;
  paymentStatus: number;
  startSurvey: string;
  firstName: string;
  lastName: string;
  foreignCode: string;
  branchName: string;
  nationalCode: string;
  mobileNumber: string;
  branchCode: number;
  levelName: string;
  fieldName: string;
  studentNumber: string;
  minutesResponseTime: number;
  secondsResponseTime: number;
  score: number;
  modifiedByFirstName: string;
  modifiedByLastName: string;
  mainStatusDto: {
    id: number;
    title: string;
  };
  provinceTitle: string;
  cityTitle: string;
  age: number;
};

export type myDoctorSurveyDetailThirdTabRequest = {
  "survey-cycle-id": string;
};
