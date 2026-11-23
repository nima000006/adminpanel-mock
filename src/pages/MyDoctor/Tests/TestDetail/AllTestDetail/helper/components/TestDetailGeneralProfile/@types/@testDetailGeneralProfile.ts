//! LAYOUTs
export type ChartDataType = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

//! APIs
export type MyDoctorTestGeneralDetailData = {
  groupId: string;
  groupTitle: string;
  surveyRuleId: number;
  surveyStatusType: number;
  surveyStatusTitle: string;
  groupScore: number;
  stepsCount: number;
  min: number;
  max: number;
};

export type GetMyDoctorTestGeneralDetailResponse = {
  statusTotalScore: number;
  surveyStatusType: string;
  suicideData: MyDoctorTestGeneralDetailData[];
  ghqData: MyDoctorTestGeneralDetailData[];
  otherData: MyDoctorTestGeneralDetailData[];
};
