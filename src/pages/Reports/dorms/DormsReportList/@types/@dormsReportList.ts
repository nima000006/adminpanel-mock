import { RoomListRecords } from "../../../../../infrastructure/models/tableModels/RoomTableModel/RoomsList/@types/@roomListModel";

export type ListOfDormsData = {
  id: number;
  name: string;
  address: string;
  fromprice: string;
  toprice: string;
  score: string;
  capacity: number;
  filedatas: [
    {
      filename: string;
      url: string;
      id: number;
    },
    {
      filename: string;
      url: string;
      id: number;
    },
  ];
  typeDormitory: null;
};

export type GetListOfDormsResponse = {
  status: number;
  msg: string;
  count: number;
  curenttherm: null;
  data: RoomListRecords[];
  // data: ListOfDormsData[];
};
