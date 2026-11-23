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

export type UseTariffInActiveAdvanceFilterFormType = {
  inactiveUni: SelectTypes[] | [];
  inactiveDormitory: SelectTypes[] | [];
  inactiveRequestType: SelectTypes[] | [];
  inactiveProvince: SelectTypes[] | [];
  inactiveCity: SelectTypes[] | [];
};

export type UseTariffInActiveParamsType = {
  inactiveUniId?: string;
  inactiveDormitoryId?: string;
  inactiveRequestTypeId?: string;
  inactiveProvinceId?: string;
  inactiveCityId?: string;
};
