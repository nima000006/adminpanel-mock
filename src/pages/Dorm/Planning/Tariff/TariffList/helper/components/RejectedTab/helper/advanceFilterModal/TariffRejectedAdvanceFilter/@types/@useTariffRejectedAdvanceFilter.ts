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

export type UseTariffRejectedAdvanceFilterFormType = {
  rejectedUni: SelectTypes[] | [];
  rejectedDormitory: SelectTypes[] | [];
  rejectedRequestType: SelectTypes[] | [];
  rejectedProvince: SelectTypes[] | [];
  rejectedCity: SelectTypes[] | [];
};

export type UseTariffRejectedParamsType = {
  rejectedUniId?: string;
  rejectedDormitoryId?: string;
  rejectedRequestTypeId?: string;
  rejectedProvinceId?: string;
  rejectedCityId?: string;
};
