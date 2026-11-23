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

export type UseResidenceRequestAdvanceFilterFormType = {
  requestProvince: SelectTypes[] | [];
  requestCity: SelectTypes[] | [];
  requestBranch: SelectTypes[] | [];
  requestResidenceType: SelectTypes[] | [];
  requestRequestType: SelectTypes;
  requestRequestStatus: SelectTypes[] | [];
  requestGender: SelectTypes;
};

export type ResidenceRequestListFilterParamsType = {
  AssociationRegion_parentId_IN: string;
  regionId_IN: string;
  branchId_IN: string;
  accommodationTypeId_IN: string;
  requestTypeId_IN: string;
  genderId_IN: string;
};
