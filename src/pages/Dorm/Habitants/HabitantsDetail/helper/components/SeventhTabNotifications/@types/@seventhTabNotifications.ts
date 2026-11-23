//! GENERAL
//! LAYOUT

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type DormReceiveNotification = {
  createTime: string;
  userNationalcode: string;
  delayMessagePattern: string;
  id: number;
  createByUserId: string;
  lastModifieUser: string;
  createDate: string;
};
export type GetDormReceiveNotificationResponse = BPMS_API_RESPONSE<
  DormReceiveNotification[]
>;
export type GetDormReceiveNotificationRequest = {
  maxResults: number;
  firstResult: number;
  userNationalcode_EQ: string;
};
