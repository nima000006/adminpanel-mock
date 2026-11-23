import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type AllMultiFoodMultiDayScheduleListDrawerContentProps = {
  closeDrawerHandler: () => void;
  getListData: () => void;
};

type SelectForm = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
    minPrice?: number;
    maxPrice?: number;
  };
  code: number;
};

export type StepOneForm = {
  activeMode: boolean;
  reserveDate: string[];
  universityUnit: SelectForm[];
  self: SelectForm;
  contract: SelectForm;
  reservationStart: SelectForm;
  reservationEnd: SelectForm;
  deliverStartTime: string;
  deliverEndTime: string;
  startReservation: string;
  endReservation: string;
};

//! APIs
export type CreateAllFoodScheduleBulkDaysResponse = GENERAL_RESPONSE<{ data: boolean }>;
export type CreateAllFoodScheduleBulkDaysRequest = {
  active: boolean;
  basicProductBulkPlanDatRequestList: {
    basePrice: number;
    discount: number;
    limitedCount: boolean;
    maxCount: number | null;
    maxTotalPerPerson: number;
    mealId: number;
    productId: number;
    requestType: number;
    reserveDates: string;
  }[];
  branches: number[];
  endReservationDate: number;
  fromDeliveryTimeHour: number;
  fromDeliveryTimeMinute: number;
  startReservationDate: number;
  toDeliveryTimeHour: number;
  toDeliveryTimeMinute: number;
  startReservationHour: number;
  endReservationHour: number;
  startReservationMinute: number;
  endReservationMinute: number;
};
