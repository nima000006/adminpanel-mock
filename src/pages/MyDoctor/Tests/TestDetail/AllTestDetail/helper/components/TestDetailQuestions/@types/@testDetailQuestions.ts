//! APIs
export type GetMyDoctorTestDetailGroupsResponse = {
  groupId: string;
  groupTitle: string;
}[];

export type GetMyDoctorTestQuestionsDetailResponse = {
  questionId: number;
  questionText: string;
  questionNumber: number;
  responseScore: number;
  responseStatus: number;
  answerDtos: {
    answerId: number;
    answerText: string;
    answerCode: string;
    chosen: boolean;
  }[];
}[];

export type GetMyDoctorTestQuestionsDetailRequest = {
  groupId: string;
  userId: string;
};
