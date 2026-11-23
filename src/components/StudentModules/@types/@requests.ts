import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { StudentCardProps } from "../../../infrastructure/models/general.model";

//! APIs
// export type StudentCardDtoList = {
//   key: number;
//   image: string;
//   firstName: string;
//   status: string;
//   lastName: string;
//   nationalNumber: string;
//   studentNumber: string;
//   requestType: number;
//   nationalCode: string;
//   unitName: string;
//   fieldName: string;
//   requestDate: string;
//   waitingTime: null;
//   levelName: string;
//   digitalCardSerialNumber: string;
//   collegeCode: null;
//   cardTypeDto: {
//     id: number;
//     name: string;
//   };
//   link: null;
//   requestStatusDescription: null;
// };

export type getAllStudentCardResponse = GENERAL_RESPONSE<{
  totalElements: number;
  totalPage: number;
  studentCardDtoList: StudentCardProps[];
  hasNext: boolean;
  hasPrevious: boolean;
}>;

export type getAllStudentCardRequest = {
  status: number;
  requestType: number | null;
};

export type BulkStudentUpdateResponse = {
  status: number;
  msg: string;
  data: null;
};
