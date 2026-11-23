import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
//! API
export type CreateOrEditRecordAndEditDetailsViolationsResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  AssociationViiolation: {
    regulationsId: string;
    tenant_id: null;
    textType: string;
    id: number;
    title: string;
    type: number;
    desc: string;
    createDate: string;
  };
  id?: number;
  title: string;
  violationId: number;
  createDate: string;
  desc: string;
}>;
export type CreateOrEditRecordAndEditDetailsViolationsRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    violationId: number;
    createDate: string;
    desc: string;
    tenant_id?: null;
    AssociationViiolation: {
      key: string;
      value: string;
      title: string;
      name: string;
      code: number;
      item: {
        regulationsId: string;
        AssociationInfractionType_title: string;
        id: number;
        title: string;
        createDate: string;
      };
    };
    id: number | null;
  }
>;
export type GetAllAccusationListResponse = BPMS_API_RESPONSE<
  {
    regulationsId: string;
    AssociationInfractionType_title: string;
    id: number;
    title: string;
    createDate: string;
  }[]
>;
