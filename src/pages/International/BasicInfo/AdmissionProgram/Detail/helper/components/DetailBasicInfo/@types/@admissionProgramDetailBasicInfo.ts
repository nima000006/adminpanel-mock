export type GetInternationalAdmissionDetailBasicInfoResponse = {
  ruleTitle: string;
  semesterTitle: string;
  semesterId: number;
  citizenshipTitle: string;
  citizenshipId: number;
  trainingTitle: string;
  trainingId: number;
  genderTitle: string;
  genderId: number;
  regions: {
    title: string;
    id: number;
  }[];
  trainingType: string;
  trainingTypeId: number;

  residenceId: number;
  residenceTitle: string;
};
