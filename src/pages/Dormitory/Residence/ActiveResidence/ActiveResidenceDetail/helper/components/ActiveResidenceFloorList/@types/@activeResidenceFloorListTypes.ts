import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";

export type ModifyFloorDrawerContentProps = {
  getFloorListHandler: () => void;
  closeDrawerHandler: () => void;
  id: string;
  building: SelectType<IdTitle>;
};

export type ViewFloorDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
  buildingTitle?: string;
};

export type ArchiveFloorDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
  buildingTitle?: string;
};

export type ActiveResidenceFloorListFormType = {
  reason: SelectType<IdTitle>;
};

export type ModifyFloorDrawerContentFormType = {
  floor: SelectType<IdTitle>;
  floorTitle: string;
  quality: SelectType<IdTitle>;
  quantity: number;
  faDescription: string;
  amenityFilter: SelectType<IdTitle>[];
};

export type ActiveResidenceFloorListProps = {
  form: FormInstance<ActiveResidenceDropDownsFormType>;
};

export type getActiveResidenceFloorListContent = {
  uuid: string;
  floorNumber: string;
  title: string;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  roomCount: number;
  bedCount: number;
  amenityCount: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type getActiveResidenceFloorListResponse = {
  content: getActiveResidenceFloorListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceFloorListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
