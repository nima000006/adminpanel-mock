import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT

//! API
export type getAccusationAndViolationDetailResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  AssociationViiolation: {
    regulationsId: string;
    tenant_id: null;
    textType: string;
    id: number;
    title: string;
    type: number;
    RegulId: null;
    desc: null;
    createDate: string;
  };
  id: number;
  title: string;
  violationId: number;
  createDate: string;
  desc: string;
}>;
