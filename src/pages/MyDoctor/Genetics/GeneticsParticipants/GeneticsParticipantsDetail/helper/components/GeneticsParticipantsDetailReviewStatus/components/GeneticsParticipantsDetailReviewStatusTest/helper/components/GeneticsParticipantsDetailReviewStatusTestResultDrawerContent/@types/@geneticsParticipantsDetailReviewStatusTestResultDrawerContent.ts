import { Dayjs } from "dayjs";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GeneticsParticipantsDetailReviewStatusTestResultDrawerContentFormType = {
  suggestionDate: Dayjs;
  suggestionTime: Dayjs;
  testDate: Dayjs;
  fileName: string;
  file?: unknown;
  center: SelectType<IdTitle>;
};

export type myDoctorSurveyDetailFourthTabTestStatusCodeResponse = {
  id: number;
  title: string;
  description: string;
  statusEmergencyType: string;
  statusEmergencyTypeId: number;
  imageUrl: string;
  statusType: string;
  statusTypeId: number;
  code: number;
};
export type myDoctorSurveyDetailFourthTabTestStatusCodeRequest = {
  testId: number;
  code: number;
};

export type testDtoItems = {
  id: number;
  title: string;
  description: string;
  surveyTitle: string;
  surveyId: number;
  price: number;
  discount: number;
  fileUrl: string;
  testType: {
    id: number;
    title: string;
  };
  discountPercentage: number;
  freeConsultant: boolean;
};

export type myDoctorSurveyDetailFourthTabUploadFileRequest = {
  file: FormData;
};

export type GeneticsParticipantsDetailReviewStatusTestResultDrawerContentProps = {
  closeDrawerHandler: () => void;
  testId: string;
  code: string;
  requestTestId: string;
};
