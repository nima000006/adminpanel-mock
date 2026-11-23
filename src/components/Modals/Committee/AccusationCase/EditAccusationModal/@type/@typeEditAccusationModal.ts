import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!Layout
export type EditAccusationModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
};
export type infoHandlerProps = {
  firstName: string;
  lastName: string;
  nationalCode: string;
  studentNumber: string;
  fieldName: string;
  levelName: string;
  mobile: string;
};
//!API
export type GetAmendmentDataResponse = BPMS_API_RESPONSE<{
  studentNumber: string;
  term: string;
  lessonCode: string;
  dateOccurrence: string;
  reporterNationalcode: string;
  studentPhoneNumber: string;
  informationSource: string;
  AssociationInfractionType: {
    id: number;
    title: string;
  };
  id: number;
  caregiverName: string;
  studentName: string;
  AssociationInfractions: {
    id: number;
    title: string;
  };
  reporterName: string;
  caregiverCode: string;
  reporterNumber: string;
  nationalCode: string;
  reporterFamily: string;
  recordKeepingStage: string;
  placeViolation: string;
  AssociationPlaintiffType: {
    id: number;
    title: string;
  };
  AssociationPivotRecordsDetails: {
    id: number;
    title: string;
  }[];
  studentFamily: string;
  Anonymous: null;
  AssociationTblPriiority: {
    id: number;
    title: string;
  };
  descViolation: string;
  reporterPhoneNumber: string;
  characteristicCode: string;
}>;

export type GetAmendmentDataRequest = {
  _data_: {
    id: string;
  };
};
