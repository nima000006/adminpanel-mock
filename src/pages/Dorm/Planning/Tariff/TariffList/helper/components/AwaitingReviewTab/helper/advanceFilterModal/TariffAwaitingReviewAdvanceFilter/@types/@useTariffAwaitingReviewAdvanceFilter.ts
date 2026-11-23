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

export type UseTariffAwaitingReviewAdvanceFilterFormType = {
  awaitingUni: SelectTypes[] | [];
  awaitingDormitory: SelectTypes[] | [];
  awaitingRequestType: SelectTypes[] | [];
  awaitingProvince: SelectTypes[] | [];
  awaitingCity: SelectTypes[] | [];
  awaitingWaitingTime: SelectTypes | undefined;
};

export type UseTariffAwaitingParamsType = {
  awaitingUniId?: string;
  awaitingDormitoryId?: string;
  awaitingRequestTypeId?: string;
  awaitingProvinceId?: string;
  awaitingCityId?: string;
  awaitingWaitingTimeId?: string;
};
