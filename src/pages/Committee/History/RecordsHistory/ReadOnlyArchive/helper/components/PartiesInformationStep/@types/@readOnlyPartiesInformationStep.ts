import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type InfoHandlerType = {
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
  studentNumber?: string;
  mobile?: string;
};
export type PartiesInformationStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setDeleteRequestStatus: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  deleteRequestStatus: boolean | undefined;
};
export type PartiesInfoType = {
  studentName: string;
  nationalCode: string;
  studentPhoneNumber: string;
  studentFamily: string;
  studentNumber: string;
  reporterName: string;
  reporterNationalcode: string;
  reporterPhoneNumber: string;
  reporterFamily: string;
  reporterNumber: string;
};
//! API
export type GetPartiesInfoRequest = {
  _data_: {
    id: string;
  };
};

export type GetPartiesInfoResponse = BPMS_API_RESPONSE<{
  reporterNumber: string;
  nationalCode: string;
  plaintiffType: number;
  reporterNationalcode: string;
  studentNumber: string;
  studentName: string;
  studentPhoneNumber: string;
  reporterPhoneNumber: string;
  id: number;
  reporterName: string;
  reporterFamily: string;
  studentFamily: string;
  AssociationPlaintiffType: { id: number; title: string };
  reporterPost: string;
  reporterUni: string;
  letterNumber: string;
  letterDate: string;
  fieldStudent?: string;
  gradeStudent?: string;
  recycleBin?: boolean;
}>;
