export type myDoctorSurveyDetailFirstTabRequest = {
  "survey-cycle-id": string;
};
export type myDoctorSurveyDetailFirstTabResponse = {
  statusId: number;
  statusDescription: string;
  mainGroupsResult: {
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
  masterGroupsResult: {
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
  alarmsGroupsResult: {
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
};
