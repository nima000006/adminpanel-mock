import { Dispatch, SetStateAction } from "react";

import { FormInstance, UploadFile } from "antd";

import { GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContentFormType } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent/@types/@geneticsParticipantsDetailReviewStatusTestResultDetailDrawerContent";

export type myDoctorSurveyDetailFourthTabAddFileRequest = {
  fileUrls: string[];
  testRequestHistoryId: number;
};

export type GeneticsParticipantsDetailReviewStatusTestResultDetailModalProps = {
  form: FormInstance<GeneticsParticipantsDetailReviewStatusTestResultDetailDrawerContentFormType>;
  fileList: UploadFile[];
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
};
