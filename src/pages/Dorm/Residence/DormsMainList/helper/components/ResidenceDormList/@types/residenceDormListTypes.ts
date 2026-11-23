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

export type UseResidenceAdvanceFilterFormType = {
  residenceProvince: SelectTypes[] | [];
  residenceCity: SelectTypes[] | [];
  residenceBranch: SelectTypes[] | [];
  residenceResidenceType: SelectTypes[] | [];
  residenceGender: SelectTypes;
  residenceQuality: SelectTypes[] | [];
  residenceRecordStatus: SelectTypes[] | [];
};

export type ResidenceListFilterParamsType = {
  AssociationRegion_parentId_IN: string;
  regionId_IN: string;
  branchId_IN: string;
  accommodationTypeId_IN: string;
  genderId_IN: string;
  qualityId_IN: string;
  statusId_EQ: string;
};
