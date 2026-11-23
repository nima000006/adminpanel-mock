//!LAYOUT
export type UsersRequestsDetailRoomAllocation = {
  dormName: string;
  buildingName: string;
  floorname: string;
  roomName: string;
  gender: number;
  bedsCountInRoom: number;
  activeBeds: number;
  capableReserveCapacity: number;
  id: number;
  dataSource: {
    name: string;
    family: string;
    gender: number;
    userGroup: number;
    studentCode: string;
    requestNumber: string;
    nationalCode: string;
    uni: string;
    degree: string;
    field: string;
    entranceYear: string;
    term: string;
    registerDate: string;
    lastModifiedDate: string;
    id: number;
  }[];
  buildingsList: { title: string; id: number }[];
};
