//! LAYOUT
export type RoomListModelProps = {
  roomClickHandler: (id: number) => void;
  roomEditClickHandler: (id: number) => void;
  listFactorClickHandler: (id: number, name: string) => void;
};

export type RoomListRecords = {
  id: number;
  key: number;
  name: string;
  capacity: number;
  freecapacity: number;
  level: number;
  managertype: string;
  active: boolean;
  typedormitory: null;
  b_Id: number;
};
