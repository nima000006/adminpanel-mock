type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};

export type UseAdmissionAwaitingReviewAdvanceFilterFormType = {
  awaitingUni: SelectTypes[] | [];
  awaitingDormitory: SelectTypes[] | [];
  awaitingRequestType: SelectTypes[] | [];
  awaitingReservationType: SelectTypes[] | [];
  awaitingProvince: SelectTypes[] | [];
  awaitingCity: SelectTypes[] | [];
  awaitingScheduling: SelectTypes[] | [];
  awaitingWaitingTime: SelectTypes | undefined;
};

export type UseAdmissionAwaitingReviewParamsType = {
  awaitingUniId?: string;
  awaitingDormitoryId?: string;
  awaitingRequestTypeId?: string;
  awaitingReservationTypeId?: string;
  awaitingProvinceId?: string;
  awaitingCityId?: string;
  awaitingSchedulingId?: string;
  awaitingWaitingTimeId?: string;
};
