import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL

//! LAYOUT
export type ReadOnlyInfringementInformationStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  deleteRequestStatus: boolean | undefined;
};

export type ViolationDetailType = {
  tenant_id: null;
  id: 19;
  title: string;
  violationId: 11;
  createDate: null;
  desc: null;
};

export type ViolationInfoType = {
  caregiverName: string;
  informationSource: string;
  AssociationInfractions: {
    id: number;
    title: string;
  };
  infractionType: number;
  term: string;
  lessonCode: string;
  caregiverCode: string;
  placeViolation: string;
  infraction: number;
  AssociationPivotRecordsDetails: [
    {
      id: number;
      title: string;
      violationId: number;
    },
  ];
  AssociationInfractionType: {
    sourceId: number;
    id: number;
    title: string;
  };
  AssociationTblPriiority: {
    id: number;
    title: string;
  };
  descViolation: string;
  characteristicCode: string;
  dateOccurrence: string;
};
//! API
export type GetViolationInfoRequest = {
  _data_: {
    id: string;
  };
};
export type GetViolationInfoResponse = BPMS_API_RESPONSE<{
  studentNumber: string;
  reportDate: string;
  informationSource: string;
  id: number;
  caregiverName: string;
  studentName: string;
  AssociationInfractions: {
    id: number;
    title: string;
  };
  infractionType: number;
  term: string;
  lessonCode: string;
  caregiverCode: string;
  priiority: number;
  placeViolation: string;
  infraction: number;
  AssociationPivotRecordsDetails: [
    {
      id: number;
      title: string;
      violationId: number;
    },
  ];
  AssociationInfractionType: {
    sourceId: number;
    id: number;
    title: string;
  };
  AssociationTblPriiority: {
    id: number;
    title: string;
  };
  descViolation: string;
  characteristicCode: string;
  dateOccurrence: string;
}>;
