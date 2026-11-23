//! APIs
export type GetMyDoctorTestDetailGroupsManagerResponse = {
  groupId: string;
  groupTitle: string;
}[];

export type GetMyDoctorTestQuestionsDetailManagerResponse = {
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

export type GetMyDoctorTestQuestionsDetailManagerRequest = {
  groupId: string;
  userId: string;
};
