import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type InfringementInformationStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
export type SubmitHistoryViolationDetailType = {
  item: {
    AssociationViiolation_id: number;
    id: number;
    title: string;
  };
};
export type SubmitHistoryViolationTypeType = {
  item: {
    id: number;
    title: string;
  };
};
export type SubmitHistoryViolationType = {
  item: {
    id: number;
    title: string;
    AssociationInfractionType_id: number;
  };
};
export type SubmitHistoryFormData = {
  violationType: SubmitHistoryViolationTypeType;
  violation: SubmitHistoryViolationType;
  violationDetail: SubmitHistoryViolationDetailType[];
  procedurePriority: {
    item: {
      id: number;
      title: string;
    };
  };
  term: string;
  lessonCode: string;
  informationSource: string;
  dateOccurrence: string;
  caregiverName: string;
  caregiverCode: string;
  occurYear: string;
  placeViolation: string;
  violationDesc: string;
};

//! API
export type CreateAndEditViolationInfoRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationPivotRecordsDetails: {
      id: number;
      title: string;
      violationId: number;
    }[];
    informationSource: string;
    characteristicCode: string;
    caregiverName: string;
    caregiverCode: string;
    lessonCode: string;
    descViolation: string;
    dateLastStatusChange: string;
    placeViolation: string;
    term: string;
    recordsStage: number;
    id: number;
    infractionType: number;
    infraction: number;
  }
>;
export type CreateAndEditViolationInfoResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
