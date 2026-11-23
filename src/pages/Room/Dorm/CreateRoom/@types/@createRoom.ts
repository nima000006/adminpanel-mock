//! APIs
export type CreateRoomResponse = {
  status: number;
  msg: string;
  data: number;
};

export type CreateRoomRequest = {
  IsShow: boolean;
  IsActive: boolean;
  Name: string;
  Number: string;
  Address: string;
  PhoneNumber: string;
  PostalCode: string;
  FloorId: number;
  NominalCapacity: number;
  RezerveTypeId: number;
  Price: number;
  Level: number;
  RoomTypeId: number;
};

export type EditRoomRequest = {
  RoomId: number;
  IsShow: boolean;
  IsActive: boolean;
  Name: string;
  Number: string;
  Address: string;
  PhoneNumber: string;
  PostalCode: string;
  FloorId: number;
  NominalCapacity: number;
  RezerveTypeId: number;
  Price: number;
  Level: number;
  RoomTypeId: number;
};

export type GetRoomInformationResponse = {
  status: number;
  msg: string;
  data: {
    id: number;
    name: string;
    phone: string;
    coposity: number;
    freecopasity: number;
    level: number;
    des: null;
    isshow: boolean;
    isactive: boolean;
    modifiedDate: string;
    createdDate: string;
    f_id: number;
    price: number;
    number: string;
    rezerveTypeId: number;
    roomTypeId: number;
    typeOfAccommentationId: null;
    managerTypeId: null;
  };
};
