import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIS
export type RequestDetailsResponseData = {
  descReturnRequest: string;
  AssociationRequestType_title: string;
  createTime: string;
  descRequest: string;
  AssociationCategoryStatus_title: string;
  id: number;
  createDate: string;
  descriptionAdmin: string;
};
export type GetRequestDetailsResponse = BPMS_API_RESPONSE<RequestDetailsResponseData[]>;
