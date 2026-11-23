import { IdTitle } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type myDoctorSurveyDetailSecondTabRequest = {
  "survey-id": string;
};

export type myDoctorSurveyDetailSecondTab = {
  groupId: number;
  orderId: number;
  title: string;
  group_id: string;
  surveyTitle: string;
  surveyDescription: string;
  groupType: IdTitle;
  name: string;
  scoringFormula: string;
  beShown: boolean;
  hasInner: boolean;
  childGroup: string;
};

export type myDoctorSurveyDetailSecondTabResponse = myDoctorSurveyDetailSecondTab[];

export type myDoctorSurveyDetailStatusGroupSecondTabRequest = {
  surveyCycleId: string;
  masterGroupId: string;
};

export type myDoctorSurveyDetailStatusGroupSecondTabResponse = {
  innerGroupResponseDto: {
    id: number;
    groupId: number;
    groupTitle: string;
    groupType: number;
    groupTypeTitle: string;
    groupDescription: string;
    statusTitle: string;
    statusDescription: string;
    statusId: number;
    imageUrl: string;
    personalDetailDto: {
      similarPercentage: number;
      similarCount: number;
      participantCounts: number;
    };
    minScore: number;
    maxScore: number;
    chartTypeId: number;
    chartType: string;
    recommendations: string;
    score: number;
    statusEmergencyType: string;
    statusEmergencyTypeId: number;
  }[];
  groupTitle: string;
  groupDescription: string;
  orderId: number;
  isLast: boolean;
  nextGroupId: number;
  nextGroupTitle: string;
  nextGroupDescription: string;
  nextGroupTimer: number;
  imageUrl: string;
  surveyCycleId: number;
};

export type myDoctorSurveyDetailQuestionSecondTabRequest = {
  surveyCycleId: string;
  masterGroupId: string;
};

export type myDoctorSurveyDetailQuestionSecondTab = {
  id: number;
  questionType: string;
  questionTypeId: number;
  imageUrl: string;
  description: string;
  mandatory: boolean;
  orderId: number;
  language: string;
  help: string;
  nextQuestionTypeId: number;
  nextQuestionType: string;
  questionPositionType: string;
  questionPositionId: number;
  currentGroupId: number;
  totalQuestions: number;
  groupCurrentIndex: number;
  surveyCycleId: number;
  hasPrevious: boolean;
  completed: boolean;
  answerDto: {
    id: number;
    title: string;
    answerCode: string;
    chosen: boolean;
    imageUrl: string;
    answerText: string;
    answerInt: number;
  }[];
  title: string;
};

export type myDoctorSurveyDetailQuestionSecondTabResponse =
  myDoctorSurveyDetailQuestionSecondTab[];
