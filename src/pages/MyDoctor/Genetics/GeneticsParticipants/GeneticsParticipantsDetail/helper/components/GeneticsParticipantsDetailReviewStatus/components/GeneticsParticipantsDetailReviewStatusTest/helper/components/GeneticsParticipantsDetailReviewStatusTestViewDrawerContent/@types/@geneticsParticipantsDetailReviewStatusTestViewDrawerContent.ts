export type myDoctorSurveyDetailFourthTabHistoryRequest = {
  testRequestId: number;
};

export type myDoctorSurveyDetailFourthTabHistoryResponse = {
  id: number;
  testRequestId: number;
  description: string;
  testStatusDto: {
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
  centerId: number;
  centerTitle: string;
  appointmentDate: string;
  attendedDate: string;
  files: string[];
  createdDate: string;
  createdByFirstName: string;
  createdByLastName: string;
  createdByUsername: string;
}[];

export type GeneticsParticipantsDetailReviewStatusTestViewDrawerContentProps = {
  closeDrawerHandler: () => void;
  openEditDrawer: (centerId: string, appointmentDate: string, statusId: string) => void;
  requestTestId: string;
  createdDate: string;
  testTitle: string;
  openResultDrawer: (requestTestId: string) => void;
};
