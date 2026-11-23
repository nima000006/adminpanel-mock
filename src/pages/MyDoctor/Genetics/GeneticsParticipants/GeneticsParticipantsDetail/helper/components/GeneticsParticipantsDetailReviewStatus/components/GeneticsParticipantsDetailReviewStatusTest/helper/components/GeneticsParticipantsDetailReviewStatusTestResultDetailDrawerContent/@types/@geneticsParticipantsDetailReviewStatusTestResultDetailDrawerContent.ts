export type GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContentFormType =
  {
    title: string;
    file: string;
  };

export type myDoctorSurveyDetailFourthTabFilesRequest = {
  testRequestId: number;
};

export type GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  requestTestId: string;
};

export type myDoctorGetHistoryIdRequest = {
  testRequestId: number;
};
