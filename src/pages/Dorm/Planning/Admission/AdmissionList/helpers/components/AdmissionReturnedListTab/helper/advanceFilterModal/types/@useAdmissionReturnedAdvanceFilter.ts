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

export type UseAdmissionReturnedAdvanceFilterFormType = {
  returnedUni: SelectTypes[] | [];
  returnedDormitory: SelectTypes[] | [];
  returnedRequestType: SelectTypes[] | [];
  returnedReservationType: SelectTypes[] | [];
  returnedProvince: SelectTypes[] | [];
  returnedCity: SelectTypes[] | [];
  returnedScheduling: SelectTypes[] | [];
  returnedWaitingTime: SelectTypes | undefined;
};

export type UseAdmissionReturnedReviewParamsType = {
  returnedUniId?: string;
  returnedDormitoryId?: string;
  returnedRequestTypeId?: string;
  returnedReservationTypeId?: string;
  returnedProvinceId?: string;
  returnedCityId?: string;
  returnedSchedulingId?: string;
  returnedWaitingTimeId?: string;
};
