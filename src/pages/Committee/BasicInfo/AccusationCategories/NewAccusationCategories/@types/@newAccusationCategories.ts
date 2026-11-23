import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! API
export type GetListOfRegulationTableResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type CreateOrEditAccusationCategoriesResponse = BPMS_API_RESPONSE<{
  sourceId: number;
  tenant_id: null;
  id: number;
  title: string;
  AssociationRegulation: {
    date: string;
    tenant_id: null;
    number: string;
    lastModifiedDate: null;
    id: number;
    attach: null;
    title: string;
  };
  createDate: string;
  desc: string;
}>;
export type CreateOrEditAccusationCategoriesRequest = BPMS_API_REQUEST<
  string,
  {
    title: string;
    createDate: string;
    desc: string;
    sourceId?: number;
    id: number | null;
    AssociationRegulation: {
      id: number;
      title: string;
    };
  }
>;

//! GENERAL

//! LAYOUT
