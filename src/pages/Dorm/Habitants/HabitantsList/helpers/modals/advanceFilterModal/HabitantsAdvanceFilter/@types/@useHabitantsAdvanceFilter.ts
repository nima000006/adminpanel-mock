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

export type UseHabitantsAdvanceFilterFormType = {
  gender: SelectTypes[] | [];
  userGroup: SelectTypes[] | [];
  uni: SelectTypes[] | [];
  dormitory: SelectTypes[] | [];
  building: SelectTypes[] | [];
  floor: SelectTypes[] | [];
  room: SelectTypes[] | [];
  educationDegree: SelectTypes[] | [];
  scheduling: SelectTypes[] | [];
  province: SelectTypes[] | [];
  city: SelectTypes[] | [];
};

export type UseHabitantsParamsType = {
  genderId?: string;
  userGroupId?: string;
  uniId?: string;
  dormitoryId?: string;
  educationDegreeId?: string;
  schedulingId?: string;
  provinceId?: string;
  cityId?: string;
  buildingId?: string;
  floorId?: string;
  roomId?: string;
};
