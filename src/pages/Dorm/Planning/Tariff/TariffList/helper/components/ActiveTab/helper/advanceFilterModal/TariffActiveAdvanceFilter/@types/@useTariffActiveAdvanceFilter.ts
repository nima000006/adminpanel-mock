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

export type UseTariffActiveAdvanceFilterFormType = {
  activeUni: SelectTypes[] | [];
  activeDormitory: SelectTypes[] | [];
  activeRequestType: SelectTypes[] | [];
  activeProvince: SelectTypes[] | [];
  activeCity: SelectTypes[] | [];
};

export type UseTariffActiveParamsType = {
  activeUniId?: string;
  activeDormitoryId?: string;
  activeRequestTypeId?: string;
  activeProvinceId?: string;
  activeCityId?: string;
};
