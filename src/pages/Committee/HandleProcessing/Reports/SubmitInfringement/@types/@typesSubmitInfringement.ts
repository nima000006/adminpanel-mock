import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
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
export type GetRecordsTypeViolationResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetRecordsPriorityResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetRecordsViolationListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetRecordsViolationDetailResponse = BPMS_API_RESPONSE<
  {
    AssociationViiolation_id: number;
    id: number;
    title: string;
  }[]
>;
export type SendAmendmentDataResponse = BPMS_API_RESPONSE<{ id: number }>;

export type SendAmendmentDataRequest = BPMS_API_REQUEST<
  string,
  {
    studentNumber: string;
    term: string;
    lessonCode: string;
    dateOccurrence: string;
    reporterNationalcode: string;
    studentPhoneNumber: string;
    informationSource: string;
    AssociationInfractionType: {
      createDate: string;
      desc: string;
      id: number;
      sourceId: number;
      tenant_id: null;
      title: string;
    };
    id: number;
    caregiverName: string;
    studentName: string;
    AssociationInfractions: {
      RegulId: null;
      createDate: null;
      desc: null;
      id: number;
      regulationsId: string;
      tenant_id: null;
      textType: string;
      title: string;
      type: number;
    };
    reporterName: string;
    caregiverCode: string;
    reporterNumber: string;
    nationalCode: string;
    reporterFamily: string;
    placeViolation: string;
    plaintiffType: number;
    AssociationPivotRecordsDetails: {
      createDate: null;
      desc: null;
      id: number;
      tenant_id: null;
      title: string;
      violationId: number;
    }[];
    studentFamily: string;
    Anonymous: null | boolean;
    AssociationTblPriiority: {
      id: number;
      title: string;
      tenant_id: null;
    };
    descViolation: string;
    reporterPhoneNumber: string;
    characteristicCode: string;
    charge?: boolean;
  }
>;
