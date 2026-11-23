import { FormInstance } from "antd";

import { ActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";

export type ActiveResidenceDropDownsProps = {
  form: FormInstance<ActiveResidenceDropDownsFormType>;
};

export type getActiveResidenceDropdownListItem = {
  uuid: string;
  title: string;
};

export type getActiveResidenceDropdownListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};

export type getActiveResidenceDropdownListResponse = {
  content: getActiveResidenceDropdownListItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceBuildingDropdownListResponse =
  getActiveResidenceDropdownListResponse;

export type getActiveResidenceFloorDropdownListResponse =
  getActiveResidenceDropdownListResponse;

export type getActiveResidenceUnitDropdownListResponse =
  getActiveResidenceDropdownListResponse;
