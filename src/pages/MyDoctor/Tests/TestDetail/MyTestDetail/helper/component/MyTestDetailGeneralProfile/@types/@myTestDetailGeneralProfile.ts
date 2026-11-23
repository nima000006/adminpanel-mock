//! LAYOUTs
export type MyChartDataType = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

//! APIs
export type MyDoctorTestGeneralDetailDataManager = {
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

export type GetMyDoctorTestGeneralDetailManagerResponse = {
  statusTotalScore: number;
  surveyStatusType: string;
  suicideData: MyDoctorTestGeneralDetailDataManager[];
  ghqData: MyDoctorTestGeneralDetailDataManager[];
  otherData: MyDoctorTestGeneralDetailDataManager[];
};
