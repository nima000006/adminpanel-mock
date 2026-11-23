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

export type UseWorkSpaceDormAdvanceFilterFormType = {
  dormUni: SelectTypes[];
  dormRequestType: SelectTypes[];
  dormStatus: SelectTypes[];
  dormWaitingTime: SelectTypes;
  dormProvince: SelectTypes[];
  dormCity: SelectTypes[];
};

export type UseWorkSpaceDormParamsType = {
  dormUniId?: string;
  dormRequestTypeId?: string;
  dormStatusId?: string;
  dormWaitingTimeId?: string;
  dormProvinceId?: string;
  dormCityId?: string;
};
