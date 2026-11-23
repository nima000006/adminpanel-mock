import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GeneticsParticipantsDetailReviewStatusConsultationDrawerContentFormType = {
  result: SelectType<IdTitle>;
  description: string;
};

export type myDoctorSurveyDetailFourthTabChangeStatusRequest = {
  statusId?: number;
  centerId?: number;
  testRequestId?: number;
  appointmentDate?: string;
  files?: string[];
  attendanceDate?: string;
  description?: string;
};

export type myDoctorSurveyDetailFourthTabTestStatusRequest = {
  testId: number;
};
export type myDoctorSurveyDetailFourthTabTestStatusResponse = {
  id: number;
  title: string;
  description: string;
  statusEmergencyType: string;
  statusEmergencyTypeId: number;
  imageUrl: string;
  statusType: string;
  statusTypeId: number;
  code: number;
}[];

export type GeneticsParticipantsDetailReviewStatusConsultationDrawerContentProps = {
  closeDrawerHandler: () => void;
  testId: string;
  currentStatusId?: number;
};
