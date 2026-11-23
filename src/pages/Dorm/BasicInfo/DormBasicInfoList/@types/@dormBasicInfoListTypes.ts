import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

export type DormBaseInfoData = {
  id: number;
  title: string;
  updateByUserId: string;
  updateDate: string;
  updateTime: string;
};
export type CountResponse = {
  count: number;
  name: string;
};
export type DormBaseInfoResponse = BPMS_API_RESPONSE<DormBaseInfoData[]>;
