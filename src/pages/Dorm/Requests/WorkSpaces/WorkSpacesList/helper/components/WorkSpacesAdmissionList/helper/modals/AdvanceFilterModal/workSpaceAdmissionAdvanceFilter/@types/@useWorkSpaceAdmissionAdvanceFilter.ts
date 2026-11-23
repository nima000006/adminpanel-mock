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

export type UseWorkSpaceAdmissionAdvanceFilterFormType = {
  admissionUni: SelectTypes[];
  admissionRequestType: SelectTypes[];
  admissionStatus: SelectTypes[];
  admissionWaitingTime: SelectTypes;
  admissionProvince: SelectTypes[];
  admissionCity: SelectTypes[];
};

export type UseWorkSpaceAdmissionParamsType = {
  admissionUniId?: string;
  admissionRequestTypeId?: string;
  admissionStatusId?: string;
  admissionWaitingTimeId?: string;
  admissionProvinceId?: string;
  admissionCityId?: string;
};
