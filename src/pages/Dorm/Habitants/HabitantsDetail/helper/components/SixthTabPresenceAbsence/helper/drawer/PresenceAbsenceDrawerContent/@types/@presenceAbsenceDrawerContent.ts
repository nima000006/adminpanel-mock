import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type PresenceAbsenceDrawerContentProps = {
  closeDrawerHandler: () => void;
  cellId: number;
  cellDate: string;
  getCalendarInitData: (date: string) => void;
};

type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type PresenceAbsenceDrawerFormType = {
  type: SelectType;
  description: string;
  date: string;
};

//! API
export type PresenceAbsenceDrawerData = {
  date: string;
  description: string;
  AssociationPresenceAbsence: {
    title: string;
    id: number;
  };
  id: number;
};
export type GetPresenceAbsenceDrawerDataResponseTypes =
  BPMS_API_RESPONSE<PresenceAbsenceDrawerData>;
export type GetPresenceAbsenceDrawerDataRequest = {
  data: {
    id: string;
  };
};
