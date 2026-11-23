import { ListOfResidentUserType } from "../../../../../pages/Room/ListOfResidents/ListOfResidentsMain/@types/@listOfResidentsMain";

//! LAYOUT
export type RoomResidentType = {
  userName: string;
  fName: string;
  lName: string;
};

export type TransferRequestModalProps = {
  setTransferRequestModalData: React.Dispatch<
    React.SetStateAction<{
      id: number;
      isOpen: boolean;
      primaryUser: Partial<ListOfResidentUserType>;
    }>
  >;
  transferRequestModalData: {
    id: number;
    isOpen: boolean;
    primaryUser: Partial<ListOfResidentUserType>;
  };
  setIsDataRefreshed: React.Dispatch<React.SetStateAction<boolean>>;
};

//!APIs
export type GetPersonInRoomByRoomIdRequest = {
  roomId: string;
  term: string;
};
export type GetPersonInRoomByRoomIdResponse = {
  status: number;
  msg: string;
  count: number;
  curenttherm: string;
  totalCount: number;
  data: [
    {
      userName: string;
      fName: string;
      lName: string;
    },
  ];
};

export type DirectTransferResponse = {
  status: number;
  msg: string;
  data: boolean;
};

export type DirectTransferRequest = {
  userName1: string;
  userName2: string;
};
