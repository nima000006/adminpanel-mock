import { TableData } from "../@types/@packetResultTab";

export const dataLengthChecker = (startNumber: number, data?: TableData[]) => {
  if (data && data.length > startNumber) {
    return true;
  } else {
    return false;
  }
};
