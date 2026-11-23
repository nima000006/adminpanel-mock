/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetMyDoctorTestDetailGroupsResponse,
  GetMyDoctorTestQuestionsDetailResponse,
} from "../../@types/@testDetailQuestions";

export const GET_MY_DOCTOR_TEST_DETAIL_GROUPS_RESPONSE_MOCK: GetMyDoctorTestDetailGroupsResponse = {
  groupId: "30acd599-f0fd-4d67-9593-aab003100e2e",
  groupTitle: "نمونه groupTitle",
};

export const GET_MY_DOCTOR_TEST_QUESTIONS_DETAIL_RESPONSE_MOCK: GetMyDoctorTestQuestionsDetailResponse = {
  questionId: 1,
  questionText: "questionText-mock",
  questionNumber: 1,
  responseScore: 1,
  responseStatus: 1,
  answerDtos: [{
  answerId: 1,
  answerText: "answerText-mock",
  answerCode: "0012345678",
  chosen: true,
}],
};
