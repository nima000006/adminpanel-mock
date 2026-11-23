import { FormInstance } from "antd";

import { MyActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";

export type MyActiveResidenceDropDownsProps = {
  form: FormInstance<MyActiveResidenceDropDownsFormType>;
};

export type getMyActiveResidenceDropdownListItem = {
  uuid: string;
  title: string;
};

export type getMyActiveResidenceDropdownListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};

export type getMyActiveResidenceDropdownListResponse = {
  content: getMyActiveResidenceDropdownListItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceBuildingDropdownListResponse =
  getMyActiveResidenceDropdownListResponse;

export type getMyActiveResidenceFloorDropdownListResponse =
  getMyActiveResidenceDropdownListResponse;

export type getMyActiveResidenceUnitDropdownListResponse =
  getMyActiveResidenceDropdownListResponse;
