//! APIs
export type GetMyDoctorTestUserInfoDetailManagerResponse = {
  surveyId: number;
  username: null;
  firstName: string;
  lastName: string;
  studentNumber: string;
  age: string;
  gender: string;
  genderType: null;
  levelName: string;
  fieldName: string;
  mobile: string;
  branchName: string;
  branchCode: number;
  birthDate: null;
  provinceOfResidence: null;
  nationalCode: string;
  enTerm: string;
  ghqbfDataDtos: {
    answerId: number;
    answerText: string;
    questionText: string;
    answerCode: string;
  }[];
};
