import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

export type getTariffAdmissionScheduleTabData = {
  AssociationCategoryRecordStatus_Title: null;
  appliedStartTime: string;
  AssociationCategorySchedulingType_title: string;
  AssociationCategoryReservationType_title: string;
  appliedEndDate: string;
  createTime: string;
  appliedStartDate: string;
  priceListId: number;
  id: number;
  schedulingId: number;
  statusId: number;
  reservationTypeId: number;
  appliedEndTime: string;
  title: string;
  createDate: string;
  AssociationRecordStatus_title: string | null;
};
export type getTariffAdmissionScheduleTabResponse = BPMS_API_RESPONSE<
  getTariffAdmissionScheduleTabData[]
>;
export type getTariffAdmissionScheduleTabRequest = {
  maxResults: number;
  firstResult: number;
  priceListId_EQ: number;
  title_LIKE?: string;
};
