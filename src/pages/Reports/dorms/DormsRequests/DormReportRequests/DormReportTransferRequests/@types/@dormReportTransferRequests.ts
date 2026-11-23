import { ListOfResidentUserType } from "../../../../../../Room/ListOfResidents/ListOfResidentsMain/@types/@listOfResidentsMain";

//! LAYOUT
export type MovingModalRequestType = {
  id: number;
  isOpen: boolean;
  userInfo: Partial<ListOfResidentUserType>;
};

export type TransferRequestModalDataType = {
  id: number;
  isOpen: boolean;
  primaryUser: Partial<ListOfResidentUserType>;
};

export type DormReportTransferRequestsPropsType = {
  setIsDataRefreshed: React.Dispatch<React.SetStateAction<boolean>>;
};
