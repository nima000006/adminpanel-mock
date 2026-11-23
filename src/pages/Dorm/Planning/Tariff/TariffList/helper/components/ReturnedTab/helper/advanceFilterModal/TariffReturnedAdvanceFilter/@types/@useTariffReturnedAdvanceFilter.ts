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

export type UseTariffReturnedAdvanceFilterFormType = {
  returnedUni: SelectTypes[] | [];
  returnedDormitory: SelectTypes[] | [];
  returnedRequestType: SelectTypes[] | [];
  returnedProvince: SelectTypes[] | [];
  returnedCity: SelectTypes[] | [];
  returnedWaitingTime: SelectTypes | undefined;
};

export type UseTariffReturnedParamsType = {
  returnedUniId?: string;
  returnedDormitoryId?: string;
  returnedRequestTypeId?: string;
  returnedProvinceId?: string;
  returnedCityId?: string;
  returnedWaitingTimeId?: string;
};
