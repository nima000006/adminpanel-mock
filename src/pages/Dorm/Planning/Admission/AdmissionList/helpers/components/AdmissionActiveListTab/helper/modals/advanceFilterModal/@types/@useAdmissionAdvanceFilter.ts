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

export type UseAdmissionActiveAdvanceFilterFormType = {
  activeUni: SelectTypes[] | [];
  activeDormitory: SelectTypes[] | [];
  activeScheduling: SelectTypes[] | [];
  activeReservationType: SelectTypes[] | [];
  activeManagementType: SelectTypes[] | [];
  activePaymentMethod: SelectTypes[] | [];
  activeProvince: SelectTypes[] | [];
  activeCity: SelectTypes[] | [];
};

export type UseAdmissionActiveParamsType = {
  activeUniId?: string;
  activeDormitoryId?: string;
  activeSchedulingId?: string;
  activeReservationTypeId?: string;
  activeManagementTypeId?: string;
  activePaymentMethodId?: string;
  activeProvinceId?: string;
  activeCityId?: string;
};
