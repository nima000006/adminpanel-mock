import { ListOfCollegeData } from "../../../../models/general.model";

export type GetListOfCollegeResponse = {
  status: number;
  msg: string;
  data: ListOfCollegeData[];
};
export type UniversityListData = {
  id: number;
  code: number;
  name: string;
};
export type GetListOfUniversityResponse = {
  status: number;
  msg: string;
  data: UniversityListData[];
};
