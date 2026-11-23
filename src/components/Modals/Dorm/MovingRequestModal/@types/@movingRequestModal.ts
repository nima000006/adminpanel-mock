import { ListOfDormResidents } from "@pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";
import { ListOfResidentUserType } from "@pages/Room/ListOfResidents/ListOfResidentsMain/@types/@listOfResidentsMain";

//! LAYOUT
export type MovingRequestModalPropType = {
  movingModalRequest: {
    id: number;
    isOpen: boolean;
    userInfo: Partial<ListOfDormResidents>;
  };
  setMovingModalRequest: React.Dispatch<
    React.SetStateAction<{
      id: number;
      isOpen: boolean;
      userInfo: Partial<UserType>;
    }>
  >;
  setTransferRequestModalData: React.Dispatch<
    React.SetStateAction<{
      id: number;
      isOpen: boolean;
      primaryUser: Partial<ListOfResidentUserType>;
    }>
  >;
  isExtraInfoDisable: boolean;
  setIsDataRefreshed: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserType = {
  allcapacity?: number;
  bedcount?: number;
  freecapacity?: number;
  grade?: string;
  id?: number;
  key?: number;
  name?: string;
  price?: string;
  timeType?: null;
  type?: null;
  people: any[];
};

//! APIs
export type RoomPeopleResponse = {
  fName: string;
  lName: string;
  phone: string;
  userName: string;
};

export type RoomResponse = {
  id: number;
  key: number;
  name: string;
  bedcount: number;
  allcapacity: number;
  freecapacity: number;
  price: string;
  type: null;
  grade: string;
  timeType: null;
  people: RoomPeopleResponse[];
};

export type FloorResponse = {
  id: number;
  key: number;
  name: string;
  roomLists: RoomResponse[];
};

export type ApartmentResponse = {
  id: number;
  key: number;
  name: string;
  floorLists: FloorResponse[];
};

export type ListOfManagersDormDataResponse = {
  count: number;
  curenttherm: null;
  data: ApartmentResponse[];
  msg: string;
  status: number;
  totalCount: number;
};

export type TransferUserWithoutExitRequest = {
  userName: string;
  roomId: number;
  requestId: number;
  adminUserName: string;
};

export type TransferUserWithoutExitResponse = {
  status: number;
  msg: string;
  data: boolean;
};

export type TransferByAddBedRequest = {
  userName: string;
  roomId: number;
  adminUserName: string;
  requestId: number;
};
