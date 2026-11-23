//! LAYOUTs

type SelectType<T> = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    tenant_id: null;
    recordStatus: number;
    id: number;
    title: string;
  } & T;
  code: number;
};

export type ResidenceSelectItemsFormType = {
  building: SelectType<{
    AssociationGender_title: string;
    genderId: number;
    dormitoryId: number;
    NumberOfFloors: number;
    AssociationActiveStatus_title: string;
  }>;
  floor: SelectType<{
    AssociationGender_title: string;
    genderId: number;
    NumberOfRooms: number;
    AssociationBuilding_genderId: 2;
    AssociationBuilding_AssociationGender_title: string;
    AssociationActiveStatus_title: string;
    buildingId: number;
  }>;
  room: SelectType<{
    floorId: number;
    AssociationRecordStatus_title: string;
    AssociationGender_title: string;
    NumberOfBeds: number;
    AssociationFloor_AssociationBuilding_AssociationGender_title: string;
    genderId: number;
    AssociationFloor_AssociationBuilding_genderId: number;
  }>;
};
