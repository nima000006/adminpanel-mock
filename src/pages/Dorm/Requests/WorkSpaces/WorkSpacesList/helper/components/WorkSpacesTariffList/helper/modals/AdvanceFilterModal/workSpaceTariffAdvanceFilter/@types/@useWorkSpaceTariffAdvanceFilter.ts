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

export type UseWorkSpaceTariffAdvanceFilterFormType = {
  tariffUni: SelectTypes[];
  tariffRequestType: SelectTypes[];
  tariffStatus: SelectTypes[];
  tariffWaitingTime: SelectTypes;
  tariffProvince: SelectTypes[];
  tariffCity: SelectTypes[];
};

export type UseWorkSpaceTariffParamsType = {
  tariffUniId?: string;
  tariffRequestTypeId?: string;
  tariffStatusId?: string;
  tariffWaitingTimeId?: string;
  tariffProvinceId?: string;
  tariffCityId?: string;
};
