import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! API
export type BasicInfoAccusationsList = {
  regulationsId: string;
  AssociationInfractionType_title: string;
  id: number;
  title: string;
  createDate: string;
};
export type GetAccusationsListResponse = BPMS_API_RESPONSE<BasicInfoAccusationsList[]>;
export type FirstMaxRequest = {
  maxResults: number;
  firstResult: number;
};
export type CountResponse = {
  data: number;
  msg: string;
  status: number;
};
