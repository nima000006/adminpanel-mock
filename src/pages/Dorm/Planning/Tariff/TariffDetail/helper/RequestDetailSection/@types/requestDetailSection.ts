import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type RequestDetailSectionPropsType = {
  infoData: GetRequestDetailData | undefined;
  loading: boolean;
  isAwaitingReview?: boolean;
  isRejected?: boolean;
};
//! APIS
export type GetRequestDetailData = {
  requestTime: string;
  descReturnRequest: string;
  AssociationStatus_title: string;
  AssociationRequestType_title: string;
  descRequest: string;
  requestDate: string;
  id: number;
  createTime: string;
  createDate: string;
};
export type GetRequestDetailRequest = {
  maxResults: number;
  firstResult: number;
  id_EQ: number;
};
export type GetRequestDetailResponse = BPMS_API_RESPONSE<GetRequestDetailData[]>;
