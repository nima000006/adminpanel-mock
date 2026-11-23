//! GENERAL

import { FactorUserType } from "../../../../@types/@factorTables";

//! LAYOUT
export type ClearSettlementModalProps = {
  ids: React.Key[];
  setSettlementModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      data: FactorUserType[];
    }>
  >;
  settlementModal: {
    isOpen: boolean;
    data: FactorUserType[];
  };
  setIsSettlementUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};
//! API
export type GetFactorDetailRequest = {
  ids: React.Key[];
};
export type GetFactorDetailResponse = {
  status: number;
  msg: string;
  data: {
    sumAmount: number;
    sumUniversityReceive: number;
    countFactorNo: number;
  };
};
export type GetFactorDescRequest = {
  desc: string;
  documentNo: number;
  ids: React.Key[];
};
export type GetFactorDescResponse = {
  status: number;
  msg: string;
  data: null;
};
